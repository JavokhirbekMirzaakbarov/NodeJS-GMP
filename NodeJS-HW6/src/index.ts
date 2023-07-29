import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { router as userRouter } from './routers/userRouter';
import { router as groupRouter } from './routers/groupRouter';
import { router as userGroupRouter } from './routers/userGroupRouter';
import { router as loginRouter } from './routers/loginRouter';
import { loggerOperation } from './middleware/logger/operation';
import { errorHandler } from './middleware/logger/error-handler';
import { unhandledRejectionLogger } from './middleware/logger/unhandled-rejection-error';
import { uncaughtExceptionLogger } from './middleware/logger/uncaught-exception-logger';
import { logger } from './middleware/logger/logger';
import sequelize from './db';

const app = express();
const port = process.env.PORT ?? 3000;

async function init() {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();

    logger.info('Connection has been established successfully!');

    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });

    app.use(express.json());
    app.use(loggerOperation);
    app.use(cors());

    app.use('/login', loginRouter);
    app.use('/users', userRouter);
    app.use('/groups', groupRouter);
    app.use('/user-groups', userGroupRouter);

    app.use(errorHandler);
    process.on('unhandledRejectionLogger', unhandledRejectionLogger);
    process.on('uncaughtException', uncaughtExceptionLogger);
  } catch (error) {
    logger.error(error);
  }
}

init();
