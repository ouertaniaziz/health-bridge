import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

// import PharmacistPage from '../pages/dashboards/pharmacists/Pharmacist';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import PrescriptionPages from '../pages/dashboards/prescription/PrescriptionPages';
import Medications from '../layout/components/pharmacist/medications';
import Profile from '../layout/components/pharmacist/profile';
import pharmacists from '../layout/components/pharmacist/pharmacists';
import PrescriptionPharmacist from '../layout/components/pharmacist/prescriptionspharmacist/Prescriptionspharmacist';
export const pharmacistRoutes: IRoute[] = [
  // {
  //   path: 'settings',
  //   component: SettingsPage
  // },
  // {
  //   path: 'pharmacists',
  //   component: PharmacistsPage
  // },
  {
    path: 'default-dashboard',
    component: DashboardPage
  },

  {
    path : 'medications',
    component: Medications
  },

  // {
  //   path : 'Prescriptions',
  //   component: Prescriptions
  // },
   
  { path: 'Profile',
   component: Profile },

   { path: 'pharmacists',
   component: pharmacists },

   { path: 'prescriptions',
   component: PrescriptionPharmacist}


];
