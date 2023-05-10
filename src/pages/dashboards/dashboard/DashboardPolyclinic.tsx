import React, { useState } from 'react';

import { Card } from 'antd';

import ReactEcharts from 'echarts-for-react';

import AppointmentsTable from '../../../layout/components/appointmentsTable/AppointmentsTable';
import hospitalOptions from './charts/hospital-options';

import { incomeInWeek, incomeInMonth } from './charts/income-options';

import {
  patientsGenderOptions,
  departmentsOptions,
  patientsAgeOptions
} from './charts/patients-options';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IAppointment } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'polyclinic-dashboard'
    },
    {
      title: 'Dashboard'
    }
  ]
};

const DashboardPolyclinic = () => {
   interface totaleM {
     count?: number;
   }
   interface totaleN {
     count?: number;
   }
   interface totaleP {
     count?: number;
   }
   interface totaleF {
     count?: number;
   }

   const [postdata, setpostdata] = useState();
   const [doctors, setDoctors] = useFetchPageData<totaleN | null>('./polyclinics/doctors/count');
   const [patients, setPatients] = useFetchPageData<totaleM | null>(
     '/polyclinics/patients/count',
     postdata,
     (data) => console.log('lenaaa', data)
   );
   const [approved, setApproved] = useFetchPageData<totaleP | null>(
     '/polyclinics/prescriptions/approved/count'
   );
    const [declined, setDeclined] = useFetchPageData<totaleF | null>(
      '/polyclinics/prescriptions/declined/count'
    );



  usePageData(pageData);

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-wheelchair'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Total Patients</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {patients?.count}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-doctor'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Total Doctors</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {doctors?.count}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-prescription'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Total Approved Prescriptions</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {approved?.count}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-precription'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Total Declined Prescriptions</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  {declined?.count}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title='Hospital survey'>
        <ReactEcharts className='chart-container container-h-400' option={hospitalOptions} />
      </Card>

      <div className='row'>
        <div className='col-12 col-md-4'>
          <Card title={'patients age'}>
            <ReactEcharts className='chart-container container-h-300' option={patientsAgeOptions} />
          </Card>
        </div>

        <div className='col-12 col-md-4'>
          <Card title={'patients gender'}>
            <ReactEcharts
              className='chart-container container-h-300'
              option={patientsGenderOptions}
            />
          </Card>
        </div>

        <div className='col-12 col-md-4'>
          <Card title={'Departments'}>
            <ReactEcharts className='chart-container container-h-300' option={departmentsOptions} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPolyclinic;
