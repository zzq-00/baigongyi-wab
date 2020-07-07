import { post, put, get, delete as deleteMethod } from 'axios'
/**
 * 浏览记录
 */
export default {
    browseRecord: params => post('browseRecord', params),
}