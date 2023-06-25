import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routers/userRouter';
import groupRouter from './routers/groupRouter';
import userGroupRouter from './routers/userGroupRouter';
import { loggerOperation } from './logger/operation';
import { errorHandler } from './logger/error-handler';
import { unhandledRejectionLogger } from './logger/unhandled-rejection-error';
import { uncaughtExceptionLogger } from './logger/uncaught-exception-logger';
import { logger } from './logger/logger';

const app = express();
const port = process.env.PORT ?? 3000;

try {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });

  app.use(express.json());
  app.use(loggerOperation);

  app.use('/api/users', userRouter);
  app.use('/api/groups', groupRouter);
  app.use('/api/user-groups', userGroupRouter);

  app.use(errorHandler);
  process.on('unhandledRejectionLogger', unhandledRejectionLogger);
  process.on('uncaughtException', uncaughtExceptionLogger);
} catch (error) {
  logger.error(error);
}
