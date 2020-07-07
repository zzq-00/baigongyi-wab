<template>
  <div id="search" class="main">
    <div class="nav-bar">
      <ul>
        <li :class="{'active' : navSelection.complex}" @click="chooseNav('complex')">
          综合
          <i :class="{'line' : navSelection.complex}"></i>
        </li>
        <li :class="{'active' : navSelection.column}" @click="chooseNav('column')">
          专栏
          <i :class="{'line' : navSelection.column}"></i>
        </li>
        <li :class="{'active' : navSelection.course}" @click="chooseNav('course')">
          课程
          <i :class="{'line' : navSelection.course}"></i>
        </li>
        <li :class="{'active' : navSelection.news}" @click="chooseNav('news')">
          资讯
          <i :class="{'line' : navSelection.news}"></i>
        </li>
        <li :class="{'active' : navSelection.article}" @click="chooseNav('article')">
          文章
          <i :class="{'line' : navSelection.article}"></i>
        </li>
        <li :class="{'active' : navSelection.question}" @click="chooseNav('question')">
          问答
          <i :class="{'line' : navSelection.question}"></i>
        </li>
        <li :class="{'active' : navSelection.idea}" @click="chooseNav('idea')">
          想法
          <i :class="{'line' : navSelection.idea}"></i>
        </li>
      </ul>
    </div>
    <div class="sea-result">
      <ul v-if="navSelection.complex" ref="complex">
        <template v-if="resultList.complex.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <template v-else v-for="(item, index) in resultList.complex.list">
          <li v-if="item.type == 2" :key="index" @click="detail(item.data.id, item.type)">
            <span class="type-label">专栏</span>
            <div class="column-box">
              <div class="cover-box">
                <img :src="$store.state.imageDomain + item.data.image" alt />
                <div class="shadow1"></div>
                <div class="shadow2"></div>
              </div>
              <div class="info-box">
                <div class="title" v-html="subKeywords(item.data.name, participle, 20)"></div>
                <div class="label">
                  <span>{{item.data.upToTime}}</span>
                </div>
                <div class="price">
                  <span v-if="item.data.price > 0">{{iosOpen ? item.data.price +"金" : "¥"+ item.data.price}}</span>
                  <span v-else class="free">免费</span>
                </div>
              </div>
            </div>
          </li>
          <li v-else-if="item.type == 1" :key="index" @click="detail(item.data.id, item.type)">
            <span class="type-label">课程</span>
            <div class="course-box">
              <img :src="$store.state.imageDomain + item.data.image" alt />
              <div class="info-box">
                <div class="title" v-html="subKeywords(item.data.name, participle, 32)"></div>
                <div class="label">
                  <span v-if="item.data.type == 2">视频</span>
                  <span v-if="item.data.type == 1">音频</span>
                </div>
                <div class="price">
                  <span v-if="item.data.price > 0">{{iosOpen ? item.data.price +"金" : "¥"+ item.data.price}}</span>
                  <span v-else class="free">免费</span>
                </div>
              </div>
            </div>
          </li>
          <li v-else-if="item.type == 7" :key="index" @click="detail(item.data.id, item.type)">
            <span class="type-label">资讯</span>
            <div class="news-box">
              <div class="info-box">
                <div class="title" v-html="subKeywords(item.data.title, participle,34)"></div>
                <div class="other-info">
                  <div>
                    <span
                      class="name"
                    >{{item.data.sourceName.length > 7 ? item.data.sourceName.substr(0,7) + "..." : item.data.sourceName}}</span>&nbsp;&nbsp;
                    <span>{{item.data.publishTime | formatDate('noTime')}}</span>
                  </div>
                  <span>
                    <i class="count"></i>
                    &nbsp;{{item.data.watchCount}}
                  </span>
                </div>
              </div>
              <img :src="$store.state.imageDomain + item.data.image" alt />
            </div>
          </li>
          <li v-else-if="item.type == 3" :key="index" @click="detail(item.data.id, item.type)">
            <span class="type-label">文章</span>
            <div class="article-box">
              <div class="author-box">
                <img
                  :src="item.data.avatar ? $store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                  alt
                />
                <div class="name-time">
                  <span class="name">{{item.data.nickName}}</span>
                  <span class="time">{{item.data.publishTime | formatDate('noTime')}}</span>
                </div>
              </div>
              <div class="title" v-html="subKeywords(item.data.title, participle, 22)"></div>
              <div class="other-info">
                <div class="desc">{{item.data.description}}</div>
                <img :src="$store.state.imageDomain + item.data.image" alt />
              </div>
            </div>
          </li>
          <li v-else-if="item.type == 4" :key="index" @click="detail(item.data.id, item.type)">
            <span class="type-label">问答</span>
            <div class="question-box">
              <div class="title" v-html="subKeywords(item.data.title, participle, 22)"></div>
              <template v-if="item.data.answerContent">
                <div class="author-box">
                  <img
                    :src="item.data.avatar ? $store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                    alt
                  />
                  <div class="name-time">
                    <span class="name">{{item.data.nickName}}</span>
                    <span class="time">{{item.data.createTime}}</span>
                  </div>
                </div>
                <div class="best-anser" v-html="subKeywords(item.data.answerContent, participle, 78)"></div>
                <div
                  class="count"
                >{{item.data.likeCount ? item.data.likeCount : 0}}个赞 · {{item.data.commenntCount ? item.data.commenntCount : 0}}条评论</div>
              </template>
              <div class="best-anser" v-else>暂无回答...</div>
            </div>
          </li>
          <li v-else-if="item.type == 10" :key="index" @click="detail(item.data.id, item.type)">
            <span class="type-label">想法</span>
            <div class="idea-box">
              <div class="author-box">
                <img
                  :src="item.data.avatar ? $store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                  alt
                />
                <div class="name-time">
                  <span class="name">{{item.data.nickName}}</span>
                  <span class="time">{{item.data.createTime | formatDate('noTime')}}</span>
                </div>
              </div>
              <div class="con-box">
                <div class="idea-con" v-html="subKeywords(item.data.content, participle, 156)"></div>
              </div>
              <div class="idea-images" v-if="item.data.ideaImgs.length > 0">
                <template v-for="(img, index) in item.data.ideaImgs">
                  <img class="img3" :src="$store.state.imageDomain + img.url" alt :key="index" />
                </template>
              </div>
            </div>
          </li>
        </template>
        <div v-if="resultList.complex.list.length != 0 && resultList.complex.list.length == resultList.complex.total" class="no-more">- 没有更多啦 -</div>
      </ul>
      <!-- 分类 -->
      <ul v-if="navSelection.column" ref="column">
        <template v-if="resultList.column.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <li v-else v-for="(item, index) in resultList.column.list" :key="index" @click="detail(item.data.id, item.type)">
          <div class="column-box">
            <div class="cover-box">
              <img :src="$store.state.imageDomain + item.data.image" alt />
              <div class="shadow1"></div>
              <div class="shadow2"></div>
            </div>
            <div class="info-box">
              <div class="title" v-html="subKeywords(item.data.name, participle, 20)"></div>
              <div class="label">
                <span>{{item.data.upToTime}}</span>
              </div>
              <div class="price">
                <span v-if="item.data.price > 0">{{iosOpen ? item.data.price +"金" : "¥"+ item.data.price}}</span>
                <span v-else class="free">免费</span>
              </div>
            </div>
          </div>
        </li>
        <div v-if="resultList.column.list.length != 0 && resultList.column.list.length == resultList.column.total" class="no-more">- 没有更多啦 -</div>
      </ul>
      <ul v-if="navSelection.course" ref="course">
        <template v-if="resultList.course.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <li v-else v-for="(item, index) in resultList.course.list" :key="index" @click="detail(item.data.id, item.type)">
          <div class="course-box">
            <img :src="$store.state.imageDomain + item.data.image" alt />
            <div class="info-box">
              <div class="title" v-html="subKeywords(item.data.name, participle, 32)"></div>
              <div class="label">
                <span v-if="item.data.type == 2">视频</span>
                <span v-if="item.data.type == 1">音频</span>
              </div>
              <div class="price">
                <span v-if="item.data.price > 0">{{iosOpen ? item.data.price +"金" : "¥"+ item.data.price}}</span>
                <span v-else class="free">免费</span>
              </div>
            </div>
          </div>
        </li>
        <div v-if="resultList.course.list.length != 0 && resultList.course.list.length == resultList.course.total" class="no-more">- 没有更多啦 -</div>
      </ul>
      <ul v-if="navSelection.news" ref="news">
        <template v-if="resultList.news.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <li v-else v-for="(item, index) in resultList.news.list" :key="index" @click="detail(item.data.id, item.type)">
          <div class="news-box">
            <div class="info-box">
              <div class="title" v-html="subKeywords(item.data.title, participle,34)"></div>
              <div class="other-info">
                <div>
                  <span
                    class="name"
                  >{{item.data.sourceName.length > 7 ? item.data.sourceName.substr(0,7) + "..." : item.data.sourceName}}</span>&nbsp;&nbsp;
                  <span>{{item.data.publishTime | formatDate('noTime')}}</span>
                </div>
                <span>
                  <i class="count"></i>
                  &nbsp;{{item.data.watchCount}}
                </span>
              </div>
            </div>
            <img :src="$store.state.imageDomain + item.data.image" alt />
          </div>
        </li>
        <div v-if="resultList.news.list.length != 0 && resultList.news.list.length == resultList.news.total" class="no-more">- 没有更多啦 -</div>
      </ul>
      <ul v-if="navSelection.article" ref="article">
        <template v-if="resultList.article.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <li v-else v-for="(item, index) in resultList.article.list" :key="index" @click="detail(item.data.id, item.type)">
          <div class="article-box">
            <div class="author-box">
              <img
                :src="item.data.avatar ? $store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                alt
              />
              <div class="name-time">
                <span class="name">{{item.data.nickName}}</span>
                <span class="time">{{item.data.publishTime | formatDate('noTime')}}</span>
              </div>
            </div>
            <div class="title" v-html="subKeywords(item.data.title, participle, 22)"></div>
            <div class="other-info">
              <div class="desc">{{item.data.description}}</div>
              <img :src="$store.state.imageDomain + item.data.image" alt />
            </div>
          </div>
        </li>
        <div v-if="resultList.article.list.length != 0 && resultList.article.list.length == resultList.article.total" class="no-more">- 没有更多啦 -</div>
      </ul>
      <ul v-if="navSelection.question" ref="question">
        <template v-if="resultList.question.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <li v-else v-for="(item, index) in resultList.question.list" :key="index" @click="detail(item.data.id, item.type)">
          <div class="question-box">
            <div class="title" v-html="subKeywords(item.data.title, participle, 22)"></div>
            <template v-if="item.data.answerContent">
              <div class="author-box">
                <img
                  :src="item.data.avatar ? $store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                  alt
                />
                <div class="name-time">
                  <span class="name">{{item.data.nickName}}</span>
                  <span class="time">{{item.data.createTime}}</span>
                </div>
              </div>
              <div class="best-anser" v-html="subKeywords(item.data.answerContent, participle, 78)"></div>
              <div
                class="count"
              >{{item.data.likeCount ? item.data.likeCount : 0}}个赞 · {{item.data.commenntCount ? item.data.commenntCount : 0}}条评论</div>
            </template>
            <div class="best-anser" v-else>暂无回答...</div>
          </div>
        </li>
        <div v-if="resultList.question.list.length != 0 && resultList.question.list.length == resultList.question.total" class="no-more">- 没有更多啦 -</div>
      </ul>
      <ul v-if="navSelection.idea" ref="idea">
        <template v-if="resultList.idea.list.length == 0">
          <div class="no-result">
            <span>
              没有找到与“
              <span class="keyword">{{keywords}}</span>”相关的内容，可以换个关键词试试
            </span>
            <div class="img"></div>
          </div>
        </template>
        <li v-else v-for="(item, index) in resultList.idea.list" :key="index" @click="detail(item.data.id, item.type)">
          <div class="idea-box">
            <div class="author-box">
              <img
                :src="item.data.avatar ? $store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                alt
              />
              <div class="name-time">
                <span class="name">{{item.data.nickName}}</span>
                <span class="time">{{item.data.createTime | formatDate('noTime')}}</span>
              </div>
            </div>
            <div class="con-box">
              <div class="idea-con" v-html="subKeywords(item.data.content, participle, 156)"></div>
            </div>
            <div class="idea-images" v-if="item.data.ideaImgs.length > 0">
              <template v-for="(img, index) in item.data.ideaImgs">
                <img class="img3" :src="$store.state.imageDomain + img.url" alt :key="index" />
              </template>
            </div>
          </div>
        </li>
        <div v-if="resultList.idea.list.length != 0 && resultList.idea.list.length == resultList.idea.total" class="no-more">- 没有更多啦 -</div>
      </ul>
    </div>
  </div>
