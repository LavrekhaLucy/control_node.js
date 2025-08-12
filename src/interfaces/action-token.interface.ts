import { ActionTokenTypeEnum } from '../enums/action-token-type.enum';
import {ObjectId} from "mongoose";

export interface IActionToken {
    _id?: ObjectId;
    token: string;
    type: ActionTokenTypeEnum;
    _userId: ObjectId;
}