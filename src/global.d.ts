interface CommonPagination<T> {
  current_page: number
  total: number
  data: Array<T>
}