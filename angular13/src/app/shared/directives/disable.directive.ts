import { Directive, Input } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]',
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    const control = this.ngControl.control as AbstractControl;
    if (control) {
      control[action]();
    }
  }

  constructor(private ngControl: NgControl) {}
}
