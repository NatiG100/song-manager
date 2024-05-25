export interface ResponseBody<T>{
    data:T,
    message:string,
}
export interface GeneralStat{
    totalSongs:number,
    totalArtists:number,
    totalAlbums:number,
    totalGenres:number,
    songsInGenre:{_id:string,total:number}[],
    songsInAlbum:{_id:string,total:number}[],
    songsByArtist:{_id:string,total:number}[],
    albumsByArtist:{_id:string,total:number}[],
}