<template>
    <el-dialog custom-class="m-dps-form" :visible="modelValue" @close="close" append-to-body title="新增计算器申请">
        <el-form :model="form" :rules="rules" label-position="left" label-width="80px" ref="form">
            <el-form-item label="心法" prop="mount">
                <el-select
                    v-model="form.mount"
                    placeholder="请选择心法"
                    style="width: 100%"
                    popper-class="m-mount-select"
                    filterable
                >
                    <el-option
                        v-for="item in options.mount_filters"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                    >
                        <div class="u-option">
                            <img class="u-xf-icon" :src="showMountIcon(item.value)" />
                            <span class="u-xf-name">{{ showMountName(item.value) }}</span>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联作品" prop="url">
                <el-select
                    v-model="form.url"
                    placeholder="输入关键词进行搜索"
                    style="width: 100%"
                    filterable
                    :filter-method="loadData"
                    @change="onPostChange"
                >
                    <el-option
                        v-for="item in list"
                        :key="item.ID"
                        :value="`/tool/${item.ID}`"
                        :label="item.post_title"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户端" prop="client">
                <el-select v-model="form.client" placeholder="请选择客户端" style="width: 100%">
                    <el-option
                        v-for="item in options.client_filters"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%">
                    <el-option
                        v-for="item in options.type_filters"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="贡献者" prop="contributors">
                <el-input v-model="form.contributors" placeholder="请输入贡献者魔盒UID，用半角逗号,隔开"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" placeholder="（非必填）"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import xfids from "@jx3box/jx3box-data/data/xf/xfid.json";
import { showMountIcon } from "@jx3box/jx3box-common/js/utils";
import { getMyPost } from "@/service/post";
import { addDpsRegistry } from "@/service/dps";
import { debounce } from "lodash";
export default {
    name: "dps-form",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            form: {
                mount: "",
                name: "",
                url: "",
                client: this.client,
                type: "",
                contributors: "",
                remark: "",
            },
            rules: {
                mount: [{ required: true, message: "请选择心法", trigger: "blur" }],
                name: [{ required: true, message: "请输入名称", trigger: "blur" }],
                url: [{ required: true, message: "请输入链接", trigger: "blur" }],
                client: [{ required: true, message: "请选择客户端", trigger: "blur" }],
                type: [{ required: true, message: "请选择类型", trigger: "blur" }],
            },

            list: [],
            saveLoading: false,
        };
    },
    computed: {
        client() {
            return this.$store.state.client;
        },
    },
    mounted() {
        this.loadData();
    },
    watch: {
        client: {
            handler() {
                this.form.client = this.client;
            },
            immediate: true,
        },
    },
    methods: {
        showMountIcon,
        close() {
            this.$emit("update:modelValue", false);
        },
        showMountName: function (mount_id) {
            return xfids[mount_id];
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.saveLoading = true;
                    addDpsRegistry(this.form)
                        .then((res) => {
                            this.$message.success("提交成功");
                            this.close();
                        })
                        .finally(() => {
                            this.saveLoading = false;
                        });
                }
            });
        },
        loadData: debounce(function (title) {
            const params = {
                page: 1,
                per: 10,
                title,
                client: this.client,
                type: "bps",
            };
            getMyPost(params).then((res) => {
                this.list = res.data.data?.list || [];
            });
        }, 500),
        onPostChange() {
            this.form.name = this.list.find((item) => item.ID == this.form.url.split("/").pop()).post_title;
        },
    },
};
</script>

<style lang="less">
.m-dps-form {
}
.m-mount-select {
    .u-option {
        .flex;
        align-items: center;
        .u-xf-icon {
            width: 24px;
            height: 24px;
        }
        .u-xf-name {
            margin-left: 10px;
        }
    }
}
</style>
