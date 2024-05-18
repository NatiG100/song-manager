export default interface SongDto{
    id?:string,
    title:string,
    artist:string,
    album:string,
    gener:string,
}
export interface UpdateSongDto{
    id:string,
    title?:string,
    artist?:string,
    album?:string,
    gener?:string, 
}

export interface Pagination{
    limit:number,
    skip:number,
}