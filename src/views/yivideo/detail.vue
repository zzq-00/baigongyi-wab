<template>
  <div class="container clearfix">
    <div class="left-content fl">
      <div class="clearfix yivideo-top">
        <h1>
          <span class="type-label">{{yivideo.type == 1 ? "原创" : "转载"}}</span>
          {{ yivideo.title }}
        </h1>
        <div class="areas">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(item, index) in yivideo.yivideoAreaDtos"
              :to="toOtherArea(index)"
              :key="index"
              >{{ item.areaName }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <span>{{ yivideo.publishTime | formatDate }}</span>
          <span>
            <i class="el-icon-video-play"></i>
            <span style="padding-left: 5px;">{{
              yivideo.watchCount ? yivideo.watchCount : 0
            }}</span>
          </span>
        </div>
      </div>
      <div class="yivideo-detail">
        <div class="yivideo-play">
          <videoPlayerInner :videoVal="videoVal" @videoPlay="addBroadcast" :playHistoryFlag="true" :objId="yivideo.id" objType="15"></videoPlayerInner>
        </div>
        <div class="operational" id="NewsToolBox">
          <span @click="like(yivideo)" style="width: 53px;">
            <img
              v-if="yivideo.whetherLike"
              src="@/assets/images/yizan.png"
              alt=""
            />
            <img v-else src="@/assets/images/zan.png" alt="" />
            <em>{{ yivideo.likeCount | formatNumbers }}</em>
          </span>
          <span @click="gotoComment" style="width: 53px;">
            <img src="@/assets/images/pinglun.png" alt="" />
            <em>{{ yivideo.commentCount | formatNumbers }}</em>
          </span>
          <span @click="collect(yivideo)" style="width: 62px;">
            <img
              v-if="yivideo.whetherToCollect"
              src="@/assets/images/yishoucang.png"
              alt=""
            />
            <img v-else src="@/assets/images/shoucang.png" alt="" />
            <em>{{ yivideo.whetherToCollect ? "已收藏" : "收藏" }}</em>
          </span>
          <el-popover
            placement="bottom"
            trigger="click"
            @show="wxShare(yivideo.id)"
            width="150"
          >
            <ul class="share-list">
              <li
                @click="copyText(yivideo.id)"
                style="font-size: 12px;border-bottom: 1px solid #DDDDDD;padding: 9px;"
              >
                <img src="@/assets/images/lianjie.png" alt="" />
                <span
                  style="vertical-align: middle;margin-left: 8px;cursor: pointer;"
                  >复制链接</span
                >
              </li>
              <li style="font-size: 12px;line-height: 30px;padding: 0 9px 9px;">
                <img src="@/assets/images/weixin.png" alt="" />
                <span style="vertical-align: middle;margin-left: 8px;"
                  >微信扫一扫</span
                >
                <canvas
                  :ref="'canvas' + yivideo.id"
                  style="max-width: 74px;max-height: 74px;display: block;margin: 0 auto;"
                ></canvas>
              </li>
            </ul>
            <span slot="reference">
              <img src="@/assets/images/share.png" alt="" />
              <em>分享</em>
            </span>
          </el-popover>
        </div>
        <div class="desc-box">
          <div
            ref="description"
            class="description"
            :class="{ 'collapse-yes': collapse }"
          >
            简介：{{ yivideo.description }}
          </div>
          <div v-if="collapse && yivideo.type == 2" class="source-url">转载来源：{{yivideo.sourceUrl}}</div>
          <div
            class="collapse"
            :class="{ 'collapse-yes': collapse }"
            @click="collapse = !collapse"
          >
            <i v-if="!collapse" class="el-icon-arrow-down el-icon--right"></i>
            <i v-else class="el-icon-arrow-up el-icon--right"></i>
          </div>
        </div>
        <div class="tags">
          <ul ref="tags" :class="{ 'collapse-yes': collapseLabels }">
            <template v-if="hasMoreTags">
              <i
                v-if="!collapseLabels"
                class="el-icon-arrow-down el-icon--right"
                @click="collapseLabels = !collapseLabels"
              ></i>
              <i
                v-else
                class="el-icon-arrow-up el-icon--right"
                @click="collapseLabels = !collapseLabels"
              ></i>
            </template>
            <li v-for="(item, index) in yivideo.yivideoLabelDtos" :key="index">
              {{ item.labelName }}
            </li>
          </ul>
        </div>
        <comment-com
          :num="15"
          :canComment="true"
          @getTotal="getTotal"
        ></comment-com>
      </div>
    </div>
    <div class="right-content fr">
      <div class="about-author">
        <div class="font-16">关于作者</div>
        <div>
          <img
            @click="$router.push('/myHome/myReply?id=' + yivideo.accountId)"
            class="header-img cursor-pointer"
            :src="
              yivideo.avatar
                ? $store.state.imageDomain + yivideo.avatar
                : require('@/assets/images/err-header-icon01.png')
            "
            alt=""
            width="60px"
            height="60px"
          />
          <div>
            <p
              @click="$router.push('/myHome/myReply?id=' + yivideo.accountId)"
              class="ellipsis font-bold cursor-pointer"
            >
              {{ yivideo.nickName }}
            </p>
            <p class="gray ellipsis">{{ yivideo.introduction }}</p>
          </div>
          <template v-if="userInfo.accountId !== yivideo.accountId">
            <!-- 1 已关注 2 无关注 3互相关注 -->
            <el-button
              @click="addAttention(yivideo)"
              type="danger"
              v-if="yivideo.wasConcerned === 2"
              >关注</el-button
            >
            <el-button @click="delAttention(yivideo)" type="info" v-else>{{
              yivideo.wasConcerned === 1 ? "已关注" : "互相关注"
            }}</el-button>
          </template>
        </div>
      </div>
      <recommendYivideo :yivideoId="yivideo.id"></recommendYivideo>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
import QRCode from "qrcode";
import recommendYivideo from "@/components/recommendYivideo";
import videoPlayerInner from "@/components/videoPlayerInner";
import commentCom from "@/components/commentCom";
export default {
  components: {
    recommendYivideo,
    videoPlayerInner,
    commentCom
  },
  data() {
    return {
      yivideoId: this.$route.params.id,
      collapse: false,
      collapseLabels: false,
      yivideo: {
        yivideoAreaDtos: [],
        yivideoLabelDtos: []
      },
      userInfo: this.$store.state.userInfo,
      likeOrCollectParams: {
        objId: this.$route.params.id,
        objType: 15
      },
      watchParams: {
        objId: "",
        objType: 6
      },
      videoVal: {},
      hasMoreDescription: false,
      hasMoreTags: false
    };
  },
  watch: {
    yivideo: {
      handler(val) {
        if (val.description) {
          this.$nextTick(function() {
            const height = this.$refs["description"].offsetHeight;
            if (height > 57) {
              this.$refs["description"].style.height = "36px";
              this.$refs["description"].style.overflow = "hidden";
              this.hasMoreDescription = true;
            }
          });
        }
        if (val.yivideoLabelDtos && val.yivideoLabelDtos.length > 0) {
          this.$nextTick(function() {
            const height = this.$refs["tags"].offsetHeight;
            if (height > 39) {
              this.$refs["tags"].style.height = "39px";
              this.$refs["tags"].style.overflow = "hidden";
              this.hasMoreTags = true;
            }
          });
        }
      },
      deep: true
    }
  },
  computed: {
    toOtherAreaRouter() {}
  },
  mounted() {
    this.getDataFn();
  },
  methods: {
    getDataFn() {
      api.yivideoDetail(this.yivideoId).then(res => {
        this.yivideo = res.data;
        this.watchParams.objId = this.yivideo.accountId;
        this.videoVal = {
          playerURL: this.$store.state.videoDomain + this.yivideo.videoUrl,
          poster: this.$store.state.imageDomain + this.yivideo.image
        };
      });
    },
    addBroadcast(){
      api.yivideoBroadcast(this.yivideoId);
    },
    toOtherArea(index) {
      let areas = this.yivideo.yivideoAreaDtos;
      let areaId = undefined;
      let sonId = undefined;
      let grandsonId = undefined;
      let from = areas[0].areaName == "微课堂" ? "microClassroom" : undefined;
      if (index == 0) {
        areaId = areas[0].id;
        sonId = areas[0].id;
      } else if (index == 1) {
        areaId = areas[0].id;
        sonId = areas[1].id;
      } else if (index == 2) {
        areaId = areas[0].id;
        sonId = areas[1].id;
        grandsonId = areas[2].id;
      }
      return {
        path: "/yivideo/otherArea/" + areaId,
        query: {
          sonId: sonId,
          grandsonId: grandsonId,
          from: from
        }
      };
    },
    // 点赞
    like(data) {
      if (data.whetherLike) {
        api
          .likeDelete(
            this.likeOrCollectParams.objType,
            this.likeOrCollectParams.objId
          )
          .then(res => {
            data.whetherLike = false;
            data.likeCount--;
          });
      } else {
        api.likeAdd(this.likeOrCollectParams).then(res => {
          data.whetherLike = true;
          data.likeCount++;
        });
      }
    },
    // 收藏
    collect(data) {
      if (data.whetherToCollect) {
        api.cancelCollect(this.likeOrCollectParams).then(res => {
          data.whetherToCollect = false;
        });
      } else {
        api.addCollect(this.likeOrCollectParams).then(res => {
          data.whetherToCollect = true;
        });
      }
    },
    // 复制链接
    copyText(id) {
      let text = `${window.location.origin}/yivideo/detail/${id}`;
      var textarea = document.createElement("textarea"); //创建input对象
      var currentFocus = document.activeElement; //当前获得焦点的元素
      var toolBoxwrap = document.getElementById("NewsToolBox"); //将文本框插入到NewsToolBox这个之后
      toolBoxwrap.appendChild(textarea); //添加元素
      textarea.value = text;
      textarea.focus();
      if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
      } else {
        textarea.select();
      }
      try {
        var flag = document.execCommand("copy"); //执行复制
      } catch (eo) {
        var flag = false;
      }
      toolBoxwrap.removeChild(textarea); //删除元素
      currentFocus.focus();
      return flag
        ? this.$message.success("链接复制成功")
        : this.$message.warning("链接复制失败");
    },
    // 微信分享
    wxShare(id) {
      var weixinShareLink = process.env.VUE_APP_M_URL + "share/yivideo?id=" + id;
      QRCode.toCanvas(this.$refs["canvas" + id], weixinShareLink, error => {
        if (error) console.error(error);
      });
    },
    // 添加关注
    addAttention(yivideo) {
      api
        .addAttention(this.watchParams)
        .then(res => (yivideo.wasConcerned = res.data));
    },
    delAttention(yivideo) {
      api
        .delAttention(this.watchParams)
        .then(res => (yivideo.wasConcerned = 2));
    },
    gotoComment() {
      document.querySelector(".el-textarea__inner").focus();
    },
    getTotal(val) {
      this.yivideo.commentCount++;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 21px auto 29px;
  min-height: 800px;
  position: relative;
  .left-content {
    width: 780px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 700px;
    padding: 20px 70px 20px 80px;
    box-sizing: border-box;
    .yivideo-top {
      h1 {
        font-size: 22px;
        color: #4a4a4a;
        margin-bottom: 20px;
        .type-label{
          font-size: 12px;
          color: #666;
          background-color: #f2f3f4;
          border-radius: 4px;
          padding: 6px 9px;
          font-weight: 400;
          vertical-align: middle;
        }
      }
      .areas {
        margin-bottom: 20px;
        display: flex;
        /deep/ .el-breadcrumb {
          font-size: 12px;
          color: #999;
          .el-breadcrumb__inner {
            color: #999;
            font-weight: normal;
            cursor: pointer;
            &:hover{
              color: #f33535;
            }
          }
        }
        & > span {
          font-size: 12px;
          color: #999;
          padding-left: 24px;
          vertical-align: top;
        }
      }
    }
    .yivideo-detail {
      .yivideo-play {
        width: 100%;
        height: 360px;
        margin-bottom: 20px;
      }
      .operational {
        overflow: hidden;
        margin-bottom: 20px;
        > span {
          float: left;
          cursor: pointer;
          margin-left: 10px;
          img + em {
            font-style: normal;
            vertical-align: middle;
            margin-left: 3px;
          }
        }
      }
      .desc-box{
        position: relative;
        .description {
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 13px;
          color: #666;
          // height: 36px;
          // overflow: hidden;
          position: relative;
        }
        .source-url{
          font-size: 13px;
          color: #7A859B;
          margin-top: 20px;
        }
        .collapse {
          font-size: 13px;
          color: #999;
          cursor: pointer;
          text-align: right;
          position: absolute;
          top: 20px;
          right: 0;
        }
        .collapse-yes {
          height: auto !important;
          overflow: auto !important;
        }
      }
      .tags {
        margin-top: 20px;
        ul {
          display: flex;
          flex-wrap: wrap;
          position: relative;
          // height: 39px;
          // overflow: hidden;
          i {
            position: absolute;
            top: 0;
            right: 0;
            color: #999;
            cursor: pointer;
          }
          li {
            font-size: 12px;
            border-radius: 13px;
            background-color: #f2f3f4;
            color: #666;
            padding: 5px 13px;
            margin-right: 12px;
            margin-bottom: 12px;
          }
        }
      }
    }
    /deep/ .comment {
      padding: 0;
      .newsHotDetails_comment {
        margin: 0;
      }
    }
  }
  .right-content {
    width: 300px;
    > div + div {
      margin-top: 20px;
    }
    .about-author {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10px;
      padding: 15px 20px;
      > div {
        &:nth-child(2) {
          margin-top: 7px;
          display: flex;
          align-items: center;
          > div {
            flex: 1;
            overflow: hidden;
            > p + p {
              width: 95%;
              margin-top: 10px;
            }
          }
        }
      }
      .header-img {
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .recommend {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10px;
      padding: 15px 20px;
    }
  }
}
</style>
