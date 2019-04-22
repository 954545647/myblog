<template>
  <div>
    注册
    <el-button type="success" @click="go">跳转到登录</el-button>
  </div>
</template>

<script>
export default {
  name: "register",
  methods: {
    go() {
      // history.pushState({}, "", "/login");
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
