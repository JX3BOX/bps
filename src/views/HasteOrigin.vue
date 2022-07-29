<template>
    <div class="m-haste">
        <el-row :gutter="24">
            <el-col :lg="8" :md="12" :sm="24" class="m-haste-input">
                <el-card header="skill_settings" shadow="hover">
                    <div slot="header">技能设定</div>
                    <el-form>
                        <div>
                            <span class="m-haste-card-text">技能时间</span>
                            <el-tooltip
                                content="表示技能正读条时间，或持续性伤害技能的每跳时间，或引导读条的每跳时间"
                                placement="top"
                            >
                                <i class="el-icon-info m-info-icon"></i>
                            </el-tooltip>
                        </div>
                        <el-input-number
                            v-model="hasteInfo.skillTime"
                            controls-position="right"
                            :step="0.0625"
                            :min="0.5"
                            @change="handleSkillTimeChange"
                        >
                        </el-input-number>
                        <div>
                            <span class="m-haste-card-text">跳数</span>
                            <el-tooltip
                                content="表示相应技能跳数，正读条为 1 跳，引导读条为造成伤害的次数"
                                placement="top"
                            >
                                <i class="el-icon-info m-info-icon"></i>
                            </el-tooltip>
                        </div>
                        <el-input-number
                            v-model="hasteInfo.hitTimes"
                            controls-position="right"
                            :step="1"
                            step-strictly
                            :min="1"
                            @change="handleHitTimesChange"
                        >
                        </el-input-number>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :lg="16" :md="12" :sm="24">
                <el-card header="cal_result">
                    <div slot="header">计算结果</div>
                    <el-table :data="tableData">
                        <el-table-column
                            v-for="header in tableHeader"
                            :key="header.value"
                            :label="header.label"
                            :prop="header.value"
                            :align="header.align"
                        ></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "HasteOrigin",
    props: [],
    components: {},
    data: function () {
        return {
            hasteInfo: {
                skillTime: 1.5,
                hitTimes: 1,
            },
            tableHeader: [
                {
                    label: "读条时间（s）",
                    value: "duration",
                },
                {
                    label: "基础加速率（%）",
                    value: "hasteBasePercent",
                },
                {
                    label: "最终加速率（%）",
                    value: "hastePercent",
                },
                {
                    label: "所需加速点数",
                    value: "hasteBase",
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
                this.CaleHaste();
            },
        },
    },
    mounted() {
        this.CaleHaste();
    },
    methods: {
        //暂无额外加速 预留
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
        ToEven: function (inputNumber, outputNumber) {
            //回调帧数避免出现奇怪的不存在的技能时长 每帧间隔0.0625 限制上下键的step即可，剩下的交给四舍六入
            let number = Math.round(inputNumber / 0.0625);
            if (isNaN(number)) {
                outputNumber = 0;
            }
            //极端情况下使其返回小于最小值的值，根据组件特性再返回最小值 这里由于没有对步数宽度强制限制单独处理一次
            else {
                outputNumber = this.ToFixed(number * 0.0625);
            }
            return outputNumber;
        },
        CaleHaste: function () {
            //计算模块
            let { skillTime, hitTimes } = this.hasteInfo;
            const skillFPS = Math.round(skillTime / 0.0625);
            //技能帧数
            const hasteRate = 0;
            //预留额外加速，暂时用不到，写0
            const hasteCof = 14.983 * 245;
            //基础加速系数
            const currentCof = 0.325;
            //特殊加速百分比系数(可能误差)
            let hastePercent = 0;
            let hasteCaleResult = [];
            for (let i = 0; hastePercent < 25; i++) {
                //加速值
                const hasteBasePercent = i / hasteCof;
                //基础加速率（小数）=加速值/加速系数
                const hasteCurrentPercent = (Math.floor(i * currentCof) * 100) / 1024;
                //特殊加速率（百分数）=加速值*特殊系数
                hastePercent = Math.max(hasteCurrentPercent, hasteBasePercent * 100 + hasteRate / 1024);
                //最终加速百分比（百分数）
                //const hasteCalePercent = 100 - 100 / (1 + Math.max(Math.floor(i * currentCof) / 1024, hasteBasePercent + hasteRate / 1024));
                //巴蜀风云版本面板减读条原始算法（百分数）
                //const hasteCalePercent = 100 - 100 / (1 + Math.floor(i * currentCof) / 1024);
                //巴蜀风云版本体服减读条实际算法（百分数）
                const hasteCalePercent = 100 - 100 / (1 + Math.floor(hasteBasePercent * 1024) / 1024);
                //巴蜀风云版本正式服减读条算法,只算了基础，实装额外加速之后这行记得改
                const skillNowFPS = Math.floor((1 - hasteCalePercent / 100) * skillFPS);
                //实际作用帧数
                const result = {
                    duration: "",
                    hasteBasePercent: "",
                    hastePercent: "",
                    skillNowFPS,
                    hasteBase: i,
                };
                if (skillNowFPS > 0 && !hasteCaleResult.some((r) => r.skillNowFPS == skillNowFPS)) {
                    result.duration = this.ToFixed((skillNowFPS * hitTimes) / 16);
                    result.hasteBasePercent = this.ToFixed(hasteBasePercent * 100);
                    result.hastePercent = this.ToFixed(hastePercent);
                    hasteCaleResult.push(result);
                }
            }
            this.tableData = hasteCaleResult;
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