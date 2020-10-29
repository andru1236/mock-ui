import { IResource } from "./IResource";

export interface IPath {
  _id: string;
  path: string;
  resources: IResource[];
}
