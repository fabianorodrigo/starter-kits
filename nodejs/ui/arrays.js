const ui = require("./main");
const {
  sortByProperty,
  sort,
  sortRandom,
  sortNumbers,
  removeLastItem,
  removeFirstItem,
  insertAs1stPosition: insertAs1st,
  eraseIthItem,
  insertAsIthPosition,
  removeIthItem,
  removeAndInsertIthItem,
} = require("../services/arrays");

module.exports = {
  show: function () {
    const arrayObjetos = [
      {name: "John", age: 30},
      {name: "Mary", age: 25},
      {name: "Mike", age: 20},
    ];
    const primos = new Array(
      "Fabiano",
      "Kassius",
      "Arthur",
      "Italo",
      "César",
      "Jonhatan"
    );
    ui.labelResult(
      `${sortByProperty.name}`,
      sortByProperty(arrayObjetos, "name")
    );
    ui.labelResult(`${sort.name} (ASC)`, sort(primos));
    ui.labelResult(`${sort.name} (DEC)`, sort(primos, true));
    ui.labelResult(
      `sort numbers wrong way (default string)`,
      sort([100, 9, 50, 12])
    );
    ui.labelResult(`${sortNumbers.name} (ASC)`, sortNumbers([100, 9, 50, 12]));
    ui.labelResult(
      `${sortNumbers.name} (DESC)`,
      sortNumbers([100, 9, 50, 12], true)
    );

    ui.labelResult(`${sortRandom.name}`, sortRandom(primos));

    ui.labelResult2(`${removeLastItem.name}`, removeLastItem(primos), primos);
    ui.labelResult2(`${removeFirstItem.name}`, removeFirstItem(primos), primos);
    ui.labelResult2(
      `${insertAs1st.name}('Tonhão')`,
      insertAs1st(primos, "Tonhão"),
      primos
    );
    ui.labelResult2(`${eraseIthItem.name}(3)`, eraseIthItem(primos, 3), primos);
    ui.labelResult2(
      `${insertAsIthPosition.name}(2,'Cecília','Juca')`,
      insertAsIthPosition(primos, 2, "Cecília", "Juca"),
      primos
    );
    ui.labelResult2(
      `${removeIthItem.name}(5)`,
      removeIthItem(primos, 5),
      primos
    );
    ui.labelResult2(
      `${removeAndInsertIthItem.name}(3,1,'Lombas')`,
      removeAndInsertIthItem(primos, 3, 1, "Lombas"),
      primos
    );
  },
};
