import React from 'react';
import { Avatar, Button, Card } from 'antd';
import DOMPurify from 'dompurify';

import { FileDoneOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { IPrescription } from '../../../interfaces/prescription';
import moment from 'moment';

type Props = { prescription: IPrescription; className?: string };

const Prescription = ({ prescription, className = '' }: Props) => {
  const cleanedHtml = DOMPurify.sanitize(prescription.qrCodeVerif);

  return (
    <>
      {' '}
      <>
        <Card
          className={`department ${className}`}
          cover={<div className='qr-code' dangerouslySetInnerHTML={{ __html: cleanedHtml }} />}
        >
          <h3 className='h4 mt-0'> RDV : {moment(prescription.date).calendar()}</h3>

          <div className='team d-flex align-items-center mb-4'>
            <strong className='mr-3'>Doctor:</strong>

            {prescription.doctor.name}
          </div>

          <div className='button-box pb-2'>
            <Button type='primary' disabled={!prescription.verified}>
              More <FileDoneOutlined className='ml-2' />
            </Button>
          </div>
        </Card>
      </>
    </>
  );
};

export default Prescription;
