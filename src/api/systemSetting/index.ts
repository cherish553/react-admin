import { get, post, del } from '@axios'
import { BannerData, BannerDataDetail, BannerDetail, BannerIds } from './api'
// 获取轮播图列表
export const getBannerList = (): (Promise<Array<BannerDataDetail> | []>) =>
    get<BannerData | false>('admin/bannerList')
        .then(res => (!res ? [] : res.data))
// 轮播图添加或编辑
export const postEditBanner = (data: Partial<BannerDetail>): Promise<[]> =>
    post('admin/editBanner', data)
// 轮播图删除
export const delBanner = (data: BannerIds): Promise<Boolean> => del<[]>('admin/delBanner', data).then(res => !res.length ?? false)