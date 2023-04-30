import { IUser } from './user';
import { IPatient } from './patient';
import { IAdminPolyclinic } from './adminPolyclinique';
export interface IDoctor {
  _id?: string;
  user?: IUser['_id'];
  aboutMe?: string;
  name?: string;
  password?: string;
  speciality?: 'Carcinologist' | 'cardiologist' | 'Psychiatrist';
  patients?: IPatient['id'][];
  adminpolyclinic?: IAdminPolyclinic['_id'];
}
