<!--付费专栏详情页-->
<template>
  <div class="payColumn">
    <columnDetailcom :columnDetail="columnDetail"></columnDetailcom>
  </div>
</template>

<script>
import columnDetailcom from '@/components/columnDetail'
import api from '@/fetch'
export default {
  name: 'FreeColumnDetail',
  components: {
    columnDetailcom
  },
  data () {
    return {
      columnDetail: {} // 专栏详情
    }
  },
  created () {
    this.getColumnDetail()
  },
  methods: {
    async getColumnDetail () {
      const res = await api.getColumnDetail(this.$route.params.id)
      this.columnDetail = res.data
    }
  }

}
</script>

<style lang="less" scoped>
  .payColumn {
    width: 1100px;
    overflow: hidden;
  }
</style>
