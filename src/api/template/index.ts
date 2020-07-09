import { get, del, post } from '@axios'
import { UserParmas, GoodsModel } from './api'

// 获取模板列表
export const getTemplateList = (data: UserParmas): Promise<CommonPagination<any>> => get('admin/goodsModelList', data)
// 删除模板列表
export const delTemplateList = (data: { id: string }) => del('admin/delGoodsModel', data)
// 新增模板
export const postEditGoodsModel = (data: GoodsModel) => post(`admin/editGoodsModel`, data)
