import { logger } from './logger';

export const uncaughtExceptionLogger = (err: any) => {
  const log = JSON.stringify({
    message: 'uncaughtException',
    error: err,
  });
  logger.error(log);
  process.exit(1);
};
