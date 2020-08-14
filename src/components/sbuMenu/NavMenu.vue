<template>
    <a-sub-menu :key="menu.id">
        <span slot="title"><a-icon type="mail" /><span>{{menu.menuName}}</span></span>
    </a-sub-menu>

    <!-- <a-sub-menu v-if="menu.childMenu && menu.childMenu.length >= 1" :key="menu.id">
        <span slot="title">
            <a-icon type="mail" />
            <span>{{menu.menuName}}</span>
        </span>
        <NavMenu v-for="item in menu.childMenu" :key="item.id" :menu="item"></NavMenu>
    </a-sub-menu>
    <a-menu-item v-else :key="menu.id.toString()" @click="clickMenuItem(menu)">
        <a-icon type="mail" />
        {{menu.menuName}}
    </a-menu-item>   -->
</template>

<script>
    export default {
        name: 'NavMenu',
        props: {
            menu: {
                type: Object,
                default: () => {
                    return {};
                }
            },
        },
        methods: {
            clickMenuItem(_info) {
                this.$router.push(_info.path)
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>