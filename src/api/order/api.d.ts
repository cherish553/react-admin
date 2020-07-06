export interface OrderData {
   data: Array<OrderDetail>
}
export interface OrderDetail {
   order_id: number
   order_sn: string
   pay_amount: string
   pay_time: string
   realname: string
}
// export interface AddCoupon{

// }
// export type BannerDetail = Pick<CouponDetailData, "img_url" | "jump_link" | "title"> & { sort: number | undefined | string }
