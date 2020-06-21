export interface BannerParmas {
}
export interface CouponData {
   data: Array<CouponDetail>
}
export interface CouponDetail {
   created_time: string
   type_id: number
   type_name: string
   use_end_date: string
   use_start_date: string
}
export type AddCouponDetail = Pick<CouponDetail, "use_start_date" | "use_start_date" | "type_name"> & {
   type: number
   type_money: string
   min_goods_amount: string
}

export interface NewUserDetail {
   newUserActivity: string
   newUserCoupon: string
   newUserCouponMoney: string
   newUserCouponMinMoney: string
}

// export interface AddCoupon{

// }
// export type BannerDetail = Pick<CouponDetailData, "img_url" | "jump_link" | "title"> & { sort: number | undefined | string }
