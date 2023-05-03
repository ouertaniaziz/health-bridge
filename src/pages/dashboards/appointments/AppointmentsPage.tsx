import React, { useState, useCallback, useEffect } from 'react';

import { Button } from 'antd';

import EditAppointment from './EditAppointment';
import AddAppointment from './AddAppointment';
import AppointmentsTable from '../../../layout/components/appointmentsTable/AppointmentsTable';

import PageAction from '../../../layout/components/page-action/PageAction';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IAppointment } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { useNavigatePrescription } from '../../../utils/use-navigate-home';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

const pageData: IPageData = {
  title: 'Appointments',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Appointments'
    }
  ]
};
const socket = io('http://localhost:3000');
const AppointmentsPage = () => {
  const doctorId = JSON.parse(localStorage.getItem('user'))?.id;
  const history = useHistory();
  usePageData(pageData);
  const [appointments, setAppointments] = useFetchPageData<IAppointment[]>(
    `./appointments/doctor/${doctorId}`,
    []
  );
  useEffect(() => {
    socket.on('notification', (id) => {
      console.log('🚀 ~ file: AppointmentsPage.tsx:42 ~ socket.on ~ id:', id);
    });
  }, [socket]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [addingModalVisibility, setAddingModalVisibility] = useState(false);

  const handleDelete = (appointment: IAppointment) => {
    const newAppointments = appointments.filter((el) => el !== appointment);
    setAppointments(newAppointments);
  };

  const handleEdit = (appointment: IAppointment) => {
    const editedAppointments = appointments.map((el) =>
      el !== selectedAppointment ? el : appointment
    );
    setAppointments(editedAppointments);
    setSelectedAppointment(null);
  };

  const openAddingModal = () => setAddingModalVisibility(true);

  const addAppointment = (appointment: IAppointment) => {
    setAppointments([appointment, ...appointments]);
    setAddingModalVisibility(false);
  };

  const closeAddingModal = () => setAddingModalVisibility(false);

  const openEditModal = (appointment: IAppointment) => setSelectedAppointment(appointment);

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const appointmentsActions = (appointment: IAppointment) => (
    <div className='buttons-list nowrap'>
      <Button
        onClick={() => {
          history.replace(`prescription/${appointment.patientId}`);
        }}
        shape='circle'
        type='primary'
      >
        <span className='icofont icofont-prescription' />
      </Button>
      <Button onClick={openEditModal.bind({}, appointment)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDelete.bind({}, appointment)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  return (
    <>
      <AppointmentsTable data={appointments} actions={appointmentsActions} />

      <PageAction onClick={openAddingModal} icon='icofont-stethoscope-alt' type={'primary'} />

      <AddAppointment
        onClose={closeAddingModal}
        visible={addingModalVisibility}
        onSubmit={addAppointment}
      />

      <EditAppointment
        appointment={selectedAppointment}
        visible={!!selectedAppointment}
        onClose={closeModal}
        onEdited={handleEdit}
      />
    </>
  );
};

export default AppointmentsPage;
