export interface IBase {
  id?: number | string;
  createdAt?: Date;
  modifiedAt?: Date;
  [key: string]: any;
}
