import React, { useState, useEffect, createContext } from 'react';
import { IPatientModel } from '../../../../interfaces/patientmodel';
import { getpatient } from '../service/patientservice';
import { IRecord } from '../../../../interfaces/Record';
import { response } from 'express';
import { useHideLoader } from '../../../../hooks/useHideLoader';
//import { getDoctor } from '../login/service/auth.Service';
const username = JSON.parse(localStorage.getItem('user'))?.username;
// Créez un contexte et exportez-le

export type Patientcontextype = {
  patient: any;
  setpatient: any;
  user: any;
  setuser: any;
  records: any;
  setrecords: any;
};
type Patientcontextprovidertype = {
  children: React.ReactNode;
};

export const Patientcontext = createContext({} as Patientcontextype);
export const PatientProvider = ({ children }: Patientcontextprovidertype) => {
  const [patient, setpatient] = useState<Partial<IPatientModel>>(null);
  const [user, setuser] = useState<Partial<IPatientModel>>(null);
  const [records, setrecords] = useState<IRecord[]>(null);
  const [stop, setstop] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await getpatient(username);
        setpatient(response.patient);
        setuser(response.user);
        //setrecords(partialpatient3);
        setrecords(response.records);
        console.log('patient', patient);
      } catch (error) {
        console.log(error);
      }
    }

    getUserInfo();
    if (patient != null) {
      setstop(true);
    }
  }, [patient != null]);

  return (
    <Patientcontext.Provider value={{ user, setuser, patient, setpatient, records, setrecords }}>
      {' '}
      {children}
    </Patientcontext.Provider>
  );
};
