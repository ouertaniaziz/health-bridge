import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import DoctorPage from '../pages/dashboards/doctor/DoctorsPage';
import PrescriptionPolyclinicPage from '../pages/dashboards/prescription/PrescriptionPages';
import TraitementPage from '../pages/dashboards/traitments/TraitmentPages';

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
    path: 'doctor',
    component: DoctorPage
  },
  {
    path: 'prescription',
    component: PrescriptionPolyclinicPage
  },
  {
    path: 'traitments',
    component: TraitementPage
  }
];

