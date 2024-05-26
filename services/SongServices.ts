import SongDto, { Pagination,TSongFilter,UpdateSongDto } from "../entities/Song";
import AppError from "../error/AppError";
import SongModel from "../models/SongMode";

export default class SongService{
    static async createSong(song:SongDto):Promise<SongDto>{
        return await SongModel.create(song);
    }
    static filterRx(filter?:string){
        return new RegExp("^.*" + (filter||"")+".*$","i");
    }
    static getFilterOption(filter:TSongFilter){
        return {
            title:this.filterRx(filter.title),
            album:this.filterRx(filter.album),
            artist:this.filterRx(filter.artist),
            genre:this.filterRx(filter.genre),
        }
    }
    static async getAllSongs({limit,skip,filter}:Pagination&{filter:TSongFilter}):Promise<SongDto[]>{
        return await SongModel.find(
            this.getFilterOption(filter),
            undefined,
            {limit,skip}
        )
    }
    static async count({filter}:{filter:TSongFilter}){
        return await SongModel.countDocuments(this.getFilterOption(filter));
    }
    static async getSong(id:string):Promise<SongDto>{
        const song = await SongModel.findById(id);
        if(!song){
            throw new AppError(`Song with an id of "${id}" doesn't exist`,404);
        }
        return song;
    }
    static async updateSong(id:string,song:UpdateSongDto):Promise<SongDto>{
        const songToBeUpdated = await SongModel.findById(id);
        if(!songToBeUpdated){
            throw new AppError(`Song with an id of "${id}" doesn't exist`,404);
        }
        await SongModel.findByIdAndUpdate(id,{...song,updatedAt:Date.now()});
        const updatedSong = await SongModel.findById(id);
        return updatedSong!;

    }
    static async deleteSong(id:string):Promise<SongDto>{
        const songToBeUpdated = await SongModel.findById(id);
        if(!songToBeUpdated){
            throw new AppError(`Song with an id of "${id}" doesn't exist`,404);
        }
        const deletedSong = await SongModel.findByIdAndDelete(id);
        return deletedSong!;
    }
}