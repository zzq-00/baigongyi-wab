<template>
  <iframe ref="iframe" allowfullscreen="true" :src="linkUrl"></iframe>
</template>

<script>
export default {
  computed: {
    linkUrl() {
      if (this.$store.state.userInfo.accountId) {
        return (
          'https://live.vhall.com/webinar/inituser/' +
          this.$route.params.id +
          '?email=' +
          this.$store.state.userInfo.accountId +
          '&name=' +
          this.$store.state.userInfo.nickName
        )
      }
      return 'https://live.vhall.com/webinar/inituser/' + this.$route.params.id
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$refs['iframe'].parentElement.style.height = '100vh'
  }
}
</script>

<style lang="less" scoped>
iframe {
  width: 100%;
  height: 100vh;
  border: 0 none;
}
</style>
