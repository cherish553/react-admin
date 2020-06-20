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
