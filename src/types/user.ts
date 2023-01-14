export interface IUser {
  id?: string;
  username: string;
  password: string;
}

export class User implements IUser {
  id?: string;
  username: string;
  password: string;

  constructor({ id, username, password }: IUser) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
