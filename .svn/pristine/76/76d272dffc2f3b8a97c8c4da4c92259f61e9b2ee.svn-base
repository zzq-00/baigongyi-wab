<!--免费专栏详情页-->
<template>
  <div class="freeColumn">
    <column-detailcom :columnDetail="columnDetail" :columnCourseList="columnCourseList"></column-detailcom>
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
      columnDetail: {
        accountId:"",
        lecturerInfo:{
          realName: ""
        }
      }, // 专栏详情
      // 专栏参数
      columnParams: {
        asc: true,
        orderBy: 'id',
        pageNum: 1,
        pageSize: 100,
        paramObject: {
          id: ""
        }
      },
      columnCourseList:{}
    }
  },
  created () {
    this.getColumnDetail()
    this.columnParams.paramObject.id = this.$route.params.id
    this.ColumnCourse()
  },
  methods: {
    async getColumnDetail () {
      const res = await api.getColumnDetail(this.$route.params.id)
      this.columnDetail = res.data
    },
    async ColumnCourse () {
      const res = await api.ColumnCourse(this.columnParams)
      this.columnCourseList = res.data
    }
  }

}
</script>

<style lang="less" scoped>
  .freeColumn {
    width: 1100px;
    overflow: hidden;
  }
</style>
