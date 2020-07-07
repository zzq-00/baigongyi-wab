<!-- 我的讲堂--专栏详情页 -->
<template>
  <div>
    <columnDetailcom :columnDetail="columnDetail"></columnDetailcom>
  </div>
</template>

<script>
import columnDetailcom from '@/components/columnDetail'
import api from '@/fetch'
export default {
  name: 'MyClassColumnDetail',
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

<style>

</style>
