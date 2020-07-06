import { get, post, del } from '@axios'
import { OrderData } from './api'
// 获取优惠券列表
export const getOrderList = (data: any): Promise<OrderData> =>
    get('admin/orderList', data)
