import { Schema, model } from 'mongoose';

interface NotificationType {
  user: string;
  eventType: string;
  text: string;
}

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  eventType: String,
  text: String,
});

const Notification = model<NotificationType>(
  'Notification',
  notificationSchema
);

export default Notification;
