<template>
    <a-row class="header">
        <a-layout-header class="header">
            <a-col :xs="1"  :sm="1"  :md="1"  :lg="3" :xl="3" class="logo">
                <div class="logo_img"><img src="../../assets/images/header/logo.png" alt="" class="logo_img"></div> 
                <p class="logo_text" style="color:#fff;">城市级智慧停车管理平台</p>
            </a-col>
            <a-col :xs="19" :sm="19" :md="18" :lg="17" :xl="17" class="header_center">
                <a-menu
                    theme="dark"
                    mode="horizontal"
                    :default-selected-keys="['1']"
                    :style="{ lineHeight: '64px' }"
                >
                    <a-menu-item key="1">
                        <router-link to="/home">首页</router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <router-link to="/company">公司管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="3">
                        <router-link to="/">车场管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="4">
                        <router-link to="/">调度管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="5">
                        <router-link to="/">设备管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="6">
                        <router-link to="/">财务管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="7">
                        <router-link to="/">报表管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="8">
                        <router-link to="/">信息发布</router-link>
                    </a-menu-item>
                    <a-menu-item key="9">
                        <router-link to="/">系统集成</router-link>
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :xs="4"  :sm="4"  :md="4"  :lg="4" :xl="4" class="header_right">
                <div>
                    <img src="@/assets/images/header/user.png" alt="">
                    <span>(新消息5条)</span>
                </div>
                <div>
                    <img src="@/assets/images/header/user.png" alt="">
                    <span>管理员</span>
                </div>
                <div @click="signOut">
                    <img src="@/assets/images/header/user.png" alt="">
                    <span>退出</span>
                </div>
            </a-col>
        </a-layout-header>
    </a-row>
</template>

<script>
export default {
    data() {
        return {
        }
    },methods: {
        signOut() {
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
    computed: {
      
    },
};
</script>

<style lang="less" scoped>
// @import '@/assets/styles/variable.less';
.header {
    display: flex;
    width: 100%;
    .logo {
        // width: 120px;
        height: 31px;
        // margin: 16px 28px 16px 0;
        float: left;
        vertical-align: middle;
        .logo_text{
            vertical-align: middle;
            display: inline;
            margin-left: 10px;
        }
        .logo_img{
            vertical-align: middle;
            display: inline;
            width: 34px;
            height: 34px;
        }
    }
    .header_center{}
    .header_right{
        display: flex;
        cursor:pointer; 
        div{
            margin-left: 10px;
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            span{
                margin-left: 10px;
            }
        }
    }
}
// @media (min-width: 1400px){

//     @media (min-width: 1500px) {
//         .logo_text{
//             display: none !important;
//         }
//     } 
//     @media (min-width: 1700px) {
//         .logo_text{
//             font-size: 18px !important;
//         }
//     } 
// }
.ant-menu-dark, .ant-menu-dark .ant-menu-sub{
    background:@siderbarBgColor;
}
.ant-layout-header{
    background:@siderbarBgColor;
}
.ant-menu-dark, .ant-menu-dark .ant-menu-sub{
    background:@siderbarBgColor;
}
</style>
<style lang='less'>
// @import '@/assets/styles/variable.less';
    
</style>

