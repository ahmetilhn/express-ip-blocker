import ip from "ip";
import { NextFunction, Request, Response } from "express";

import { getCookie, setCookie } from "./utils/cookie.utils";
import libConfig from "./configs/lib.config";
import LibConfigType from "./types/lib-config.type";
class ExpressIPBlocker {
  private config: LibConfigType = libConfig;
  constructor(public _config: LibConfigType) {
    this.setConfig = this.setConfig.bind(this);
    this.setConfig();
  }
  setConfig = (): void => {
    if (this._config) {
      Object.assign(this.config, this._config);
    }
  };
  checkIP = (req: Request, res: Response, next: NextFunction): void => {
    const reqIP: any = ip.address();
    if (!!reqIP) {
      let libCookie: any = getCookie(req);
      if (!libCookie) {
        const cookieVal = { count: libConfig.count, ip: reqIP };
        setCookie(req, res, cookieVal);
        next();
        return;
      }
      libCookie = JSON.parse(libCookie);
      const remainingCount = Number(libCookie.count) - 1;
      const newCookieVal = { count: remainingCount, ip: reqIP };
      setCookie(req, res, newCookieVal);
    }
  };
}

export default ExpressIPBlocker;
