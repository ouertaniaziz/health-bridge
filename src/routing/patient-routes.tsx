import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import AppointmentsPage from '../pages/dashboards/appointments/AppointmentsPage';
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
  }
];
