module.exports = class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  birthdayYear() {
    return new Date().getFullYear() - this.age;
  }
};
