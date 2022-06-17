export class ApplicationError extends Error {
  private readonly _domain = true;

  get domain() {
    return this._domain;
  }
}
