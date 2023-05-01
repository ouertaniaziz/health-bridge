import React from 'react';

import className from '../../../utils/class-names';

import Contact from '../../../layout/components/doctor/Contact';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IDoctor } from '../../../interfaces/doctor';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Doctors',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Doctors'
    }
  ]
};

const DoctorsPage = () => {
  usePageData(pageData);
  const [doctors, setDoctors] = useFetchPageData<IDoctor[]>('/doctor/all', []);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });

  return (
    <div className='row'>
      {doctors.map((doctor, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, doctors.length)} {...doctor} />
        </div>
      ))}
    </div>
  );
};

export default DoctorsPage;
