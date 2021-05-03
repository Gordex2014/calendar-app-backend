import path from "path";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "colors";

import { config } from "../config/config";

import { authRouter, eventsRouter } from "../routes";
import { dbConnection } from "../database/config.db";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    authRoutes: `${config.apiVersionRoute}/auth`,
    eventsRoutes: `${config.apiVersionRoute}/events`,
  };

  constructor() {
    this.app = express();
    this.port = config.port;

    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  private async dbConnect() {
    await dbConnection();
  }

  private middlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private routes() {
    this.app.use(this.apiPaths.authRoutes, authRouter);
    this.app.use(this.apiPaths.eventsRoutes, eventsRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`${"[Server]:".blue} Running on port ${this.port}`);
    });
  }
}

export default Server;
