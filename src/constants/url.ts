const appBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : '';
};

export const urlList = {
  top: appBaseUrl(),
  createAccount: `${appBaseUrl()}/accounts/create`,
  login: `${appBaseUrl()}/login`,
  my: `${appBaseUrl()}/my`,
} as const;
