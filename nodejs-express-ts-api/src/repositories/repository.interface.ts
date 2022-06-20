import {IBase} from "../model";
import {IAttributeFilter} from "./attributeFilter.interface";

export interface IRepository<T extends IBase> {
  connect(): Promise<boolean>;
  getById(id: number): Promise<T>;
  getByAttribute(filter: IAttributeFilter): Promise<ReadonlyArray<T>>;
  getByAttributesAND(filter: IAttributeFilter[]): Promise<ReadonlyArray<T>>;
  getByAttributesOR(filter: IAttributeFilter[]): Promise<ReadonlyArray<T>>;
  getAll(): Promise<ReadonlyArray<T>>;
  getNextId(): Promise<number>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<boolean>;
}
