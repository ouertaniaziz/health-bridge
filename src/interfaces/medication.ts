import { IDonor } from "./donor";

export interface IMedicationModel {
  _id?:string,
  donor?: IDonor;
  medicationname?: string;
  validationperiod?: number;
  packetsname?: string;
  description?: string;
  quantity?: number;
}
