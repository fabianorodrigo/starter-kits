import {IBase} from "../model/base.interface";

export function getNextId(rows: IBase[] | {[key: string]: IBase}): number {
  const unsorted: IBase[] = Array.isArray(rows) ? rows : Object.values(rows);
  //If there is no elements, the first ID is 1
  if (unsorted.length == 0) {
    return 1;
  }
  const sorted = unsorted.sort((a, b) => (a.id as number) - (b.id as number));
  return (sorted[sorted.length - 1].id as number) + 1;
}
