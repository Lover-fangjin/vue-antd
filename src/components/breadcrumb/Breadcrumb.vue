<template>
  <div>
    <a-breadcrumb>
        <a-breadcrumb-item v-for="(breadItem,idx) in breadList" :key="idx" @click="routePath(breadItem)">
            <!-- <router-link :to="breadItem.path">{{breadItem.meta.title}}</router-link> -->
            {{breadItem.meta.title}}
        </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
    data() {
        return {
            breadList: [], // 路由集合
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        },
    },
    methods: {
        isHome(route) {
            return route.name === "home";
        },
        getBreadcrumb() {
            let matched = this.$route.matched;
            this.breadList = matched;
        },
    },
    created() {
        this.getBreadcrumb();
    },
    mounted(){
    }
};
</script>

<style lang="less" scoped>
</style>