import mongoose, { Document, Schema } from "mongoose";
import { IDonor } from "./donor";

export interface IMaterial  {
  _id?:string,
  donor?: IDonor;  
  materialname?: string;
  quantity?: number;
  state?: string;
}
