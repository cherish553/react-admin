export interface GoodClasslistData {
   class_id: number
   created_at: string
   name: string
   status: number
   updated_a: string
}
export interface GoodListData {
   class_id: number
   class_info: ClassInfo
   created_time: string
   id: number
   index_img: string
   is_recommend: number
   model_id: number
   name: string
}
interface ClassInfo {
   name: string
}
export interface EditGoodClass {
   id?: number
   name: string
}

export interface GoodSpecDetail {
   children_list: Array<GoodSpecDetailChildren>
   code: string
   created_at: string
   id: number
   name: string
   status: number
   updated_at: string
}

export interface GoodSpecDetailChildren {
   id: number
   children_id: number
   name: string
}
export type EditGoodSpecParam = Pick<GoodSpecDetailChildren, 'id' | 'name' | 'children_id'>
export interface EditPrintParam {
   name: string
   id?: string
   class_id: string
   index_img: string
   model_id: string
   desc: string
   service_introduction: string
   imgList: string
   specList: string
}
export interface GoodsInfoData {
   classList: ClassList
   goodsInfo: Pick<EditPrintParam, 'class_id' | 'id' | 'index_img' | 'model_id' | 'name'> & { is_recommend: number, img_list: ImgList, spec_list: Array<SpecList>, desc: string, service_introduction: string }
   modelList: ModelList
   specList: SpecListS
}
export interface ImgList {
   id: number,
   goods_id: number,
   img_url: string,
}
export interface SpecList {
   binding_spec_id: string
   goods_id: string
   id: string
   number: string
   paper_spec_id: string
   price: string
   printing_spec_id: string
   size_spec_id: string
   style_spec_id: string
   binding_spec_name?: string
   paper_spec_name?: string
   printing_spec_name?: string
   size_spec_name?: string
   style_spec_name?: string
}
export type ClassList = Array<Pick<GoodListData, 'class_id' | 'name'>>
export type ModelList = Array<Pick<GoodListData, 'id' | 'name'>>
export type SpecListS = Array<Pick<GoodSpecDetail, 'code' | 'id' | 'name' | 'children_list'> & { value: number | string, names?: string }>