</template>
<script>
require("@/assets/js/lib-flexible/index.min.js");

import axios from "axios";
import { convertDate } from "@/assets/js/shareUtil.js";
export default {
  data() {
    return {
      loaded: true,
      baseURL:
        process.env.VUE_APP_MODE === "production"
          ? "https://mapi.baigongyi.com"
          : "http://bgyapptest.tzecc.com",
      keywords: "",
      participle: [],
      navSelection: {
        complex: false,
        column: false,
        course: false,
        news: false,
        article: false,
        question: false,
        idea: false
      },
      searchParam: {
        complex: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10
        },
        column: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10,
          type: 2
        },
        course: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10,
          type: 1
        },
        news: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10,
          type: 7
        },
        article: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10,
          type: 3
        },
        question: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10,
          type: 4
        },
        idea: {
          deviceType: 2,
          keyword: "",
          page: 1,
          size: 10,
          type: 10
        }
      },
      resultList: {
        complex: {
          list: [],
          total: 0,
        },
        column: {
          list: [],
          total: 0,
        },
        course: {
          list: [],
          total: 0
        },
        news: {
          list: [],
          total: 0
        },
        article: {
          list: [],
          total: 0
        },
        question: {
          list: [],
          total: 0
        },
        idea: {
          list: [],
          total: 0
        }
      },
      emptyResult: {
        data: {
          records: [],
          total: 0
        }
      },
      androidOpen: false,
      iosOpen: false
    };
  },
  mounted() {
    let ua = window.navigator.userAgent;
    this.androidOpen = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
    this.iosOpen = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    this.keywords = this.$route.query.keywords.substr(0, 20);
    this.searchParam.complex.keyword = this.keywords;

    this.search(this.searchParam.complex).then(res => {
      this.resultList.complex.list = res.data.pageData.records;
      this.resultList.complex.total = res.data.pageData.total;
      this.participle = res.data.participle;
      this.navSelection.complex = true;
      this.loaded = true;
    });
    this.scrollListener('complex');
  },
  methods: {
    search(param) {
      this.loaded = false;
      if (!param.keyword) {
        return Promise.resolve(this.emptyResult);
      }
      return axios.request({
        baseURL: this.baseURL,
        url: "/fullSearch",
        method: "post",
        data: param
      });
    },
    resetNavSel() {
      this.navSelection.complex = false;
      this.navSelection.column = false;
      this.navSelection.course = false;
      this.navSelection.news = false;
      this.navSelection.article = false;
      this.navSelection.question = false;
      this.navSelection.idea = false;
    },
    chooseNav(navName) {
      this.resetNavSel();
      if(this.resultList[navName].list.length != 0){
        this.navSelection[navName] = true;
        return;
      }
      this.searchParam[navName].keyword = this.keywords;
      this.search.call(this, this.searchParam[navName]).then(res => {
        this.resultList[navName].list = res.data.pageData.records;
        this.resultList[navName].total = res.data.pageData.total;
        this.navSelection[navName] = true;
        this.loaded = true;
      });
      this.scrollListener(navName);
    },
    detail(id, type) {
      // 此方法为app内监听的方法
      HtmlMethod.detail(id, type);
    },
    scrollListener(navName) {
      var _this = this;
      document.onscroll = function() {
        //文档内容实际高度（包括超出视窗的溢出部分）
        var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        //滚动条滚动距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //窗口可视范围高度
        var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
        if(clientHeight + scrollTop >= scrollHeight){
          console.log("触发加载");
          // 触发加载数据
          if (_this.loaded && (_this.resultList[navName].list.length < _this.resultList[navName].total)) {
            console.log("开始加载");
            _this.searchParam[navName].page++;
            _this.search(_this.searchParam[navName])
            .then(res => {
              _this.resultList[navName].list = _this.resultList[navName].list.concat(res.data.pageData.records);
              _this.resultList[navName].total = res.data.pageData.total;
              _this.loaded = true;
              console.log("加载完毕");
            });
          }
        }
      }
    },
    subKeywords(val, participle, sublength) {
      // 长度小于要截取的长度，不用截，直接高亮
      if(val.length < sublength) {
        let tmpStr = val;
        participle.forEach(element => {
          let replaceReg = new RegExp(element, 'i')
          let replaceRegs = new RegExp(tmpStr.match(replaceReg), 'g')
          let replaceString = "<span style='color:red'>" + tmpStr.match(replaceReg)[0] + '</span>'
          tmpStr = tmpStr.replace(replaceRegs, replaceString)

          // tmpStr = tmpStr.split(element).join("<span style='color:#f33535;'>"+ element +"</span>");
        });
        return tmpStr;
      }
      // 否则根据截取长度截取后再高亮
      let tmpStr = val;
      let flag = 0;
      participle.forEach(element => {
        if(tmpStr.toLowerCase().includes(element)) {
          if(flag == 0) {
            // 开始位置
            const startIndex = tmpStr.indexOf(element) - 10 < 0 ? 0 : tmpStr.indexOf(element);
            // 结束位置
            const endIndex = startIndex + element.length + sublength + 10;
            // 截取文字
            tmpStr = tmpStr.substring(startIndex, endIndex);
          }
          // 高亮
          let replaceReg = new RegExp(element, 'i')
          let replaceRegs = new RegExp(tmpStr.match(replaceReg), 'g')
          let replaceString = "<span style='color:red'>" + tmpStr.match(replaceReg)[0] + '</span>'
          tmpStr = tmpStr.replace(replaceRegs, replaceString)

          // tmpStr = tmpStr.split(element).join("<span style='color:#f33535;'>"+ element +"</span>");
          flag++;
        }
      });
      return tmpStr;
    }
  }
}
</script>

