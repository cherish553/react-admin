import { get, post, del } from '@axios'
import { GoodClasslistData, GoodListData, EditGoodClass, GoodSpecDetail, EditGoodSpecParam } from './api'

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

// 印品规格列表
export const getGoodSpecList = (): Promise<Array<(GoodSpecDetail)> | []> => get<{ data: GoodSpecDetail[] }>(`admin/goodsSpecList`).then(res => {
    const data = res.data.map(item => ({ ...item, children_list: item.children_list.map(items => ({ ...items, children_id: items.id, id: item.id })) }))
    return data || []
})

// 编辑印品规格
export const postEditGoodSpec = (data: EditGoodSpecParam): Promise<[]> => post(`admin/editGoodsSpec`, data)

// 添加印品规格
export const postAddGoodSpec = ({ children_id, ...rest }: EditGoodSpecParam): Promise<[]> => post(`admin/editGoodsSpec`, { ...rest })

// 删除印品规格
export const delGoodSpec = (data: { id: string }): Promise<[]> => del(`admin/delGoodsSpec`, data)