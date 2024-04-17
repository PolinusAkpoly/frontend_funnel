import { EditorState } from "draft-js"

export interface BlockTemplate {
  _id?: string
  content:  any
  type: string
  buttonIcon?: string
  position: number
  columnIndex?: number
  blockId: string
  containerStyles?: Record<string, unknown>; 
  attributes?: Record<string, unknown>,
  styles: Record<string, unknown> // Changer le type en fonction de la structure réelle des styles
}
