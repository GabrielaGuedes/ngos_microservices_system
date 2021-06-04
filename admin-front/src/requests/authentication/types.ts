export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export interface IAuthentication {
  auth: boolean;
  token: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface INewPassword {
  oldPassword: string;
  newPassword: string;
}

export interface ISuccess {
  message: string;
}

export interface INewUserCreated {
  message: string;
  email: string;
  name: string;
}

export interface ISelfRegister {
  canSelfRegister: boolean;
}
