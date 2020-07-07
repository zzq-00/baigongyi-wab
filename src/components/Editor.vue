<template>
  <div class="editor">
    <div class="hidden-box"></div>
    <link :href="this.$store.state.imageDomain + 'stylesheets/quill.snow.css'" rel='stylesheet'>
    <!-- 图片上传组件辅助-->
    <input type="file" multiple ref="file-input" accept="image/*" @change="uploadFile($event, 'forEditor')" v-show="false">
    <!-- 视频上传组件辅助-->
    <form ref="video-form">
      <input type="file" ref="file-video-input" accept="video/*" id="video-select" v-show="false">
    </form>
    
    <quill-editor v-loading="imgUploading || videoUploading" class="editor" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
    </quill-editor>
    <span class="limitNum">{{wordlength}}/10000</span>
  </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  // ['blockquote', 'code-block'], // 引用  代码块
  ['blockquote'], // 引用
  [{ header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  // [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video', 'cvideo'], // 链接、图片、插入视频、上传视频
]
// 工具栏提示
const titleConfig=[
  {Choice:'.ql-bold',title:'加粗'},
  {Choice:'.ql-italic',title:'斜体'},
  {Choice:'.ql-underline',title:'下划线'},
  {Choice:'.ql-header',title:'段落格式'},
  {Choice:'.ql-strike',title:'删除线'},
  {Choice:'.ql-blockquote',title:'块引用'},
  {Choice:'.ql-code',title:'插入代码'},
  {Choice:'.ql-code-block',title:'插入代码段'},
  {Choice:'.ql-font',title:'字体'},
  {Choice:'.ql-size',title:'字体大小'},
  {Choice:'.ql-list[value="ordered"]',title:'编号列表'},
  {Choice:'.ql-list[value="bullet"]',title:'项目列表'},
  {Choice:'.ql-direction',title:'文本方向'},
  {Choice:'.ql-header[value="1"]',title:'h1'},
  {Choice:'.ql-header[value="2"]',title:'h2'},
  {Choice:'.ql-align',title:'对齐方式'},
  {Choice:'.ql-color',title:'字体颜色'},
  {Choice:'.ql-background',title:'背景颜色'},
  {Choice:'.ql-image',title:'图像'},
  {Choice:'.ql-video',title:'插入视频链接'},
  {Choice:'.ql-cvideo',title:'上传本地视频'},
  {Choice:'.ql-link',title:'添加链接'},
  {Choice:'.ql-formula',title:'插入公式'},
  {Choice:'.ql-clean',title:'清除字体格式'},
  {Choice:'.ql-script[value="sub"]',title:'下标'},
  {Choice:'.ql-script[value="super"]',title:'上标'},
  {Choice:'.ql-indent[value="-1"]',title:'向左缩进'},
  {Choice:'.ql-indent[value="+1"]',title:'向右缩进'},
  {Choice:'.ql-header .ql-picker-label',title:'标题大小'},
  {Choice:'.ql-header .ql-picker-item[data-value="1"]',title:'标题一'},
  {Choice:'.ql-header .ql-picker-item[data-value="2"]',title:'标题二'},
  {Choice:'.ql-header .ql-picker-item[data-value="3"]',title:'标题三'},
  {Choice:'.ql-header .ql-picker-item[data-value="4"]',title:'标题四'},
  {Choice:'.ql-header .ql-picker-item[data-value="5"]',title:'标题五'},
  {Choice:'.ql-header .ql-picker-item[data-value="6"]',title:'标题六'},
  {Choice:'.ql-header .ql-picker-item:last-child',title:'标准'},
  {Choice:'.ql-size .ql-picker-item[data-value="small"]',title:'小号'},
  {Choice:'.ql-size .ql-picker-item[data-value="large"]',title:'大号'},
  {Choice:'.ql-size .ql-picker-item[data-value="huge"]',title:'超大号'},
  {Choice:'.ql-size .ql-picker-item:nth-child(2)',title:'标准'},
  {Choice:'.ql-align .ql-picker-item:first-child',title:'居左对齐'},
  {Choice:'.ql-align .ql-picker-item[data-value="center"]',title:'居中对齐'},
  {Choice:'.ql-align .ql-picker-item[data-value="right"]',title:'居右对齐'},
  {Choice:'.ql-align .ql-picker-item[data-value="justify"]',title:'两端对齐'}
];
import { quillEditor, Quill } from 'vue-quill-editor'
import uploadImg from '@/mixins/uploadImg.js'
import uploadVideo from '@/mixins/uploadVideo.js'
// 导入自定义video
import Video from '@/assets/js/quill-video/quill.video.js'
// 导入图片大小调整模块
import ImageResize from 'quill-image-resize-module'
// 注册video
Quill.register(Video, true)
// 注册图片大小调整模块
Quill.register('modules/imageResize', ImageResize)

export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: String
    },
    description: {
      type: Object,
      default: function() {
        return { maxsize: 4 }
      }
    }
  },
  components: {
    quillEditor
  },
  watch: {
    value: function(val) {
      this.content = val
    },
    imageUrl: function(val) {
      if(val) {
        this.insertToEditor(val, 'image')
      }
    },
    videoInfo: {
      handler(val){
        if(val.videoUrl) {
          this.insertToEditor(this.$store.state.originalVideoDomain + val.videoUrl, 'video')
        }
      },
      deep: true
    }
  },
  mixins: [uploadImg, uploadVideo],
  data() {
    const _this = this
    return {
      wordlength:'',
      content: '',
      imgUploading: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      videoUploading: false, // 根据视频上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        placeholder: '输入文本',
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  _this.$refs['file-input'].click()
                } else {
                  this.quill.format('image', false)
                }
              },
              cvideo: function(value) {
                if (value) {
                  const uploadedVideoCount = document.querySelectorAll('.ql-editor video').length
                  if(uploadedVideoCount >= 3) {
                    _this.$message.warning("插入视频个数不能超过3个")
                    return
                  }
                  _this.$refs['file-video-input'].click()
                } else {
                  this.quill.format('video', false)
                }
              },
              // link: function(value) {
              //   if (value) {
              //     var href = prompt('请输入url');
              //     this.quill.format("link", href);
              //   } else {
              //     this.quill.format("link", false);
              //   }
              // },
            }
          },
          // 调整图片大小
					imageResize: {
						displayStyles: {
							backgroundColor: 'black',
							border: 'none',
							color: 'white'
						},
						modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
					}
        }
      },
      imageUrl: '',
      videoUrl: ''
    }
  },
  methods: {
    onEditorBlur() {
      this.$emit('checkFormItem')
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(event) {
      event.quill.deleteText(10000, 4);
      if(this.content === ''){
        this.wordlength = 0
      }else{
        this.wordlength = event.quill.getLength()-1
      }
      //内容改变事件
      this.$emit('input', this.content)
    },
    insertToEditor(val, type) {
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      let length = quill.getSelection().index
      // 插入
      quill.insertEmbed(length, type, val)
      // 调整光标到最后
      quill.setSelection(length + 1)
    }
  },
  mounted() {
    this.$refs.myQuillEditor.quill.format('align', 'justify')
    // 获取元素
    var cvideo = document.querySelector('.quill-editor .ql-cvideo')
    // 创建图标元素
    var cvideoIcon = document.createElement('i')
    // 新增class属性
    cvideoIcon.className="el-icon-video-camera"
    // 追加到元素中
    cvideo.appendChild(cvideoIcon)
    // 添加工具栏提示
    document.getElementsByClassName('ql-editor')[0].dataset.placeholder=''
    for(let item of titleConfig){
        let tip = document.querySelector('.quill-editor '+ item.Choice)
        if (!tip) continue
        tip.setAttribute('title',item.title)
    }
    // 当编辑器内容超过可视区域，固定工具栏
    this.$nextTick(function() {
      document.onscroll = function() {
        let qlToolbarEl = document.querySelector(".ql-toolbar");
        let hiddenBoxEl = document.querySelector(".hidden-box");
        let fixedWrapperClassList = qlToolbarEl.classList;
        const rect = hiddenBoxEl.getBoundingClientRect();
        // 超过可视区域添加fiexd样式
        if((rect.top - rect.height - 100) < 0) {
          if(!fixedWrapperClassList.contains("ql-toolbar-fixed")) {
            fixedWrapperClassList.add("ql-toolbar-fixed");
            qlToolbarEl.style.width = hiddenBoxEl.offsetWidth +"px";
          }
        } else {
          if(fixedWrapperClassList.contains("ql-toolbar-fixed")) {
            fixedWrapperClassList.remove("ql-toolbar-fixed");
            qlToolbarEl.style.width = "";
          }
        }
      }
    })
  },
  destroyed() {
    // 组件销毁之后移除onscroll监听方法
    document.onscroll = null;
  }
}
</script>

<style lang="less" scoped>
/deep/ .hidden-box{
  width: 100%;
  height: 5px;
}
/deep/ .ql-toolbar-fixed{
  position: fixed;
  top: 0;
  z-index: 1;
  margin-top: 100px;
  background-color: #fff;
  border-right: 0;
}
/deep/ .ql-container.ql-snow {
  border: 1px solid #ccc;
}
/deep/ .ql-editor {
  min-height: 305px;
  padding: 12px 15px 30px;
}
/deep/ .editor {
  line-height: normal !important;
}
/deep/ .ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
/deep/ .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}
/deep/ .ql-toolbar{
  .ql-cvideo{
    i{
      color: #444;
      font-size: 1.7em;
      font-weight: bold;
    }
  }
}
/deep/ .ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}

.limitNum{
  position:absolute;
  bottom:0px;
  right:20px;
}
</style>
