import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/store/storage'
import api from "@/fetch";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videoDomain: getItem('videoDomain'),
    imageDomain: getItem('imageDomain'),
    originalVideoDomain: getItem('originalVideoDomain'),
    userInfo: getItem('userInfo'),
    courseDetail: getItem('courseDetail'),
    columnDetail: getItem('columnDetail'),
    tabActive: '',
    commentNum: 0, // 评论数量
    hotmessageData: {},
    cancelStatus: false, // 个人中心 取消关注的操作 为了右侧边栏收藏的课程 收藏的专栏等等在点击取消收藏之后实时变化
    ideaDialogVisible: false,
    informationCount: [
      { name: '业务消息', unreadCount: 0 }, { name: '系统消息', unreadCount: 0 }
    ]
  },
  mutations: {
    // 写想法弹窗的显隐
    setIdeaDialog(state, val) {
      state.ideaDialogVisible = val
    },
    setFollow(state, val) {
      state.cancelStatus = val
    },
    setUser(state, userData) {
      state.userInfo = userData
      // 存放到本地
      setItem('userInfo', state.userInfo)
    },
    setTab(state, val) {
      state.tabActive = val
    },
    previewCourse(state, previewCourse) {
      state.courseDetail = previewCourse
      // 课程预览详情
      setItem('courseDetail', state.courseDetail)
    },
    previewColumn(state, previewColumn) {
      state.columnDetail = previewColumn
      // 专栏预览详情
      setItem('columnDetail', state.columnDetail)
    },
    getCommentNum(state, num) {
      state.commentNum = num
    },
    getHotmessageData(state, val) {
      state.hotmessageData = val
    },
    setDomain(state, { videoDomain, imageDomain, originalVideoDomain }) {
      state.videoDomain = videoDomain
      state.imageDomain = imageDomain
      state.originalVideoDomain = originalVideoDomain
      // 存放到本地
      setItem('videoDomain', state.videoDomain)
      setItem('imageDomain', state.imageDomain)
      setItem('originalVideoDomain', state.originalVideoDomain)
    },
    // 未读消息数量
    setInformationCount(state, { index, data }) {
      state.informationCount[index].unreadCount = data;
    },
  },
  actions: {
    // 分别获取业务消息和系统消息数量 1.业务消息 2.系统消息
    getInformationCount({ commit }) {
      if (this.state.userInfo.accountId) {
        for (let index = 1; index < 3; index++) {
          api.innerMsgUnreadCount(index).then(res => {
            commit("setInformationCount", { index: index - 1, data: res.data });
          }).catch(err => {
            commit("setInformationCount", { index: index - 1, data: 0 });
          })
        }
      }
    }
  },
  modules: {
  }
})
