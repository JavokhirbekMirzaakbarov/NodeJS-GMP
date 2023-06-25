import { logger } from './logger';

export const unhandledRejectionLogger = (reason: any, promise: any) => {
  const log = JSON.stringify({
    message: 'unhandledRejection',
    promise,
    reason,
  });
  logger.error(log);
};
