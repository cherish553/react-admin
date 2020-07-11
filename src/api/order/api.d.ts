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
export interface OrderParams {
   order_sn: string
   startTime: string
   endTime: string
   page: number
}
export interface OrderCommentData {
   order_id: string
   order_sn: string
   pay_amount: string
   pay_time: string
   realname: string
}
export interface orderDetailData {
   order_id: number
   order_sn: string
   pay_amount: string
   pay_time: number
   realname: string
   comments: Array<commentDetail>
}
export interface commentDetail {
   comment_id: number
   goods_id: number
   remark: string
   reply: string
   user_id: number
}
// export interface AddCoupon{

// }
// export type BannerDetail = Pick<CouponDetailData, string> & { sort: number | undefined | string }
