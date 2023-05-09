import { AppError } from './app-error';
import { logger } from './logger';

export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  logger.error(`${err.errorMessage}`);
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.errorMessage, args: err.args });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
