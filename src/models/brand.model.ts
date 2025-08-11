import { Schema, model } from 'mongoose';
import { IBrand } from '../interfaces/brand-interface';

const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });

export const Brand = model<IBrand>('Brand', BrandSchema);
