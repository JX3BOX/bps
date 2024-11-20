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
                                <span>加速阈值</span>
                            </div>
                            <el-select v-model="hasteInfo.hasteLevel" controls-position="right" style="width: 100%">
                                <el-option v-for="item in hasteCofs" :key="item.level" :label="item.level + '级'"
                                    :value="item.level"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label">
                                <span>技能时间(秒)</span>
                                <el-tooltip content="表示技能正读条时间，130级后为技能总时间，120级及之前为持续性伤害技能或引导读条的每跳时间" placement="top">
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
                                <el-tooltip content="表示相应技能跳数，正读条为 1 跳，130级后无实际作用，120级及之前引导读条为造成伤害的次数" placement="top">
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
                                <el-radio v-for="item in extraHasteList" :key="item.name" :label="item.name"
                                    v-show="item.label != 2">{{
                                        item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card header="额外加速奇穴" class="m-extra-box">
                    <el-form label-position="top">
                        <el-form-item label="选择可以额外提供突破上限的加速的奇穴">
                            <!-- <p>选择可以额外提供突破上限的加速的奇穴</p> -->
                            <el-radio-group v-model="hasteInfo.uExtra">
                                <el-radio v-for="item in extraHasteList" :key="item.name" :label="item.name"
                                    v-show="item.label != 1">{{
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
                extra: "无",
                uExtra: "无",
            },
            // 等级改系数
            hasteCofs: [
                {
                    level: 130,
                    cof: 10.610 * (1155 * 130 - 130350) / 100,
                },
                {
                    level: 120,
                    cof: 11.695 * (450 * 120 - 45750) / 100,
                },
                {
                    level: 110,
                    cof: 11.695 * (205 * 110 - 18800) / 100,
                },
                {
                    level: 100,
                    cof: 11.077 * (185 * 100 - 16800) / 100,
                },
                {
                    level: 95,
                    cof: 6.087 * (85 * 95 - 7300) / 100,
                },
                {
                    level: 90,
                    cof: 15.652 * (4 * 90 - 10) / 100,
                },
            ],
            extraHasteList,
            // result
            tableHeader: [
                {
                    label: "读条时间(秒)",
                    value: "duration",
                },
                //{
                //    label: "破招伤害时间(秒)",
                //    value: "surplus",
                //},
                {
                    label: "帧数（调试用）",
                    value: "nowFrame",
                },
                {
                    label: "所需加速率",
                    value: "percentage",
                },
                {
                    label: "最终加速率",
                    value: "uPercentage",
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
            let { skillTime, hitTimes, hasteLevel, extra: name, uExtra: uname } = this.hasteInfo;
            let _extraHaste = this.extraHasteList.find(item => item.name === name);
            let _uExtraHaste = this.extraHasteList.find(item => item.name === uname);
            let hasteCalcResult = [];
            const extra = _extraHaste.value;
            const uExtra = _uExtraHaste.value;
            const skillFrame = Math.round(skillTime / 0.0625);
            // console.log(skillFrame)
            // 当前读条帧数 上一条记得注释掉
            // const surplusFrame = Math.ceil(2 / 0.0625);
            // 破招固定2秒/段的帧数 120级废弃

            let hasteCof = this.hasteCofs.find(item => item.level == hasteLevel)?.cof ?? null;
            let hastePercent = 0;
            let hastePercentLimit = 0;
            let uHastePercentLimit = 0;

            // TODO: 这个 for 会被计算 24120 次，在数值扩展后更多需要优化
            for (let i = 0; hastePercentLimit < 25; i++) {
                const baseHaste = (i / hasteCof) * 10.24;
                const totalHaste = Math.floor(baseHaste) + Math.floor(extra);
                const uTotalHaste = totalHaste + Math.floor(uExtra);
                //基础加速加奇穴加速
                const nowFrame = Math.floor((skillFrame * 1024) / (totalHaste + 1024));
                const uNowFrame = Math.floor((skillFrame * 1024) / (uTotalHaste + 1024));
                // const surplusNowFrame = Math.floor((surplusFrame * 1024) / (totalHaste + 1024));

                // 技能受加速影响帧数
                hastePercent = i / hasteCof;
                hastePercentLimit = i / hasteCof + extra / 10.24;
                uHastePercentLimit = hastePercentLimit + uExtra / 10.24;
                let nowTime, uNowTime
                if (hasteLevel >= 130) {
                    nowTime = this.ToFixed(nowFrame * 0.0625);
                    // 基础加速读条时间
                    uNowTime = this.ToFixed(uNowFrame * 0.0625);
                    // 加突破上限的读条时间
                    // let nowSurplusTime = this.ToFixed(surplusNowFrame * 0.0625 * 5);
                    // 破招时间 2s/段总5段
                }
                else {
                    nowTime = this.ToFixed(nowFrame * 0.0625 * Number(hitTimes));
                    // 基础加速读条时间
                    uNowTime = this.ToFixed(uNowFrame * 0.0625 * Number(hitTimes));
                    // 加突破上限的读条时间
                    // let nowSurplusTime = this.ToFixed(surplusNowFrame * 0.0625 * 5);
                    // 破招时间 2s/段总5段
                }
                const result = {
                    duration: "",
                    percentage: this.ToFixed(hastePercent),
                    uPercentage: this.ToFixed(uHastePercentLimit),
                    nowFrame: nowFrame,
                    uNowFrame: uNowFrame,
                    surplus: "",
                    surplusNowFrame: 1 || surplusNowFrame,
                    level: i,
                };

                // 这里决定在最终的表中是否显示重复的数据
                // 乱动概率卡死浏览器
                if (uNowFrame > 0) {
                    // if (nowFrame > 0 && surplusNowFrame > 0) {    --120级废弃
                    if (!hasteCalcResult.some((r) => r.uNowFrame == uNowFrame)) // nowFrame无重复
                        result.duration = uNowTime;
                    // if (!hasteCalcResult.some((r) => r.surplusNowFrame == surplusNowFrame)) // surplusNowFrame无重复
                    //    result.surplus = nowSurplusTime;
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
