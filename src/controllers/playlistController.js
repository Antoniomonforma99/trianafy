import { PlayListRepository } from '../models/playlist';
import {SongRepository} from '../models/song';
export const PlayListController = {

    allPlayList: async (req, res) => {
        const all = await PlayListRepository.findAll(req.user.id);
        if (Array.isArray(all) && all.length > 0) {
            res.json(all)
        } else {
            res.sendStatus(404)
        }
    },
    
    createPlayList: async (req, res) => {
        const newPlayList = await PlayListRepository.savePlayList({
            name: req.body.name,
            description: req.body.description,
            user_id: req.user.id,
            songs: []
        });
        return newPlayList!=undefined? res.json(newPlayList) : res.sendStatus(400);
    },
    editPlayList: async (req, res) =>{
        const editPlayList = await PlayListRepository.editById(req.params.id,{
            name:req.body.name,
            description: req.body.description,
            user_id : req.user.id,
            song : req.body.songs
        });
        if(editPlayList!=undefined){
           return res.json(editPlayList);
        }else{
            res.sendStatus(404);
        }

},
    getPlayList: async (req, res) => {
            const playList = await PlayListRepository.findById(req.params.id);            
        //Primero status y luego error
        if (playList != undefined) {
            res.json(playList);
        } else {
            res.sendStatus(404);
        }
    },
    getSongs: async (req,res)=>{
        const songs = await PlayListRepository.findSongs(req.params.id);
        return songs!=undefined? res.json(songs):  res.sendStatus(404) ; //Mensaje o array vacio
    },

    addToPlayList: async (req,res)=>{
        const playList = await PlayListRepository.findById(req.params.id1);
        const song = await SongRepository.findById(req.params.id2);
        playList.songs.push(song);
        return PlayListRepository.editById(req.params.id1,playList)!=undefined? res.sendStatus(200) : res.sendStatus(404);
},

    songFromPlayList: async (req,res) =>{
        const songs = await PlayListRepository.findSongs(req.params.id1);
        const result = songs.filter(song => song._id==req.params.id2);
        return result.length>0 ?res.json(result):res.sendStatus(404);
    }

}