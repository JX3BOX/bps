<template>
    <div v-if="list.length" class="c-pvp-banner m-ladder-carousel">
        <el-carousel class="m-carousel" autoplay indicator-position="none">
            <el-carousel-item v-for="(item, index) in list" :key="index">
                <a class="u-link" :href="item.link">
                    <el-image class="u-cover" :src="item.img" :alt="item.title" fit="contain" />
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { getConfigBanner } from "@/service/ladder";
export default {
    name: "BBsBanner",
    props: {
        subtype: {
            type: String,
            default: "sidebar",
        },
    },
    data() {
        return {
            list: [],
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client || "std";
        },
    },
    methods: {
        loadData() {
            getConfigBanner({ client: this.client, status: 1, per: 10, type: "bbs", subtype: this.subtype }).then(
                (res) => {
                    this.list = res.data.data?.list || [];
                }
            );
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style lang="less">
.c-pvp-banner {
    .mb(10px);
    .r(5px);
    padding: 0 15px 15px 15px;
    overflow: hidden;
    .m-carousel .el-carousel__container {
        box-sizing: border-box;
        .size(100%, 150px);
    }
    .u-cover {
        overflow: hidden;
        width: 100%;
        text-align: center;
        .r(5px);

        img {
            .r(5px);
        }
    }
    .el-image__inner {
        width: auto;
    }
}
</style>
