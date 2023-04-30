export interface ITraitement {
  medicationName: string;
  manufacturer: string;
  dosageForm: string;
  dosageStrength: string;
  validationPeriod: Date;
  expirationDate: Date;
  prescriptionRequired: boolean;
  numPackets: number;
  description: string;
}
