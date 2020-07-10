interface CommonPagination<T> {
  current_page: number
  total: number
  data: Array<T>
}
interface DelIds {
  ids: string
}
interface Id {
  id: number
}
