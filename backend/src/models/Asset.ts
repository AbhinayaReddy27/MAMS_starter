
import mongoose, { Schema, Document } from 'mongoose';

export interface IAsset extends Document {
  nsn: string;
  name: string;
  category?: string;
  unitOfMeasure?: string;
  minThreshold?: number;
}

const AssetSchema = new Schema<IAsset>({
  nsn: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  category: String,
  unitOfMeasure: String,
  minThreshold: { type: Number, default: 0 }
}, { timestamps: true });

export const Asset = mongoose.model<IAsset>('Asset', AssetSchema);
