import { IDonor } from "./donor";

export interface IMedicationModel {
  donor?: IDonor;
  medicationname?: string;
  validationperiod?: number;
  packetsname?: string;
  description?: string;
  quantity?: number;
}
