import {NextFunction, Request,RequestHandler,Response} from 'express';
import SongService from '../services/SongServices';
import SongDto, { TSongFilter, UpdateSongDto } from '../entities/Song';
import { ResponseBody } from '../types';
import AppError from '../error/AppError';
import { io } from '..';
import { NEW_STAT_GENERATED, SONG_CREATED, SONG_DELETED, SONG_UPDATED } from '../constants/events';
import StatService from '../services/StatServices';
export default class SongController{
    static async createSong(req:Request<any,any,SongDto,any>,res:Response<ResponseBody<SongDto>>,next:NextFunction){
        try{
            const createdSong =  await SongService.createSong(req.body);
            io.sockets.emit(SONG_CREATED,createdSong);
            io.sockets.emit(NEW_STAT_GENERATED, await StatService.generalStat());
            res.status(201).send({
                data:createdSong,
                message:"Successfully Created a song"
            });
        }catch(err){
            next(err);
        }
    }
    static async getAllSong(
        req:Request<any,any,any,{limit:string,skip:string}&TSongFilter>,
        res:Response<ResponseBody<{items:SongDto[],count:number}>>,
        next:NextFunction
    ){
        try{
            const limit = parseInt(req.query.limit);
            const skip = parseInt(req.query.skip);
            const {limit:l,skip:s,...filter} = req.query;
            if((!limit&&limit!==0)||!skip&&skip!==0){
                const errors:string[]=[];
                if(!limit)errors.push('limit');
                if(!skip)errors.push('skip')
                throw new AppError(`Invalid pagination data: ${errors}`,400);
            }
            const allSongs = await SongService.getAllSongs({limit,skip,filter});
            const numberOfSongs = await SongService.count({filter});
            res.status(200).send({
                data:{
                    items:allSongs,
                    count:numberOfSongs,
                },
                message:"Fetched Songs"
            });
        }catch(err){
            next(err);
        }
    }
    static async getSong(req:Request<{songId:string}>,res:Response<ResponseBody<SongDto>>,next:NextFunction){
        try{
            const song = await SongService.getSong(req.params.songId);
            
            res.status(200).send({
                data:song,
                message:"Fetched Song",
            })
        }catch(err){
            next(err);
        }
    }
    static async updateSong(req:Request<{songId:string},any,UpdateSongDto>,res:Response<ResponseBody<SongDto>>,next:NextFunction){
        try{
            const updatedSong = await SongService.updateSong(req.params.songId,req.body);
            io.sockets.emit(SONG_UPDATED,updatedSong);
            io.sockets.emit(NEW_STAT_GENERATED, await StatService.generalStat())
            res.status(200).send({
                data:updatedSong,
                message:"Song updated successfully"
            });
        }catch(err){
            next(err)
        }
    }
    static async deleteSong(req:Request<{songId:string}>,res:Response<ResponseBody<SongDto>>,next:NextFunction){
        try{
            const deletedSong = await SongService.deleteSong(req.params.songId);
            io.sockets.emit(SONG_DELETED,deletedSong);
            io.sockets.emit(NEW_STAT_GENERATED, await StatService.generalStat())
            res.status(299).send({
                data:deletedSong,
                message:"Song deleted successfully",
            });
        }catch(err){
            next(err);
        }
    }
}