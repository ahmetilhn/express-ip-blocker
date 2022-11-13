import libConfig from "./configs/lib.config";
import LibConfigType from "./types/lib-config.type";
import ip from "ip";
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
  checkIP = (): void => {
    const reqIP: any = ip.address();
    if(!!reqIP){
        const reqCount = 
    }
  };
}

export default ExpressIPBlocker;
