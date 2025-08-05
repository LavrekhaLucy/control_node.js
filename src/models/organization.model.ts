import {model, Schema} from 'mongoose';
import {OrganizationType} from '../enums/enum.organization-type';

const OrganizationSchema = new Schema({
        name: {type: String, required: true, unique: true, trim: true,},
        type: {type: String, enum: Object.values(OrganizationType), required: true,},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Organization = model('organizations', OrganizationSchema);