<style lang="less">
* {
  /*去除系统默认的样式*/
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-appearance: none;
}
body {
  font-family: "PingFangSC-Regular";
  min-width: 10rem !important;
  max-width: 10rem !important;
  margin: 0 auto;
  background-color: #f7f7f7;
}
.main {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  overflow: hidden;
  font-weight: 400;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 4;
  background: #fff;
  box-shadow: 0 0 3px 0 #ddd;
  height: 1.01rem;
  overflow: hidden;
  ul {
    height: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    li {
      -webkit-box-flex: 0;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      box-sizing: border-box;
      display: inline-block;
      font-size: 0.38rem;
      color: #333;
      text-align: center;
      width: 1.43rem;
      height: 1.01rem;
      line-height: 1.01rem;
      position: relative;
      .line {
        display: inline-block;
        width: 0.27rem;
        height: 0.08rem;
        background-color: #f33535;
        border-radius: 3px;
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .active {
      color: #f33535;
    }
  }
  ul::-webkit-scrollbar {
    display: none;
  }
}
.sea-result {
  width: 100%;
  margin-top: 1.14rem;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  ul {
    li {
      background: #fff;
      margin-bottom: 0.13rem;
      padding: 0.28rem 0.43rem;
      .type-label {
        display: block;
        text-align: center;
        color: #fff;
        background-color: #f33535;
        width: 0.8rem;
        height: 0.48rem;
        font-size: 0.29rem;
        line-height: 0.48rem;
        border-radius: 5px;
        margin-bottom: 0.13rem;
      }
      .column-box {
        display: flex;
        display: -webkit-flex;
        .cover-box {
          width: 1.76rem;
          height: 1.76rem;
          position: relative;
          margin-right: 0.28rem;
          img {
            width: 1.76rem;
            height: 1.63rem;
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 3;
          }
          .shadow1 {
            width: 1.63rem;
            height: 1.63rem;
            background-color: #ccc;
            border-radius: 10px 10px 7px 7px;
            position: absolute;
            top: 0.07rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
          }
          .shadow2 {
            width: 1.49rem;
            height: 1.63rem;
            background-color: #b8b8b8;
            border-radius: 10px 10px 7px 7px;
            position: absolute;
            top: 0.13rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
          }
        }
        .info-box {
          width: 7rem;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          font-size: 0.35rem;
          .title {
            margin-bottom: 0.16rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .label {
            margin-bottom: 0.28rem;
            span {
              box-sizing: border-box;
              color: #666;
              padding: 0.04rem 0.16rem;
              background-color: #f2f3f4;
              border-radius: 5px;
            }
          }
          .price {
            .free {
              font-weight: bold;
              font-style: italic;
              color: #7355f6;
              font-style: normal;
            }
            span {
              font-weight: bold;
              font-style: italic;
              color: #f33535;
            }
          }
        }
      }
      .course-box {
        display: flex;
        display: -webkit-flex;
        img {
          width: 3.2rem;
          height: 2.4rem;
          margin-right: 0.4rem;
          border-radius: 10px;
        }
        .info-box {
          width: 6rem;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          font-size: 0.35rem;
          .title {
            min-height: 0.81rem;
            margin-bottom: 0.16rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .label {
            margin-bottom: 0.28rem;
            span {
              box-sizing: border-box;
              color: #666;
              padding: 0.04rem 0.16rem;
              background-color: #f2f3f4;
              border-radius: 5px;
            }
          }
          .price {
            .free {
              font-weight: bold;
              font-style: italic;
              color: #7355f6;
              font-style: normal;
            }
            span {
              font-weight: bold;
              font-style: italic;
              color: #f33535;
            }
          }
        }
      }
      .news-box {
        display: flex;
        display: -webkit-flex;
        img {
          width: 2.67rem;
          height: 1.6rem;
          border-radius: 10px;
        }
        .info-box {
          width: 6rem;
          margin-right: 0.5rem;
          .title {
            min-height: 0.97rem;
            margin-bottom: 0.25rem;
            font-size: 0.35rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .other-info {
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            font-size: 0.29rem;
            color: #999;
            .name {
              display: inline-block;
              margin-right: 0.2rem;
            }
            .count {
              display: inline-block;
              vertical-align: middle;
              width: 0.32rem;
              height: 0.2rem;
              background-image: url("~@/assets/images/eye.png");
              background-size: cover;
              background-position: center center;
              background-repeat: no-repeat;
            }
          }
        }
      }
      .article-box {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .title {
          margin-bottom: 0.29rem;
          font-size: 0.4rem;
          line-height: 0.56rem;
          font-weight: bold;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .other-info {
          display: flex;
          display: -webkit-flex;
          .desc {
            width: 7rem;
            margin-right: 0.6rem;
            font-size: 0.35rem;
            line-height: 0.48rem;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          img {
            width: 2.67rem;
            height: 1.4rem;
            border-radius: 10px;
          }
        }
      }
      .author-box {
        display: flex;
        display: -webkit-flex;
        margin-bottom: 0.32rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin-right: 0.27rem;
        }
        .name-time {
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          width: 8rem;
          .name {
            height: 0.48rem;
            line-height: 0.48rem;
            font-size: 0.35rem;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            font-size: 0.29rem;
            color: #999;
          }
        }
      }
      .question-box {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .title {
          margin-bottom: 0.25rem;
          font-size: 0.4rem;
          line-height: 0.56rem;
          font-weight: bold;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .best-anser {
          margin-bottom: 0.28rem;
          font-size: 0.35rem;
          line-height: 0.48rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .count {
          font-size: 0.29rem;
          line-height: 0.48rem;
          color: #999;
        }
      }
      .idea-box {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .con-box{
          margin-bottom: 0.28rem;
          position: relative;
          .more{
            font-size: .32rem;
            line-height: .48rem;
            color: #f33535;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        .idea-con {
          font-size: 0.35rem;
          line-height: 0.48rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }
        .idea-images {
          display: -webkit-flex;
          display: flex;
          flex-wrap: wrap;
        }
        .idea-images .img3 {
          width: 2.96rem;
          height: 2.96rem;
          margin: 0 0.06rem 0.06rem 0;
          -o-object-fit: cover;
          object-fit: cover;
        }
      }
    }
  }
  .no-result {
    padding: 0.28rem 0.43rem;
    font-size: 0.37rem;
    line-height: 0.48rem;
    color: #666;
    margin-bottom: 0.21rem;
    .keyword {
      color: #f33535;
    }
    .img {
      width: 6.67rem;
      height: 5.33rem;
      margin: 0.68rem auto;
      background-image: url("~@/assets/images/No-other.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
  .no-more {
    padding: 1.17rem 0.43rem 0.41rem 0.43rem;
    font-size: 0.32rem;
    line-height: 0.48rem;
    color: #666;
    text-align: center;
    background-color: #fff;
  }
}
</style>