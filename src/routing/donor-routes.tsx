import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardDonorPage from '../pages/dashboards/dashboard/Dashboard-donor';
import AppointmentsPage from '../pages/dashboards/appointments/AppointmentsPage';
import PaymentsDonor from '../pages/dashboards/payments/PaymentsDonor';
import Donormedications from '../pages/dashboards/Donormedications/Donormedications';
import Donormaterials from '../pages/dashboards/Donormaterials/Donormaterials';
import StripeContainer from '../pages/dashboards/payments/StripeContainner';

export const donorRoutes: IRoute[] = [
  {
    path: 'settings',
    component: SettingsPage
  },
  {
    path: 'patients',
    component: PatientsPage
  },
  
  {
    path: 'dashboard-donor',
    component: DashboardDonorPage
  },
  {
    path: 'appointments',
    component: AppointmentsPage
  },
  {
    path: 'PaymentsDonor',
    component: StripeContainer
  },
  {
    path: 'Donormedications',
    component: Donormedications
  },
  {
    path: 'Donormaterials',
    component: Donormaterials
  }
//   { path: 'prescription/:idPatient', component: PrescriptionPages }
];
