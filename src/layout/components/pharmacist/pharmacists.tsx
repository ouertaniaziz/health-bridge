import React, { useState } from 'react';

import { Modal } from 'antd';

import className from '../../../utils/class-names';

import PageAction from '../../../layout/components/page-action/PageAction';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IUser } from '../../../interfaces/user';
import { IPageData } from '../../../interfaces/page';
import ContactPharmacist from './contactpharmacist';
import PharmacistForm from './pharmacistForm';

const pageData: IPageData = {
  title: 'Pharmacists',
  fulFilled: false,   
  breadcrumbs: [
    {
      title: 'Pharmacist',
      route: 'default-dashboard'
    },
    {
      title: 'Pharmacits'
    }
  ]
};

const Pharmacists = () => {
  usePageData(pageData);
  const [pharmacists, setpharmacists] = useFetchPageData('/pharmacist/getallpharmacists', []);
  const [addingPharmacist, setAddingPharmacists] = useState(false);

  const openModal = () => setAddingPharmacists(true);
  const closeModal = () => setAddingPharmacists(false);

  const addingPharmacists = (pharmacist: IUser) => setpharmacists([pharmacist, ...pharmacists]);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });

  return (
    <div className='row'>
      {pharmacists.map((pharmacist, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <ContactPharmacist className={getClass(index, pharmacists.length)} data={pharmacist} />
        </div>
      ))}

      <PageAction onClick={openModal} icon='icofont-contact-add' />

      <Modal
        open={addingPharmacist}
        onCancel={closeModal}
        title={<h3 className='title'>Add pharmacist </h3>}
        destroyOnClose
        footer={null}
      >
        {/* <PharmacistForm  onSubmit ={addingPharmacist} onCancel={closeModal} /> */}

      </Modal>
    </div>
  );
};
export default Pharmacists;
