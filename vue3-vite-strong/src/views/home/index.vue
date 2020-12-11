<template>
  <h1>Home</h1>
  <ul>
    <li><router-link to="/login">登录</router-link></li>
    <li><router-link to="/401">401</router-link></li>
    <li><router-link to="/404">404</router-link></li>
  </ul>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['loading'])
  },
  mounted() {
    console.log(this.loading)
    this.setLoading(false)
    console.log(this.loading)
  },
  methods: {
    ...mapActions({
      setLoading: 'app/setLoading',
    }),
  },
}
</script>
