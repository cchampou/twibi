import * as mongoose from 'mongoose';

const commandSchema = new mongoose.Schema({
  command: String,
  response: String,
});

const Command = mongoose.model('Command', commandSchema);

export default Command;
