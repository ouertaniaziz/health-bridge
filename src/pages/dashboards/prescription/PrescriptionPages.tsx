import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Button } from 'antd';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';
import PrescriptionTable from '../../../layout/components/prescription/PrescriptionTable';
import { IMedication, PrescriptionTableProps } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { SendOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import usePost from '../../../hooks/usePost';
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
    },
    {
      title: 'Prescription'
    }
  ]
};

const PrescriptionPages = () => {
  const history = useHistory();
  const { idPatient } = useParams<{ idPatient: string }>();
  const doctorId = JSON.parse(localStorage.getItem('user'))?.id;

  usePageData(pageData);

  const [Prescription, setPrescription] = useFetchPageData<IMedication[]>(`./medications`, []);
  const [newTable, setnewTable] = useState<Boolean>();
  const [selectedMedications, setSelectedMedications] = useState<IMedication[]>([]);
  const [postData, setPostData] = useState(null);
  const [idMedications, setidMedications] = useState([]);
  const [responseData, postDataToServer] = usePost('/prescription', postData, (data) => {
    console.log(data);
    history.replace({ pathname: '/doctor/appointments' });
  });
  const handleAddMedication = (medication: IMedication) => {
    setnewTable(true);
    setSelectedMedications((prevSelectedMedications) => [...prevSelectedMedications, medication]);
    setidMedications((prevIdMedications) => [...prevIdMedications, medication._id]);
  };
  const handleRemoveMedication = (medicationId) => {
    setSelectedMedications((prevSelectedMedications) =>
      prevSelectedMedications.filter((medication) => medication._id !== medicationId)
    );
    setidMedications((prevIdMedications) =>
      prevIdMedications.filter((medication) => medication._id !== medicationId)
    );
  };
  useEffect(() => {
    if (selectedMedications.length === 0) {
      setnewTable(false);
    }
  }, [selectedMedications]);
  useEffect(() => {
    if (postData) {
      postDataToServer(postData);
    }
  }, [postData]);

  const prescriptionActions = (medication: IMedication) => (
    <div className='buttons-list nowrap'>
      <Button onClick={handleAddMedication.bind({}, medication)} shape='circle' type='primary'>
        <span className='icofont icofont-ui-add' />
      </Button>
    </div>
  );
  const prescriptionRemoveActions = (medication: IMedication) => (
    <div className='buttons-list nowrap'>
      <Button onClick={handleRemoveMedication.bind({}, medication._id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );
  const PrescriptionTableWithActions = ({ data, actions }: PrescriptionTableProps) => {
    return <PrescriptionTable data={data} actions={actions} />;
  };

  const PrescriptionTableWithRemoveActions: React.FC<PropsWithChildren<PrescriptionTableProps>> = ({
    children,
    data,
    actions
  }) => {
    return <PrescriptionTable data={data} actions={actions}></PrescriptionTable>;
  };
  return (
    <>
      <PrescriptionTableWithActions data={Prescription} actions={prescriptionActions} />
      {newTable ? (
        <>
          <PrescriptionTableWithRemoveActions
            data={selectedMedications}
            actions={prescriptionRemoveActions}
          />
          <Button
            type='primary'
            icon={<SendOutlined />}
            onClick={(e) => {
              e.preventDefault();

              setPostData({
                patient: idPatient,
                doctor: doctorId,

                traitement: idMedications
              });
            }}
          >
            Send
          </Button>
        </>
      ) : null}
    </>
  );
};

export default PrescriptionPages;
