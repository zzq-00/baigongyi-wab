import { post, put, get, delete as deleteMethod } from "axios";
/**
 * 驿视频
 */
export default {
  // 获取驿视频对应分区下的推荐标签（不传areaId为查询所有推荐标签）
  yivideoAreaRecommendTags: areaId => get("yivideo/label/recommend?areaId="+ areaId),
  // 获取驿视频分区
  yivideoAreas: () => post("yivideo/area/list"),
  // 根据父级分区id获取子级分区
  yivideoSonAreas: parentAreaId => post("yivideo/area/secondArea/"+ parentAreaId),
  // 获取驿视频首页一级分区（只包含有视频的一级分区）
  yivideoIndexFirstAreas: () => get("yivideo/indexRecommentFirstArea"),
  // 获取一级分区或微课堂下的二级分区
  yivideoFirstAreas: parentAreaId => get("yivideo/area/firstArea/list"+ (parentAreaId ? "?parentAreaId="+ parentAreaId : "")),
  // 驿视频分页查询
  yivideoList: params => post("yivideo/list", params),
  // 驿视频详情
  yivideoDetail: id => get('yivideo/'+ id),
  // 驿视频搜索
  yivideoSearch: params => post("yivideo/searchByKeyWords", params),
  // 驿视频首页轮播图
  yivideoHomeSlider: () => get('Slideshow/list?moduleType=2'),
  // 微课堂首页轮播图
  microClassroomSlider: () => get('Slideshow/list?moduleType=3'),
  // 发布驿视频
  releaseYiVideo: params => post("yivideo/publish", params),
  // 存草稿驿视频
  draftYiVideo: params => post("yivideo/draft", params),
  // 更新驿视频信息
  updateYiVideo: params => put("yivideo", params),
  // 添加自定义标签
  addCustomLabel: params => post("yivideo/label", params),
  // 取驿视频首页推荐/全部分区列表
  yivideoRecommends: params => post("yivideo/partitionList", params),
  // 微课堂一周热门
  yivideoWeekHotest: id => post("yivideo/oneWeekHot/"+ id),
  // 微课堂一周上新
  yivideoWeekLatest: id => post("yivideo/oneWeekNew/"+ id),
  //根据id删除驿视频
  deleteYivideo: id => deleteMethod("yivideo/"+ id),
  // 驿视频详情推荐
  yivideoDetailRecommends: yivideoId => post("yivideo/recommend/"+ yivideoId),
  //查看驳回原因
  yivideoTurnDown: id => post("yivideo/auditTurnDown/"+ id),
  //查看屏蔽原因
  yivideoShield: id => post("yivideo/auditShield/"+ id),
  // 记录驿视频播放次数
  yivideoBroadcast: id => get("yivideo/yivideoBroadcast/"+ id),
  // 记录驿视频播放进度
  yivideoPlayHistory: params => post("/videoPlayHistory", params),
  // 查询驿视频播放进度
  getYivideoPlayHistory: (id, type) => get(`/videoPlayHistory/${type}/${id}`),
};
