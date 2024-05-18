import { Router } from "express";
import SongController from "../controller/SongController";

const SongRouter = Router();

SongRouter.post('/',SongController.createFood);
SongRouter.get('/',SongController.getAllFoods);
SongRouter.get('/:songId',SongController.getFood);
SongRouter.patch('/:songId',SongController.updateFood);
SongRouter.delete('/:songId',SongController.deleteFood);

export default SongRouter;