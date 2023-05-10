import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';

import DoctorsTable from '../../../layout/components/doctorsTable/DoctorsTable';
import PageAction from '../../../layout/components/page-action/PageAction';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';
import { IDoctor } from '../../../interfaces/doctor';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Doctors',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Polyclinic',
      route: 'default-dashboard'
    },
    {
      title: 'Doctors'
    }
  ]
};

const DoctorPage = () => {
  const [doctors, setDoctors] = useFetchPageData<IDoctor[]>('./doctor/all', []);
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);

  const handleDelete = async (doctor: IDoctor) => {
    try {
      await fetch(`/api/polyclinics/${doctor.adminpolyclinic}/doctors/${doctor._id}`, {
        method: 'DELETE'
      });
      setDoctors(doctors.filter((d) => d._id !== doctor._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingDoctor(null);
  };

  const handleConfirmDelete = () => {
    if (deletingDoctor) {
      handleDelete(deletingDoctor);
      setDeletingDoctor(null);
    }
  };

  const doctorsActions = (doctor: IDoctor) => (
    <div className='buttons-list nowrap'>
      <Popconfirm
        title='Are you sure you want to delete this doctor?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={!!deletingDoctor && deletingDoctor._id === doctor._id}
      >
        <Button
          onClick={() => {
            setDeletingDoctor(doctor);
          }}
          shape='circle'
          danger
        >
          <span className='icofont icofont-ui-delete' />
        </Button>
      </Popconfirm>
    </div>
  );

  usePageData(pageData);

  return (
    <>
      <DoctorsTable data={doctors} actions={doctorsActions} />

      <PageAction
        icon='icofont-doctor'
        type={'primary'}
        onClick={() => {
          // add code for adding a new doctor here
        }}
      />

      <Popconfirm
        title='Are you sure you want to delete this doctor?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={!!deletingDoctor}
      ></Popconfirm>
    </>
  );
};

export default DoctorPage;
