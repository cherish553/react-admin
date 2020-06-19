export interface commonPagination<T> {
  current_page: number
  total: number
  data: T
}