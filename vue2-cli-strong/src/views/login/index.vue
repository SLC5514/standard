<template>
  <div class="login-page">
    <h1>Login</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.handleLogin()
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('user/login', {
          username: 'admin',
          password: 123456
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
}
</style>
