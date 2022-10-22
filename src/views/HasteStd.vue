<template>
    <div class="m-haste">
        <el-row :gutter="24">
            <el-col :lg="8" :md="12" :sm="24">
                <el-card>
                    <template #header>
                        技能设<span @click="setCof">定</span>
                    </template>
                    <el-form label-position="top">
                        <el-form-item>
                            <div slot="label">
                                <span>技能时间(秒)</span>
                                <el-tooltip content="表示技能正读条时间，或持续性伤害技能的每跳时间，或引导读条的每跳时间" placement="top">
                                    <i class="el-icon-info m-info-icon"></i>
                                </el-tooltip>
                            </div>
                            <el-input-number v-model="hasteInfo.skillTime" :min="0.5" :step="0.0625"
                                controls-position="right" style="width: 100%" @change="handleSkillTimeChange">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label">
                                <span>跳数</span>
                                <el-tooltip content="表示相应技能跳数，正读条为 1 跳，引导读条为造成伤害的次数" placement="top">
                                    <i class="el-icon-info m-info-icon"></i>
                                </el-tooltip>
                            </div>
                            <el-input-number v-model="hasteInfo.hitTimes" :min="1" :step="1" step-strictly
                                controls-position="right" style="width: 100%" @change="handleHitTimesChange">
                            </el-input-number>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card header="额外加速奇穴" class="m-extra-box">
                    <el-form label-position="top">
                        <el-form-item label="选择可以额外提供加速的奇穴">
                            <!-- <p>选择可以额外提供加速的奇穴</p> -->
                            <el-radio-group v-model="hasteInfo.extra">
                                <el-radio v-for="item in extraHasteList" :key="item.name" :label="item.name">{{
                                item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :lg="16" :md="12" :sm="24">
                <el-card header="计算结果">
                    <el-table :data="tableData">
                        <template>
                            <el-table-column v-for="header in tableHeader" :key="header.value" :label="header.label"
                                :prop="header.value" :align="header.align || 'left'"></el-table-column>
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
    name: "HasteStd",
    props: [],
    components: {},
    data: function () {
        return {
            hasteInfo: {
                skillTime: 1.5,
                hitTimes: 1,
                extra: '无',
            },
            hasteCof: 11.695 * (450 * 120 - 45750) / 100,
            //等级改系数
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
        };
    },
    computed: {
        tableData: function () {
            let { skillTime, hitTimes, extra: name } = this.hasteInfo;
            let _extraHaste = this.extraHasteList.find(item => item.name === name);
            let hasteCalcResult = [];
            const extra = _extraHaste.value;
            const skillFrame = Math.round(skillTime / 0.0625);
            //console.log(skillFrame)
            //当前读条帧数 上一条记得注释掉
            const surplusFrame = Math.ceil(2 / 0.0625);
            //破招固定2秒/段的帧数
            let hastePercent = 0;
            let hastePercentLimit = 0;

            //TODO: 这个 for 会被计算 24120 次，在数值扩展后更多需要优化
            for (let i = 0; hastePercentLimit < 25; i++) {
                const baseHaste = (i / this.hasteCof) * 10.24;
                const totalHaste = Math.floor(baseHaste) + Math.floor(extra);
                //基础加速加奇穴加速
                const nowFrame = Math.floor((skillFrame * 1024) / (totalHaste + 1024));
                const surplusNowFrame = Math.floor((surplusFrame * 1024) / (totalHaste + 1024));
                //帧数
                hastePercent = i / this.hasteCof;
                hastePercentLimit = i / this.hasteCof + extra / 10.24;

                let nowTime = this.ToFixed(nowFrame * 0.0625 * Number(hitTimes));
                //基础加速读条时间
                let nowSurplusTime = this.ToFixed(surplusNowFrame * 0.0625 * 5);
                //破招时间 2s/段总5段

                const result = {
                    duration: "",
                    percentage: this.ToFixed(hastePercent),
                    nowFrame: nowFrame,
                    surplus: "",
                    surplusNowFrame: surplusNowFrame,
                    level: i,
                };

                // 这里决定在最终的表中是否显示重复的数据
                // 乱动概率卡死浏览器
                if (nowFrame > 0 && surplusNowFrame > 0) {
                    if (!hasteCalcResult.some((r) => r.nowFrame == nowFrame)) // nowFrame无重复
                        result.duration = nowTime;
                    if (!hasteCalcResult.some((r) => r.surplusNowFrame == surplusNowFrame)) // surplusNowFrame无重复
                        result.surplus = nowSurplusTime;
                    if (result.duration || result.surplus)
                        hasteCalcResult.push(result);
                }
            }
            return hasteCalcResult;
        },
    },
    methods: {
        handleSkillTimeChange: function (currentVal, OldVal) {
            if (!currentVal) {
                this.hasteInfo.skillTime = 0.5;
            }
            this.hasteInfo.skillTime = this.ToEven(currentVal);
            //技能时间
        },
        handleHitTimesChange: function (currentVal, OldVal) {
            if (!currentVal) {
                this.hasteInfo.hitTimes = 0;
                //极端情况下使其返回小于最小值的值，根据组件特性再返回最小值
            }
            //技能频率
        },
        setCof: function () {
            this.hasteCof = prompt("加速系数更新为？（看不懂请不要乱动）", this.hasteCof) ?? this.hasteCof;
        },
        ToEven: function (inputNumber) {
            //回调帧数避免出现奇怪的不存在的技能时长 每帧间隔0.0625 限制上下键的step即可，剩下的交给四舍六入
            let outputNumber = Math.round(inputNumber / 0.0625)
            if (isNaN(inputNumber)) {
                outputNumber = 0;
            }
            //极端情况下使其返回小于最小值的值，根据组件特性再返回最小值 这里由于没有对步数宽度强制限制单独处理一次
            else {
                outputNumber = this.ToFixed(outputNumber * 0.0625);
            }
            return outputNumber
        },
        ToFixed: function (number) {
            //取整模块
            let outputNumber = 0;
            number = number * 10000;
            if (Math.floor((number % 100) / 10) != 5) {
                outputNumber = (number / 10000).toFixed(2);
            } else {
                if (number % 10 != 0) {
                    outputNumber = Math.floor(number / 100 + 1) / 100;
                } else {
                    number = Math.floor(number / 100);
                    if (number % 2 == 0) {
                        outputNumber = Math.floor(number) / 100;
                    } else {
                        outputNumber = (Math.floor(number) + 1) / 100;
                    }
                }
            }
            return outputNumber;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/haste.less";
</style>
