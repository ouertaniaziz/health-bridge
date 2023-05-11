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

import { IAppointment, IMedication } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { IDonor } from '../../../interfaces/donor';
import { number } from 'yup';
import { IMaterial } from '../../../interfaces/material';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboards',
      route: 'dashboard-donor'
    },
    {
      title: 'Donation Dashboard'
    }
  ]
};

const DashboardDonor = () => {
 interface totale  {
  
  totalDonors?: number
 }
 const [postdata,setpostdata]=useState();
  const [donors, setDonors] = useFetchPageData<totale|null>('./donation/totaldonors')
  const [materials, setMaterials] = useFetchPageData<string>('/donation/MostDonatedMaterial',postdata,(data)=>console.log('lenaaa',data))
  const [medications,setMedications]=useFetchPageData<string>('/donation/MostDonatedMedication')

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-first-aid-alt'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                      <h6 className='mt-0 mb-1'>TOTAL DONATIONS </h6>
                      <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                {donors?.totalDonors}
                </div>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
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
                  className='icofont icofont-wheelchair'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>MOST DONATED MATERIAL</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                {materials}
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
                  className='icofont icofont-blood'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>MOST DONATED MEDICATION</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                {medications}
                </div>
              </div>
            </div>
          </Card>
        </div>

        
      </div>

      <Card title='Donors Survey'>
        <ReactEcharts className='chart-container container-h-400' option={hospitalOptions} />
      </Card>

      

      <div className='row'>
        <div className='col-12 col-md-6'>
          <Card title={'donors age'}>
            <ReactEcharts className='chart-container container-h-300' option={patientsAgeOptions} />
          </Card>
        </div>

        <div className='col-12 col-md-6'>
          <Card title={'donors gender'}>
            <ReactEcharts className='chart-container container-h-300' option={patientsGenderOptions} />
          </Card>
        </div>

        {/* <div className='col-12 col-md-4'>
          <Card title={'Departments'}>
            <ReactEcharts className='chart-container container-h-300' option={departmentsOptions} />
          </Card>
        </div> */}
      </div>

     
    </>
  );
};

export default DashboardDonor;
