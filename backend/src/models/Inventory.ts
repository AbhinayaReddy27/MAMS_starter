
import mongoose, { Schema, Document } from 'mongoose';

export interface IInventory extends Document {
  baseId: mongoose.Types.ObjectId;
  assetId: mongoose.Types.ObjectId;
  onHand: number;
  reserved: number;
  lastCountedAt?: Date;
}

const InventorySchema = new Schema<IInventory>({
  baseId: { type: Schema.Types.ObjectId, ref: 'Base', required: true },
  assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
  onHand: { type: Number, default: 0 },
  reserved: { type: Number, default: 0 },
  lastCountedAt: Date
}, { timestamps: true });

InventorySchema.index({ baseId: 1, assetId: 1 }, { unique: true });

export const Inventory = mongoose.model<IInventory>('Inventory', InventorySchema);
