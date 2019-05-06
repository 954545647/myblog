<template>
  <div class="detail-wrapper">
    <top-bar ref="topbar"></top-bar>
    {{$route.params.id}}
  </div>
</template>


<script>
import TopBar from "@/components/Blog/topBar.vue";

export default {
  components:{
    TopBar,
  },
  beforeDestroy(){
    console.log(this.$refs.topbar)
  }
}
</script>


<style lang="scss">

</style>
