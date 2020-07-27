export interface systemData {
   app_id: string
   app_key: string
   app_secret: string
   express_key: string
   mch_id: string
}
export interface StatisticsData {
   cycle_money: number
   cycle_orders: number
   dispute_orders: number
   today_order_amount: number
   today_users: number
   total_commission: string
   total_order_amount: number
   total_orders: number
   total_users: number,
   total_wait_orders: number
   wait_orders: number
}