export interface User {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

export interface UserDTO {
  avatar: string;
  stars: number;
}
