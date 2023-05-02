import { IPrescription } from './prescription';
export interface User {
  name: string;
  address: string;
  img?: string | ArrayBuffer;
  gender?: string;
  phone?: string;
  profileLink?: string;
}
interface IRole {
  _id: string;
}

export interface IUser {
  social?: IUserLink[];
  profileLink?: string;
  age?: number;
  _id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  gender?: 'Male' | 'Female';
  phone?: string;
  street?: string;
  creationDate?: Date;
  dateOfBirth?: Date;
  bloodGroup?: string;
  medicalHistory?: string;
  medications?: string;
  insuranceInformation?: string;
  symptoms?: string;
  testResults?: string;
  role?: 'patient' | 'doctor' | 'pharmacist' | 'adminpolyclinic' | 'admin';
  roles?: IRole['_id'][];
  speciality?: 'carcino' | 'cardiologist' | 'psychiatrist';
  emailtoken?: string;
  isVerified?: boolean;
  banned?: boolean;
  banLiftsAt?: Date | null;
  failedLoginAttempts?: number;
  resetCode?: number;
  prescriptions?: IPrescription['_id'][];
  resetToken?: string;
  expireToken?: Date;
  city?: string;
  postal_code?: number;
  state?: string;
  img?: string;
}
export interface IUserLink {
  icon: string;
  link: string;
}
