import {User} from "./userGithub.interface";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  description: string;
  stargazers_count: number;
}
