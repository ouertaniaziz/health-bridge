import mongoose, { Document, Schema } from "mongoose";
import { IDonor } from "./donor";

export interface IMedication extends Document {
  donor?: IDonor["_id"];
  medicationname: string;
  validationperiod: number;
  packetsname?: string;
  description: string;
}
