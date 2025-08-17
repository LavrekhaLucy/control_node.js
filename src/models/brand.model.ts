// import mongoose, { Schema,  } from 'mongoose';
// import {IBrand} from '../interfaces/brand-interface';
//
// const BrandSchema = new Schema<IBrand>({
//     name: { type: String, required: true },
//     models: { type: [String], default: [] }
// });
//
// export const BrandModel = mongoose.model<IBrand>('Brand', BrandSchema);

// models/brand.model.ts


import { Schema, model } from 'mongoose';
import {IBrand} from '../interfaces/brand-interface';



const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});

export const Brand = model<IBrand>('Brand', BrandSchema);
