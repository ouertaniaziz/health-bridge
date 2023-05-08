import React from 'react';
import { IMedicationModel } from '../../../interfaces/medication';
import { Modal } from 'antd';
import MedicationForm from './MedicationForm';

type Props = {
  onEdited: (IMedication) => void;
  medication: IMedicationModel;
  visible: boolean;
  onClose: () => void;
};

const EditMedication = ({ medication, visible, onClose, onEdited }: Props) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      destroyOnClose
      footer={null}
      title={<h3 className='title'>Edit Medication</h3>}
    >
      {/* <MedicationForm
        onCancel={onClose}
        onSubmit={onEdited}
        //medication={medication}
        submitText='Edit medication'
      /> */}
    </Modal>
  );
};

export default EditMedication;
