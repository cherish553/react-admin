import { get } from '@axios'
import { UserParmas, UserData } from './api'
import { commonPagination } from '@/index.d.ts'
// export const getBannerList = (): (Promise<Array<BannerDataDetail> | []>) =>
//     get<BannerData | false>('admin/bannerList')
//         .then(res => (typeof res === 'boolean' ? [] : res.data))

// 获取用户列表
export const getUserList = (data: UserParmas): Promise<commonPagination<Array<UserData>>> => get('admin/userList', data)