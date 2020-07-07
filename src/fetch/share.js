// 分享相关
import { get } from 'axios'
export default {
    
    // 获取分享配置
    getShareConfig: () => get("/share/config?host="+ encodeURIComponent(location.href.split('#')[0]))

}