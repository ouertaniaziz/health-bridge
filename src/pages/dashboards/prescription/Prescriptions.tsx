import React from 'react';
import { usePageData } from '../../../hooks/usePage';
import { useFetch } from '../../../hooks/useFetch';
import PrescriptionTable from './PrescriptionTable';
import { IPageData } from '../../../interfaces/page';
import { IPrescription } from '../../../interfaces/prescription';

const pageData: IPageData = {
  title: 'Prescriptions',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Prescriptions'
    }
  ]
};

const PrescriptionPage = () => {
  usePageData(pageData);

  const [response, setResponse] = useFetch<IPrescription[]>('/prescription', []);

  return (
    <>
      <PrescriptionTable prescriptions={response} />
    </>
  );
};

export default PrescriptionPage;
