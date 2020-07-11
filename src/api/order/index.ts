import { get } from '@axios'
import { OrderData, OrderParams, OrderCommentData,orderDetailData } from './api'
// 获取优惠券列表
export const getOrderList = (data: OrderParams): Promise<OrderData> =>
    get('admin/orderList', data)
// 评论订单列表接口
export const getCommentsOrderList = (data: any): Promise<CommonPagination<OrderCommentData>> => get(`admin/commentsOrderList`, data)
// 订单详情
export const getOrderInfo = (data: { order_id: number }): Promise<orderDetailData> => get(`admin/orderInfo`, data)
