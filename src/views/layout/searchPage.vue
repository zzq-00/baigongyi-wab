<!-- 搜索页面 -->
<template>
  <div class="search-page">
    <div class="nav-list">
      <ul class="nav-content-list clearfix">
        <li
          class="fl"
          :class="[checkNavIndex==index?'nav-check':'']"
          v-for="(item,index) in navList"
          :key="index"
          @click="checkNav(index,item.type)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="search-content">
      <div class="search-tips-filter clearfix">
        <p class="fl" v-if="searchTotal>0">为您找到{{searchTotal}}条数据</p>
        <p class="fl" v-else>没有找到与“{{searchParams.keyword}}”相关的内容，可以换个关键词试试</p>
        <ul class="fr">
          <li
            class="fl"
            :class="[checkTimeIndex==index?'time-check':'']"
            v-for="(item,index) in timeList"
            :key="index"
            @click="checkTime(item,index)"
          >{{item.name}}</li>
        </ul>
      </div>
      <!-- 列表中存在专栏2、课程1、资讯7、文章3、问答4、想法10；专栏和课程长的一样-->
      <div class="search-result">
        <ul v-scroll="getfullSearch" :scroll-disabled="disabled" style="height:100%;overflow:auto;" v-if="checkNavIndex != 7">
          <li v-for="(item,index) in searchResult" :key="index" >
            <div class="clearfix" v-if="item.type==2||item.type==1">
              <a
                :href="item.type==2?`columnDetail/${item.data.id}`:`courseDetail/${item.data.id}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="$store.state.imageDomain + item.data.image" alt class="list-img fl" />
              </a>
              <div class="list-info fl">
                <div class="info-title">
                  <a
                    :href="item.type==2?`columnDetail/${item.data.id}`:`courseDetail/${item.data.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      class="titles"
                      :class="{ 'column-title': item.type==2&&checkNavIndex==0, 'course-title': item.type==1&&checkNavIndex==0 }"
                      v-html="wordsHighlight(item.data.name)"
                    ></p>
                  </a>
                </div>
                <div class="name-and-update clearfix">
                  <img
                    class="photo fl"
                    v-if="item.type==2"
                    @click.stop="openTeacherHome(item.data.lecturerInfo.accountId)"
                    :src="item.data.lecturerInfo.avatar?$store.state.imageDomain + item.data.lecturerInfo.avatar : require('@/assets/images/err-header-icon01.png')"
                    alt
                  />
                  <img
                    class="photo fl"
                    v-if="item.type==1"
                    @click.stop="openTeacherHome(item.data.accountId)"
                    :src="item.data.avatar?$store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                    alt
                  />
                  <span
                    class="name fl"
                    v-if="item.type==2"
                    @click.stop="openTeacherHome(item.data.lecturerInfo.accountId)"
                  >{{item.data.lecturerInfo.realName}}</span>
                  <span
                    class="name fl"
                    v-if="item.type==1"
                    @click.stop="openTeacherHome(item.data.lecturerInfo.accountId)"
                  >{{item.data.realName}}</span>
                  <span
                    class="situation fl"
                    v-if="item.type==2"
                  >{{item.data.upToTime}}{{item.data.upToTime=='已完结'?'':'更新'}}</span>
                  <span class="situation fl" v-if="item.type==1">视频</span>
                </div>
                <div class="isfree-and-time clearfix">
                  <span
                    class="fl"
                    :class="[item.data.price>0?'charge':'free']"
                  >{{item.data.price>0 ? '&yen;'+item.data.price : '免费' }}</span>
                  <span class="fr">{{item.data.publishTime | formatDate}}</span>
                </div>
              </div>
            </div>
            <!-- 驿视频 -->
            <div class="clearfix" v-if="item.type==15">
              <a
                :href="`/yivideo/detail/${item.data.id}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="$store.state.imageDomain + item.data.image" alt class="list-img fl" />
              </a>
              <div class="list-info fl">
                <div class="info-title">
                  <a
                    :href="`/yivideo/detail/${item.data.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      class="titles"
                      :class="[checkNavIndex==0?'yivideo-title':'']"
                      v-html="wordsHighlight(item.data.title)"
                    ></p>
                  </a>
                </div>
                <!-- <a :href="`/article/list/${item.data.id}`" target="_blank" rel="noopener noreferrer">
                  <div class="info-content" v-html="wordsHighlight(item.data.description,80)"></div>
                </a>-->
                <div class="article-name-time clearfix" style="margin-top:5px;">
                  <img
                    @click="openUserCenter(item.data.accountId)"
                    :src="item.data.avatar?$store.state.imageDomain + item.data.avatar:require('@/assets/images/err-header-icon01.png')"
                    alt
                    class="fl"
                  />
                  <span
                    @click="openUserCenter(item.data.accountId)"
                    class="fl"
                  >{{item.data.nickName}}</span>
                  <span class="fr">{{item.data.publishTime | formatDate}}</span>
                </div>
                <div class="operational" v-if="item.status != 2000">
                  <span style="width: 53px;">
                    <img src="@/assets/images/seeCount.png" alt />
                    <em>{{item.data.watchCount | formatNumbers}}</em>
                  </span>
                  <span style="width: 53px;" @click="likeOperate(item)">
                    <img v-if="item.data.whetherLike" src="@/assets/images/yizan.png" alt />
                    <img v-else src="@/assets/images/zan.png" alt />
                    <em>{{item.data.likeCount | formatNumbers}}</em>
                  </span>
                  <span style="width: 53px;">
                    <img src="@/assets/images/pinglun.png" alt />
                    <em>{{item.data.commentCount | formatNumbers}}</em>
                  </span>
                  <span style="width: 62px;" @click="collectOperate(item)">
                    <img v-if="item.data.whetherToCollect" src="@/assets/images/yishoucang.png" alt />
                    <img v-else src="@/assets/images/shoucang.png" alt />
                    <em>{{item.data.collectCount | formatNumbers}}</em>
                  </span>
                </div>
              </div>
            </div>
            <!-- 热点资讯 -->
            <div class="clearfix" v-if="item.type==7">
              <a
                :href="`/hotmessage/${item.data.id}?currentIndex=${item.data.type-1}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="$store.state.imageDomain + item.data.image" alt class="list-img fl" />
              </a>
              <div class="list-info fl">
                <div class="info-title">
                  <a
                    :href="`/hotmessage/${item.data.id}?currentIndex=${item.data.type-1}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      class="titles"
                      :class="[checkNavIndex==0?'message-title':'']"
                      v-html="wordsHighlight(item.data.title)"
                    ></p>
                  </a>
                </div>
                <a
                  :href="`/hotmessage/${item.data.id}?currentIndex=${item.data.type-1}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="info-content" v-html="wordsHighlight(item.data.roundup,80)"></div>
                </a>
                <div class="type-and-time clearfix">
                  <span class="fl">{{item.data.sourceName}}</span>
                  <span class="fl" v-if="item.data.type==1" @click="gotohotmessage(1)">行业热点</span>
                  <span class="fl" v-if="item.data.type==2" @click="gotohotmessage(2)">建筑前沿</span>
                  <span class="fl" v-if="item.data.type==3" @click="gotohotmessage(3)">资质热点</span>
                  <span class="fl" v-if="item.data.type==4" @click="gotohotmessage(0)">环球资讯</span>
                  <span class="fl" v-if="item.data.type==5" @click="gotohotmessage(4)">职场资讯</span>
                  <span class="fr">{{item.data.publishTime | formatDate}}</span>
                </div>
              </div>
            </div>
            <div class="clearfix" v-if="item.type==3">
              <a :href="`/article/list/${item.data.id}`" target="_blank" rel="noopener noreferrer">
                <img :src="$store.state.imageDomain + item.data.image" alt class="list-img fl" />
              </a>
              <div class="list-info fl">
                <div class="info-title">
                  <a
                    :href="`/article/list/${item.data.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      class="titles"
                      :class="[checkNavIndex==0?'article-title':'']"
                      v-html="wordsHighlight(item.data.title)"
                    ></p>
                  </a>
                </div>
                <a
                  :href="`/article/list/${item.data.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="info-content" v-html="wordsHighlight(item.data.description,80)"></div>
                </a>
                <div class="article-name-time clearfix">
                  <img
                    @click="openUserCenter(item.data.accountId)"
                    :src="item.data.avatar?$store.state.imageDomain + item.data.avatar:require('@/assets/images/err-header-icon01.png')"
                    alt
                    class="fl"
                  />
                  <span
                    @click="openUserCenter(item.data.accountId)"
                    class="fl"
                  >{{item.data.nickName}}</span>
                  <span class="fr">{{item.data.publishTime | formatDate}}</span>
                </div>
              </div>
            </div>
            <div class="clearfix" v-if="item.type==4">
              <div class="qa-title" :class="[checkNavIndex==0?'qa-type-title':'']">
                <p
                  v-html="wordsHighlight(item.data.title)"
                  @click="gotoDetails(item.data,'questions')"
                ></p>
              </div>
              <div v-if="item.data.answerContent">
                <div class="answer-person">
                  <img
                    @click="openUserCenter(item.data.answerAccountId)"
                    :src="item.data.avatar?$store.state.imageDomain + item.data.avatar : require('@/assets/images/err-header-icon01.png')"
                    alt
                  />
                  <span @click="openUserCenter(item.data.answerAccountId)">{{item.data.nickName}}</span>
                </div>
                <div
                  class="qa-content"
                  @click="gotoDetails(item.data,'qa')"
                  v-html="wordsHighlight(item.data.answerContent,156)"
                ></div>
                <div class="qa-tag">
                  <span>{{item.data.likeCount?item.data.likeCount:0}}个赞</span>
                  <span>·</span>
                  <span>{{item.data.commentCount?item.data.commentCount:0}}条评论</span>
                  <span class="fr">{{item.data.createTime | formatDate}}</span>
                </div>
              </div>
              <div v-else class="no-answer">暂无回答</div>
            </div>
            <div class="clearfix" v-if="item.type==10">
              <div class="idea-titles">
                <img
                  @click="openUserCenter(item.data.accountId)"
                  :src="item.data.avatar?$store.state.imageDomain + item.data.avatar: require('@/assets/images/err-header-icon01.png')"
                  alt
                />
                <span @click="openUserCenter(item.data.accountId)">{{item.data.nickName}}</span>
                <span>{{item.data.createTime | formatDate}}</span>
                <span class="type-box" v-if="checkNavIndex==0">想法</span>
              </div>
              <a :href="`/engineering/${item.data.id}`" target="_blank" rel="noopener noreferrer">
                <div class="idea-content" v-html="wordsHighlight(item.data.content,156)"></div>
              </a>
              <ul class="idea-img-list clearfix">
                <li v-for="(imgs,imgi) in item.data.ideaImgs" :key="imgi" class="fl">
                  <a
                    :href="`/engineering/${item.data.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img :src="$store.state.imageDomain + imgs.url" alt v-if="imgi<4" />
                  </a>
                </li>
              </ul>
            </div>
            <div class="clearfix" v-if="item.type =='11'">
              <a
                :href="`/engineering/groupHome/${item.data.id}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="$store.state.imageDomain + item.data.avatar" alt class="list-img fl" />
              </a>
              <div class="list-info fl">
                <div class="info-title">
                  <a
                    :href="`/engineering/groupHome/${item.data.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      class="titles"
                      :class="[checkNavIndex==0?'quanzi-title':'']"
                      v-html="wordsHighlight(item.data.name)"
                    ></p>
                  </a>
                </div>
                <a
                  :href="`/engineering/groupHome/${item.data.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="info-content" v-html="wordsHighlight(item.data.description,80)"></div>
                </a>
                <div>
                  <span style="font-size:12px;color:#999;">{{item.data.memberCount}}个成员</span>
                </div>
              </div>
            </div>
            <!-- 发言 -->
            <div class="clearfix" v-if="item.type==16">
              <div class="list-info fl" style="width:calc(100% - 30px)">
                <div class="article-name-time clearfix">
                  <img
                    @click="openUserCenter(item.data.accountId)"
                    :src="item.data.avatar?$store.state.imageDomain + item.data.avatar:require('@/assets/images/err-header-icon01.png')"
                    alt
                    class="fl"
                  />
                  <span
                    @click="openUserCenter(item.data.accountId)"
                    class="fl"
                    style="margin-right:3px;"
                  >{{item.data.nickName}}</span>
                  <span
                    :class="[checkNavIndex==0?'say-title':'']"
                    style="padding-left:3px;line-height:24px;border-left:1px solid #999;"
                  >{{item.data.publishTime | formatDate}}</span>
                </div>
                <a
                  :href="`/engineering/groupIdea/${item.data.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="info-content" v-html="wordsHighlight(item.data.content,80)"></div>
                </a>
                <ul
                  v-if="item.data.ideaImgs.length > 0"
                  style="width:100%;height:83px;margin:10px 0;"
                >
                  <li
                    v-for="(v,i) in item.data.ideaImgs"
                    :key="i"
                    style="float:left;width:140px;height:83px;margin-right:20px;"
                  >
                    <img
                      :src="$store.state.imageDomain + v.previewUrl"
                      alt
                      style="width:100%;height:100%;"
                    />
                  </li>
                </ul>
                <a
                  :href="`/engineering/groupHome/${item.data.groupId}`"
                  target="_blank"
                  style="display:inline-block;margin-bottom:4px;padding:8px 15px;border-radius:15px;background:#F2F3F4;color:red"
                >
                  <span>{{item.data.groupName}}</span>
                </a>
              </div>
            </div>
            <div class="clearfix" v-if="item.type == 6">
              <div
                class="list-info fl"
                style="width:calc(100% - 20px);overflow:hidden;height:100px;position:relative"
              >
                <div class="user user_img" @click="openUserCenter(item.data.accountId)">
                  <img :src="$store.state.imageDomain + item.data.avatar" alt />
                </div>
                <div class="user user_main" @click="openUserCenter(item.data.accountId)">
                  <p v-html="wordsHighlight(item.data.nickName,80)"></p>
                  <div>{{item.data.introduction}}</div>
                </div>
                <div
                  class="user user_like"
                  v-if="item.data.accountId != $store.state.userInfo.accountId"
                >
                  <!-- <span
                  @click="addAttention(item)"
                    v-if="item.data.wasConcerned==1"
                    :class="{'no-like':item.data.wasConcerned!=2}"
                  >已关注</span>
                  <span v-else-if="item.data.wasConcerned==2">关注</span>
                  <span
                    v-else-if="item.data.wasConcerned==3"
                    :class="{'no-like':item.data.wasConcerned!=2}"
                  >互相关注</span> -->
                  <span v-if="item.data.wasConcerned==2" @click="addAttention(item.data)">关注</span>
                  <span v-else class="no-like" @click="delAttention(item.data)">{{item.data.wasConcerned==1?'已关注':'互相关注'}}</span>
                </div>
                <div
                  style="position:absolute;left:61px;bottom:10px;color:#999"
                >{{item.data.fansCount}}关注</div>
              </div>
            </div>
          </li>
        </ul>
         <ul v-scroll="getfullSearch" :scroll-disabled="disabled" style="height:100%;overflow:auto;" v-else>
          <div class="quanzi_choose">
              <span :class="{'active':quanzi_active==1}" @click="quanzi_active=1">圈子</span> <span :class="{'active':quanzi_active==2}" @click="quanzi_active=2">发言</span>
           </div>
           <li v-for="(item,index) in searchResult" :key="index">
            <div class="clearfix" v-if="item.type =='11'">
              <a :href="`/engineering/groupHome/${item.data.id}`" target="_blank" rel="noopener noreferrer">
                <img :src="$store.state.imageDomain + item.data.avatar" alt="" class="list-img fl">
              </a>
              <div class="list-info fl">
                <div class="info-title">
                  <a :href="`/engineering/groupHome/${item.data.id}`" target="_blank" rel="noopener noreferrer">
                    <p class="titles" :class="[checkNavIndex==0?'quanzi-title':'']" v-html="wordsHighlight(item.data.name)"></p>
                  </a>
                </div>
                <a :href="`/engineering/groupHome/${item.data.id}`" target="_blank" rel="noopener noreferrer">
                  <div class="info-content" v-html="wordsHighlight(item.data.description,80)"></div>
                </a>
                <div>
                  <span style="font-size:12px;color:#999;">{{item.data.memberCount}}个成员</span>
                </div>
              </div>
            </div>
               <div class="clearfix" v-if="item.type==16">
              <div class="list-info fl" style="width:calc(100% - 30px)">
                <div class="article-name-time clearfix">
                  <img
                    @click="openUserCenter(item.data.accountId)"
                    :src="item.data.avatar?$store.state.imageDomain + item.data.avatar:require('@/assets/images/err-header-icon01.png')"
                    alt
                    class="fl"
                  />
                  <span
                    @click="openUserCenter(item.data.accountId)"
                    class="fl"
                    style="margin-right:3px;"
                  >{{item.data.nickName}}</span>
                  <span
                    :class="[checkNavIndex==0?'say-title':'']"
                    style="padding-left:3px;line-height:24px;border-left:1px solid #999;"
                  >{{item.data.publishTime | formatDate}}</span>
                </div>
                <a
                  :href="`/engineering/groupIdea/${item.data.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="info-content" v-html="wordsHighlight(item.data.content,80)"></div>
                </a>
                <ul
                  v-if="item.data.ideaImgs.length > 0"
                  style="width:100%;height:83px;margin:10px 0;"
                >
                  <li
                    v-for="(v,i) in item.data.ideaImgs"
                    :key="i"
                    style="float:left;width:140px;height:83px;margin-right:20px;"
                  >
                    <img
                      :src="$store.state.imageDomain + v.previewUrl"
                      alt
                      style="width:100%;height:100%;"
                    />
                  </li>
                </ul>
                <a
                  :href="`/engineering/groupHome/${item.data.groupId}`"
                  target="_blank"
                  style="display:inline-block;margin-bottom:4px;padding:8px 15px;border-radius:15px;background:#F2F3F4;color:red"
                >
                  <span>{{item.data.groupName}}</span>
                </a>
              </div>
            </div>
           </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
