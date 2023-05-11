import React, { useEffect } from 'react';

import { Card } from 'antd';

import ReactEcharts from 'echarts-for-react';

import hospitalOptions from './charts/hospital-options';

import { incomeInWeek, incomeInMonth } from './charts/income-options';

import {
  patientsGenderOptions,
  departmentsOptions,
  patientsAgeOptions
} from './charts/patients-options';

import { useFetchPageData, usePageData } from '../../../../hooks/usePage';

import { IPageData } from '../../../../interfaces/page';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboards',
      route: 'default-dashboard'
    },
    {
      title: 'Default'
    }
  ]
};
type stats = {
  appointmentsnumber: number;
  approvedprescriptions: number;
  medicalnumber: number;
  totalofprescription: number;
};
const id = JSON.parse(localStorage.getItem('user'))?.id;
const PatientDashboard = () => {
  usePageData(pageData);
  useEffect(() => {
    console.log(id);
  });
  const [stats, setstats] = useFetchPageData<stats>(`patient/getprescriptions/${id}`);
  // const [approvedprescriptions, setapproved] = useFetchPageData<prescriptionsnumber>(
  //   `patient/approved/${id}`
  // );
  // const [scheuled, setscheuled] = useFetchPageData<prescriptionsnumber>(`patient/appoint/${id}`);
  // const [records, setrecords] = useFetchPageData<prescriptionsnumber>(`patient/records/${id}`);
  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card
            style={{ background: 'rgba(251, 251, 251)', height: '130px' }}
            className='animated with-shadow'
          >
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-prescription'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Total of your prescriptions </h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {stats?.totalofprescription}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card
            style={{ background: 'rgba(251, 251, 251)', height: '130px' }}
            className='animated with-shadow'
          >
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-prescription'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Approved Prescriptions by polyclinic</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {stats?.approvedprescriptions}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card
            style={{ background: 'rgba(251, 251, 251)', height: '130px' }}
            className='animated with-shadow'
          >
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-meeting-add'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Scheduled Appointments</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {stats?.appointmentsnumber}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card
            style={{ background: 'rgba(251, 251, 251)', height: '130px' }}
            className='animated with-shadow'
          >
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-papers'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Medical records uploaded</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {stats?.medicalnumber}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
