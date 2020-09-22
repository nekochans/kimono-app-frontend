export type CreateAccountRequest = {
  email: string;
  password: string;
};

export type ResendCreateAccountRequest = {
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
