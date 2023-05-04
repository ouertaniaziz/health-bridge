import { Document, Types } from 'mongoose';
import { IPatient } from './patient';
import { IDoctor } from './doctor';
import { ITraitement } from './traitement';

export interface IPrescription extends Document {
  patient: Types.ObjectId | IPatient;
  doctor: IDoctor;
  date: Date;
  verified: boolean;
  qrCodeVerif: string;
  traitement: Types.ObjectId[] | ITraitement[];
}
