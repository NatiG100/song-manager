import {NextFunction, Request,RequestHandler,Response} from 'express';
import SongService from '../services/SongServices';
import SongDto, { UpdateSongDto } from '../entities/Song';
import { ResponseBody } from '../types';
import AppError from '../error/AppError';
export default class SongController{
    static async createSong(req:Request<any,any,SongDto,any>,res:Response<ResponseBody<SongDto>>,next:NextFunction){
        try{
            const createdSong =  await SongService.createSong(req.body);
            res.status(201).send({
                data:createdSong,
                message:"Successfully Created a song"
            });
        }catch(err){
            next(err);
        }
    }
    static async getAllSong(req:Request<any,any,any,{limit:string,skip:string}>,res:Response<ResponseBody<SongDto[]>>,next:NextFunction){
        try{
            const limit = parseInt(req.query.limit);
            const skip = parseInt(req.query.skip);
            if(!limit||!skip){
                const errors:string[]=[];
                if(!limit)errors.push('limit');
                if(!skip)errors.push('skip')
                throw new AppError(`Invalid pagination data: ${errors}`,400);
            }
            const allSongs = await SongService.getAllSongs({limit,skip});
            res.status(200).send({
                data:allSongs,
                message:"Fetched Songs"
            });
        }catch(err){
            next(err);
        }
    }
    static async getSong(req:Request<{songId:string}>,res:Response<ResponseBody<SongDto>>){
        const song = await SongService.getSong(req.params.songId);
        res.status(200).send({
            data:song,
            message:"Fetched Song",
        })
    }
    static async updateSong(req:Request<{songId:string},any,UpdateSongDto>,res:Response<ResponseBody<SongDto>>){
        const updatedSong = await SongService.updateSong(req.params.songId,req.body);
        res.status(200).send({
            data:updatedSong,
            message:"Song updated successfully"
        });
    }
    static async deleteSong(req:Request<{songId:string}>,res:Response<ResponseBody<SongDto>>){
        const deletedSong = await SongService.deleteSong(req.params.songId);
        res.status(299).send({
            data:deletedSong,
            message:"Song deleted successfully",
        });
    }
}