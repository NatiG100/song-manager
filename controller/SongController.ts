import {Request,Response} from 'express';
import SongService from '../services/SongServices';
export default class SongController{
    static async createSong(req:Request,res:Response){
        const createdSong =  SongService.createSong();
        res.status(201).send({
            data:createdSong,
            message:"Successfully Created a song"
        });
    }
    static async getAllSong(req:Request,res:Response){
        const allSongs = SongService.getAllSongs();
        res.status(200).send({
            data:allSongs,
            message:"Fetched Songs"
        });
    }
    static async getSong(req:Request,res:Response){
        const song = SongService.getSong();
        res.status(200).send({
            data:song,
            message:"Fetched Song",
        })
    }
    static async updateSong(req:Request,res:Response){
        const updatedSong = SongService.updateSong();
        res.status(200).send({
            data:updatedSong,
            message:"Song updated successfully"
        });
    }
    static async deleteSong(req:Request,res:Response){
        const deletedSong = SongService.deleteSong();
        res.status(299).send({
            data:deletedSong,
            message:"Song deleted successfully",
        });
    }
}