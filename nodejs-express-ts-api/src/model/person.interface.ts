import {IBase} from "./base.interface";

export interface IPerson extends IBase {
  name: string;
  age: number;
  url: string;
}
