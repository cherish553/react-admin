export interface UserParmas {
   mobile: string
   name: string
}

export interface UserData {
   id: number
   last_login: string
   mobile: string
   name: string
}
export interface GoodsModel<T = PageList> {
   id?: string
   name: string
   size: string
   numberPages: string
   pageList: Array<T>
}
export interface PageList {
   id: string,
   height: string,
   width: string,
   top: string,
   left: string,
   type: string,
   pages: number
}
export interface TemplateListData {
   goodsNum: number
   id: number
   name: string
   size: string
}
export interface  List{
   textList: textList, imageList: imageList
}