import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import { IPageData } from '../../interfaces/page';
import { useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { usePageData } from '../../hooks/usePage';
import { useFetch } from '../../hooks/useFetch';
import usePost from '../../hooks/usePost';

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
interface IAvailable {
  date: string;
  time: string;
}

const AppoimentsDoctorCalenda = () => {
  const patientId = JSON.parse(localStorage.getItem('user'))?.id;
  const { doctorId } = useParams<{ doctorId: string }>();
  const desc =
    "Merci d'avoir pris rendez-vous pour une consultation. Nous sommes impatients de vous rencontrer. Nous voulions vous fournir quelques instructions pour vous assurer une expérience de consultation agréable et efficace. votre consultation durera 30 minutes et le prix de la consultation est de 50 dinars. Veuillez vous assurer d'arriver à l'heure pour ne pas retarder le rendez-vous pour les autres patients. Notre clinique est située [adresse complète de la clinique]. Veuillez vous référer à [site web/plan d'accès] pour obtenir des directions si nécessaire. Nous acceptons les paiements en espèces et par carte bancaire.N'hésitez pas à nous contacter si vous avez des questions ou si vous avez besoin de modifier votre rendez-vous.";
  usePageData(pageData);
  const [event, setEvent] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [events] = useFetch<IAvailable[]>(`/appointments/available/${doctorId}`);
  const [load, setload] = useState(true);
  const [postData, setPostData] = useState(null);
  const history = useHistory();

  const handleGoToProfile = () => {
    const layout = history.location.pathname.split('/')[1];
    history.push(`/${layout}/patient-profile`);
  };

  const [responseData, postDataToServer] = usePost('/appointments/add', postData, (data) => {});
  useEffect(() => {
    if (postData) {
      postDataToServer(postData);
      handleGoToProfile();
    }
  }, [postData]);

  const eventSummaries = useRef(null);
  useEffect(() => {
    if (events) {
      setload(false);

      eventSummaries.current = events.map((event) => ({
        title: 'click to book',
        color: '#e9e165',
        classNames: ['event-error'],
        start: new Date(event.date + 'T' + event.time),
        desc: desc
      }));
    }
  }, [events]);

  console.log(events, 'hetttttttt');

  const closeModal = () => setModalVisibility(false);

  const handleEventClick = (arg: any) => {
    setEvent(arg.event);
    setModalVisibility(true);
  };

  let modalBody, modalTitle, modalFooter;

  if (event) {
    const formattedDate = event.start.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const heures = event.start.getHours();
    const minutes = event.start.getMinutes();
    const secondes = event.start.getSeconds();
    const dateTime = `${formattedDate} ${heures}:${minutes}:${secondes}`;
    console.log(dateTime);
    modalBody = (
      <div className='d-flex flex-column'>
        <div className='event-time flex-column mb-4'>
          <h5 className='event-title m-0'>Appoiments time</h5>
          <span>{dateTime}</span>
        </div>

        <div className='event-desc flex-column'>
          <h5 className='event-title m-0'>Appoiments instructions </h5>
          <span>{event.extendedProps.desc}</span>
        </div>
      </div>
    );

    modalTitle = (
      <div className='title-block p-0 m-0'>
        <h3 style={{ color: event.backgroundColor }} className='modal-title m-0'>
          {event.title}
        </h3>
      </div>
    );

    modalFooter = (
      <div className='d-flex justify-content-between modal-footer'>
        <Button onClick={closeModal} danger>
          Close
        </Button>
        <Button
          type='primary'
          onClick={() => {
            const data = {
              patientId: patientId,
              doctorId: doctorId,
              date: event.start,
              time: heures + ':' + minutes,
              reason: 'test'
            };
            setPostData(data);
          }}
        >
          confirm
        </Button>
      </div>
    );
  }
  if (load) return <div> load</div>;

  return (
    <>
      <Card className='mb-0'>
        <FullCalendar
          eventClick={handleEventClick}
          events={eventSummaries.current}
          headerToolbar={headerOptions}
          initialView='dayGridMonth'
          plugins={[dayGridPlugin]}
          dayMaxEvents={true}
          weekends
        />
      </Card>

      <Modal title={modalTitle} footer={modalFooter} open={modalVisibility} onCancel={closeModal}>
        {modalBody}
      </Modal>
    </>
  );
};

export default AppoimentsDoctorCalenda;
