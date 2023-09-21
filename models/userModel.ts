import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  phoneNumber: string;
  password: string;
  phone: string;
  address: string;
  favourite: string;
  role: boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
