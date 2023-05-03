import { Document, Types } from 'mongoose';
import { IPatient } from './patient';
import { IDoctor } from './doctor';
import { ITraitement } from './traitement';

export interface IPrescription extends Document {
  _id: Types.ObjectId;
  patient: IPatient;
  doctor: IDoctor;
  date: Date;
  verified: boolean;
  qrCodeVerif: string;
  img: string;
  traitement: Types.ObjectId[] | ITraitement[];
}

