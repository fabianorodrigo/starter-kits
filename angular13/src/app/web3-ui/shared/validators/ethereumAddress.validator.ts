import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ethereumAddressValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (
    control.value.trim().length != 42 &&
    !/^0x[0-9a-fA-F]+$/.test(control.value)
  ) {
    //se a validação NÃO foi atendida, retorna um objeto uma propriedade com mesmo nome que constará
    //dentro do formGrup.get('nomeinput').errors. (ex. meuForm.get('meuinput').errors?.ethereumAddress
    return { ethereumAddress: true };
  }

  //se não há erro, retorna null
  return null;
}
