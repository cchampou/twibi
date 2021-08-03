import { Schema, model } from 'mongoose';

interface UserType {
  twitchUsername: string;
  twitchAccessToken: string;
}

const userSchema = new Schema({
  twitchUsername: String,
  twitchAccessToken: String,
});

const User = model<UserType>('User', userSchema);

export default User;
