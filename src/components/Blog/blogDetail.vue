<template>
  <div>
    <top-bar></top-bar>
    {{$route.params.id}}
  </div>
</template>


<script>
import TopBar from "@/components/Blog/topBar.vue";

export default {
  components:{
    TopBar
  }
}
</script>


<style lang="scss">

</style>
