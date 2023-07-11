import { LabReportInterface } from 'interfaces/lab-report';
import { PrescriptionInterface } from 'interfaces/prescription';
import { ClinicInterface } from 'interfaces/clinic';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  name: string;
  clinic_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  lab_report?: LabReportInterface[];
  prescription?: PrescriptionInterface[];
  clinic?: ClinicInterface;
  user?: UserInterface;
  _count?: {
    lab_report?: number;
    prescription?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  clinic_id?: string;
  user_id?: string;
}
