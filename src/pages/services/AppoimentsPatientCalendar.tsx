import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { usePageData } from '../../hooks/usePage';
import { useFetch } from '../../hooks/useFetch';

import { IPageData } from '../../interfaces/page';
import { IAppointment, IAppointmentPatient } from '../../interfaces/patient';

const headerOptions = {
  left: 'prev,next today',
  center: 'title',
  right: 'dayGridMonth,dayGridWeek,dayGridDay'
};
const pageData: IPageData = {
  title: 'Events calendar',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Apps',
      route: 'default-dashboard'
    },
    {
      title: 'Service pages',
      route: 'default-dashboard'
    },
    {
      title: 'Events calendar'
    }
  ]
};
const AppoimentsPatientCalendar = () => {
  const patientId = JSON.parse(localStorage.getItem('user'))?.id;
  usePageData(pageData);
  const [event, setEvent] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [appoiments] = useFetch<IAppointmentPatient[]>(`/appointments/patient/${patientId}`);
  const [load, setload] = useState(true);
  const eventSummaries = useRef(null);

  useEffect(() => {
    if (appoiments) {
      setload(false);

      eventSummaries.current = appoiments.map((event) => ({
        title: event.doctor.name,
        color: '#e9e165',
        classNames: ['event-error'],
        start: event.date,
        desc: 'desc'
      }));
      console.log(eventSummaries);
    }
  }, [appoiments]);
  if (load) return <div> load</div>;
  return (
    <>
      <Card className='mb-0'>
        <FullCalendar
          // eventClick={handleEventClick}
          events={eventSummaries.current}
          headerToolbar={headerOptions}
          initialView='dayGridMonth'
          plugins={[dayGridPlugin]}
          dayMaxEvents={true}
          weekends
        />
      </Card>
    </>
  );
};

export default AppoimentsPatientCalendar;
