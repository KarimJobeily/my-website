import mongoose, { Schema, Document, models } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  description: string;
  image: string;
  slug: string;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

const Event = models.Event || mongoose.model<IEvent>('Event', EventSchema);
export default Event;