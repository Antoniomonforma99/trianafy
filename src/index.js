import "dotenv/config";
import cors from "cors";
import bodyParser from 'body-parser';
import express from "express";
import morgan from "morgan";
import morganBody from "morgan-body";
import passport from './services/passport';
import models from './models';
import mongoose from "mongoose"


import * as users from './models/users';

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);

app.use(passport.initialize());


app.use('/auth', routes.auth);
app.use('/songs', routes.songRoutes);
app.use('/lists', routes.playlistRoutes);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
  if (err) {
    console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
  } else {
    console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(
        `Trianafy ejecutándose en el puerto: ${process.env.PORT}`
      )
    );
  }

});

app.use((req, res, next) => {
  
  req.context = {
    models,
    me: models.users.userRepository.findById(1)
  };
  next();
});



export default {
  users
}