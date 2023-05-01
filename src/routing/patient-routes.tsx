import { IRoute } from '../interfaces/routing';
import SettingsPage from '../pages/settings/Settings';

import PatientsPage from '../pages/dashboards/patients/Patients';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import AppointmentsPage from '../pages/dashboards/appointments/AppointmentsPage';
import Profile from '../layout/components/Patientoffice/Profile';
import PrescriptionsPatient from '../pages/medic/PrescriptionsPatient';
import EditPatient from '../layout/components/Patientoffice/EditPatient';
import DoctorsPage from '../pages/dashboards/doctors/Doctors';
import AppoimentsDoctorCalenda from '../pages/services/AppoimentsDoctorCalenda';
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
  },
  {
    path: 'patient-profile',
    component: Profile
  },
  {
    path: 'prescriptions',
    component: PrescriptionsPatient
  },
  {
    path: 'edit-patient',
    component: EditPatient
  },
  {
    path: 'doctors',
    component: DoctorsPage
  },
  {
    path: 'appoimentsCalendar/:doctorId',
    component: AppoimentsDoctorCalenda
  }
];
