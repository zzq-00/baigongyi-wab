<template>
  <div class="yivideo-box">
    <ul :class="{ wrap: wrap }">
      <li v-for="(item, index) in dataList" :key="index" @click="detail(item)">
        <div class="cover">
          <img :src="$store.state.imageDomain + item.image" alt="" />
          <div class="info">
            <div class="left">
              <i class="el-icon-video-play"></i>
              <span>{{ item.watchCount | formatNumbers }}</span>
              <i class="el-icon-chat-dot-round"></i>
              <span>{{ item.commentCount | formatNumbers }}</span>
            </div>
            <span>{{ formatDuring(item.duration) }}</span>
          </div>
        </div>
        <div v-if="highLight" class="title" v-html="wordsHighlight(item.title, 13)"></div>
        <div v-else class="title">{{ item.title }}</div>
        <div class="author">
          <img
            :src="
              item.avatar
                ? $store.state.imageDomain + item.avatar
                : require('@/assets/images/user-icon.png')
            "
            alt=""
          />
          <span>{{ item.nickName }}</span>
        </div>
      </li>
      <li class="last-li" v-if="showFillImg && (dataList.length > 0 && dataList.length < 4)">
        <div class="pub-btn" @click="publish"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array,
    wrap: Boolean,
    showFillImg: Boolean,
    highLight: Boolean,
    participle: Array
  },
  data() {
    return { };
  },
  methods: {
    publish() {
      this.$router.push(
        this.$store.state.userInfo.accountId ? "/yivideo/publish" : "/login"
      );
    },
    detail(data) {
      this.$router.push("/yivideo/detail/" + data.id);
    },
    formatDuring(second) {
      //   var h =
      //     Math.floor(second / 3600) < 10
      //       ? "0" + Math.floor(second / 3600)
      //       : Math.floor(second / 3600);
      var m =
        Math.floor((second / 60) % 60) < 10
          ? "0" + Math.floor((second / 60) % 60)
          : Math.floor((second / 60) % 60);
      var s =
        Math.floor(second % 60) < 10
          ? "0" + Math.floor(second % 60)
          : Math.floor(second % 60);
      return m + ":" + s;
    },
    // 关键词高亮
    wordsHighlight(val, subLength) {
      if (val) {
        for (let index = 0; index < this.participle.length; index++) {
          const keyWord = this.participle[index]
          if (subLength && val.indexOf('span') == -1) {
            let typeNumber = subLength
            // 文章或者资讯少于等于80个字不需要截取，首次出现位置大于80需要截取
            //问答或者想法少于等于156个字不需要截取，首次出现位置大于156需要截取
            if (val.length <= typeNumber) {
              val
            } else {
              let findIndexs = val.indexOf(keyWord)
              if (findIndexs != -1 && findIndexs < typeNumber) {
                val = val.slice(0, typeNumber) + '...'
              } else if (findIndexs >= typeNumber) {
                let surplus = val.length - (findIndexs + keyWord.length)
                let supplement = typeNumber - keyWord.length
                // 如果关键词后的字数够平均截取前后
                if (surplus >= supplement / 2) {
                  val = val.slice(findIndexs - supplement / 2, findIndexs + keyWord.length + supplement / 2) + '...'
                } else if (surplus < supplement / 2) {
                  val = val.slice(val.length - typeNumber, val.length) + '...'
                }
              }
            }
          }
          let replaceReg = new RegExp(keyWord, 'i')
          let replaceRegs = new RegExp(val.match(replaceReg), 'g')
          let replaceString
          if (val.match(replaceReg)) {
            replaceString = "<span style='color:red'>" + val.match(replaceReg)[0] + '</span>'
          } else {
            replaceString = "<span style='color:red'>" + '' + '</span>'
          }
          val = val.replace(replaceRegs, replaceString)
        }
        return val
      }
    }
  }
};
</script>
<style lang="less" scoped>
.yivideo-box {
  .wrap {
    flex-wrap: wrap;
  }
  ul {
    width: calc(100% + 18px);
    display: flex;
    li {
      display: inline-block;
      width: 250px;
      background: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 10px;
      margin-right: 18px;
      margin-bottom: 18px;
      cursor: pointer;
      .cover {
        width: 100%;
        height: 138px;
        border-radius: 10px 10px 0px 0px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px 10px 0px 0px;
          object-fit: cover;
        }
        .info {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          color: #fff;
          position: absolute;
          padding: 10px;
          left: 0;
          bottom: 0;
          .left {
            i {
              font-size: 1.2em;
              margin-right: 3px;
              vertical-align: bottom;
            }
            span {
              padding-right: 5px;
            }
          }
        }
      }
      .title {
        padding: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      .author {
        padding: 0 16px 16px 16px;
        img {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          object-fit: cover;
          vertical-align: top;
        }
        span {
          display: inline-block;
          width: 80%;
          padding-left: 8px;
          font-size: 13px;
          line-height: 23px;
          color: #999;
          cursor: default;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .last-li {
      height: 236px;
      background: url("../assets/images/yivideo/yivideo-pub-2.png") center
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      .pub-btn {
        width: 140px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 10px;
        position: absolute;
        bottom: 22px;
        left: 55px;
        z-index: 1;
        cursor: pointer;
      }
    }
  }
}
</style>
