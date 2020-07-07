<!-- 我的讲堂---课程详情页 -->
<template>
  <div class="myLectureDetail">
    <course-detailcom :courseDetail='courseDetail'></course-detailcom>
  </div>
</template>

<script>
import courseDetailcom from '@/components/courseDetail'
import api from '@/fetch'
export default {
  name: 'MyClassCourseDetail',
  components: {
    courseDetailcom
  },
  data () {
    return {
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
