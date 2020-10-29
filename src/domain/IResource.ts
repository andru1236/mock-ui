import { IParam } from "./IParam";

export interface IResource {
  method: string;
  response: any;
  params: IParam[];
}
