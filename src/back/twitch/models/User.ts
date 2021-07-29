import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  twitchUsername: String,
  twitchAccessToken: String,
});

const User = model('User', userSchema);

export default User;
