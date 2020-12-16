<template>
  <div class="home-page" v-waterMarker="{text:'slc版权所有'}">
    <h1>Home</h1>
    <el-button type="primary" @click="login">请求</el-button>
    <el-button type="primary" v-copy="copyText">复制</el-button>
    <el-button type="primary" v-longpress="longpress">长按</el-button>
    <el-button type="primary" v-debounce="debounce">防抖</el-button>
    <br>
    <el-input v-model="note" v-emoji placeholder="禁止输入表情和特殊字符" class="width200 marginT10" />
    <br>
    <img v-lazy="`https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg`" class="width100 marginT10" />
    <br>
    <!-- 显示 -->
    <el-button v-permission="'1'">权限按钮1</el-button>
    <!-- 不显示 -->
    <el-button v-permission="'10'">权限按钮2</el-button>
    <br>
    <div class="absolute">
      <span class="relative" v-draggable>拖拽</span>
    </div>
  </div>
</template>

<script>
// import { Button, Input } from 'element-ui'
import { getInfo, login } from '@/api/user'

export default {
  name: 'Home',
  // components: {
  //   Button,
  //   Input,
  // },
  data() {
    return {
      copyText: 'a copy directives',
      note: '',
    }
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
    },
    longpress() {
      console.log('长按指令生效')
    },
    debounce() {
      console.log('只触发一次')
    },
  },
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100vh;
}
</style>
