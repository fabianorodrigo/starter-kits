const colors = require("colors");
const readlineSync = require("readline-sync");
const ui = require("./services/ui");
const This = require("./services/this/this");
const globalThisStricMode = require("./services/this/globalThisStrictMode");
const globalThisNoStricMode = require("./services/this/globalThisNoStrictMode");
const Person = require("./model/person");
const Closure = require("./services/closures");
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
} = require("./services/arrays");

let menu;
globalThis.name = "I'm globalThis";
this.name = `I'm index.js`;

const application = {
  name: `I'm index.js.Application`,
  run: function () {
    while (menu != "0" && menu != "") {
      //clear screen
      process.stdout.write("\033c");
      //show menu
      console.log(colors.green("NODEJS BOOTSTRAP APP"));
      ui.printBar(colors.green);
      console.log(`
              1. 'this' demo
              2. Closures demo
              3. Arrays demo  
              0. Exit
              `);
      menu = readlineSync.question("Enter your choice: ".yellow);
      //breakline
      console.log("");
      if (menu != "0") {
        ui.printBar();
      }
      switch (menu) {
        case "1":
          //STRICT
          console.log(`Strict`.red);
          ui.labelResult(
            This.strict.regularInnerRegular.name,
            This.strict.regularInnerRegular()
          );
          ui.labelResult(
            This.strict.regularInnerArrow.name,
            This.strict.regularInnerArrow()
          );
          ui.labelResult(
            This.strict.arrowInnerRegular.name,
            This.strict.arrowInnerRegular()
          );
          ui.labelResult(
            This.strict.arrowInnerArrow.name,
            This.strict.arrowInnerArrow()
          );

          const p = new Person("John", 30);
          ui.labelResult(
            This.strict.callObjectFunction.name,
            This.strict.callObjectFunction(p)
          );
          p.independent = This.callIndenpendentFunction;
          ui.labelResult(
            This.strict.callIndenpendentFunction.name,
            This.strict.callIndenpendentFunction(p)
          );
          //NO STRICT
          console.log(`NOT Strict`.green);
          ui.labelResult(
            This.noStrict.regularInnerRegular.name,
            This.noStrict.regularInnerRegular()
          );
          ui.labelResult(
            This.noStrict.regularInnerArrow.name,
            This.noStrict.regularInnerArrow()
          );
          ui.labelResult(
            This.noStrict.arrowInnerRegular.name,
            This.noStrict.arrowInnerRegular()
          );
          ui.labelResult(
            This.noStrict.arrowInnerArrow.name,
            This.noStrict.arrowInnerArrow()
          );

          const p2 = new Person("John 2", 30);
          ui.labelResult(
            This.noStrict.callObjectFunction.name,
            This.noStrict.callObjectFunction(p2)
          );
          p2.independent = This.callIndenpendentFunction;
          ui.labelResult(
            This.noStrict.callIndenpendentFunction.name,
            This.noStrict.callIndenpendentFunction(p2)
          );

          //CHAMADA INDIRETA
          console.log(`INDIRECT`.blue);
          ui.labelResult(This.apply.name, This.apply({age: 42}));
          ui.labelResult(This.call.name, This.call({age: 42}));

          //GLOBAL
          console.log(`GLOBAL`.yellow);
          ui.labelResult(`globalThisStricMode:`, globalThisStricMode());
          ui.labelResult(`globalThisNoStricMode:`, globalThisNoStricMode());
          break;
        case "2":
          ui.labelResult(
            Closure.contadorPrivado.name,
            Closure.contadorPrivado()
          );
          // não funcionou como no artigo: https://medium.com/@stephanowallace/javascript-mas-afinal-o-que-s%C3%A3o-closures-4d67863ca9fc
          ui.labelResult(Closure.outroContador.name, "");
          Closure.outroContador(console.log);

          break;
        case "3":
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
          ui.labelResult(
            `${sortNumbers.name} (ASC)`,
            sortNumbers([100, 9, 50, 12])
          );
          ui.labelResult(
            `${sortNumbers.name} (DESC)`,
            sortNumbers([100, 9, 50, 12], true)
          );

          ui.labelResult(`${sortRandom.name}`, sortRandom(primos));

          ui.labelResult2(
            `${removeLastItem.name}`,
            removeLastItem(primos),
            primos
          );
          ui.labelResult2(
            `${removeFirstItem.name}`,
            removeFirstItem(primos),
            primos
          );
          ui.labelResult2(
            `${insertAs1st.name}('Tonhão')`,
            insertAs1st(primos, "Tonhão"),
            primos
          );
          ui.labelResult2(
            `${eraseIthItem.name}(3)`,
            eraseIthItem(primos, 3),
            primos
          );
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

          break;
      }

      if (menu != "0") {
        //just a pause to see results
        readlineSync.question();
      }
    }

    console.log(`Bye ...`);
  },
};

application.run();
