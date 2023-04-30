import React, { useContext, useEffect, useState } from 'react';
import { IPageData } from '../../interfaces/page';
import Prescription from '../../layout/components/prescriptionPatient/Prescription';
import { useFetchPageData, usePageData } from '../../hooks/usePage';
import { Patientcontext } from '../../layout/components/Patientoffice/provider/PatientProvider';
import { IPrescription } from '../../interfaces/prescription';
const pageData: IPageData = {
  title: 'Departments',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Departments'
    }
  ]
};

const PrescriptionsPatient = () => {
  const user = useContext(Patientcontext);
  console.log(user.user._id, 'gsfggfsdgdgsg');
  console.log(user);
  const [prescriptions] = useFetchPageData<IPrescription[]>(
    `./prescription/${user.user._id}/patients`,
    []
  );
  console.log(
    '🚀 ~ file: PrescriptionsPatient.tsx:29 ~ PrescriptionsPatient ~ prescriptions:',
    prescriptions
  );

  usePageData(pageData);
  const depClass = (i, length) => {
    if (i === length - 1) {
      return 'mb-0';
    }

    if (i > length - 4) {
      return 'mb-md-0';
    }

    return '';
  };

  return (
    <div className='row'>
      {prescriptions.map((prs, i) => (
        <div className='col-md-4 col-sm-12' key={i}>
          <Prescription
            prescription={prs}
            className={`white-bg ${depClass(i, prescriptions.length)}`}
          />
        </div>
      ))}
    </div>
  );
};

export default PrescriptionsPatient;
