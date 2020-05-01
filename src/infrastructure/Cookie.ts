import {
  parseCookies,
  setCookie as nookiesSetCookie,
  destroyCookie as nookiesDestroyCookie,
} from 'nookies';
import { NextPageContext } from 'next';

export const findCookies = <T>(ctx?: NextPageContext): T => {
  const cookies: {} = parseCookies(ctx);

  return cookies as T;
};

type SetCookieParams = {
  key: string;
  value: string;
};

export const setCookie = (params: SetCookieParams, ctx?: NextPageContext) => {
  // TODO 以下を参考に外からoptionsを設定可能にする
  // https://github.com/maticzav/nookies#setcookiectx-name-value-options-or-cookiessetctx-name-value-options
  nookiesSetCookie(ctx, params.key, params.value, {
    path: '/',
    httpOnly: true,
  });
};

type DestroyCookieParams = {
  key: string;
};

export const destroyCookie = (
  ctx: NextPageContext,
  params: DestroyCookieParams,
) => {
  nookiesDestroyCookie(ctx, params.key);
};
