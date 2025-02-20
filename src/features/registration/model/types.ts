export type RegisterFormValues = {
  email: string;
  login: string;
  password: string;
  repeatPassword: string;
};

export type RegisterResponse = {
  token: string;
};

export const REGEX_PHONE = '/^+7 (d{3}) d{3}-d{2}-d{2}$/';
