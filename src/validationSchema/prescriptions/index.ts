import * as yup from 'yup';

export const prescriptionValidationSchema = yup.object().shape({
  medication: yup.string().required(),
  dosage: yup.string().required(),
  patient_id: yup.string().nullable(),
});
