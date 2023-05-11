import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import AppointmentsPage from '../pages/dashboards/appointments/AppointmentsPage';
import PrescriptionPages from '../pages/dashboards/prescription/PrescriptionPages';
import DoctorDashbord from '../pages/dashboards/dashboard/DoctorDashbord';
import DoctorsPage from '../pages/dashboards/doctors/Doctors';

export const doctorRoutes: IRoute[] = [
  {
    path: 'settings',
    component: SettingsPage
  },
  {
    path: 'patients',
    component: PatientsPage
  },
  {
    path: 'doctor-dashboard',
    component: DoctorDashbord
  },
  {
    path: 'appointments',
    component: AppointmentsPage
  },
  { path: 'prescription/:idPatient', component: PrescriptionPages },
  {
    path: 'doctors',
    component: DoctorsPage
  }
];
