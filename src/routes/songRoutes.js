import {token} from '../services/passport/index';
import {SongController} from '../controllers/songController';
import { Router } from 'express';
const routes = new Router();

routes.post('/',token(),SongController.createSong);

routes.get('/',token(), SongController.allSong);

routes.delete('/:id',token(), SongController.deleteSong);

routes.put('/:id', token(),SongController.editSong);

routes.get('/:id',token(),SongController.getSong);

module.exports = routes;

