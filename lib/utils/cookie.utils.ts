import { CookieOptions, Request, Response } from "express";
import libConfig from "../configs/lib.config";

export const getCookie = (req: Request): any => {
  const { cookies } = req;
  if (cookies) {
    return cookies[libConfig.secretKey];
  }
};

export const setCookie = (
  req: Request,
  res: Response,
  val: string,
  options: CookieOptions
): void => {
  res.cookie(libConfig.secretKey, val, options);
};
