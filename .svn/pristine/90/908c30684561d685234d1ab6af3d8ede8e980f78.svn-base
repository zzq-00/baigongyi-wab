<template>
  <div class="container">
    <h4>
      {{ yivideoId ? "编辑视频" : "发布视频" }}
    </h4>
    <template v-if="step == 1">
      <div class="choose-video-box">
        <div class="img"></div>
        <div class="tips">
          <span class="t1"><span class="require">*</span>选择视频文件</span>
          <br>
          <span class="t2">建议上传MP4格式视频，支持mp4/flv/mpeg4/rmvb/mkv/avi视频格式，上传视频大小不得超过500M</span>
        </div>
        <div class="up-btn">
          <label for="video-select">选择视频文件</label>
          <form ref="video-form">
            <input type="file" id="video-select" accept="video/*" hidden />
          </form>
        </div>
        <el-progress
          :percentage="percent"
          :format="format"
          v-if="startUpload"
        ></el-progress>
      </div>
    </template>
    <template v-if="step == 2">
      <div class="clearfix content-area">
        <!-- 表单 -->
        <div class="form-content">
          <el-form
            label-position="top"
            :model="videoForm"
            :rules="rules"
            ref="videoForm"
            label-width="100px"
          >
            <el-form-item label="选择视频文件" prop="videoUrl">
              <div class="up-video-tips">
                建议上传视频大小不超过500M，建议上传MP4格式视频，支持mp4/flv/mpeg4/rmvb/mkv/avi等视频格式
              </div>
              <span v-if="status == 1002">{{ videoForm.originalFileName }}</span>
              <uploadVideo
                v-else
                @getValue="getVideoValue"
                :value="videoForm"
                :type="1"
              ></uploadVideo>
            </el-form-item>
            <el-form-item>
              <div class="up-cover-box">
                <div class="custom-cover">
                  <Cropper
                    type="hasButton"
                    v-model="videoForm.image"
                    @cropperedImg="getCropperedImg"
                    :description="uploadDesc"
                    :fixedNumber="[900, 506]"
                    :cropperImg="cropperImg"
                  />
                </div>
                <div class="video-cover">
                  <span class="tips">系统已为您随机截取视频作为封面备选，点击即可设置为封面</span>
                  <ul>
                    <li v-for="(item, index) in videoCoverList" :key="index" @click="chooseVideoCover(item, index)" :class="{'li-checked' : index == checkedVideoCoverIndex}">
                      <img :src="item" alt="">
                      <div class="checked-icon" :class="{'active' : index == checkedVideoCoverIndex}"><i class="el-icon-check"></i></div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input
                v-model.trim="videoForm.title"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item prop="type" label="类型">
              <el-radio v-model="videoForm.type" label="1">原创</el-radio>
              <el-radio v-model="videoForm.type" label="2">转载</el-radio>
            </el-form-item>
            <el-form-item prop="sourceUrl">
              <el-input
                placeholder="请输入转载来源网址"
                v-if="videoForm.type == 2"
                type="text"
                v-model.trim="videoForm.sourceUrl"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="分区" prop="areaId">
              <el-col :span="8">
                <el-select v-model="firstAreaId" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in firstAreas"
                    :key="index"
                    :label="item.areaName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                v-model="secondAreaId"
                placeholder="请选择"
                v-if="secondAreas.length > 0"
              >
                <el-option
                  v-for="(item, index) in secondAreas"
                  :key="index"
                  :label="item.areaName"
                  :value="item.id"
                >
                </el-option>
               </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                v-model="thirdAreaId"
                placeholder="请选择"
                v-if="thirdAreas.length > 0"
              >
                <el-option
                  v-for="(item, index) in thirdAreas"
                  :key="index"
                  :label="item.areaName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
            <el-form-item prop="labels">
              标签
              <span style="font-size: 12px;color: #999999;"
                >标签不分先后，最多可添加5个标签</span
              >
              <addYiVideoTag v-model="confirmTags" :areaId="videoForm.areaId" />
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input
                type="textarea"
                v-model.trim="videoForm.description"
                :autosize="{ minRows: 5 }"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="protocol">
            <el-checkbox v-model="agreeProtocol"></el-checkbox>
            我已阅读并接受<span @click="seeCreationProtocol"
              >《百工驿创作协议》</span
            >和<span @click="seeViolationHandlerProtocol">《违规处理办法》</span>
          </div>
        </div>
      </div>
      <div class="footer-release">
        <el-button v-if="status != 1002" @click="draft">存草稿</el-button>
        <el-button type="danger" @click="release">发布</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import api from "@/fetch";
