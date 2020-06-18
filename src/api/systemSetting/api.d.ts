export interface BannerParmas {
}
export interface BannerData {
   data: Array<BannerDataDetail>
}
export interface BannerDataDetail {
   created_at: string
   id: number
   img_url: string
   jump_link: string
   sort: number
   title: string
   updated_at: string
}