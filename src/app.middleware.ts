import { Injectable, NestMiddleware } from '@nestjs/common';
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const line =
      '\x1b[31m|/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\|\x1b[0m';
    const dateNow = new Date();

    log(
      `\x1b[34m\x1b[4m${req.method}\x1b[0m`,
      `\x1b[33m${req.headers.host}${req.baseUrl}\x1b[0m`,
      `Q:\x1b[2m${
        Object.keys(req.query).length ? '\x1b[32myes' : '\x1b[31mno'
      }\x1b[0m`,
      `P:\x1b[33m${
        Object.keys(req.params)?.length ? '\x1b[32myes' : '\x1b[31mno'
      }\x1b[0m`,
      `B:\x1b[33m${
        (req?.body ? Object.keys(req?.body).length : 0) === 0
          ? '\x1b[32myes'
          : '\x1b[31mno'
      }\x1b[0m`,
      `H:\x1b[33m${
        Object.keys(req.headers).length ? '\x1b[32myes' : '\x1b[31mno'
      }\x1b[0m`,
      `${dateNow.getFullYear()}/${dateNow.getMonth() + 1}/${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}:${dateNow.getMilliseconds()}`,
    );
    log('IP:', req.ips);
    log(line);
    log('H:', req.headers);
    log(line);
    log('P:', req.params);
    log(line);
    log('Q:', req.query);
    log(line);
    log('B:', req.body);
    next();
    // log(line);
    // log('Res:', res.send);
  }
}
