export interface AfterSaleListData {
   created_at: string
   id: number
   img: string
   info: string
   order_id: number
   order_info: OrderDetail
   address: string
   address_id: null
   bonus_ids: string
   city: number
   comments: number
   country: number
   created_at: string
   discount_amount: string
   district: number
   latitude: null
   longitude: null
   mobile: string
   notes: null
   order_amount: string
   order_id: number
   order_sn: string
   pay_amount: string
   pay_code: string
   pay_name: string
   pay_time: number
   post_code: string
   post_mode: number
   province: number
   realname: string
   service_amount: string
   status: number
   street: number
   transaction_id: string
   type: null
   updated_at: string
   user_id: number
   reply: null
   status: number
   updated_at: string
   user_name: string
}
export interface OrderDetail {
   address: string
   address_id: null
   bonus_ids: string
   city: number
   comments: number
   country: number
   created_at: string
   discount_amount: string
   district: number
   latitude: null
   longitude: null
   mobile: string
   notes: null
   order_amount: string
   order_id: number
   order_sn: string
   pay_amount: string
   pay_code: string
   pay_name: string
   pay_time: number
   post_code: string
   post_mode: number
   province: number
   realname: string
   service_amount: string
   status: number
   street: number
   transaction_id: string
   type: null
   updated_at: string
   user_id: number
}
export interface AfterSaleDetailData {
   order_goods: Array<OrderGoods>
   order_info: OrderInfo
   reply: string
   info: string
   img: string
}
interface OrderGoods {
   index_img: string
   id: string
   goos_name: string

}
interface OrderInfo {
   realname: string
   pay_time: string
   order_sn: string
}