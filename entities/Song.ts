export default interface SongDto{
    title:string,
    artist:string,
    album:string,
    genre:string,
}
export interface UpdateSongDto{
    title?:string,
    artist?:string,
    album?:string,
    genre?:string, 
}

export interface Pagination{
    limit:number,
    skip:number,
}