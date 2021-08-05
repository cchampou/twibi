import { Schema, model } from 'mongoose';

interface NotificationType {
  user: string;
}

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Notification = model<NotificationType>(
  'Notification',
  notificationSchema
);

export default Notification;
