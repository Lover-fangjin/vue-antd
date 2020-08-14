<template>
  <a-layout id="components-layout-demo-custom-trigger" style="min-height:calc(100vh - 64px)">
    <a-layout-sider
      width="200"
      style="background: #fff"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      />
      <slot name="submenu"></slot>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <!-- 面包屑地方 -->
      <breadcrumb></breadcrumb>
      <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Breadcrumb from '../breadcrumb/Breadcrumb'
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      collapsed: false,
      submenu:[]
    };
  },
};
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>