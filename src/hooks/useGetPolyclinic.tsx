import { useEffect, useState } from 'react';

import { IUser } from '../interfaces/user';
import axios from 'axios';

async function getPolyclinics() {
  const result = await axios.get('./data/polyclinics.json');
  return result.data as IUser[];
}

export function useGetPolyclinics(): IUser[] {
  const [polyclinics, setPolyclinics] = useState([]);

  useEffect(() => {
    getPolyclinics().then((data) => {
      setPolyclinics(data);
    });
  }, []);

  return polyclinics;
}

export function useGetPolyclinic(name: string) {
  const [polyclinic, setPolyclinic] = useState(null);
  const polyclinics = useGetPolyclinics();

  useEffect(() => {
    if (polyclinics.length === 0) return;

    const newPolyclinic = polyclinics.find((poly) => poly.username === name);

    if (newPolyclinic === undefined) return;

    setPolyclinic(newPolyclinic);
  }, [name, polyclinics]);

  return { polyclinic };
}