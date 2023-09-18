<template>
    <el-drawer
        class="c-admin"
        title="管理面板"
        :visible="modelValue"
        :before-close="close"
        :append-to-body="true"
        :modal="false"
        :withHeader="false"
    >
        <div class="c-admin-wrapper">
            <el-divider content-position="left">可见性变更</el-divider>
            <el-radio-group v-model="visible" size="small" class="c-admin-status">
                <el-radio-button
                    v-for="(option, key) in visible_options"
                    :label="key"
                    :key="key"
                >{{ option }}</el-radio-button>
            </el-radio-group>

            <el-divider content-position="left">元信息</el-divider>

            <div class="c-admin-title">
                <el-input
                    v-model="title"
                    placeholder="请输入小册标题"
                    class="input-author drawer-item-content"
                >
                        <template slot="prepend">标题</template>
                </el-input>
            </div>

            <div class="c-admin-info">
                <div class="c-admin-author">
                    <el-input
                        v-model="post_author"
                        placeholder="请输入作者uid"
                        class="input-author drawer-item-content"
                    >
                        <template slot="prepend">作者</template>
                </el-input>
                </div>
            </div>

            <div class="c-admin-buttons">
                <el-button type="primary" @click="submit" :loading="pushing">提交</el-button>
                <el-button type="plain" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import {
    __postType,
} from "@jx3box/jx3box-common/data/jx3box.json";
import { updateCollection, getCollection } from "@/service/helper";
import Bus from "@/store/bus";
export default {
    name: "CollectionAdmin",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    data() {
        return {
            type_options: [],
            post_author: "",
            visible: 1,
            title: "",

            pushing: false,

            data: {},
        }
    },
    computed: {
        visible_options() {
            return {
                0: "私有",
                1: "公开",
            };
        },
        id() {
            return this.$route.params.id
        }
    },
    watch: {
        modelValue(val) {
            if (val) {
                this.loadCollection();
            }
        }
    },
    mounted() {
        this.initTypeOptions();
    },
    methods: {
        close() {
            this.$emit("update:modelValue", false);
        },
        // 加载类型选项
        initTypeOptions: function () {
            let types = [];
            for (let key in __postType) {
                types.push({
                    value: key,
                    label: __postType[key],
                });
            }
            this.type_options = types;
        },
        loadCollection() {
            getCollection(this.id).then(res => {
                this.data = res.data.data;
                this.post_author = this.data.user_id;
                this.visible = this.data.public;
                this.title = this.data.title;
            })
        },
        submit() {
            this.pushing = true;
            updateCollection(this.id, {
                mark: this.data.mark,
                description: this.data.description,
                posts: JSON.stringify(this.data.posts),
                image: this.data.image,
                public: this.visible,
                user_id: ~~this.post_author,
                title: this.title,
            }).then(() => {
                this.$message({
                    message: "更新成功",
                    type: "success",
                });
                Bus.$emit("updateCollection");
            }).finally(() => {
                this.pushing = false;
            })
        }
    },
};
</script>

<style lang="less">
.c-admin-title {
    margin-bottom: 20px;
}
</style>
