import { get, post, del } from '@axios'
import { AfterSaleListData, AfterSaleDetailData } from './api'
// 申请售后列表
export const getAfterSaleList = ({ page }: { page: number }): (Promise<CommonPagination<AfterSaleListData>>) =>
    get('admin/afterSale', { page })
// 售后详情
export const getAfterSaleDetail = (data: { id: number }): (Promise<AfterSaleDetailData>) =>
    get(`admin/afterSaleDetail`, data)