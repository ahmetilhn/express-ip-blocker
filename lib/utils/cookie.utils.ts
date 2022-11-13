import { CookieOptions, Request, Response } from "express";
import libConfig from "../configs/lib.config";

export const getCookie = (req: Request): any => {
  return req.cookies[libConfig.secretKey];
};

export const setCookie = (
  req: Request,
  res: Response,
  val: object,
  options?: CookieOptions
): void => {
  res.cookie(libConfig.secretKey, JSON.stringify(val), {
    ...{ maxAge: 100000, httpOnly: true, secure: true },
    ...options,
  });
};
