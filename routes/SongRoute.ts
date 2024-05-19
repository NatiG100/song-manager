import { Router } from "express";
import SongController from "../controller/SongController";

const SongRouter = Router();

SongRouter.post('/',SongController.createSong);
SongRouter.get('/',SongController.getAllSong);
SongRouter.get('/:songId',SongController.getSong);
SongRouter.patch('/:songId',SongController.updateSong);
SongRouter.delete('/:songId',SongController.deleteSong);

export default SongRouter;