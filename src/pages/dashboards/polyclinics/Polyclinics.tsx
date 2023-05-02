import React, { useState } from 'react';

import { Modal } from 'antd';

import className from '../../../utils/class-names';

import Contact from '../../../layout/components/doctor/Contact';
import PageAction from '../../../layout/components/page-action/PageAction';
import PolyclinicForm from './PolyclinicForm';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IUser } from '../../../interfaces/user';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Polyclinics',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Admin Polyclinic',
      route: 'default-dashboard'
    },
    {
      title: 'Polyclinics'
    }
  ]
};

const PolyclinicsPage = () => {
  usePageData(pageData);
  const [polyclinics, setPolyclinics] = useFetchPageData<IUser[]>('./data/poylclinics.json', []);
  const [addingPolyclinic, setAddingPolyclinic] = useState(false);

  const openModal = () => setAddingPolyclinic(true);
  const closeModal = () => setAddingPolyclinic(false);

  const addPolyclinic = (polyclinic: IUser) => setPolyclinics([polyclinic, ...polyclinics]);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });

  return (
    <div className='row'>
      {polyclinics.map((doctor, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, polyclinics.length)} {...doctor} />
        </div>
      ))}

      <PageAction onClick={openModal} icon='icofont-contact-add' />

      <Modal
        open={addingPolyclinic}
        onCancel={closeModal}
        title={<h3 className='title'>Add Polyclinic</h3>}
        destroyOnClose
        footer={null}
      >
        <PolyclinicForm onSubmit={addPolyclinic} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default PolyclinicsPage;
