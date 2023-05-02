import { IUser } from './user';
import { IPatient } from './patient';
import { IAdminPolyclinic } from './adminPolyclinique';
export interface IDoctor {
  _id?: string;
  user?: IUser;
  aboutMe?: string;
  name?: string;
  password?: string;
  speciality?: 'Carcinologist' | 'cardiologist' | 'Psychiatrist';
  patients?: IPatient[];
  adminpolyclinic?: IAdminPolyclinic[];
}
