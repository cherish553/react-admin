import { get } from '@axios'
import { GoodClasslistData, GoodListData } from './api'

// 获取印品分类列表
export const getGoodsClassList = (data?: any): Promise<CommonPagination<GoodClasslistData>> => get('admin/goodsClassList', data)

// 获取印品列表
export const getGoodList = (data?: any): Promise<CommonPagination<GoodListData>> => get('admin/goodsList', data)
