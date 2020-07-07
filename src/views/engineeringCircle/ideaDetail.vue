<template>
  <div class='idea-detail' id="NewsToolBox">
    <div class='idea-detail-left'>
      <ideaSingleList ref="ideaSingle" :item="ideaDetail" :type="type" />
    </div>
    <div class='idea-detail-right'>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import ideaSingleList from '@/components/ideaSingleList'
export default {
  components: {
    ideaSingleList
  },
  data() {
    return {
      ideaDetail: {}
    }
  },
  computed: {
    type: function () {
      return this.$route.name === 'groupIdeaDetail' ? 'groupWithId' : 'idea'
    }
  },
  methods: {
    async getIdeaById() {
      let res
      if (this.$route.name === 'groupIdeaDetail') {
        res = await api.getMomentDetail(this.$route.params.id)
        res.data.ideaImgs = res.data.pics
        res.data.createTime = res.data.momentDate
      } else {
        res = await api.getIdeaById(this.$route.params.id)
      }
      res.data.commentList = [] // 评论列表
      res.data.showFold = false // 多行折叠
      res.data.showComment = false // 显示评论
      this.ideaDetail = res.data
      this.$refs.ideaSingle.viewCommentList(res.data)
    }
  },
  created() {
    this.getIdeaById()
  }
}
</script>

<style lang="less" scoped>
.idea-detail {
  margin-top: 20px;
  display: flex;
  .idea-detail-left {
    flex: 1;
    overflow: hidden;
    border-radius: 10px;
  }
  .idea-detail-right {
    width: 300px;
    margin-left: 20px;
  }
}
</style>
