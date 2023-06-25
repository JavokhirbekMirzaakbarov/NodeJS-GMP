import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import userRouter from './routers/userRouter';
import groupRouter from './routers/groupRouter';
import userGroupRouter from './routers/userGroupRouter';
import loginRouter from './routers/loginRouter';
import { loggerOperation } from './middleware/logger/operation';
import { errorHandler } from './middleware/logger/error-handler';
import { unhandledRejectionLogger } from './middleware/logger/unhandled-rejection-error';
import { uncaughtExceptionLogger } from './middleware/logger/uncaught-exception-logger';
import { logger } from './middleware/logger/logger';
import { authenticateJWT } from './middleware/auth';

const app = express();
const port = process.env.PORT ?? 3000;

try {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });

  app.use(express.json());
  app.use(loggerOperation);

  app.use(cors());
  app.use('/api/login', loginRouter);
  app.use('/api/users', authenticateJWT, userRouter);
  app.use('/api/groups', authenticateJWT, groupRouter);
  app.use('/api/user-groups', authenticateJWT, userGroupRouter);

  app.use(errorHandler);
  process.on('unhandledRejectionLogger', unhandledRejectionLogger);
  process.on('uncaughtException', uncaughtExceptionLogger);
} catch (error) {
  logger.error(error);
}
