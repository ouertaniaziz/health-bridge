import { Document } from 'mongoose';
import { IUser } from './user';
import { IDoctor } from './doctor';
import { IPatient } from './patient';
import { IPrescription } from './prescription';

export interface IAdminPolyclinic extends Document {
  user: IUser['_id'];
  doctors: IDoctor['_id'][];
  patients: IPatient['id'][];
  location: 'Tunis Polyclinic' | 'Sousse Polyclinic' | 'Sfax Polyclinic';
  prescriptions: IPrescription['id'][];
}
