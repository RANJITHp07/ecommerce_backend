import mongoose, { Document, Schema } from 'mongoose';

interface IProductSize extends Document {
  quantity: number;
  size: string;
}

export interface IProduct extends Document {
  username: string;
  slug: string;
  price: number;
  desc: string;
  maincategory: 'Watch' | 'Cloth' | 'Shoe';
  category: string[];
  size?: IProductSize[];
  quantity?: number;
  color: string[];
  photo: string[];
  shipping?: boolean;
}

const sizeSchema: Schema<IProductSize> = new Schema({
  quantity: Number,
  size: String,
});

const productSchema: Schema<IProduct> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  maincategory: {
    type: String,
    enum: ['Watch', 'Cloth', 'Shoe'],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  size: {
    type: [sizeSchema],
    required(this: IProduct) {
      return this.maincategory === 'Shoe' || this.maincategory === 'Cloth';
    },
  },
  quantity: {
    type: Number,
    required(this: IProduct) {
      return this.maincategory === 'Watch';
    },
  },
  color: {
    type: [String],
    required: true,
  },
  photo: {
    type: [String],
    required: true,
  },
  shipping: {
    type: Boolean,
  },
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', productSchema);
