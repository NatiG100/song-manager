import {Optional} from 'utility-types'
export default interface SongDto{
    title:string,
    artist:string,
    album:string,
    genre:string,
}
export type UpdateSongDto = Optional<SongDto>
export type TSongFilter = Pick<UpdateSongDto,"album"|"artist"|"genre"|"title"> 

export interface Pagination{
    limit:number,
    skip:number,
}