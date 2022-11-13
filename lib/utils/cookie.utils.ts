import { CookieOptions, Request, Response } from "express";
import libConfig from "../configs/lib.config";

export const getCookie = (req: Request): any => {
  if (req.cookies[libConfig.secretKey]) {
    return JSON.parse(req.cookies[libConfig.secretKey]);
  }
  return undefined;
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
