import { get, del, post } from '@axios'
import { UserParmas, GoodsModel, TemplateListData, PageList, List } from './api'
// 获取模板列表
export const getTemplateList = (data: UserParmas): Promise<CommonPagination<TemplateListData>> => get('admin/goodsModelList', data)
// 删除模板列表
export const delTemplateList = (data: { id: string }) => del('admin/delGoodsModel', data)
// 新增模板
export const postEditGoodsModel = ({ pageList, numberPages, size, id, name }: GoodsModel) => post(`admin/editGoodsModel`, { id, name, size, numberPages: +numberPages + 2, pageList: JSON.stringify(pageList) })
// 模板详情
export const getGoodsModel = async (data: { id: string }): Promise<GoodsModel<List>> => {
    const { pageList: pageLists, numberPages, ...rest } = await get<GoodsModel<PageList[]>>(`admin/getGoodsModel`, data)
    console.log(pageLists)
    const pageList: List[] = pageLists.map((item) => (
        item.reduce((pre, now, index) => {
            +now.type === 1 ?
                pre.imageList[`image${index}`] = {
                    height: `${now.height}px`,
                    width: `${now.width}px`,
                    left: `${now.left}px`,
                    top: `${now.top}px`,
                    id: now.id
                } :
                pre.textList[`text${index}`] = {
                    height: `${now.height}px`,
                    lineHeight: `${now.height}px`,
                    fontSize: `${now.height}px`,
                    left: `${now.left}px`,
                    top: `${now.top}px`,
                    id: now.id
                }
            return pre
        }, { imageList: {}, textList: {} } as List)
    ))
    const datas: GoodsModel<List> = { ...rest, numberPages: ((+numberPages - 2).toString()), pageList }
    return datas
}