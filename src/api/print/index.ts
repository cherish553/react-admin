import { get, post, del } from '@axios'
import { GoodClasslistData, GoodListData, EditGoodClass, GoodSpecDetail, EditGoodSpecParam, EditPrintParam, GoodsInfoData } from './api'

// 获取印品分类列表
export const getGoodsClassList = ({ page }: { page: number }): Promise<CommonPagination<GoodClasslistData>> => get('admin/goodsClassList', { page })

// 获取印品列表
export const getGoodList = ({ page }: { page: number }): Promise<CommonPagination<GoodListData>> => get('admin/goodsList', { page })

// 新增、编辑印品
export const postEditGoods = ({ specList, imgList, ...rest }: EditPrintParam) => post(`admin/editGoods`, {
    specList: JSON.stringify(specList),
    imgList: JSON.stringify(imgList),
    ...rest
})

// 删除印品 
export const delGoods = (id: string[]) => del(`admin/delGoods`, { id: id.join(',') })

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

// 编辑印品页面数据接口
export const getGoodsInfo = (data: { id?: number | string }): Promise<GoodsInfoData> => get<GoodsInfoData>(`admin/getGoodsInfo`, data).then(res => {
    res.specList = res.specList.map(item => ({ ...item, value: '' }))
    if (Object.keys(res.goodsInfo).length) {
        res.goodsInfo.spec_list.forEach(item => {
            item.size_spec_name = res.specList[0].children_list.filter(items =>
                items.id.toString() === item.size_spec_id.toString())[0].name
            item.binding_spec_name = res.specList[3].children_list.filter(items =>
                items.id.toString() === item.binding_spec_id.toString())[0].name
            item.paper_spec_name = res.specList[2].children_list.filter(items =>
                items.id.toString() === item.paper_spec_id.toString())[0].name
            item.printing_spec_name = res.specList[4].children_list.filter(items =>
                items.id.toString() === item.printing_spec_id.toString())[0].name
            item.style_spec_name = res.specList[1].children_list.filter(items =>
                items.id.toString() === item.style_spec_id.toString())[0].name
        })
    }
    return res
})
// 印品热门设置
export const postSetRecommend = (id: number[]) => post(`admin/setRecommend`, { id: id.join(',') })

// 印品取消热门设置
export const postDelRecommend = (id: number[]) => post(`admin/delRecommend`, { id: id.join(',') })
// setRecommend