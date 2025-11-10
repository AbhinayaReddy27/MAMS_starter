
import mongoose, { Schema, Document } from 'mongoose';

export type TransferStatus = 'DRAFT'|'PENDING_APPROVAL'|'APPROVED'|'IN_TRANSIT'|'DELIVERED'|'REJECTED';

export interface ITransferOrder extends Document {
  fromBaseId: mongoose.Types.ObjectId;
  toBaseId: mongoose.Types.ObjectId;
  requestedBy: mongoose.Types.ObjectId;
  items: { assetId: mongoose.Types.ObjectId; qty: number }[];
  status: TransferStatus;
  timeline: { status: string; at: Date; by?: mongoose.Types.ObjectId }[];
}

const TransferOrderSchema = new Schema<ITransferOrder>({
  fromBaseId: { type: Schema.Types.ObjectId, ref: 'Base', required: true },
  toBaseId: { type: Schema.Types.ObjectId, ref: 'Base', required: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ assetId: { type: Schema.Types.ObjectId, ref: 'Asset' }, qty: Number }],
  status: { type: String, enum: ['DRAFT','PENDING_APPROVAL','APPROVED','IN_TRANSIT','DELIVERED','REJECTED'], default: 'DRAFT' },
  timeline: [{ status: String, at: Date, by: { type: Schema.Types.ObjectId, ref: 'User' } }]
}, { timestamps: true });

export const TransferOrder = mongoose.model<ITransferOrder>('TransferOrder', TransferOrderSchema);
