import {IBase} from "./base.interface";

/**
 * Represents a blacklisted token JWT
 */
export interface IToken extends IBase {
  expiration: string;
  userId: number;
}
