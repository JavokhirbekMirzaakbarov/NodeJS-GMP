import { AppErrors } from './app-errors';
import { logger } from './logger';

export const errorHandler = (err: any, _req: any, res: any) => {
  if (err.constructor === AppErrors) {
    res.status(err.statusCode).json({ message: err.errorMessage });
    return;
  }
  logger.error(`${err.errorMessage}`);
  return res.status(500).json({ message: 'Internal Server Error' });
};
