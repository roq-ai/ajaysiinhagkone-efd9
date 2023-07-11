import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface PrescriptionInterface {
  id?: string;
  medication: string;
  dosage: string;
  patient_id?: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  _count?: {};
}

export interface PrescriptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  medication?: string;
  dosage?: string;
  patient_id?: string;
}
