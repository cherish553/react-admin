import { get, post, del } from '@axios'
import { CouponDetail, CouponData, AddCouponDetail, NewUserDetail } from './api'
// 获取优惠券列表
export const getCouponList = ({ page }: { page: number }): (Promise<Array<CouponDetail> | []>) =>
    get<CouponData | false>('admin/couponList', { page })
        .then(res => (!res ? [] : res.data))
// 优惠券添加
export const postAddBanner = (data: AddCouponDetail): Promise<[]> =>
    post('admin/editCoupon', { ...data, id: '' })

// 优惠券删除
export const delCoupon = (data: DelIds): Promise<Boolean> => del<[]>('admin/delCoupon', data).then(res => !res.length ?? false)

const NewUser = ['newUserActivity', 'newUserCoupon', 'newUserCouponMoney', 'newUserCouponMinMoney']

// 新用户优惠券活动信息接口
export const getNewUserActive = (): Promise<NewUserDetail> => get<Array<{ value: string }>>('admin/getNewUserActivity').then(res => (res.reduce((pre: NewUserDetail, now: { value: string }, index: number) => {
    pre[NewUser[index] as keyof NewUserDetail] = now.value
    return pre
}, {} as NewUserDetail)))

// 新用户优惠券活动设置接口
export const postAddNewUserActive = (data: NewUserDetail): Promise<[]> => post('admin/addNewUserActivity', data)
