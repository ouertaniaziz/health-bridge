import { IPrescription } from './prescription';

export interface IPharmacist {
  _id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  creationDate?: string;
  image?: string;
  prescriptions?: [];
  resetCode?: number;
  isVerified?: boolean;
  banned?: boolean;
  banLiftsAt?: string;
  failedLoginAttempts?: number;
  emailtoken?: string;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  postal_code?: string;
  state?: string;

  //pharmacist
  pharmacyName?: string;
  pharmacyAddress?: string;
  InsurranceInformation?: string;
}

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
  prescriptions: IPrescription['id'][];
}
