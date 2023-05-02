import mongoose, { Document, Schema } from "mongoose";
import { IMaterial } from "./material";
import { IMedication } from "./medication";
import { IUser } from './user';


export interface IDonor extends Document { 
  user?: IUser['_id'];
  donationDate?: Date;
  description?: string;
  materials?: IMaterial["_id"][];
  medications?: IMedication["_id"][];
}

