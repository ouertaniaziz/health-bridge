import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/DashboardPolyclinic';
import DoctorPage from '../pages/dashboards/doctor/DoctorsPage';
import PrescriptionPolyclinicPage from '../pages/dashboards/prescription/PrescriptionPages';
import TraitementPage from '../pages/dashboards/traitments/TraitmentPages';
import PrescriptionPolyclinic from '../layout/components/polyclinic/Prescriptions';
import Chat from '../layout/components/polyclinic/Chat';

export const polyclinicRoutes: IRoute[] = [
  {
    path: 'Settings',
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
    path: 'doctor',
    component: DoctorPage
  },
  {
    path: 'prescription',
    component: PrescriptionPolyclinic
  },
  {
    path: 'traitments',
    component: TraitementPage
  },{
    path:'chat',
    component:Chat
  }
];
