<!--我购买的--课程详情页-->
<template>
  <div>
    <course-detailcom :courseDetail='courseDetail' :sign='sign'></course-detailcom>
  </div>
</template>

<script>
import courseDetailcom from '@/components/courseDetail'
import api from '@/fetch'
export default {
  name: 'MyBuyCourseDetail',
  components: {
    courseDetailcom
  },
  data () {
    return {
      sign: 1,
      courseDetail: {} // 课程详情
    }
  },
  created () {
    this.getCourseDetail()
  },
  methods: {
    // id--课程详情页
    async getCourseDetail () {
      const res = await api.getCourseDetail(this.$route.params.id)
      this.courseDetail = res.data
    }
  }
}
</script>

<style>

</style>
