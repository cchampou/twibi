import { validateFields } from '../../utils/validate';
import Command from '../models/Command';

export const listCommands = async (req, res) => {
  const commands = await Command.find({});
  return res.send(commands);
};

export const clearCommands = async (req, res) => {
  await Command.deleteMany();
  return res.send();
};

export const createCommand = async (req, res) => {
  const validation = validateFields(req.body, ['command', 'response']);
  if (validation.length > 0) {
    return res.status(400).send(`Missing field ${validation.join(', ')}`);
  }
  const newDocument = new Command({
    command: req.body.command,
    response: req.body.response,
  });
  const insertedDocument = await newDocument.save();
  return res.send(insertedDocument);
};
