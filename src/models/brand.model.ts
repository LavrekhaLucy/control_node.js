import mongoose, { Schema,  } from 'mongoose';
import {IBrand} from '../interfaces/brand-interface';

const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true },
    models: { type: [String], default: [] }
});

export const BrandModel = mongoose.model<IBrand>('Brand', BrandSchema);