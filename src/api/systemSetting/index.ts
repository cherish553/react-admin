import { get } from '@axios'
import cookie from 'js-cookie'
// import { BannerParmas } from './api'
export const getBannerList = (): Promise<any> => get('admin/bannerList',{api_token:cookie.get('token')})