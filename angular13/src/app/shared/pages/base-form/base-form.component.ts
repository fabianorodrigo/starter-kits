import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as errorMessagesJSON from './common-errors-messages.json';

export abstract class BaseFormComponent {
  protected errorMessages: { [errorId: string]: string } = {};
  public form!: FormGroup;

  constructor() {
    this.errorMessages = errorMessagesJSON;
  }

  /**
   *
   * @param controlName Name of the control in this.form
   * @param errorId ID of the error you're looking for
   * @returns TRUE if the control with name {controlName} has the error {errorId}
   */
  hasError(controlName: string, errorId: string) {
    return this.form.controls[controlName].hasError(errorId);
  }

  /**
   * @param controlName Name of the control in this.form
   * @returns List with all error messages in the control with name {controlName}
   */
  getErrors(controlName: string): string[] {
    let result = [];

    for (let errorId in this.form.controls[controlName].errors) {
      if (
        this.errorMessages[errorId] &&
        this.errorMessages[errorId].indexOf('{0}') == -1
      ) {
        result.push(`${this.errorMessages[errorId]}`);
      } else if (this.errorMessages[errorId]) {
        const required = Object.values(
          this.form.controls[controlName].getError(errorId)
        )[0] as string;
        result.push(`${this.errorMessages[errorId]}`.replace(`{0}`, required));
      } else {
        result.push(`${errorId}`);
      }
    }

    return result;
  }

  /**
   * @returns List with all error messages in this.form
   */
  getAllErrors(): string[] {
    let result = [];
    for (let controlName in this.form.controls) {
      for (let errorId in this.form.controls[controlName].errors) {
        if (this.errorMessages[errorId]) {
          result.push(`${controlName} ${this.errorMessages[errorId]}`);
        } else {
          result.push(`${controlName} ${errorId}`);
        }
      }
    }
    return result;
  }
}
