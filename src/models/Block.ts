import { BlockTemplate } from "./BlockTemplate";

export interface Block {
    _id?: string;
    position: number;
    columnCount: number;
    templates: BlockTemplate[];
    container?: string;
    containerStyles: Record<string, unknown>; // Changer le type en fonction de la structure réelle des styles
    styles: Record<string, unknown>; // Changer le type en fonction de la structure réelle des styles
  }