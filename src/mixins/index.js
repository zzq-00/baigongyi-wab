export default {
  methods: {
    openLink(url) {
      window.open(url)
    },
    openUserCenter(id) {
      window.open('/myHome/myReply?id=' + id)
    },
    openTeacherHome(id) {
      window.open('/teacherHome/' + id)
    },
    // 处理富文本文件
    handleHtml(val) {
      if (!val) return ''
      // 防止只输入空格
      let strReplace = val.replace(/<[^<>]+>/g, '').trim()
      if (!strReplace.length) return ''
      if (val.indexOf('quill.snow.css') > -1) return val
      // quill.snow.css放在阿里云oss上
      let cssLink = "<link href='" + this.$store.state.imageDomain + "stylesheets/quill.snow.css' rel='stylesheet'>"
      return cssLink + "<div class='ql-container ql-snow'><div class='ql-editor'>" + val + '</div></div>'
    }
  }
}
