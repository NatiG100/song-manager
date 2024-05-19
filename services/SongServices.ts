import SongDto, { Pagination,UpdateSongDto } from "../entities/Song";
import SongModel from "../models/SongMode";

export default class SongService{
    static async createSong(song:SongDto):Promise<SongDto>{
        return await SongModel.create(song);
    }
    static async getAllSongs({limit,skip}:Pagination):Promise<SongDto[]>{
        return await SongModel.find({},undefined,{limit,skip})
    }
    static async getSong(id:string):Promise<SongDto>{
        const song = await SongModel.findById(id);
        if(!song){
            throw Error("");
        }
        return song;
    }
    static async updateSong(id:string,song:UpdateSongDto):Promise<SongDto>{
        const songToBeUpdated = await SongModel.findById(id);
        if(!songToBeUpdated){
            throw Error("");
        }
        const updatedSong = await SongModel.findByIdAndUpdate(id,{...song,updatedAt:Date.now()});
        return updatedSong!;

    }
    static async deleteSong(id:string):Promise<SongDto>{
        const songToBeUpdated = await SongModel.findById(id);
        if(!songToBeUpdated){
            throw Error("");
        }
        const deletedSong = await SongModel.findByIdAndDelete(id);
        return deletedSong!;
    }
}