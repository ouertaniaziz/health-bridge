import mongoose, { Document, Schema } from "mongoose";
import { IDonor } from "./donor";

export interface IMaterial  {
  donor?: IDonor["_id"];
  materialname?: string;
  quantity?: number;
  state?: string;
}