import axios from "axios";
import Cropper from "@/components/Cropper.vue";
import addYiVideoTag from "@/components/addYiVideoTag.vue";
import uploadVideo from "@/utils/uploadVideo";
import uploadVideo_mixins from '@/mixins/uploadVideo.js'
export default {
  components: {
    Cropper,
    uploadVideo,
    addYiVideoTag
  },
  mixins: [uploadVideo_mixins],
  data() {
    return {
      step: 0,
      checkedVideoCoverIndex: undefined,
      videoCoverList: [],
      yivideoId: this.$route.params.id,
      videoForm: {
        id: undefined,
        image: undefined,
        videoUrl: undefined,
        originalFileName: undefined,
        duration: undefined,
        title: undefined,
        areaId: undefined,
        type: "1",
        sourceUrl: undefined,
        price: 0,
        labels: undefined,
        description: undefined
      },
      status: 0,
      tags: [],
      confirmTags: [],
      firstAreas: [],
      secondAreas: [],
      thirdAreas: [],
      firstAreaId: undefined,
      secondAreaId: undefined,
      thirdAreaId: undefined,
      agreeProtocol: false,
      cropperImg: "",
      uploadDesc: {
        title: "上传视频封面",
        desc: "可上传jpg/jpeg/png/bmp格式图片，建议分辨率为900x506，最大4M",
        maxsize: 4,
        width: "208px",
        height: "158px"
      },
      rules: {
        videoUrl: [
          { required: true, message: "选择视频文件", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        areaId: [
          { required: true, message: "请选择完整分区", trigger: "change" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        labels: [{ required: true, message: "请添加标签", trigger: "change" }],
        description: [
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // 解决rules校验labels不生效，手动进行校验
    "videoForm.labels": function(val) {
      this.$refs["videoForm"].validateField("labels");
    },
    videoInfo: {
      handler(val){
        this.step = 2;
        this.videoForm.videoUrl = val.videoUrl;
        this.videoForm.duration = val.duration;
        // 延迟赋值originalFileName，否则上传视频组件还未加载完，监听不到originalFileName变化
        setTimeout(() => {
          this.videoForm.originalFileName = val.originalFileName;
        })
      },
      deep: true
    },
    // 监听视频变化，重新获取随机封面
    "videoForm.videoUrl" : function(val) {
      // 清空数组
      this.videoCoverList = [];
      if(val) {
        // 随机截取四张视频封面
        for(let i = 0; i < 4; i++) {
          const videoBaseUrl = val.includes("video/") ? this.$store.state.originalVideoDomain : this.$store.state.videoDomain;
          this.videoCoverList.push(videoBaseUrl + this.videoForm.videoUrl + "?vframe/jpg/offset/"+ Math.floor(Math.random() * this.videoForm.duration));
        }
      }
    },
    confirmTags: function(val) {
      if (val.length > 0) {
        this.videoForm.labels = val.join(",");
      } else {
        this.videoForm.labels = undefined;
      }
    },
    firstAreaId: function(val) {
      if (!val) return;
      // 更换分区，重置相关内容
      this.confirmTags = [];
      this.secondAreas = [];
      this.thirdAreas = [];
      this.secondAreaId = undefined;
      this.thirdAreaId = undefined;
      this.videoForm.areaId = undefined;
      // 判断是否还有子分区
      this.secondAreas = this.firstAreas.find(item => item.id == val).children;
      // 赋值
      if (this.secondAreas.length == 0) {
        this.videoForm.areaId = val;
      }
    },
    secondAreaId: function(val) {
      if (!val) return;
      // 更换分区，重置相关内容
      this.confirmTags = [];
      this.thirdAreas = [];
      this.thirdAreaId = undefined;
      this.videoForm.areaId = undefined;
      // 判断是否还有子分区
      this.thirdAreas = this.secondAreas.find(item => item.id == val).children;
      // 赋值
      if (this.thirdAreas.length == 0) {
        this.videoForm.areaId = val;
      }
    },
    thirdAreaId: function(val) {
      if (!val) return;
      // 更换分区，重置相关内容
      this.confirmTags = [];
      // 赋值
      this.videoForm.areaId = val;
    }
  },
  mounted() {
    this.getVideoAreas().then(() => {
      if (this.yivideoId) {
        this.step = 2;
        this.getYivideoDtail();
      } else {
        this.step = 1;
      }
    });
  },
  methods: {
    // 上传图片子组件值回传
    getCropperedImg(data) {
      this.videoForm.image = data;
    },
    // 上传视频子组件值回传
    getVideoValue(data) {
      this.videoForm.videoUrl = data.url;
      this.videoForm.originalFileName = data.originalFileName;
      this.videoForm.duration = data.duration;
    },
    // 选择随机视频封面
    chooseVideoCover(data, index) {
      this.checkedVideoCoverIndex = index;
      this.getBase64(data, (res) => {
        this.cropperImg = res;
      });
    },
    // 获取驿视频详情
    getYivideoDtail() {
      api.yivideoDetail(this.yivideoId).then(res => {
        const data = res.data;
        // 审核中的不可编辑，显示审核中页面
        this.status = data.status;
        if (this.status == 1000) {
          return;
        }
        this.videoForm.id = data.id;
        this.videoForm.originalFileName = data.originalFileName;
        this.videoForm.image = data.image;
        this.videoForm.videoUrl = data.videoUrl;
        this.videoForm.duration = data.duration;
        this.videoForm.title = data.title;
        this.videoForm.areaId = data.areaId;
        this.videoForm.type = data.type + "";
        this.videoForm.sourceUrl = data.sourceUrl;
        this.videoForm.price = data.price;
        this.videoForm.description = data.description;

        if(data.yivideoAreaDtos) {
          const firstArea = data.yivideoAreaDtos[0];
          const secondArea = data.yivideoAreaDtos[1];
          const thirdArea = data.yivideoAreaDtos[2];
          if (firstArea) {
            this.firstAreaId = firstArea.id;
          }
          // 利用js的单线程执行特性与setTimeout的回调方式实现同步
          setTimeout(() => {
            if (secondArea) {
              this.secondAreaId = secondArea.id;
            }
          });
          setTimeout(() => {
            if (thirdArea) {
              this.thirdAreaId = thirdArea.id;
            }
          });
        }

        setTimeout(() => {
          data.yivideoLabelDtos.forEach(item => {
            this.confirmTags.push(item.labelName);
          });
        });
      });
    },
    // 获取一级分区
    getVideoAreas() {
      return api.yivideoAreas().then(res => {
        this.firstAreas = res.data;
      });
    },
    // 发布
    release() {
      if (!this.videoForm.image) return this.$message.warning("请上传视频封面");
      if (this.videoForm.type == 2 && !this.videoForm.sourceUrl)
        return this.$message.warning("请填写转载来源网址");
      if (!this.agreeProtocol)
        return this.$message.warning("请仔细阅读并勾选接受按钮");
      // 如果选择的是原创，将soureUrl置空
      if (this.videoForm.type == 1) {
        this.videoForm.sourceUrl = undefined;
      }
      this.$refs["videoForm"].validate(valid => {
        if (valid) {
          api.releaseYiVideo(this.videoForm).then(res => {
            this.$message.success("发布成功");
            this.$router.replace("/yivideo/approving");
          });
        }
      });
    },
    // 存草稿
    draft() {
      if (!this.videoForm.videoUrl)
        return this.$message.warning("请上传视频后再进行保存草稿");
      if (!this.agreeProtocol)
        return this.$message.warning("请仔细阅读并勾选接受按钮");
      api.draftYiVideo(this.videoForm).then(res => {
        this.$message.success("保存成功");
        this.videoForm.id = res.data;
      });
    },
    // 查看创作协议
    seeCreationProtocol() {
      let routeUrl = this.$router.resolve({
        path: "/yivideo/creationProtocol"
      });
      window.open(routeUrl.href, "_blank");
    },
    // 查看违规处理办法
    seeViolationHandlerProtocol() {
      let routeUrl = this.$router.resolve({
        path: "/yivideo/violationHandlerProtocol"
      });
      window.open(routeUrl.href, "_blank");
    },
    // 网络图片转为base64
    getBase64(imgUrl, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", imgUrl, true);
      // 至关重要
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          //得到一个blob对象
          var blob = this.response;
          console.log("blob", blob)
          // 至关重要
          let oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            // 此处拿到的已经是 base64的图片了
            callback(e.target.result);
          };
          oFileReader.readAsDataURL(blob);
        }
      }
      xhr.send();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  border-radius: 10px;
  margin: 21px auto 29px;
  min-height: 860px;
  background-color: #fff;
  position: relative;
  .cursor-pointer {
    cursor: pointer;
  }
  > h4 {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    padding-left: 20px;
    font-weight: normal;
  }
  .choose-video-box{
    .img{
      width: 240px;
      height: 120px;
      margin: 120px auto 0 auto;
      background: url("../../assets/images/yivideo/choose-video-icon.png") center no-repeat;
      background-size: 100%;
    }
    .tips{
      margin-bottom: 20px;
      text-align: center;
      .t1{
          font-size: 14px;
          color: #4a4a4a;
          line-height: 24px;
          .require{
            color: #f33535;
          }
        }
      .t2{
        font-size: 12px;
        color: #999;
        line-height: 24px;
      }
    }
    .up-btn{
      text-align: center;
      label{
        display: inline-block;
        width: 118px;
        height: 34px;
        line-height: 34px;
        background-color: #f33535;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .el-progress{
      width: 600px;
      margin: 20px auto;
    }
  }
  .content-area {
    .form-content {
      width: 704px;
      min-height: 750px;
      padding: 10px 20px;
      box-sizing: border-box;
      margin: 0 auto;
      /deep/ .el-form {
        .el-form-item__content {
          .up-video-tips {
            font-size: 12px;
            color: #ccc;
            margin-top: -15px;
          }
          .add-tag {
            color: #e23732;
            > span {
              cursor: pointer;
              > i {
                margin-right: 5px;
              }
            }
          }
          .el-select {
            margin-right: 20px;
          }
          .up-cover-box{
            display: flex;
            .custom-cover{
              margin-right: 14px;
            }
            .video-cover{
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              .tips{
                color: #999;
                font-size: 12px;
                padding-bottom: 20px;
              }
              ul{
                width: calc(100% + 12px);
                min-width: 384px;
                min-height: 232px;
                display: flex;
                flex-wrap: wrap;
                li{
                  width: 176px;
                  height: 100px;
                  border-radius: 6px;
                  margin-right: 12px;
                  margin-top: 12px;
                  cursor: pointer;
                  position: relative;
                  overflow: hidden;
                  border: 2px solid #fff;
                  img{
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    object-fit: fill;
                  }
                  .checked-icon{
                    position: absolute;
                    left: -15px;
                    top: -5px;
                    z-index: 1;
                    width: 46px;
                    height: 26px;
                    background: #ccc;
                    text-align: center;
                    transform: rotate(-45deg);
                    i{
                      color: #fff;
                      font-weight: bold;
                      transform: rotate(45deg);
                    }
                  }
                  .active{
                    background: #f33535;
                  }
                }
                .li-checked{
                  border: 2px solid #f33535;
                }
              }
            }
          }
        }
      }
      .protocol {
        span {
          cursor: pointer;
          color: #f33535;
        }
      }
    }
  }
  .footer-release {
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #dddddd;
    .el-button {
      width: 90px;
    }
  }
}
.tag-operate {
  position: relative;
  .el-tag {
    margin-right: 10px;
  }
  .add-tag {
    color: #e23732;
    > span {
      cursor: pointer;
      > i {
        margin-right: 5px;
      }
    }
  }
}
.label-dialog {
  /deep/.el-dialog__header {
    border: 1px solid #dddddd;
    .el-dialog__title {
      font-size: 16px;
      color: #4a4a4a;
    }
  }
  /deep/.el-dialog__body {
    padding: 0;
  }
  /deep/.el-dialog__footer {
    padding: 9px 0 7px 0;
    text-align: center !important;
    border: 1px solid #ddd;
    .dialog-footer {
      .el-button {
        width: 89px;
      }
    }
  }
  .dialog-content {
    padding: 10px 20px;
    .dialog-title {
      margin-bottom: 12px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      span:nth-child(1) {
        width: 4px;
        height: 14px;
        background: #f33535;
        margin-right: 6px;
      }
      span:nth-child(2) {
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        margin-right: 10px;
      }
      span:nth-child(3) {
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .label-list {
      min-height: 1px;
      margin-bottom: 10px;
    }
    .all-label {
      .label-box {
        height: 449px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        overflow: hidden;
        .right-second {
          float: left;
          display: flex;
          padding: 12px;
          width: 596px;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: flex-start;
          li {
            width: 120px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            background: #f3f3f5;
            border-radius: 2px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-right: 10px;
            cursor: pointer;
            margin-top: 10px;
          }
          li:nth-child(1),
          li:nth-child(2),
          li:nth-child(3),
          li:nth-child(4) {
            margin-top: 0;
          }
          .checked-style {
            color: #f33535;
            background-color: #fbf0f1;
          }
        }
      }
    }
  }
}
/deep/ .el-tag {
  height: 30px;
  line-height: 30px;
  border: none;
  border-radius: 2px;
  background: #f3f3f3;
  color: #333333;
  margin-right: 10px;
  margin-bottom: 10px;
  .el-tag__close {
    color: #e23732;
  }
  .el-tag__close:hover {
    background-color: #e23732;
    color: #fff;
  }
}
</style>
