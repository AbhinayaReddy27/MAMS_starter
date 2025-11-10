
import mongoose, { Schema, Document } from 'mongoose';

export type Role = 'ADMIN' | 'OFFICER' | 'CLERK';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  baseId?: mongoose.Types.ObjectId;
  status: 'ACTIVE' | 'SUSPENDED';
  lastLoginAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'OFFICER', 'CLERK'], required: true },
  baseId: { type: Schema.Types.ObjectId, ref: 'Base' },
  status: { type: String, enum: ['ACTIVE','SUSPENDED'], default: 'ACTIVE' },
  lastLoginAt: { type: Date }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);
