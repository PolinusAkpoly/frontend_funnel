import { Tag } from "./Tag";

export interface User {
  _id?: string;
  civility: string;
  firstname: string;
  lastname: string;
  fullname: string;
  username: string;
  email: string;
  website: '',
  publicinfo: '',
  password: string;
  tag?: Tag[];
  last_connected?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
