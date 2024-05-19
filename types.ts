export interface ResponseBody<T>{
    data:T,
    message:string,
}
export interface GeneralStat{
    totalSongs:number,
    totalArtists:number,
    totalAlbums:number,
    totalGenres:number,
    songsInGenre:{_id:string,count:number}[],
    songsInAlbum:{_id:string,count:number}[],
    songsByArtist:{_id:string,count:number}[],
    albumsByArtist:{_id:string,count:number}[],
}