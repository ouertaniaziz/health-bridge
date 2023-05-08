import React from 'react';
import { IMaterial } from '../../../interfaces/material';
import { Modal } from 'antd';
import MaterialForm from './MaterialForm';

type Props = {
  onEdited: (IMaterial) => void;
  material: IMaterial;
  visible: boolean;
  onClose: () => void;
};

const EditMaterial = ({ material, visible, onClose, onEdited }: Props) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      destroyOnClose
      footer={null}
      title={<h3 className='title'>Edit Material</h3>}
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

export default EditMaterial;
