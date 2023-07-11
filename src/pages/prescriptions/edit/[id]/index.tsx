import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPrescriptionById, updatePrescriptionById } from 'apiSdk/prescriptions';
import { Error } from 'components/error';
import { prescriptionValidationSchema } from 'validationSchema/prescriptions';
import { PrescriptionInterface } from 'interfaces/prescription';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { PatientInterface } from 'interfaces/patient';
import { getPatients } from 'apiSdk/patients';

function PrescriptionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PrescriptionInterface>(
    () => (id ? `/prescriptions/${id}` : null),
    () => getPrescriptionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PrescriptionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePrescriptionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/prescriptions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PrescriptionInterface>({
    initialValues: data,
    validationSchema: prescriptionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Prescription
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="medication" mb="4" isInvalid={!!formik.errors?.medication}>
              <FormLabel>Medication</FormLabel>
              <Input type="text" name="medication" value={formik.values?.medication} onChange={formik.handleChange} />
              {formik.errors.medication && <FormErrorMessage>{formik.errors?.medication}</FormErrorMessage>}
            </FormControl>
            <FormControl id="dosage" mb="4" isInvalid={!!formik.errors?.dosage}>
              <FormLabel>Dosage</FormLabel>
              <Input type="text" name="dosage" value={formik.values?.dosage} onChange={formik.handleChange} />
              {formik.errors.dosage && <FormErrorMessage>{formik.errors?.dosage}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PatientInterface>
              formik={formik}
              name={'patient_id'}
              label={'Select Patient'}
              placeholder={'Select Patient'}
              fetcher={getPatients}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'prescription',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PrescriptionEditPage);
