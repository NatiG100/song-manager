import SongModel from "../models/SongMode";
import { GeneralStat } from "../types";

export default class StatService{
    static async generalStat():Promise<GeneralStat>{
        const totalSongs = await SongModel.estimatedDocumentCount();
        const groupByArtist:{_id:string,total:number}[] = (await SongModel.aggregate([
            {$group:{_id:"$artist",total:{$sum:1}}}
        ]));
        const groupByAlbum:{_id:string,total:number}[] = (await SongModel.aggregate([
            {$group:{_id:"$album",total:{$sum:1}}}
        ]));
        const groupByGenre:{_id:string,total:number}[] = (await SongModel.aggregate([
            {$group:{_id:"$genre",total:{$sum:1}}}
        ]));
        
        const albumsByArtists:{_id:string,total:number}[]  = await SongModel.aggregate([
            {$group:{_id:"$artist",albums:{$addToSet:'$album'}}},
            {$unwind:"$albums"},
            {
                $group:{_id:"$_id",total:{$sum:1}}
            }
        ]);
        return {
            totalSongs,
            totalAlbums:groupByAlbum.length,
            totalArtists:groupByArtist.length,
            totalGenres:groupByGenre.length,
            songsInGenre:groupByGenre,
            songsInAlbum:groupByAlbum,
            songsByArtist:groupByArtist,
            albumsByArtist:albumsByArtists,
        }
    }
}