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
export type BannerDetail = Pick<BannerDataDetail, "img_url" | "jump_link" | "title"> & { sort: number | undefined | string }
export interface BannerIds {
   id: string
}