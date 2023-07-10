import { logger } from './logger';

export const loggerOperation = (req: any, _res: any, next: () => void) => {
  const { method, url, body, query } = req;
  const log = JSON.stringify({
    method,
    url,
    body,
    query,
  });
  logger.info(log);
  next();
};
