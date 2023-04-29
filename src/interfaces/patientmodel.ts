export interface IPatientModel {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  creationDate: string;
  image: string;
  prescriptions?: [];
  resetCode?: number;
  isVerified?: boolean;
  banned?: boolean;
  banLiftsAt?: string;
  failedLoginAttempts?: number;
  emailtoken?: string;
  dateOfBirth?: string;
  gender: string;
  city: string;
  postal_code: string;
  state: string;
  //patient
  cinverified?: boolean;
  medicalHistory?: [];
  bloodGroup?: string;
  insuranceInformation?: string;
  records?: [];
}
