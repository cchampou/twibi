import { Schema, model } from 'mongoose';
import { CommandType } from '../../../common/types';

const commandSchema = new Schema({
  command: String,
  response: String,
});

const Command = model<CommandType>('Command', commandSchema);

export default Command;
