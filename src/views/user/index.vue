<template>
  <div class="user-wrapper">
    <user></user>
  </div>
</template>


<script>
import user from "@/components/User/user.vue";
export default {
  components: {
    user
  }
};
</script>


<style lang="scss">
.user-wrapper {
  width: 100%;
  height: 100%;
}
</style>