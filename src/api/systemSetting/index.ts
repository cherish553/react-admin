import { get } from '@axios'
import { BannerData, BannerDataDetail } from './api'
// 获取轮播图列表
export const getBannerList = (): (Promise<Array<BannerDataDetail> | []>) =>
    get<BannerData | false>('admin/bannerList')
        .then(res => (typeof res === 'boolean' ? [] : res.data))