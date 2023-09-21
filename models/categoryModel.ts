import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  maincategory: 'Cloth' | 'Shoe' | 'Watch';
  categoryname: string;
  slug: string;
}

const categorySchema = new Schema<ICategory>({
  maincategory: {
    type: String,
    enum: ['Cloth', 'Shoe', 'Watch'],
    required: true,
  },
  categoryname: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', categorySchema);
