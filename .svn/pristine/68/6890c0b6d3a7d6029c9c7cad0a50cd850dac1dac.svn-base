<template>
  <div class="idea-list" :class="{'no-border-radius': $route.path === '/myHome/myIdea'}" v-if="item.id">
    <!-- 头像 名字 时间 关注 -->
    <div class='title'>
      <img @click="openUserCenter(item.accountId)" :src="item.avatar ? $store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')">
      <div>
        <span @click="openUserCenter(item.accountId)">{{item.nickName}}</span>
        <!-- 圈子 -->
        <template v-if="type !== 'idea' && type !== 'myIdea'">
          <span v-if="item.leader" class="font-12" style="margin-left: 5px;padding: 2px 4px;border: 1px solid #E23732;border-radius:2px;background-color: #E23732;color: #fff;">圈主</span>
          <!-- 仅圈子主页有置顶功能 -->
          <span v-if="(currentIndex==='全部' && item.top) || (currentIndex==='精选' && item.featuredTop)" class="font-12 red" style="margin-left: 5px;padding: 2px 4px;border: 1px solid #E23732;border-radius:2px;">置顶</span>
        </template>
        <br>
        <span class="font-12">{{item.createTime || item.publishTime | formatDate}}</span>
      </div>
      <!-- 圈子 -->
      <template v-if="type !== 'idea' && type !== 'myIdea'">
        <!-- 当评论的发言被删除时，显示，点击删除评论 -->
        <el-button v-if="item.deleted" size="mini" @click="delGroupComment(item)">删除</el-button>
        <el-dropdown trigger="click" placement="bottom" v-if="item.leaderId===$store.state.userInfo.accountId || item.accountId===$store.state.userInfo.accountId" @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="@/assets/images/group-more.png" alt="" style="cursor: pointer;">
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 圈子被屏蔽时仅保留删除操作 -->
            <!-- 仅圈子主页有置顶功能 -->
            <el-dropdown-item v-if="!item.shield&&item.leaderId===$store.state.userInfo.accountId&&$route.name === 'groupIdeaHome'" :command="{name: 'momentToTop',data: item}">{{(currentIndex==='全部' && item.top) || (currentIndex==='精选' && item.featuredTop)?'取消置顶':'置顶'}}</el-dropdown-item>
            <el-dropdown-item v-if="!item.shield&&item.leaderId===$store.state.userInfo.accountId" :command="{name: 'momentToFeatured',data: item}">{{item.featured ?'取消精选':'设为精选'}}</el-dropdown-item>
            <el-dropdown-item :command="{name: 'delMoment',data: item}">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <!-- 想法 -->
      <template v-else>
        <template v-if="$store.state.userInfo && ($store.state.userInfo.accountId === item.accountId) && type==='myIdea'">
          <el-button @click="deleteIdeaById(item)">删除</el-button>
        </template>
        <template v-if="$store.state.userInfo && ($store.state.userInfo.accountId !== item.accountId)">
          <!-- 1 已关注 2 无关注 3互相关注 -->
          <el-button @click="addAttention(item)" v-if="!item.concernStatus || item.concernStatus===2">关注</el-button>
          <el-button @click="delAttention(item)" v-else>{{item.concernStatus===1?'已关注':'互相关注'}}</el-button>
        </template>
      </template>
    </div>
    <div v-if="item.deleted" style="padding: 10px 0 20px;">
      <p style="font-size: 15px;color: #999;">该发言已删除</p>
      <div class="group-name" v-if="item.groupName">
        <img src="@/assets/images/pingbi.png" alt="已屏蔽" title="已屏蔽" v-if="item.shield" style="margin-right: 5px;">
        <span class="red" @click="!item.shield && $router.push('/engineering/groupHome/'+item.groupId)">{{item.groupName}}</span>
      </div>
    </div>
    <template v-else>
      <!-- 想法内容 -->
      <div class='content'>
        <p>
          <span v-html="computedContent(item)">
          </span>
          <span class="fold red" v-if='computedShowFold(item)' @click='item.showFold = !item.showFold'>
            {{item.showFold ? '收起全文': '展开全文'}}
          </span>
        </p>
        <div class='image-grid'>
          <div :class="{'one': item.ideaImgs.length===1, 'three': item.ideaImgs.length%3===0 || item.ideaImgs.length===5}">
            <el-image v-for='(erItem,erIndex) in item.ideaImgs' :src='$store.state.imageDomain + erItem.previewUrl' :key="erIndex" :preview-src-list="getSrcList(item.ideaImgs, erIndex)">
            </el-image>
          </div>
        </div>
        <div class="group-name" v-if="item.groupName">
          <img src="@/assets/images/pingbi.png" alt="已屏蔽" title="已屏蔽" v-if="item.shield" style="margin-right: 5px;">
          <span class="red" @click="!item.shield && $router.push('/engineering/groupHome/'+item.groupId)">{{item.groupName}}</span>
        </div>
      </div>
      <!-- 点赞 评论 分享 -->
      <div class='footer'>
        <div class='footer_top'>
          <div>
            <p class="operate-bar" @click="likeOperate(item)">
              <img v-if="item.likeStatus" src="@/assets/images/yizan.png" alt="">
              <img v-else src="@/assets/images/zan.png" alt="">
              <span>{{item.likeCount}}</span>
            </p>
          </div>
          <div>
            <p class="operate-bar" @click='viewCommentList(item)'>
              <img src="@/assets/images/pinglun.png" alt="">
              <span>{{item.commentCount}}</span>
            </p>
          </div>
          <div>
            <el-popover placement="bottom" trigger="manual" @show="wxShare(item.id)" width="150" v-model="shareVisible" v-if="item.groupType !== 2 && !groupDetail.shield && !item.shield">
              <ul class="share-list" ref="NewsToolBox">
                <li @click="copyText(item.id)" style="font-size: 12px;border-bottom: 1px solid #eee;padding: 9px;">
                  <img src="@/assets/images/lianjie.png" alt="">
                  <span style="vertical-align: middle;margin-left: 8px;cursor: pointer;">复制链接</span>
                </li>
                <li style="font-size: 12px;line-height: 30px;padding: 0 9px 9px;">
                  <img src="@/assets/images/weixin.png" alt="">
                  <span style="vertical-align: middle;margin-left: 8px;">微信扫一扫</span>
                  <canvas :ref="'canvas'+item.id" style="max-width: 74px;max-height: 74px;display: block;margin: 0 auto;"></canvas>
                </li>
              </ul>
              <p class="operate-bar" slot="reference" @click.stop="showShare">
                <img src="@/assets/images/fenxiang.png" alt="" />
                <span>分享</span>
              </p>
            </el-popover>
          </div>
        </div>
        <div class='footer_bottom newsHotDetails_comment' v-loading="operating" v-if='item.showComment'>
          <comment-com   :num="type=='idea'?'10':'11'" :thisid="commentListParams.paramObject.objId"></comment-com>
          <!-- <div class='add_comment'>
            <div>
              <img class="header-img" :src="$store.state.userInfo&&$store.state.userInfo.avatar?$store.state.imageDomain + $store.state.userInfo.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
              <el-input type="textarea" maxlength="1000" :rows="5" placeholder="请输入内容" v-model.trim="commentParams.comment">
              </el-input>
            </div>
            <p>
              <el-button type="danger" :disabled="!commentParams.comment.length" @click='commentIdea(item)'>评 论</el-button>
            </p>
          </div>
          <ul class="comment-list">
            <li v-for="(erItem, erIndex) in item.commentList" :key="erIndex">
              <img class="header-img" @click="openUserCenter(erItem.accountId)" :src="erItem.avatar?$store.state.imageDomain + erItem.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
              <div>
                <div class="clearfix">
                  <span class="fl" style="cursor: pointer;" @click="openUserCenter(erItem.accountId)">{{erItem.nickName}}</span> -->
                  <!-- | commentDate -->
                  <!-- <span class="time fr">{{erItem.commentsTime | commentDate}}</span>
                </div>
                <p v-html="strReplace(erItem.comment)"></p>
              </div>
            </li>
          </ul>
          <p class="gray comment-tips" v-if="!item.commentList.length">暂无评论</p>
          <p class="red comment-tips" v-if="item.commentList.length > 9&&item.commentList.length<item.totalCommentNum" @click="viewMore(item)">查看更多</p> -->
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import api from '@/fetch'
import QRCode from 'qrcode'
import commentCom from '@/components/commentCom'

