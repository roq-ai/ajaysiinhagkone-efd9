const mapping: Record<string, string> = {
  clinics: 'clinic',
  'lab-reports': 'lab_report',
  patients: 'patient',
  prescriptions: 'prescription',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
