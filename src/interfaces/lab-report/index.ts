import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface LabReportInterface {
  id?: string;
  report_data: string;
  patient_id?: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  _count?: {};
}

export interface LabReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  report_data?: string;
  patient_id?: string;
}
