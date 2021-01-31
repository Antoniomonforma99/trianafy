import {PlayListController} from '../controllers/playlistController';
import {token} from '../services/passport';
import { Router } from 'express';


const routes = new Router();

routes.post('/',token(),PlayListController.createPlayList);

routes.get('/',token(),PlayListController.allPlayList);

routes.get('/:id/songs',token(),PlayListController.getSongs);

routes.get('/:id1/songs/:id2',token(),PlayListController.songFromPlayList);

routes.get('/:id',token(),PlayListController.getPlayList);

routes.put('/:id',token(),PlayListController.editPlayList);




module.exports = routes;
