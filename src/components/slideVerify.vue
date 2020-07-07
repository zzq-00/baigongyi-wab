<!--滑块验证 -->
<template>
<div class="slide-verify">
    <drag-verify
      :width="verifyVal.width ? verifyVal.width : width"
      :height="verifyVal.height ? verifyVal.height : height"
      :text="text"
      :success-text="successText"
      :background="background"
      :progress-bar-bg="progressBarBg"
      :completed-bg="completedBg"
      :handler-bg="handlerBg"
      :handler-icon="handlerIcon"
      :text-size="textSize"
      :success-icon="successIcon"
      :circle = "isCircle"
      :handler-width = "handlerWidth"
      :radius = "Isradius"
      :isPassing.sync = "isPassing"
      ref="verify"
      @passcallback="passcallback"
    >
    </drag-verify>
</div>
</template>

<script>
import dragVerify from 'vue-drag-verify'
export default {
  name: 'DragVerify',
  components: {
    dragVerify
  },
  props: {
    verifyVal: Object
  },
  data () {
    return {
      handlerIcon: 'el-icon-d-arrow-right',
      successIcon: 'el-icon-check',
      background: '#E6E6E6',
      progressBarBg: '#4b0',
      completedBg: '#66cc66',
      handlerBg: '#fff',
      text: '请将滑块拖动到右侧',
      successText: '验证成功',
      width: 358,
      height: 35,
      textSize: '12px',
      isCircle: false,
      handlerWidth: 50,
      Isradius: '4px',
      isPassing: false
    }
  },
  methods: {
    passcallback () {
      this.$emit('getVerify', this.$refs.verify.isPassing)
    }
  }
}
</script>

<style lang="less">
  .slide-verify{
    margin-bottom: 10px;
    .drag_verify {
      border-radius: 4px!important;
      .dv_handler_bg, .dv_handler_ok_bg {
        border-radius: 4px!important;
      }
    }
  }
</style>
