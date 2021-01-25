<template>
    <div class="m-single-side">
        <div id="directory" class="m-single-director"></div>
        <div class="m-single-collection" v-if="collection_id && data">
            <div class="u-title"><i class="el-icon-connection"></i> 关联</div>
            <ul class="u-list" v-if="list && list.length">
                <li v-for="(item, i) in list" :key="i">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="item.title"
                        placement="left"
                    >
                        <a :href="item | showLink" target="_blank"
                            ><i class="el-icon-link"></i> {{ item.title }}</a
                        >
                    </el-tooltip>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getCollection } from "@/service/helper.js";
import {getLink} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "single_side",
    props: [],
    data: function() {
        return {
            data: "",
        };
    },
    computed: {
        collection_id: function() {
            return this.$store.state.post.post_collection;
        },
        list: function() {
            return this.data.posts || [];
        },
        collection_title: function() {
            return this.data.title || "-";
        },
    },
    watch: {
        collection_id: function(val) {
            if (isNaN(val)) return;
            getCollection(this.collection_id).then((res) => {
                this.data = res.data.data.collection;
            });
        },
    },
    methods: {},
    filters: {
        showLink : function (item){
            if(item.type == 'custom'){
                return item.url
            }else{
                return getLink(item.type,item.id)
            }
        }
    },
    mounted: function() {},
};
</script>

<style lang="less">
.m-single-side {
    padding: 20px;
}
.m-single-director {
    .mb(20px);
}
.m-single-collection {
    .u-title {
        font-weight: 300;
        font-size: 20px;
    }
    .u-list {
        list-style: none;
        padding: 10px 20px;
        margin: 0;
        li {
            .fz(13px, 36px);
        }
        a {
            .db;
            transition: 0.15s ease-in-out;
            .nobreak;
            &:hover {
                background-color: #e6f0fb;
            }
        }
    }
}
</style>
