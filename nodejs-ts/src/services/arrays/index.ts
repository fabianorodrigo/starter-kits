export function sort(array: any[], dec = false) {
  array.sort();
  if (dec) {
    return array.reverse();
  }
  return array;
}

export function sortByProperty(array: any[], property: string, dec = false) {
  if (dec) {
    return array.sort((a, b) => (a[property] > b[property] ? -1 : 1));
  } else {
    return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  }
}
export function sortNumbers(array: any[], dec = false) {
  //reverse não aceita função para ordenação
  const f = dec ? (a, b) => b - a : (a, b) => a - b;
  return array.sort(f);
}
export function sortRandom(array: any[]) {
  return array.sort((a, b) => Math.random() - 0.5);
}
export function removeLastItem(array: any[]) {
  return array.pop();
}
export function removeFirstItem(array: any[]) {
  return array.shift();
}
export function insertAs1stPosition(array: any[], item): number {
  return array.unshift(item);
}
export function insertAsIthPosition(
  array: any[],
  i: number,
  ...itensToInsert
): number {
  array.splice(i, 0, ...itensToInsert);
  return array.length;
}
export function eraseIthItem(array: any[], i: number) {
  return delete array[i];
}
export function removeIthItem(array: any[], i: number, qtdToDelete = 1) {
  return array.splice(i, qtdToDelete);
}
export function removeAndInsertIthItem(
  array: any[],
  i: number,
  qtdToDelete = 1,
  ...itensToInsert
) {
  return array.splice(i, qtdToDelete, ...itensToInsert);
}
