export interface Token {
  name: string;
  password: string;
  iat: number;
}

export interface LogInArgs {
  username: string;
  password: string;
}

export interface CreateUserArgs {
  name: string;
  surname: string;
  country: string;
  birthday: string;
}

export interface DeleteUserArgs {
  id: string;
}
