const ui = require("./main");
const This = require("../services/this/this");
const globalThisStricMode = require("../services/this/globalThisStrictMode");
const globalThisNoStricMode = require("../services/this/globalThisNoStrictMode");
const Person = require("../model/person");

module.exports = {
  show: function () {
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
  },
};
