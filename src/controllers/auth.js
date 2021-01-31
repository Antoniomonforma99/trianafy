import { User, userRepository } from '../models/user';
import {JwtService} from '../services/jwt'


const AuthController = {

    register: (req, res, next) => {
        let usuarioCreado = {
            username : req.body.username,
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password
        };
        userRepository.create(usuarioCreado);
        res.status(201).json({
            id: usuarioCreado.id,
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    login: (req, res, next) => {
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }
}