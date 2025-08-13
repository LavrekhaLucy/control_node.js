// import { Schema, model } from 'mongoose';
// import { IBrand } from '../interfaces/brand-interface';
//
// const BrandSchema = new Schema<IBrand>({
//     name: { type: String, required: true, unique: true, trim: true },
// }, { timestamps: true });
//
// export const Brand = model<IBrand>('Brand', BrandSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
    name: string;
    models: string[];
}

const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true },
    models: { type: [String], default: [] }
});

export const BrandModel = mongoose.model<IBrand>('Brand', BrandSchema);