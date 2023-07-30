import {UF} from '../../model';

export function isUF(sigla: any): boolean {
  return sigla in UF;
}
