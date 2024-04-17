import { User } from './User'

export interface Page {
  _id: string,
  name: string,
  // title: string
  description?: string
  content?: string
  options: any[] ,
  slug: string,
  isPublished?: boolean
  position?: number
  userId: User | string
  created_at?: Date | string
  updated_at?: Date | string
}
