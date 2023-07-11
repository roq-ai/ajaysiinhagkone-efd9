import * as yup from 'yup';

export const patientValidationSchema = yup.object().shape({
  name: yup.string().required(),
  clinic_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
