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
   is_recommend: 1
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
   edit: boolean
}