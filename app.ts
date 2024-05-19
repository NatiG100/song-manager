import express, { Express,Request,Response } from "express";
import globalErrorHandler from "./error/errorMiddlewares";
import bodyParser from "body-parser";
import SongRouter from "./routes/SongRoute";
import StatRouter from "./routes/StatRoute";
const app:Express = express();

app.use(bodyParser.json());

app.use('/api/v1/songs', SongRouter);
app.use('/api/v1/stats',StatRouter);
app.use(globalErrorHandler);

export default app;