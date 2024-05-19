import { Router } from "express";
import SongController from "../controller/SongController";
import StatController from "../controller/StatController";

const StatRouter = Router();
StatRouter.get('/general-stat',StatController.getGeneralStat);

export default StatRouter;