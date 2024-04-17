export interface Response<T> {
  status: number
  isSuccess: boolean
  next?: number | null
  current: number
  previous?: number | null
  message: string
  results?: Array<T>
  result?: T
  allCount: number
  resultCount: number
}
