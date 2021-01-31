import {SongRepository} from '../models/song';

export const SongController = {

    createSong : async (req,res) => {
        const newSong = await SongRepository.saveSong({
            title:req.body.title,
            artist:req.body.artist,
            album:req.body.album,
            year:req.body.year
        });
        res.json(newSong);
    },
    allSong: async (req,res) =>{
        const allSongs = await SongRepository.findAll();
        return allSongs!=undefined? res.json(allSongs) : res.sendStatus(404);
    },
    editSong: async (req,res)=>{
        const editSong= await SongRepository.editById(req.params.id,{
            title:req.body.title,
            artist:req.body.artist,
            album:req.body.album,
            year:req.body.year,
        });
        if(req.body.id !=null){
            return res.sendStatus(409);
        }else if(editSong!=undefined){
            return res.sendStatus(204);
        }else{
            return res.sendStatus(404);
        }
    },
    getSong: async (req,res) =>{
        const song = await SongRepository.findById(req.params.id);
        return song!=undefined? res.json(song) : res.sendStatus(404);
    },
 
    deleteSong : async (req,res)=>{
        const delSong = await SongRepository.delete(req.params.id);
        return delSong!=null? res.sendStatus(204) : res.sendStatus(404);

    }



}