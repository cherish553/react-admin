import { get, post, del } from '@axios'
import { GoodClasslistData, GoodListData, EditGoodClass } from './api'

// 获取印品分类列表
export const getGoodsClassList = ({ page }: { page: number }): Promise<CommonPagination<GoodClasslistData>> => get('admin/goodsClassList', { page })

// 获取印品列表
export const getGoodList = ({ page }: { page: number }): Promise<CommonPagination<GoodListData>> => get('admin/goodsList', { page })

// 编辑印品分类
export const postEditGoodClass = (data: EditGoodClass): Promise<[]> => post('admin/editGoodsClass', data)

// 新增印品分类
export const postaddGoodClass = ({ name }: EditGoodClass): Promise<[]> => post('admin/editGoodsClass', { name })

// 删除印品分类
export const delGoodClass = (data: DelIds): Promise<Boolean> => del<[]>('admin/delGoodsClass', data).then(res => !res.length ?? false)