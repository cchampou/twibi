import * as mongoose from 'mongoose';

interface SubscriptionType {
  type: 'live' | 'follow'
  expires: string
}

const subscriptionSchema = new mongoose.Schema<SubscriptionType>({
  type: String,
  expires: String,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
