import { post, put, get, delete as deleteMethod } from 'axios'
/**
 * 文章
 */
export default {
  // 发布/修改文章
  saveOrUpdateArticle: params => post('article/saveOrUpdateArticle', params),
  // 保存/修改草稿
  saveOrUpdateDraftArticle: params => put('article/saveOrUpdateDraftArticle', params),
  // 获取文章列表
  getArticlelist: params => post('article/getArticlelist', params),
  // 获取文章详情
  viewArticle: articleId => get('article/viewArticle/' + articleId),
  // 获取文章作者
  getAuthorDetails: accountId => get('article/getAuthorDetails/' + accountId),
  // 删除文章
  deleteArticle: id => post('article/delete/' + id),
}
