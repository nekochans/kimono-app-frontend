const appBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : '';
};

export const urlList = {
  top: appBaseUrl(),
  login: `${appBaseUrl()}/login`,
} as const;
