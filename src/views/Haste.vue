<template>
    <div class="m-haste">
        <el-row :gutter="24">
            <el-col :lg="8" :md="12" :sm="24">
                <el-card header="技能设定">
                    <el-form label-position="top">
                        <el-form-item>
                            <!--todo 变量拆分
                                    1.当前以一个变量来表示参与加速计算的变量和UI显示的变量，这可能会导致计算失误
                                    例如:默认技能时间为1.5s UI显示为1.5s
                                    此时点击上按钮
                                    技能时间为1.5625s UI显示为 1.56s
                                    再次点击上按钮
                                    此时技能时间为 1.6225s UI显示为 1.62s
                                    但是实际技能时间应为 1.5625+0.0625 = 1.65 此时发生误差
                                    所以最好将变量拆分为两个，分别独立 一个仅用来显示  一个仅用来计算
                                    显示的变量绑定到组件中，计算的变量随着@change进行变化或者别的思路随着显示的变量一并变化
                                    2.ties to even算法有一个小bug
                                    当1.595 进行舍入时 会变成 1.51 ——没有判断小数精度最后一位为9的情况
                                    这个问题很简单 凉子你可以试试 或者我有空再来-->
                            <div slot="label">
                                <span>技能时间(秒)</span>
                                <el-tooltip content="表示技能正读条时间，或持续性伤害技能的每跳时间，或引导读条的每跳时间" placement="top">
                                    <i class="el-icon-info m-info-icon"></i>
                                </el-tooltip>
                            </div>
                            <el-input-number
                                v-model="hasteInfo.skillTime"
                                :min="0.5"
                                :step="0.0625"
                                controls-position="right"
                                style="width: 100%"
                                @change="handleSkillTimeChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label">
                                <span>跳数</span>
                                <el-tooltip content="表示相应技能跳数，正读条为 1 跳，引导读条为造成伤害的次数" placement="top">
                                    <i class="el-icon-info m-info-icon"></i>
                                </el-tooltip>
                            </div>
                            <el-input-number
                                v-model="hasteInfo.hitTimes"
                                :min="1"
                                :step="1"
                                step-strictly
                                controls-position="right"
                                style="width: 100%"
                                @change="handleHitTimesChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card header="额外加速奇穴" class="m-extra-box">
                    <el-form label-position="top">
                        <el-form-item label="选择可以额外提供加速的奇穴">
                            <!-- <p>选择可以额外提供加速的奇穴</p> -->
                            <el-radio-group v-model="hasteInfo.extra">
                                <el-radio v-for="item in extraHasteList" :key="item.name" :label="item.name">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :lg="16" :md="12" :sm="24">
                <el-card header="计算结果">
                    <el-table :data="tableData">
                        <template v-for="header in tableHeader">
                            <el-table-column :key="header.value" :label="header.label" :prop="header.value" :align="header.align || 'left'"></el-table-column>
                        </template>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <div class="m-haste-copyright"><i class="el-icon-info"></i> 本应用基于胖叔叔加速宝典应用拓展维护更新</div>
    </div>
</template>

