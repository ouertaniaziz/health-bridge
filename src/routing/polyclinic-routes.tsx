import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import AppointmentsPage from '../pages/dashboards/appointments/AppointmentsPage';
import PrescriptionPolyclinicPage from '../pages/dashboards/prescription/PrescriptionPages';
export const polyclinicRoutes: IRoute[] = [
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
  },
  {
    path: 'prescription/:idPatient',
    component: PrescriptionPolyclinicPage
  }
];

