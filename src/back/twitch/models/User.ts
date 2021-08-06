import { Schema, model } from 'mongoose';

interface UserType {
  twitchUsername: string;
  email: string;
  twitchAccessToken: string;
  twitchUserId: string;
}

const userSchema = new Schema({
  twitchUsername: String,
  twitchUserId: String,
  twitchAccessToken: String,
  email: String,
});

const User = model<UserType>('User', userSchema);

export default User;
