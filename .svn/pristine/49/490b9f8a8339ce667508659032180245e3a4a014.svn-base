<!-- 我购买的--专栏详情-->
<template>
  <div>
    <column-detailcom :columnDetail="columnDetail" :sign="sign"></column-detailcom>
  </div>
</template>

<script>
import columnDetailcom from '@/components/columnDetail'
import api from '@/fetch'
export default {
  name: 'MyBuyColumnDetail',
  components: {
    columnDetailcom
  },
  data () {
    return {
      sign: 1,
      columnDetail: {} // 专栏详情
    }
  },
  created () {
    this.getColumnDetail()
  },
  methods: {
    // id--专栏详情页
    async getColumnDetail () {
      const res = await api.getColumnDetail(this.$route.params.id)
      this.columnDetail = res.data
    }
  }

}
</script>

<style>

</style>
