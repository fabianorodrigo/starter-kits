export class Person {
  constructor(public name: string, public age: number) {}

  get nameUpperCase() {
    return this.name.toUpperCase();
  }

  birthdayYear() {
    return new Date().getFullYear() - this.age;
  }
}
