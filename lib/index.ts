import ip from "ip";
import { NextFunction, Request, Response } from "express";

import { getCookie, setCookie } from "./utils/cookie.utils";
import libConfig from "./configs/lib.config";
import LibConfigType from "./types/lib-config.type";
import { isTimePassed } from "./utils/time.utils";
import CookieValType from "./types/cookie-val.type";
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
      let libCookie: CookieValType | undefined = getCookie(req);
      // first req
      if (!libCookie) {
        const cookieVal = {
          count: this.config.limit,
          ip: reqIP,
          date: new Date().getTime(),
        };
        setCookie(req, res, cookieVal);
        next();
        return;
      }
      // time control
      if (isTimePassed(libCookie.date, this.config.expire)) {
        const newCookieVal = {
          count: this.config.limit,
          ip: reqIP,
          date: new Date().getTime(),
        };
        setCookie(req, res, newCookieVal);
        next();
        return;
      }
      const remainingCount: number = Number(libCookie.count) - 1;
      if (remainingCount >= 0) {
        const newCookieVal = {
          count: remainingCount,
          ip: reqIP,
          date: libCookie.date,
        };
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
