import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    fullname: String,
    email: String,
    password: String
}, { versionKey: false });

export const User = mongoose.model('User', UserSchema);

export const userRepository = {
    async findById(user_id) {
        let user = await User.findById(user_id).exec();
        return user;
    },
    async findAll() {
        const all = await User.find({}).exec();
        return all;
    },



    async findByUsername(username) {
        const user = await User.find({ username: username });
        return user;
    },
    async create(NewUser) {
        const password = bcrypt.hashSync(NewUser.password, parseInt(process.env.BCRYPT_ROUNDS));
        const user = new User({
            username: NewUser.username,
            email: NewUser.email,
            fullname: NewUser.fullname,
            password: password
        });
        const save = await user.save();
        return this.toDto(save);
    },
    toDto(user) {
        return {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email
        }
    }, 
    async updateById(id, modifiedUser) {

        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;
    },
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    },
    async delete(id) {
        await User.findByIdAndRemove(id).exec();
    }

}

export const emailExist = async (email) => {
    let result = await User.countDocuments({ email: email }).exec();
    return result > 0;
}