import { close } from "fs";
import { ceiling } from "@/assets/js/utils.js";
export default {
  data() {
    return {
      quanzi_active:1,
      checkNavIndex: 0,
      navList: [
        { name: "综合", type: "" },
        { name: "用户", type: 6 },
        { name: "热点资讯", type: 7 },
        { name: "专栏", type: 2 },
        { name: "课程", type: 1 },
        { name: "驿视频", type: 15 },
        { name: "文章", type: 3 },
        { name: "圈子", type: 11 },
        { name: "想法", type: 10 },
        { name: "问答", type: 4 }
      ],
      timeList: [
        { name: "时间不限" },
        { name: "一天内" },
        { name: "一周内" },
        { name: "三月内" }
      ],
      checkTimeIndex: 0, //时间选项
      searchParams: {
        deviceType: 1,
        endTime: "",
        keyword: "",
        page: 1,
        size: 10,
        startTime: "",
        type: ""
      },
      searchTotal: Number(),
      searchResult: [], //搜索结果
      participle: [], //关键词
      loading: true,
      operating: false,
    };
  },
  watch: {
    checkNavIndex() {
      this.searchResult = [];
      this.getfullSearch();
      this.quanzi_active = 1;
    },
    "$route.query.searchWord": {
      handler: function(val, oldVal) {
        this.searchResult = [];
        this.searchParams.keyword = val;
        this.searchParams.size = 10;
        this.getfullSearch();
      },
      deep: true,
      immediate: true
    },
    quanzi_active(val){
      this.searchResult = []
       if(val ==1){
         this.searchParams.type = 11;
       }else{
         this.searchParams.type = 16;
       }
       this.getfullSearch();
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
    noMore() {
      return this.searchResult.length >= this.searchTotal;
    }
  },
  methods: {
    // 标签选择
    checkNav(index, type) {
      this.checkNavIndex = index;
      this.checkTimeIndex = 0;
      this.searchParams.type = type;
      this.searchParams.startTime = this.searchParams.endTime = "";
      this.searchParams.page = 1;
      this.searchParams.size = 10;
    },
    // 时间选择
    checkTime(item, index) {
      this.searchResult= [];
      this.checkTimeIndex = index;
      this.searchParams.page = 1;
      this.searchParams.size = 10;
      let startTime = "";
      let endTime = "";
      var nowdate = new Date().getTime();
      let curTimestamp = new Date().getTime();
      let dayBeforeDate = nowdate - 24 * 60 * 60 * 1000;
      let aWeekAgo = nowdate - 7 * 24 * 60 * 60 * 1000;
      let threeMonthAgo = nowdate - 90 * 24 * 60 * 60 * 1000;
      let tmDate;
      let todayDate = new Date(curTimestamp);

      let todayY = todayDate.getFullYear(),
        todaym = todayDate.getMonth(),
        todayd = todayDate.getDate();
      let todayH = todayDate.getHours(),
        todayi = todayDate.getMinutes(),
        todays = todayDate.getSeconds();

      switch (item.name) {
        case "一天内":
          tmDate = new Date(dayBeforeDate);
          break;
        case "一周内":
          tmDate = new Date(aWeekAgo);
          break;
        case "三月内":
          tmDate = new Date(threeMonthAgo);
          break;
        default:
          break;
      }
      if (item.name != "时间不限") {

        let Y = tmDate.getFullYear(),
          m = tmDate.getMonth(),
          d = tmDate.getDate();
        let H = tmDate.getHours(),
          i = tmDate.getMinutes(),
          s = tmDate.getSeconds();

        this.searchParams.startTime = new Date(Y, m, d, H, i, s).toISOString(); //三月前
        this.searchParams.endTime = new Date(
          todayY,
          todaym,
          todayd,
          todayH,
          todayi,
          todays
        ).toISOString();
      } else {
        this.searchParams.startTime = "";
        this.searchParams.endTime = "";
      }
      this.getfullSearch();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.searchParams.size = val;
      this.searchParams.page = 1;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.searchParams.page = val;
    },
    // 关键词高亮
    wordsHighlight(val, content) {
      if (val) {
        for (let index = 0; index < this.participle.length; index++) {
          const keyWord = this.participle[index];
          if (content && val.indexOf("span") == -1) {
            let typeNumber = content;
            // 文章或者资讯少于等于80个字不需要截取，首次出现位置大于80需要截取
            //问答或者想法少于等于156个字不需要截取，首次出现位置大于156需要截取
            if (val.length <= typeNumber) {
              val;
            } else {
              let findIndexs = val.indexOf(keyWord);
              if (findIndexs != -1 && findIndexs < typeNumber) {
                val = val.slice(0, typeNumber) + "...";
              } else if (findIndexs >= typeNumber) {
                let surplus = val.length - (findIndexs + keyWord.length);
                let supplement = typeNumber - keyWord.length;
                // 如果关键词后的字数够平均截取前后
                if (surplus >= supplement / 2) {
                  val =
                    val.slice(
                      findIndexs - supplement / 2,
                      findIndexs + keyWord.length + supplement / 2
                    ) + "...";
                } else if (surplus < supplement / 2) {
                  val = val.slice(val.length - typeNumber, val.length) + "...";
                }
              }
            }
          }
          let replaceReg = new RegExp(keyWord, "i");
          let replaceRegs = new RegExp(val.match(replaceReg), "g");
          let replaceString;
          if (val.match(replaceReg)) {
            replaceString =
              "<span style='color:red'>" + val.match(replaceReg)[0] + "</span>";
          } else {
            replaceString = "<span style='color:red'>" + "" + "</span>";
          }
          val = val.replace(replaceRegs, replaceString);
        }
        return val;
      }
    },
    getfullSearch() {
      let data = {
        deviceType: this.searchParams.deviceType,
        endTime: this.searchParams.endTime,
        keyword:
          this.searchParams.keyword.length > 20
            ? this.searchParams.keyword.slice(0, 20)
            : this.searchParams.keyword,
        page: this.searchParams.page,
        size: this.searchParams.size,
        startTime: this.searchParams.startTime,
        type: this.searchParams.type
      };
      this.loading = true;
      api
        .getfullSearch(data)
        .then(res => {
          this.searchTotal = res.data.pageData.total;
          this.searchResult = [
            ...this.searchResult,
            ...res.data.pageData.records
          ];
          !this.noMore && this.searchParams.page++;
          let arr = res.data.participle;
          this.participle = arr
            .map(i => ({ raw: i, len: i.length }))
            .sort((p, n) => n.len - p.len)
            .map(i => i.raw);
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },
       // 添加关注
    addAttention(item) {
      api.addAttention({ objId: item.accountId, objType: 6 }).then(res => {
        item.wasConcerned = res.data;
      })
    },
    // 删除关注
    delAttention(item) {
      api.delAttention({ objId: item.accountId, objType: 6 }).then(res => {
        item.wasConcerned = 2;
      })
    },
    gotohotmessage(val) {
      this.$router.push(`hotmessage?indexs=${val}`);
    },
    gotoDetails(item, val) {
      // qa 点击回答内容进入回答详情  questions 点击问题标题进入问题详情
      let id = "";
      if (val == "qa") {
        id = item.answerAccountId;
      } else {
        id = item.accountId;
      }
      let routeUrl;
      if (val == "qa") {
        routeUrl = this.$router.resolve({
          path: `/myReplyDetails/${item.answerId}`,
          query: { id: id }
        });
      } else {
        routeUrl = this.$router.resolve({
          path: `/questionsDetails/${item.id}`,
          query: { id: id }
        });
      }
      window.open(routeUrl.href, "_blank");
    },
    // 点赞
    likeOperate(item) {
      if (this.operating) return;
      this.operating = true;
      if (item.data.whetherLike) {
        api
          .likeDelete(item.type, item.data.id)
          .then(res => {
            item.data.whetherLike = false;
            item.data.likeCount--;
          })
          .finally(() => (this.operating = false));
      } else {
        api
          .likeAdd({ objType: item.type, objId: item.data.id })
          .then(res => {
            item.data.whetherLike = true;
            item.data.likeCount++;
          })
          .finally(() => (this.operating = false));
      }
    },
    // 收藏
    collectOperate(item) {
      if (item.data.whetherToCollect) {
        api
          .cancelCollect({ objType: item.type, objId: item.data.id })
          .then(res => {
            item.data.whetherToCollect = false;
            // 防止跟批量管理收藏冲突
            item.data.collectCount--;
          });
      } else {
        api
          .addCollect({ objType: item.type, objId: item.data.id })
          .then(res => {
            item.data.whetherToCollect = true;
            item.data.collectCount++;
          });
      }
    }
  },
  mounted() {
    let wrap = document.querySelector(".nav-list");
    ceiling(wrap);
    // this.getfullSearch();
  }
};
</script>

<style lang="less" scoped>
.search-page {
  .nav-list {
    background: #fff;
    height: 50px;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    box-shadow: 0px 0px 4px 0px rgba(57, 63, 58, 0.35);
    &[data-fixed="fixed"] {
      position: fixed;
      top: 0;
      margin: 0;
      z-index: 2 !important;
    }
    .nav-content-list {
      width: 1100px;
      margin: 0 auto;
      li {
        font-size: 14px;
        color: #999999;
        margin-right: 31px;
        cursor: pointer;
        padding: 16px 0 14px 0;
        position: relative;
      }
      li:hover {
        color: #4a4a4a;
      }
      li:hover::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0;
        margin: auto;
        height: 3px;
        width: 24px;
        background-color: #e43c31;
      }
      .nav-check {
        color: #4a4a4a;
      }
      .nav-check::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0;
        margin: auto;
        height: 3px;
        width: 24px;
        background-color: #e43c31;
      }
    }
  }
  .search-content {
    padding-top: 50px;
    .search-tips-filter {
      width: 780px;
      font-size: 12px;
      height: 14px;
      line-height: 14px;
      padding: 12px 0;
      > ul {
        > li {
          color: #333333;
          font-size: 12px;
          position: relative;
          margin-left: 20px;
          cursor: pointer;
        }
        > li::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 5.5px;
          left: -10px;
          margin: auto;
          width: 3px;
          height: 3px;
          background-color: #666666;
        }
        > li:nth-child(1)::after {
          content: none;
        }
        .time-check {
          color: #e23732;
        }
      }
    }
    .search-result {
      width: 780px;
      // width: 1000px;
      padding-bottom: 27px;
      > ul {
        > li {
          margin-bottom: 10px;
          border-radius: 10px;
          background: #fff;
          padding: 20px 20px 11px;
          > div {
            .list-img {
              width: 140px;
              height: 83px;
              border-radius: 5px;
            }
            .list-info {
              margin-left: 20px;
              // width: 580px;
              width: calc(100% - 160px);
              .info-title {
                .titles {
                  font-size: 16px;
                  line-height: 18px;
                  margin-top: 2px;
                  max-height: 36px;
                }
                .titles:hover {
                  color: #e23732;
                  cursor: pointer;
                }
                .titles::after {
                  padding: 0 6px;
                  height: 20px;
                  line-height: 20px;
                  background: #f2f2f2;
                  border-radius: 3px;
                  color: #666666;
                  font-size: 12px;
                  margin-left: 10px;
                  display: inline-block;
                }

                .column-title::after {
                  content: "专栏";
                }
                .course-title::after {
                  content: "课程";
                }
                .message-title::after {
                  content: "资讯";
                }
                .article-title::after {
                  content: "文章";
                }
                .yivideo-title::after {
                  content: "驿视频";
                }
                .quanzi-title::after {
                  content: "圈子";
                }
              }

              .say-title::after {
                padding: 0 6px;
                height: 20px;
                line-height: 20px;
                background: #f2f2f2;
                border-radius: 3px;
                color: #666666;
                font-size: 12px;
                margin-left: 10px;
                display: inline-block;
                content: "发言";
              }
              .say-title:hover {
                color: #e23732;
                cursor: pointer;
              }
              .name-and-update {
                margin: 9px 0 21px;
                .photo {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  cursor: pointer;
                }
                .name,
                .situation {
                  font-size: 14px;
                  color: rgba(51, 51, 51, 1);
                  line-height: 24px;
                  height: 24px;
                  margin: 0 22px 0 6px;
                }
                .name {
                  max-width: 400px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .name:hover {
                  color: #e23732;
                  cursor: pointer;
                }
                .situation {
                  position: relative;
                }
                .situation::after {
                  position: absolute;
                  content: "";
                  display: inline-block;
                  position: absolute;
                  top: 7.5px;
                  left: -11px;
                  margin: auto;
                  height: 10px;
                  width: 1px;
                  background-color: #666666;
                }
              }

              .isfree-and-time {
                span:nth-child(1) {
                  height: 14px;
                  line-height: 14px;
                  font-size: 14px;
                }
                span:nth-child(2) {
                  height: 12px;
                  line-height: 12px;
                  font-size: 12px;
                  color: #999999;
                }
                .charge {
                  color: #f33535;
                }
                .free {
                  color: #7355f6;
                }
              }
              // 资讯
              .info-content {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                height: 35px;
                font-size: 14px;
                line-height: 18px;
                color: #666666;
                margin: 10px 0;
              }
              // 文章
              .article-name-time {
                img {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  cursor: pointer;
                }
                span:nth-of-type(1) {
                  font-size: 12px;
                  color: #333333;
                  height: 24px;
                  line-height: 24px;
                  margin-left: 5px;
                  cursor: pointer;
                }
                span:nth-of-type(1):hover {
                  color: #e23732;
                }
                span:nth-of-type(2) {
                  color: #999999;
                  font-size: 12px;
                  height: 13px;
                  line-height: 13px;
                  margin-top: 7px;
                }
              }
              .type-and-time {
                color: #999;
                font-size: 12px;
                span {
                  height: 13px;
                  line-height: 13px;
                }
                span:nth-child(1) {
                  position: relative;
                  margin-right: 10px;
                }
                span:nth-child(1)::after {
                  position: absolute;
                  content: "";
                  top: 1px;
                  right: -5px;
                  margin: auto;
                  width: 1px;
                  height: 10px;
                  background-color: #666666;
                }
                span:nth-child(2):hover {
                  color: #e23732;
                  cursor: pointer;
                }
              }
            }
            // 问答
            .qa-title {
              > p {
                max-height: 36px;
                font-size: 16px;
                line-height: 18px;
              }
              > p:hover {
                cursor: pointer;
                color: #e23732;
              }
            }
            .no-answer {
              height: 15px;
              line-height: 15px;
              font-size: 14px;
              font-weight: bold;
              color: #999999;
              margin-top: 10px;
            }
            .qa-type-title {
              > p::after {
                content: "问答";
                padding: 0 6px;
                height: 20px;
                line-height: 20px;
                background: #f2f2f2;
                border-radius: 3px;
                color: #666666;
                font-size: 12px;
                margin-left: 10px;
                margin-top: -2px;
                display: inline-block;
              }
            }
            .answer-person {
              margin: 9px 0;
              img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
              }
              span {
                margin-left: 6px;
                height: 24px;
                line-height: 24px;
                color: #333333;
                font-size: 14px;
              }
              span:hover {
                cursor: pointer;
                color: #e23732;
              }
            }
            .qa-content {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              font-size: 14px;
              color: #666666;
              cursor: pointer;
            }
            .qa-tag {
              font-size: 12px;
              color: #999999;
              margin-top: 10px;
            }
            // 想法
            .idea-titles {
              img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
              }
              span {
                display: inline-block;
                height: 24px;
                line-height: 24px;
              }
              span:nth-of-type(1) {
                font-size: 14px;
                margin: 0px 12px 0 6px;
                color: #333;
                position: relative;
              }
              span:nth-of-type(1)::after {
                position: absolute;
                content: "";
                top: 7px;
                right: -6px;
                margin: auto;
                width: 1px;
                height: 10px;
                background-color: #999999;
              }
              span:nth-of-type(1):hover {
                color: #e23732;
                cursor: pointer;
              }
              span:nth-of-type(2) {
                font-size: 12px;
                color: #999999;
              }
            }
            .idea-content {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              color: #333333;
              margin-top: 10px;
              margin-bottom: 9px;
            }
            .idea-img-list {
              li {
                margin-right: 20px;
                img {
                  width: 140px;
                  height: 83px;
                  border-radius: 5px;
                }
              }
            }
            .type-box {
              padding: 0 6px;
              height: 20px;
              line-height: 20px;
              background: #f2f2f2;
              border-radius: 3px;
              color: #666666;
              font-size: 12px;
              margin-left: 10px;
            }
          }
        }
      }
      .page-turning {
        text-align: right;
        /deep/.el-pagination {
          .el-pager {
            li {
              background: inherit;
            }
          }
          .btn-next,
          .btn-prev {
            background-color: inherit;
          }
          .active {
            background: #e23732 !important;
            color: #fff;
          }
          .el-input__inner {
            background-color: inherit;
          }
        }
      }
    }
    .load-style {
      height: calc(100vh - 250px);
    }
  }
}

.operational {
  cursor: pointer;
  color: #999999;
  overflow: hidden;
  margin-top: 20px;
  > span {
    float: left;
    // cursor: pointer;
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
    img + em {
      font-style: normal;
      vertical-align: middle;
      margin-left: 3px;
    }
  }
}
.user {
  float: left;
  cursor: pointer;
}
.user_img {
  width: 61px;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.user_main {
  width: calc(100% - 205px);
  height: 100%;
}
.user_like {
  width: 104px;
  height: 100%;
  text-align: right;
  span {
    cursor: pointer;
    line-height: 100px;
    padding: 6px 14px;
    color: #e23732;
    border: 1px solid #e23732;
    border-radius: 5px;
  }
  .no-like {
    color: #e6e6e6;
    border: 1px solid #e6e6e6;
  }
}
.quanzi_choose{
  margin-bottom:14px;
  span{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:#666;
    cursor:pointer;
    margin-right:25px;
  }
  .active{
    height:16px;
    font-size:16px;
    font-family:Microsoft YaqiHei;
    font-weight:bold;
    color:#333;
  }
}
</style>
