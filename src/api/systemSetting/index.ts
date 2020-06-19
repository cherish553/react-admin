import { get, post } from '@axios'
import { BannerData, BannerDataDetail, BannerDetail } from './api'
// 获取轮播图列表
export const getBannerList = (): (Promise<Array<BannerDataDetail> | []>) =>
    get<BannerData | false>('admin/bannerList')
        .then(res => (typeof res === 'boolean' ? [] : res.data))
// 轮播图添加或编辑
export const postEditBanner = (data: Partial<BannerDetail>): Promise<[]> =>
    post('admin/editBanner', data)