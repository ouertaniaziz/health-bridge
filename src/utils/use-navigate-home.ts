import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateHome() {
  const history = useHistory();

  return useCallback(() => history.push('/'), []);
}
export function useNavigateDoctor() {
  const history = useHistory();
  return useCallback(() => history.replace('/doctor/default-dashboard'), []);
}

export function useNavigatePatient() {
  const history = useHistory();
  return useCallback(() => history.replace('/patient/Patient-dashboard'), []);
}

export function useNavigateDonor() {
  const history = useHistory();
  return useCallback(() => history.replace('/donor/dashboard-donor'), []);
}

export function useNavigatePrescription(id) {
  const history = useHistory();
  return useCallback(() => history.replace(), []);
}

export function useNavigatePolyclinic() {
  const history = useHistory();
  return useCallback(() => history.replace('/patient/Patient-dashboard'), []);
}
