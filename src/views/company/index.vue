<template>
  <div>
    <sub-layout>
        <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            theme="light"
            slot='submenu'
            @click="selectMenu"
        >
        <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span @click="person('人员管理')">人员管理</span>
            <router-link to="/company/person"></router-link>
        </a-menu-item>
        <a-menu-item key="2">
            <a-icon type="desktop" />
            <span @click="person('人员管理')">值班信息</span>
            <router-link to="/company/duty">值班信息</router-link>
        </a-menu-item>
        <a-sub-menu key="车厂登记">
            <span slot="title">
                <a-icon type="mail" />
                <span>车厂登记</span>
            </span>
            <a-menu-item key="添加车场">添加车场</a-menu-item>
            <a-menu-item key="添加泊位">添加泊位</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="考勤管理">
            <a-icon type="pie-chart" />
            <span>考勤管理</span>
        </a-menu-item>
        <a-menu-item key="文档管理">
            <a-icon type="desktop" />
            <span>文档管理</span>
        </a-menu-item>
        <a-menu-item key="门禁卡管理">
            <a-icon type="desktop" />
            <span>门禁卡管理</span>
        </a-menu-item>
      </a-menu>
    </sub-layout>
  </div>
</template>

<script>
import SubLayout from "../../components/layout/SubLayout.vue";
export default {
    components: {
    SubLayout,
    },
    methods: {
        selectMenu(item,key,selectedKeys) {
        },
        person(item){
            let me = this;
            me.$confirm({
                title: '提示',
                content: '真的要注销登录吗 ?',
                onOk() {
                    me.$router.replace('/login')
                    window.location.reload()
                },
                onCancel() {
                },
            });
        }
        
    },
};
</script>

<style lang="scss" scoped>
</style>