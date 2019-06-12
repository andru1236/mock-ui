import {IPath} from "./IPath";
import {ISettings} from "./ISettings";

export interface IApiInstance {
  _id?: string;
  name: string;
  port: number;
  routes?: IPath[];
  settings?: ISettings
}