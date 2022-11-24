import { Exclude } from 'class-transformer';

export class UserDTO {
  username: string;
  //remove a senha quando serializa para JSON (para não devolver senha pro cliente)
  @Exclude({ toPlainOnly: true })
  password: string;
  fullname: string;
}
