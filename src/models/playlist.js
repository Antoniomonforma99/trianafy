import mongoose from "mongoose";

const { Schema } = mongoose;

const PlayListSchema =new Schema({
        name: String,
        description: String,
        user_id: { 
                type:Schema.Types.ObjectId,
                ref: 'User'},
        songs: [{
                type: Schema.Types.ObjectId,
                ref: 'Song'
        }]
},{versionKey: false});

export const PlayList = mongoose.model('PlayList',PlayListSchema);

export const PlayListRepository={

        async editById(playList_id, playListMod){
                const playList = await PlayList.findById(playList_id);
                return playList!= null ? await Object.assign(playList, playListMod).save() : undefined;
        },
        async findAll(user_id){
                return await PlayList
                .find({user_id: user_id})
                .populate('User','_id')
                .populate('songs')
        },
        async findById(playList_id){
                const result = await  PlayList.findById(playList_id).populate('User','_id').populate('Song');
                return result != null ? result : undefined;
        },
        async savePlayList(newPlayList){
                const playList = new PlayList({
                        name: newPlayList.name,
                        description: newPlayList.description,
                        user_id : newPlayList.user_id,
                        songs: newPlayList.songs
                });
                const result = await playList.save();
                return result;
        },
        async findSongs(playList_id){
                const playList = await PlayList.findOne({_id:playList_id},{songs:1}).populate('songs');
                const songs=playList.songs;
                console.log(songs);
                return Array.isArray(songs) && songs.length>0? songs: undefined;
        }
}