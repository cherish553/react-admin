import { get, del } from '@axios'
import { UserParmas, UserData } from './api'

// 获取模板列表
export const getTemplateList = (data: UserParmas): Promise<CommonPagination<any>> => get('admin/goodsModelList', data)
// 删除模板列表
export const delTemplateList = (data: { id: string }) => del('admin/delGoodsModel', data)