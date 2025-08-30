import { Response } from 'express';
import { cookieOptions } from 'src/config/cookies.config';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export function SetAuthCookies(res: Response, refreshToken: string, maxAge = SEVEN_DAYS) {
  res.cookie('refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge,
  });
}

export function ClearAuthCookies(res: Response) {
  res.clearCookie('refresh_token', cookieOptions);
}