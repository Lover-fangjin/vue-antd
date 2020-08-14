<template>
  <div class="home">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header/header'
export default {
  name: 'Home',
  components: {
    Header
  },
  mounted () {
  },
}

</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
}
</style>
