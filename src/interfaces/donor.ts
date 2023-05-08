import mongoose, { Document, Schema } from "mongoose";
import { IMaterial } from "./material";
import { IMedicationModel } from "./medication";
import { IUser } from './user';
import { ReactNode } from "react";


export interface IDonor extends Document {
  user?: IUser;
  donationDate?: Date;
  description?: string;
  materials?: IMaterial[];
  medications?: IMedicationModel[];
}

