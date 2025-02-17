import mongoose, { Schema, model, models } from "mongoose";

export interface Events extends mongoose.Document {
  name: string;
  location: string;
  descirption: string;
  date: Date;
  invitees: string[];
  descisionMode: number;
  createdAt: Date;
}

const EventSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  invitees: [{ type: String, required: true }],
  decisionMode: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export const Event = models.Event || model("Event", EventSchema);
