import {IBase} from "./base.interface";

export interface IUser extends IBase {
  username: string;
  password?: string;
  provider?: string;
  profileId?: string;
}
