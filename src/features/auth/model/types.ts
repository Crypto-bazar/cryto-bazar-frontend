export interface AuthFormValues {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const LOGIN_REGEX = /^[A-Za-z0-9_-]{1,16}$/;
export const PASSWORD_REGEX = /^[A-Za-z\d]{6,}$/;
