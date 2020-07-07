<template>
  <div class="commented">
    <ideaListCom :key="updataKey" type="commented" />
  </div>
</template>

<script>
import api from '@/fetch'
import ideaListCom from '@/components/ideaListCom'

export default {
  components: {
    ideaListCom
  },
  data() {
    return {
      params: {
        page: 1,
        size: 10,
        type: 2 // 1为我发布的，2为我评论的
      }
    }
  },
  methods: {
    myMoments() {
      api.myMoments(this.params).then(res => {})
    }
  }
}
</script>

<style lang="less" scoped>
</style>
