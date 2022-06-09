/**
 * o this faz referência ao objeto que está chamando a função no momento.
 * In arrow functions, this retains the value of the enclosing lexical context's this. In global code, it will be set to the global object:
 */

const This = {
  name: `I'm this.js`,
  strict: {
    name: `I'm strict property'`,
    regularInnerRegular: function () {
      "use strict";
      let name = "I'm this.js.strict.regularInnerRegular";
      function innerRegular() {
        // since is strict, this is undefined
        return this?.name;
      }
      return innerRegular();
    },
    regularInnerArrow: function () {
      "use strict";
      let name = "I'm this.js.strict.regularInnerArrow";
      const f = () => {
        return this.name;
      };
      return f();
    },
    arrowInnerRegular: () => {
      "use strict";
      let name = "I'm this.js.strict.arrowInnerRegular";
      function innerRegular() {
        //arrow não cria novo escopo
        return this?.name;
      }
      return innerRegular();
    },
    arrowInnerArrow: () => {
      "use strict";
      let name = "I'm this.js.strict.arrowInnerArrow";
      const f = () => {
        return this.name;
      };
      return f();
    },
    callObjectFunction: function callObjectFunction(person) {
      "use strict";
      return person.birthdayYear();
    },
    callIndenpendentFunction: function (person) {
      "use strict";
      person.birthdayYear = independentBirthdayYear;
      return person.birthdayYear();
    },
  },
  noStrict: {
    name: `I'm noStrict' property`,
    regularInnerRegular: function () {
      let name = "I'm this.js.noStrict.regularInnerRegular";
      function innerRegular() {
        return this.name;
      }
      return innerRegular();
    },
    regularInnerArrow: function () {
      let name = "I'm this.js.noStrict.regularInnerArrow";
      const f = () => {
        return this.name;
      };
      return f();
    },
    arrowInnerRegular: () => {
      let name = "I'm this.js.noStrict.arrowInnerRegular";
      function innerRegular() {
        //arrow não cria novo escopo
        return this?.name;
      }
      return innerRegular();
    },
    arrowInnerArrow: () => {
      let name = "I'm this.js.noStrict.arrowInnerArrow";
      const f = () => {
        return this.name;
      };
      return f();
    },
    callObjectFunction: function callObjectFunction(person) {
      return person.birthdayYear();
    },
    callIndenpendentFunction: function (person) {
      person.birthdayYear = independentBirthdayYear;
      return person.birthdayYear();
    },
  },

  apply: function (person) {
    return multiplyAge.apply(person, [10]);
  },
  call: function (person) {
    return multiplyAge.call(person, 10);
  },
};

function independentBirthdayYear() {
  return this.age * 5;
}

function multiplyAge(prod) {
  return this.age * prod;
}

module.exports = This;