<script>
import extraHasteList from "@/assets/data/haste_extra.json";
export default {
    name: "Haste",
    props: [],
    components: {},
    data: function() {
        return {
            hasteInfo: {
                skillTime: 1.5,
                hitTimes: 1,
                extra: '无',
            },

            extraHasteList,
            // result
            tableHeader: [
                {
                    label: "读条时间(秒)",
                    value: "duration",
                },
                {
                    label: "破招伤害时间(秒)",
                    value: "surplus",
                },
                //{
                    //label: "帧数（调试用）",
                    //value: "nowFrame",
                //},
                {
                    label: "所需加速率",
                    value: "percentage",
                },
                {
                    label: "所需加速等级",
                    value: "level",
                    align: "right",
                },
            ],
            tableData: [],
        };
    },
    watch: {
        hasteInfo: {
            deep: true,
            immediate: true,
            handler() {
                this.renderHaste();
            },
        },
    },
    mounted() {
        this.renderHaste();
    },
    methods: {
        handleSkillTimeChange: function(currentVal, OldVal) {
            if (!currentVal) {
                this.hasteInfo.skillTime = 0.5;
            }
            console.log(currentVal);
            this.hasteInfo.skillTime = this.tiesToEven(currentVal, Number(2));

            //技能时间
        },
        handleHitTimesChange: function(currentVal, OldVal) {
            if (!currentVal) {
                this.hasteInfo.hitTimes = 1;
            }
            //技能频率
        },
        renderHaste: function() {
            const results = [];
            let { skillTime, hitTimes, extra: name } = this.hasteInfo;
            let _extraHaste = this.extraHasteList.find(item => item.name === name)

            const extra = _extraHaste.value
            const skillFrame = Math.round(skillTime / 0.0625);
            //console.log(skillFrame)
            //当前读条帧数 上一条记得注释掉
            const surplusFrame = Math.ceil(2 / 0.0625);
            //破招固定2秒/段的帧数
            let hastePercent = 0;
            let hastePercentLimit = 0;
            let lastTime = (Number(skillTime) + 0.1).toFixed(2);
            let lastSurplusTime = "2.10";
            //这两行没看懂 不敢动
            const hasteCof = 438.5625;
            //等级改系数
            for (let i = 0; hastePercentLimit < 25; i += 1) {
                const baseHaste = (i / hasteCof) * 10.24;
                const totalHaste = Math.floor(baseHaste) + Math.floor(extra);
                //基础加速加奇穴加速
                const nowFrame = Math.floor((skillFrame * 1024) / (totalHaste + 1024));
                const surplusNowFrame = Math.floor((surplusFrame * 1024) / (totalHaste + 1024));
                //帧数
                hastePercent = i / hasteCof;
                hastePercentLimit = i / hasteCof + extra / 10.24;

                let nowTime = (nowFrame * 0.0625 * Number(hitTimes)) * 10000;
                //基础加速读条时间
                if(Math.floor(nowTime % 100 / 10) != 5){
                    nowTime = (nowTime / 10000).toFixed(2);
                }
                else{
                    if(nowTime % 10 != 0){
                        nowTime = Math.floor(nowTime / 100 + 1) / 100;
                    }
                    else{
                        nowTime = Math.floor(nowTime / 100);
                        if(nowTime % 2 == 0){
                            nowTime = Math.floor(nowTime) / 100;
                        }
                        else{
                            nowTime = (Math.floor(nowTime) + 1) / 100;
                        }
                    }
                }
                let nowSurplusTime = (surplusNowFrame * 0.0625 * 5) * 10000;
                //破招时间 2s/段总5段
                if(Math.floor(nowSurplusTime % 100 / 10) != 5){
                    nowSurplusTime = (nowSurplusTime / 10000).toFixed(2);
                }
                else{
                    if(nowSurplusTime % 10 != 0){
                        nowSurplusTime = Math.floor(nowSurplusTime / 100 + 1) / 100;
                    }
                    else{
                        nowSurplusTime = Math.floor(nowSurplusTime / 100);
                        if(nowSurplusTime % 2 == 0){
                            nowSurplusTime = Math.floor(nowSurplusTime) / 100;
                        }
                        else{
                            nowSurplusTime = (Math.floor(nowSurplusTime) + 1) / 100;
                        }
                    }
                }

                const result = {
                    duration: "",
                    percentage: hastePercent.toFixed(2),
                    nowFrame:nowFrame,
                    surplus: "",
                    level: i,
                };

                let shouldAdd = false;
                if (nowTime !== lastTime) {
                    lastTime = nowTime;
                    result.duration = nowTime;
                    shouldAdd = true;
                }

                if (nowSurplusTime !== lastSurplusTime) {
                    lastSurplusTime = nowSurplusTime;
                    result.surplus = nowSurplusTime;
                    shouldAdd = true;
                }

                if (shouldAdd) {
                    results.push(result);
                }
            }

            this.tableData = results;
        },
        /**
         * Ties To Even 向偶数舍入算法
         * 即 四舍六入五成双
         * @param number 原数字
         * @param precision 结果精度
         * @param judgeLength 精度后取X位小数进行舍入 默认为10位
         * @returns {number} 结果
         */
        tiesToEven: function(number, precision, judgeLength){
            if(!judgeLength){
                judgeLength = 10;
            }
            number = Number(number);
            precision = Number(precision);
            // console.log("当前精度:" + (number.toString().length - number.toString().indexOf('.') - 1))
            // console.log("需要精度:" + precision)
            // number存在
            if(number &&
                // number是小数
                !(number.toString().indexOf('.') === -1) &&
                // 精度至少>0
                precision > 0 &&
                // 当前精度>需要精度
                number.toString().length - number.toString().indexOf('.') - 1 > precision){
                let needRoundingNumberIndex = number.toString().indexOf('.') + precision;
                // console.log("需要进行舍入的数的下标:" + (number.toString().indexOf('.') + precision))
                let needRoundingNumber = number.toString().substring(needRoundingNumberIndex, needRoundingNumberIndex + 1);
                // console.log("需要进行舍入的数:" + number.toString().substring(needRoundingNumberIndex, needRoundingNumberIndex + 1))
                let afterRoundingNumber = number.toString().substring(needRoundingNumberIndex + 1, number.toString().indexOf('.') + judgeLength);
                // console.log("判断如何舍入的数:" + number.toString().substring(needRoundingNumberIndex + 1, number.toString().indexOf('.') + judgeLength))
                if(afterRoundingNumber == 5){
                    if(Number(needRoundingNumber) % 2 === 0){
                        number = Number(number.toString().substring(0, needRoundingNumberIndex + 1))
                    }else{
                        number = Number((number.toString().substring(0, needRoundingNumberIndex)) + (Number(needRoundingNumber) + 1))
                    }
                }else if(afterRoundingNumber > 5){
                    number = Number((number.toString().substring(0, needRoundingNumberIndex)) + (Number(needRoundingNumber) + 1))
                }else {
                    number = Number(number.toString().substring(0, needRoundingNumberIndex + 1))
                }
            }
            return number;
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/haste.less";
</style>
