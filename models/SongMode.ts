import { Schema, model } from "mongoose";

const SongSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    album:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:Date,
});

const SongModel = model('Song',SongSchema);
export default SongModel;