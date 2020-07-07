import { get } from '@axios'
import { OrderData,OrderParams } from './api'
// 获取优惠券列表
export const getOrderList = (data: OrderParams): Promise<OrderData> =>
    get('admin/orderList', data)
