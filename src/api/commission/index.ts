import { get, post, del } from '@axios'
import { ProportionListData, WithdrawalListData, HandleWithdrawal } from './api'
// 分佣列表
export const getProportionList = (data: { page: number }): Promise<CommonPagination<ProportionListData>> => get(`admin/proportionList`, data)
// 提现申请列表
export const getWithdrawalList = (data: any): Promise<CommonPagination<WithdrawalListData>> => get(`admin/withdrawalList`, data)
// 处理提现申请
const getHandleWithdrawal = (data: HandleWithdrawal) => get(`admin/handleWithdrawal`, data)
// 设置为审核通过
export const getHandleWithdrawalPass = ({ id }: { id: string[] }) => getHandleWithdrawal({ id: id.join(','), status: 1 })
// 设置为审核驳回
export const getHandleWithdrawalReject = ({ id }: { id: string[] }) => getHandleWithdrawal({ id: id.join(','), status: 2 })