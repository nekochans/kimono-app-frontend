const appBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : '';

// eslint-disable-next-line import/prefer-default-export
export const urlList = {
  top: appBaseUrl(),
  createAccount: `${appBaseUrl()}/accounts/create`,
  login: `${appBaseUrl()}/login`,
  logout: `${appBaseUrl()}/logout`,
  my: `${appBaseUrl()}/my`,
} as const;
