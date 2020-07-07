<template>
  <div>
    <form ref="video-form" v-show="!hasOne">
      <a href="javascript:;" class="file"
        >选择文件
          <input type="file" id="select" accept="video/*" />
      </a>
    </form>
    <el-progress
      :percentage="percent"
      :format="format"
      v-if="startUpload"
    ></el-progress>
    <div class="file-name-box" v-if="hasOne">
      <span class="file-name"><i></i>{{ fileName }}，已上传成功</span>
      <i @click="deleteVideo" class="el-icon-close delete-icon"></i>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
const $ = require("jquery"); // externals引入
export default {
  props: {
    value: Object,
    // 1表示驿视频的上传，默认为0
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      actionUp: "test",
      fileList: [],
      uploadUrl: "https://up-z1.qiniup.com",
      fileSuffix: [".flv", ".mov", ".mp4"],
      yivideoFileSuffix: [".flv", ".mov", ".mp4", ".mpeg4", ".rmvb", ".mkv", ".avi"],
      uploadData: {
        key: "",
        token: ""
      },
      hasOne: false,
      fileName: "",
      percent: 0,
      startUpload: false
    };
  },
  watch: {
    value: {
      handler: function(val) {
        if (val.originalFileName) {
          this.hasOne = true;
          this.fileName = val.originalFileName;
        }
      },
      deep: true
    },
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "上传完成" : `${percentage}%`;
    },
    get_suffix(filename) {
      let pos = filename.lastIndexOf(".");
      return pos != -1 ? filename.substring(pos).toLowerCase() : "";
    },
    getSystemDate() {
      var systemDate = new Date();
      var year = systemDate.getFullYear(); // 获取当年
      var month = systemDate.getMonth() + 1; // 获取当月 （月+1是因为js中月份是按0开始的）
      var day = systemDate.getDate(); // 获取当日
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      return year + month + day;
    },
    // 随机生成32位数字 字母组合的字符串
    generateUUID() {
      let d = new Date().getTime()
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    },
    deleteVideo() {
      this.$refs['video-form'].reset();
      this.hasOne = false;
      this.$emit("getValue", {
        url: "",
        originalFileName: "",
        duration: 0
      });
    }
  },
  mounted() {
    var qiniu = require("qiniu-js");
    var plupload = require("plupload");

    var config = {
      useCdnDomain: true,
      disableStatisticsReport: false,
      retryCount: 6,
      region: null
    };
    var that = this;
    api.qiniuConfig().then(res => {
      var token = res.data.videoUpToken;
      var uploadUrl = this.uploadUrl;
      qiniu.getUploadUrl(config, token).then(function(res) {
        console.log("res:" + res);
        var board = {};
        var indexCount = 0;
        var resume = false;
        var chunk_size;
        var blockSize;
        var putExtra = {
          fname: "",
          params: {},
          mimeType: null
        };
        var key;
        var uploader = new plupload.Uploader({
          runtimes: "html5,flash,silverlight,html4",
          url: uploadUrl,
          browse_button: "select", // 触发文件选择对话框的按钮，为那个元素id
          flash_swf_url: "./js/Moxie.swf", // swf文件，当需要使用swf方式进行上传时需要配置该参数
          silverlight_xap_url: "./js/Moxie.xap",
          chunk_size: 4 * 1024 * 1024,
          max_retries: 3,
          filters: {
            mime_types: [
              //只允许上传图片和zip文件
              { title: "Image files", extensions: "mp4,flv,mov" }
            ]
          },
          multipart_params: {
            // token从服务端获取，没有token无法上传
            token: token
          },
          init: {
            PostInit: function() {
              console.log("upload init");
            },
            FilesAdded: function(up, files) {
              files.forEach(file => {
                let ok = true;
                let fileType = that.get_suffix(file.name);
                if(that.$props.type == 1){
                  if (!that.yivideoFileSuffix.includes(fileType)) {
                    that.$message.warning("上传文件只能是 mp4，flv，mov，mpeg4，rmvb，mkv，avi 格式!");
                    ok = false;
                  }
                  // 最大500M
                  if (file.size > 500 * 1024 * 1024) {
                    that.$message.error("上传文件大小不能超过 500M!");
                    ok = false;
                  }
                } else {
                  if (!that.fileSuffix.includes(fileType)) {
                    that.$message.warning("上传文件只能是 mp4，flv，mov 格式!");
                    ok = false;
                  }
                  // 最大2GB
                  if (file.size > 2147483648) {
                    that.$message.error("上传文件大小不能超过 2GB!");
                    ok = false;
                  }
                }
                if(ok) {
                  resume = false;
                  chunk_size = up.getOption("chunk_size");
                  up.start();
                  that.startUpload = true;
                } else {
                  up.removeFile(file);
                }
              })
            },
            FileUploaded: function(up, file, info) {
              console.log(info);
            },
            UploadComplete: function(up, files) {
              // Called when all files are either uploaded or failed
              console.log("[完成]");
            },
            Error: function(up, err) {
              console.log(err);
              if(err.code == -601) {
                if(that.type == 1) {
                  that.$message.warning("上传文件只能是 mp4，flv，mov，mpeg4，rmvb，mkv，avi 格式!")
                } else {
                  that.$message.warning("上传文件只能是 mp4，flv，mov 格式!")
                }
              }
            }
          }
        });
        uploader.init();
        uploader.bind("Error", function() {
          console.log(1234);
        });
        uploader.bind("BeforeUpload", function(uploader, file) {
          key = `video/${that.getSystemDate()}/${that.generateUUID()}${that.get_suffix(file.name)}`;
          putExtra.params["x:name"] = key.split(".")[0];
          var id = file.id;
          chunk_size = uploader.getOption("chunk_size");
          var directUpload = function() {
            var multipart_params_obj = {};
            multipart_params_obj.token = token;
            // filterParams 返回符合自定义变量格式的数组，每个值为也为一个数组，包含变量名及变量值
            var customVarList = qiniu.filterParams(putExtra.params);
            for (var i = 0; i < customVarList.length; i++) {
              var k = customVarList[i];
              multipart_params_obj[k[0]] = k[1];
            }
            multipart_params_obj.key = key;
            uploader.setOption({
              url: uploadUrl,
              multipart: true,
              multipart_params: multipart_params_obj
            });
          };

          var resumeUpload = function() {
            blockSize = chunk_size;
            initFileInfo(file);
            if (blockSize === 0) {
              mkFileRequest(file);
              uploader.stop();
              return;
            }
            resume = true;
            var multipart_params_obj = {};
            // 计算已上传的chunk数量
            var index = Math.floor(file.loaded / chunk_size);

            var headers = qiniu.getHeadersForChunkUpload(token);
            uploader.setOption({
              url: uploadUrl + "/mkblk/" + blockSize,
              multipart: false,
              required_features: "chunks",
              headers: {
                Authorization: "UpToken " + token
              },
              multipart_params: multipart_params_obj
            });
          };
          // 判断是否采取分片上传
          if (
            (uploader.runtime === "html5" || uploader.runtime === "flash") &&
            chunk_size
          ) {
            if (file.size < chunk_size) {
              directUpload();
            } else {
              resumeUpload();
            }
          } else {
            console.log(
              "directUpload because file.size < chunk_size || is_android_weixin_or_qq()"
            );
            directUpload();
          }
        });
        uploader.bind("ChunkUploaded", function(up, file, info) {
          var res = JSON.parse(info.response);
          var leftSize = info.total - info.offset;
          var chunk_size =
            uploader.getOption && uploader.getOption("chunk_size");
          if (leftSize < chunk_size) {
            up.setOption({
              url: uploadUrl + "/mkblk/" + leftSize
            });
          }
          up.setOption({
            headers: {
              Authorization: "UpToken " + token
            }
          });
          // 更新本地存储状态
          var localFileInfo = JSON.parse(localStorage.getItem(file.name)) || [];
          localFileInfo[indexCount] = {
            ctx: res.ctx,
            time: new Date().getTime(),
            offset: info.offset,
            percent: file.percent
          };
          indexCount++;
          localStorage.setItem(file.name, JSON.stringify(localFileInfo));
        });

        // 每个事件监听函数都会传入一些很有用的参数，
        // 我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        uploader.bind("UploadProgress", function(uploader, file) {
          var id = file.id;
          // 更新进度条进度信息;
          var fileUploaded = file.loaded || 0;
          that.percent = file.percent;
          var count = Math.ceil(file.size / uploader.getOption("chunk_size"));
          if (file.size > chunk_size) {
            updateChunkProgress(file, board[id], chunk_size, count);
          }
        });

        uploader.bind("FileUploaded", function(uploader, file, info) {
          if (resume) {
            mkFileRequest(file);
          } else {
            uploadFinish(JSON.parse(info.response), file);
          }
        });

        function updateChunkProgress(file, board, chunk_size, count) {
          var index = Math.ceil(file.loaded / chunk_size);
          var leftSize = file.loaded - chunk_size * (index - 1);
          if (index == count) {
            chunk_size = file.size - chunk_size * (index - 1);
          }
        }

        function uploadFinish(res, file) {
          localStorage.removeItem(file.name);
          that.$refs['video-form'].reset();
          that.percent = 0;
          that.startUpload = false;
          that.hasOne = true;
          that.fileName = file.name;

          let fileurl = URL.createObjectURL(file.getNative());
          let audioElement = new Audio(fileurl);
          audioElement.addEventListener("loadedmetadata", _event => {
            that.$emit("getValue", {
              url: res.key,
              originalFileName: file.name,
              duration: audioElement.duration
            });
          });
        }

        function initFileInfo(file) {
          var localFileInfo = JSON.parse(localStorage.getItem(file.name)) || [];
          indexCount = 0;
          var length = localFileInfo.length;
          if (length) {
            var clearStatus = false;
            for (var i = 0; i < localFileInfo.length; i++) {
              indexCount++;
              if (isExpired(localFileInfo[i].time)) {
                clearStatus = true;
                localStorage.removeItem(file.name);
                break;
              }
            }
            if (clearStatus) {
              indexCount = 0;
              return;
            }
            file.loaded = localFileInfo[length - 1].offset;
            var leftSize = file.size - file.loaded;
            if (leftSize < chunk_size) {
              blockSize = leftSize;
            }
            file.percent = localFileInfo[length - 1].percent;
            return;
          } else {
            indexCount = 0;
          }
        }

        function mkFileRequest(file) {
          // 调用sdk的url构建函数
          var requestUrl = qiniu.createMkFileUrl(
            uploadUrl,
            file,
            key,
            putExtra
          );
          var ctx = [];
          var id = file.id;
          var local = JSON.parse(localStorage.getItem(file.name));
          for (var i = 0; i < local.length; i++) {
            ctx.push(local[i].ctx);
          }
          // 设置上传的header信息
          var headers = qiniu.getHeadersForMkFile(token);
          $.ajax({
            url: requestUrl,
            type: "POST",
            headers: headers,
            data: ctx.join(","),
            success: function(res) {
              uploadFinish(res, file);
            }
          });
        }

        function isExpired(time) {
          let expireAt = time + 3600 * 24 * 1000;
          return new Date().getTime() > expireAt;
        }
      });
    });
  }
};
</script>
<style lang="less" scoped>
.file {
  position: relative;
  display: inline-block;
  background: #e23732;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #ffffff;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  cursor: pointer;
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file-name-box{
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 10px;
  .file-name{
    color: #333;
    i{
      display: inline-block;
      width: 20px;
      height: 15px;
      background: url("../assets/images/yivideo/yivideo-pub-icon.png") center no-repeat;
      background-size: 100%;
      vertical-align: text-bottom;
      margin-right: 5px;
    }
  }
  .delete-icon{
    line-height: 32px;
    color: #999;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
