import React, { useState } from 'react';

import { Modal } from 'antd';

import className from '../../../utils/class-names';

import Contact from '../../../layout/components/doctor/Contact';
import PageAction from '../../../layout/components/page-action/PageAction';
import DonorForm from './DonorForm';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IUser } from '../../../interfaces/user';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Donors',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Donor',
      route: 'default-dashboard'
    },
    {
      title: 'Donors'
    }
  ]
};

const DonorPage = () => {
  usePageData(pageData);
  const [donors, setDonors] = useFetchPageData<IUser[]>('./data/donors.json', []);
  const [addingDonor, setAddingDonor] = useState(false);

  const openModal = () => setAddingDonor(true);
  const closeModal = () => setAddingDonor(false);

  const addDonor = (donor: IUser) => setDonors([donor, ...donors]);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });

  return (
    <div className='row'>
      {donors.map((donor, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, donors.length)} {...donor} />
        </div>
      ))}

      <PageAction onClick={openModal} icon='icofont-contact-add' />

      <Modal
        open={addingDonor}
        onCancel={closeModal}
        title={<h3 className='title'>Add donor</h3>}
        destroyOnClose
        footer={null}
      >
        <DonorForm onSubmit={addDonor} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default DonorPage;
