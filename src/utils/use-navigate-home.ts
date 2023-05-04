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
  return useCallback(() => history.replace('/patient/default-dashboard'), []);
}
export function useNavigatePrescription(id) {
  const history = useHistory();
  return useCallback(() => history.replace(), []);
}
