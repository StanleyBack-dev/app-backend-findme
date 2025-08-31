import { Response } from 'express';
import { cookieOptions } from 'src/config/cookies.config';

export function SetAuthCookies(res: Response, refreshToken: string, accessToken?: string) {

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    sameSite: "lax",
  });

  if (accessToken) {

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutos
      sameSite: "lax",
    });
  }
}

export function ClearAuthCookies(res: Response) {
  res.clearCookie('refresh_token', cookieOptions);
}