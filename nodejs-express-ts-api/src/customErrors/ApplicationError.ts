export class ApplicationError extends Error {
  private _domain: boolean = true;

  get domain() {
    return this._domain;
  }
}
