import mongoose from "mongoose";

const { Schema } = mongoose;

const SongSchema = new Schema({
    title : String,
    artist : String,
    album : String,
    year : String,
},{versionKey:false});

export const Song = mongoose.model('Song',SongSchema);

export const SongRepository = {

    async saveSong(newSong){
        const song = new Song({
            title: newSong.title,
            artist:newSong.artist,
            album : newSong.album,
            year : newSong.year
        });
        const result = await song.save();
        return result;
    },
    async findById(song_id){
        const result = await Song.findById(song_id);
        return result!=null?result:undefined;
    },
    async delete(song_id){

        if(Song.findById(song_id) != null){
            await Song.findOneAndRemove(song_id).exec();
            return undefined;
        }else{
            return null;
        }
    },
    async findAll(){
        return await Song.find();
    },


    async editById(song_id,songMod){
        const song = await Song.findById(song_id);
        return song != null ? await Object.assign(song,songMod).save() : undefined;
    },



}