import cors from 'cors';
import path from 'path';
import bp from 'body-parser';
import express from 'express';
import consola from 'consola';
import mongoose from 'mongoose';
import passport from 'passport';

import { APP_DB, APP_PORT } from './config';

import traderRoutes from './routes/traders';

const app = express();

app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

app.use('/api/traders', traderRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(APP_DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    consola.success({
      message: `Database connected . \n${APP_DB}`,
      badge: true,
    });
    app.listen(APP_PORT, () =>
      consola.success({
        message: `server started on port ${APP_PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    consola.error({
      message: err.message,
      badge: true,
    });
  }
};

startApp();
