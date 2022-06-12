import {IBase} from "../model";

export interface IRepository<T extends IBase> {
  connect(): Promise<boolean>;
  getById(id: number): Promise<T>;
  getAll(): Promise<ReadonlyArray<T>>;
  getNextId(): Promise<number>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<boolean>;
}