export default {
   components: {
    commentCom
  },
  props: {
    item: Object,
    groupDetail: {
      type: Object,
      default: {}
    },
    type: {
      default: 'idea' // myIdea groupWithId published commented
    }
  },
  data() {
    var computedType = () => {
      return this.type === 'idea' || this.type === 'myIdea' ? 10 : 11
    }
    return {
      operating: false,
      shareVisible: false,
      totalCommentNum: 0,
      objType: computedType(),
      // 添加评论参数
      commentParams: {
        comment: '',
        objId: '',
        objType: computedType()
      },
      // 评论列表参数
      commentListParams: {
        asc: true,
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          objId: '',
          objType: computedType()
        }
      }
    }
  },
  computed: {
    currentIndex() {
      // 圈子主页：全部/精选
      if (this.$route.name === 'groupIdeaHome') return this.$route.query.currentIndex || '全部'
      return ''
    }
  },
  methods: {
    // 定位预览图
    getSrcList(imageList, erIndex){
      let arr = imageList.slice(erIndex).concat(imageList.slice(0,erIndex))
      return arr.map(item => this.$store.state.imageDomain + item.url + '?x-oss-process=image/auto-orient,1')
    },
    strReplace(str) {
      return str.replace(/\n/g, '<br/>')
    },
    computedContent(item) {
      if (!item.showFold) {
        if (item.content.length > 260) {
          return item.content.slice(0, 255).replace(/\n/g, '<br>') + '...'
        } else if (item.content.split('\n').length > 6) {
          return item.content
            .split('\n')
            .slice(0, 6)
            .join('<br>')
        }
      }
      return item.content.replace(/\n/g, '<br>')
    },
    computedShowFold(item) {
      let length = item.content.split('\n').length
      return length > 6 || item.content.length > 265
    },
    handleCommand(command) {
      this[command.name](command.data)
    },
    // 设为精选/取消
    momentToFeatured(item) {
      // 发言详情页group/getMomentDetail/xxx有返回groupId，发言列表页没返回item.groupId
      let groupId = item.groupId || this.$route.params.id
      api.momentToFeatured({ featured: !item.featured, groupId: groupId, momentId: item.id }).then(res => {
        item.featured ? this.$message.success('取消设为精选成功') : this.$message.success('设为精选成功')
        setTimeout(() => {
          window.location.reload()
        }, 500)
      })
    },
    // 发言置顶
    async momentToTop(item) {
      // 发言详情页group/getMomentDetail/xxx有返回groupId，发言列表页没返回item.groupId
      let groupId = item.groupId || this.$route.params.id
      if (this.currentIndex === '精选') {
        await api.momentToFeaturedTop({ featuredTop: !item.featuredTop, groupId: groupId, momentId: item.id })
        item.featuredTop ? this.$message.success('取消置顶成功') : this.$message.success('置顶成功')
      } else {
        await api.momentToTop({ top: !item.top, groupId: groupId, momentId: item.id })
        item.top ? this.$message.success('取消置顶成功') : this.$message.success('置顶成功')
      }
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    // 删除已被删除发言的评论
    delGroupComment(item) {
      api.delGroupComment(item.id).then(res => {
        this.$message.success('删除成功')
        this.$emit('getNewData', item)
      })
    },
    // 删除圈子发言
    delMoment(item) {
      let text =
        item.leaderId === this.$store.state.userInfo.accountId
          ? '删除后发言将彻底清除，所有用户无法再查看，确定删除？'
          : '确定删除？'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.delMoment(item.id).then(res => {
            this.$message.success('删除成功')
            if (this.$route.name === 'groupIdeaDetail') return window.close()
            this.$emit('getNewData', item)
          })
        })
        .catch(() => {})
    },
    // 删除想法
    deleteIdeaById(item) {
      this.$confirm(`是否删除该想法，删除后该想法相关的点赞、评论、分享等相关信息都将被清除且无法恢复！`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.deleteIdeaById(item.id).then(res => {
            this.$message.success('删除成功')
            this.$emit('getNewData', item)
          })
        })
        .catch(() => {})
    },
    // 添加关注人
    addAttention(item) {
      api.addAttention({ objId: item.accountId, objType: 6 }).then(res => {
        item.concernStatus = res.data
        this.$emit('refreshAttention', item)
      })
    },
    delAttention(item) {
      api.delAttention({ objId: item.accountId, objType: 6 }).then(res => {
        item.concernStatus = 2
        this.$emit('refreshAttention', item)
      })
    },
    // 点赞
    async likeOperate(item) {
      try {
        if (this.type === 'groupWithId') {
          // 圈子发言详情页没有传入props：groupDetail
          let groupDetail = this.groupDetail.id ? this.groupDetail : item
          let joinStatus
          if (groupDetail.join !== '3' && groupDetail.join !== '5' && groupDetail.join !== '10') {
            joinStatus = await this.applyToJoin(groupDetail)
            if (!joinStatus) return
          }
          if (joinStatus === '审核中') return this.$message.success('申请审核中...')
        }
        if (this.operating) return
        this.operating = true
        if (item.likeStatus) {
          await api.likeDelete(this.objType, item.id)
          item.likeStatus = false
          item.likeCount--
        } else {
          await api.likeAdd({ objType: this.objType, objId: item.id })
          item.likeStatus = true
          item.likeCount++
        }
        this.operating = false
      } catch (error) {
        this.operating = false
      }
    },
    // // 发布评论
    // async commentIdea(item) {
    //   if (this.type === 'groupWithId') {
    //     // 圈子发言详情页没有传入props：groupDetail
    //     let groupDetail = this.groupDetail.id ? this.groupDetail : item
    //     if (groupDetail.shutUp) return this.$message.warning('您已被禁言')
    //     let joinStatus
    //     if (groupDetail.join !== '3' && groupDetail.join !== '5' && groupDetail.join !== '10') {
    //       joinStatus = await this.applyToJoin(groupDetail)
    //       if (!joinStatus) return
    //     }
    //     if (joinStatus === '审核中') return this.$message.success('申请审核中...')
    //   }
    //   this.commentParams.objId = item.id
    //   await api.addComment(this.commentParams)
    //   this.$message.success('评论成功')
    //   item.commentCount++
    //   let { data } = await this.getCommentList()
    //   item.commentList = data.records
    //   this.commentParams.comment = ''
    // },
    // 展开/关闭 评论列表
    async viewCommentList(item) {
      if (item.showComment) return (item.showComment = false)
      item.showComment = true
      this.commentListParams.paramObject.objId = item.id
      // let { data } = await this.getCommentList()
      // this.operating = false
      // item.commentList = data.records
      // item.totalCommentNum = data.total
    },
    // viewMore(item) {
    //   if (this.$route.name === 'groupIdeaDetail' || this.$route.name === 'ideaDetail') {
    //     this.operating = true
    //     this.commentListParams.pageNum++
    //     this.getCommentList().then(({ data }) => {
    //       this.operating = false
    //       item.commentList = [...item.commentList, ...data.records]
    //       item.totalCommentNum = data.total
    //     })
    //   } else {
    //     if (this.objType === 11) {
    //       window.open('/engineering/groupIdea/' + item.id)
    //     } else {
    //       window.open('/engineering/' + item.id)
    //     }
    //   }
    // },
    // 获取评论
    getCommentList() {
      return api.getCommentList(this.commentListParams)
    },
    // 显示分享
    async showShare() {
      if (this.type === 'groupWithId') {
        // 圈子发言详情页没有传入props：groupDetail
        let groupDetail = this.groupDetail.id ? this.groupDetail : item
        let joinStatus
        if (groupDetail.join !== '3' && groupDetail.join !== '5' && groupDetail.join !== '10') {
          joinStatus = await this.applyToJoin(groupDetail)
          if (!joinStatus) return
        }
        if (joinStatus === '审核中') return this.$message.success('申请审核中...')
      }
      this.shareVisible = !this.shareVisible
    },
    // 申请加入圈子
    async applyToJoin(item) {
      try {
        let promptObj = {}
        if (item.type === 2) {
          promptObj = await this.$prompt('加入圈子参与互动，是否申请加入（最多100字）', '申请加入圈子', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '申请加入',
            cancelButtonText: '取消',
            inputValidator: val => !!val && val.trim().length > 0 && val.length <= 100,
            inputErrorMessage: '字数不超过100'
          })
        } else {
          await this.$confirm('加入圈子参与互动，是否加入？', '提示', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '加入圈子',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
        await api.applyGroup({ groupId: item.id, memberId: this.$store.state.userInfo.accountId, reason: promptObj.value || '' })
        if (item.type === 1) {
          item.join = '3'
          return '已加入'
        } else {
          item.join = '1'
          return '审核中'
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 复制链接
    copyText(id) {
      let text
      if (this.objType === 10) {
        text = `${window.location.origin}/engineering/${id}`
      } else if (this.objType === 11) {
        text = `${window.location.origin}/engineering/groupIdea/${id}`
      }
      var textarea = document.createElement('textarea') //创建input对象
      var currentFocus = document.activeElement //当前获得焦点的元素
      var toolBoxwrap = this.$refs.NewsToolBox //将文本框插入到NewsToolBox这个之后
      toolBoxwrap.appendChild(textarea) //添加元素
      textarea.value = text
      textarea.focus()
      if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length) //获取光标起始位置到结束位置
      } else {
        textarea.select()
      }
      try {
        var flag = document.execCommand('copy') //执行复制
      } catch (eo) {
        var flag = false
      }
      toolBoxwrap.removeChild(textarea) //删除元素
      currentFocus.focus()
      return flag ? this.$message.success('链接复制成功') : this.$message.warning('链接复制失败')
    },
    // 微信分享
    wxShare(id) {
      var weixinShareLink
      if (this.objType === 10) {
        weixinShareLink = process.env.VUE_APP_M_URL + 'share/idea?id=' + id
      } else if (this.objType === 11) {
        weixinShareLink = process.env.VUE_APP_M_URL + 'share/circleDetails?id=' + id
      }
      QRCode.toCanvas(this.$refs['canvas' + id], weixinShareLink, error => {
        if (error) console.error(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.idea-list {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px 18px 0;
  overflow: hidden;
  &.no-border-radius {
    border-radius: initial;
  }
  .title {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
    > div:nth-child(2) {
      flex: 1;
      margin-left: 11px;
      overflow: hidden;
      > span {
        display: inline-block;
        &:first-child {
          cursor: pointer;
        }
        &:last-child {
          color: #999999;
          margin-top: 5px;
        }
      }
    }
    .el-button {
      color: #e23732;
      border-color: rgb(246, 195, 194);
    }
  }
  .group-name {
    font-size: 15px;
    margin-top: 10px;
    > span {
      cursor: pointer;
      padding: 5px 15px;
      background-color: #f2f3f4;
      border-radius: 15px;
    }
  }
  .content {
    > p {
      position: relative;
      line-height: 22px;
      color: #666666;
      word-break: break-all;
      text-align: justify;
      font-size: 15px;
      .fold {
        margin-left: 5px;
        white-space: nowrap;
        cursor: pointer;
      }
    }
    .image-grid {
      > div {
        display: flex;
        flex-wrap: wrap;
        .el-image {
          width: 120px;
          height: 120px;
          margin: 10px 10px 0 0;
        }
        &.one {
          .el-image {
            width: 250px;
            height: auto;
            max-height: 400px;
            margin: 10px 10px 0 0;
          }
        }
        &.three {
          width: 410px;
        }
      }
    }
  }
  .footer {
    border-top: 1px solid #eee;
    margin: 20px -20px 0;
    .footer_top {
      display: flex;
      align-items: center;
      > div {
        cursor: pointer;
        flex: 1;
        .operate-bar {
          height: 20px;
          line-height: 20px;
          text-align: center;
          margin: 10px 0;
          outline-style: none;
          > img {
            height: 16px;
          }
          > span {
            color: #999999;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        &:not(:last-child) .operate-bar {
          border-right: 1px solid #eee;
        }
      }
    }
    .newsHotDetails_comment {
      margin-top: 5px;
      margin-left: 20px;
      padding-top: 12px;
      border-top: 1px solid #eee;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 49%;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        background-color: #fff;
      }
      > .add_comment {
        padding-right: 18px;
        > div {
          display: flex;
        }
        > p {
          padding-top: 10px;
          text-align: right;
          > .el-button {
            width: 90px;
          }
        }
      }
      .comment-list {
        margin-top: 20px;
        > li {
          display: flex;
          .header-img {
            margin-top: 10px;
          }
          > div {
            flex: 1;
            border-top: 1px solid #eee;
            padding: 20px 18px 20px 0;
            > p {
              color: #666;
              margin-top: 8px;
              word-break: break-all;
            }
          }
          .time {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .comment-tips {
        margin-left: 50px;
        padding: 10px 0;
        text-align: center;
        border-top: 1px solid #eee;
        cursor: pointer;
      }
    }
  }
}
.header-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
