module.exports = {
  sort: function (array, dec = false) {
    if (dec) {
      return array.reverse();
    }
    return array.sort();
  },
  sortByProperty: function (array, property) {
    return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  },
  sortNumbers: function (array, dec = false) {
    //reverse não aceita função para ordenação
    const f = dec ? (a, b) => b - a : (a, b) => a - b;
    return array.sort(f);
  },
  sortRandom: function (array) {
    return array.sort((a, b) => Math.random() - 0.5);
  },
  removeLastItem: function (array) {
    return array.pop();
  },
  removeFirstItem: function (array) {
    return array.shift();
  },
  insertAs1stPosition: function (array, item) {
    return array.unshift(item);
  },
  insertAsIthPosition: function (array, i, ...itensToInsert) {
    return array.splice(i, 0, ...itensToInsert);
  },
  eraseIthItem: function (array, i) {
    return delete array[i];
  },
  removeIthItem: function (array, i, qtdToDelete = 1) {
    return array.splice(i, qtdToDelete);
  },
  removeAndInsertIthItem: function (
    array,
    i,
    qtdToDelete = 1,
    ...itensToInsert
  ) {
    return array.splice(i, qtdToDelete, ...itensToInsert);
  },
};
