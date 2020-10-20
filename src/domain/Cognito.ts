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

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetConfirmRequest = {
  newPassword: string;
  confirmationCode: string;
  cognitoUserName: string;
};
