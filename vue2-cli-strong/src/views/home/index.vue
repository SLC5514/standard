<template>
  <div class="home-page">
    <h1>Home</h1>
    <Button type="primary" @click="login">请求</Button>
  </div>
</template>

<script>
import { Button } from 'element-ui'
import { getInfo, login } from '@/api/user'

export default {
  name: 'Home',
  components: {
    Button
  },
  methods: {
    login() {
      login({
        username: 'admin',
        password: 123456
      }).then(res => {
        console.log(res)
        this.$message({
          message: '请求成功!',
          type: 'success'
        })
      }).catch(() => {})
    },
    getInfo() {
      getInfo().then(res => {
        console.log(res)
        this.$message({
          message: '请求成功!',
          type: 'success'
        })
      }).catch(() => {})
    }
  },
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100vh;
}
</style>
