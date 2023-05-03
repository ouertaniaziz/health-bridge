export interface IPatient {
  id?: string;
  img?: string | ArrayBuffer;
  profileImg?: string | ArrayBuffer;
  name: string;
  lastName?: string;
  fullName?: string;
  number: string;
  phone?: string;
  age: number;
  gender: string;
  address: string;
  status?: string;
  lastVisit?: string;
}

export interface IAppointment {
  _id?: string;
  img?: string;
  name?: string;
  email?: string;
  number?: string;
  date?: string;
  fromTo?: string;
  doctor?: string;
  injury?: string;
  from?: string;
  to?: string;
  patientId?: string;
}
export interface PrescriptionTableProps {
  data: IMedication[];
  actions: (medication: IMedication) => JSX.Element;
}
export interface IMedication {
  _id: string;
  medicationName: string;
  manufacturer: string;
  dosageForm: string;
  dosageStrength: string;
  validationPeriod: string;
  expirationDate: string;
  prescriptionRequired: boolean;
  numPackets: number;
  description: string;
  __v: number;
}

export interface IBilling {
  billNo: number;
  billDate: string;
  patient: string;
  doctor: string;
  charges: number;
  tax: number;
  discount: number;
  total: number;
}

export interface IDepartment {
  img: string;
  title: string;
  desc: string;
  team: string[];
}
