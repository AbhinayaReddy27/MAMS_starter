
import mongoose, { Schema, Document } from 'mongoose';

export interface IBase extends Document {
  code: string;
  name: string;
  location?: { lat?: number; lng?: number; address?: string };
  contact?: string;
}

const BaseSchema = new Schema<IBase>({
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  location: { lat: Number, lng: Number, address: String },
  contact: { type: String }
}, { timestamps: true });

export const Base = mongoose.model<IBase>('Base', BaseSchema);
