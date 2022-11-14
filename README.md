# Express IP Blocker

_You can use this package to prevent continuous requests to APIs you write with Express.js within a certain period of time._

## Instalation

_package (yarn or npm)_

```shell
    npm install express-ip-blocker
```

_PeerDependencies_
_Optimum versions_

```shell
    "cookie-parser": "^1.4.6",
    "express": "^4.18.2"
```

## Usage

```js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const ExpressIPBlocker = require("express-ip-blocker-current");
const expressIPBlocker = new ExpressIPBlocker();
// You have to do this for the package to work
app.use(cookieParser());
// IP Middleware
app.use(expressIPBlocker.checkIP);

app.listen(//port, () => {
  //
});
```

_See demo for example usage._ ./demo/index.js

## Config

_You can apply a config to the package's run settings_

```javascript
{
  limit: number; // default = 10
  secretKey: string; // default = now Date()
  reqBlockMessage: string; // default = Too Many Requests
  expire: number; // default = 1000 * 10 -> 10 second
}
```

_*Coded by ahmetilhan*_
