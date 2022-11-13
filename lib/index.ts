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
        const cookieVal = { count: this.config.count, ip: reqIP };
        setCookie(req, res, cookieVal);
        next();
        return;
      }
      libCookie = JSON.parse(libCookie);
      const remainingCount: number = Number(libCookie.count) - 1;
      if (remainingCount <= this.config.count) {
        const newCookieVal = { count: remainingCount, ip: reqIP };
        setCookie(req, res, newCookieVal);
        next();
        return;
      }
      res.status(429).json({
        msg: this.config.reqBlockMessage,
      });
    }
  };
}

export default ExpressIPBlocker;
