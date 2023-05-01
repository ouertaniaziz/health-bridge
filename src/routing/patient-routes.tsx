import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import AppointmentsPage from '../pages/dashboards/appointments/AppointmentsPage';
import Profile from '../layout/components/Patientoffice/Profile';
import EditPatient from '../layout/components/Patientoffice/EditPatient';
export const patientRoutes: IRoute[] = [
  {
    path: 'settings',
    component: SettingsPage
  },
  {
    path: 'patients',
    component: PatientsPage
  },
  {
    path: 'default-dashboard',
    component: DashboardPage
  },
  {
    path: 'appointments',
    component: AppointmentsPage
  },{
    path:'patient-profile',
    component:Profile
  },{
    path:'edit-patient',
    component:EditPatient
  },
 
];
