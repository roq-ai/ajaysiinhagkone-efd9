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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLabReport } from 'apiSdk/lab-reports';
import { Error } from 'components/error';
import { labReportValidationSchema } from 'validationSchema/lab-reports';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { PatientInterface } from 'interfaces/patient';
import { getPatients } from 'apiSdk/patients';
import { LabReportInterface } from 'interfaces/lab-report';

function LabReportCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LabReportInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLabReport(values);
      resetForm();
      router.push('/lab-reports');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LabReportInterface>({
    initialValues: {
      report_data: '',
      patient_id: (router.query.patient_id as string) ?? null,
    },
    validationSchema: labReportValidationSchema,
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
            Create Lab Report
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="report_data" mb="4" isInvalid={!!formik.errors?.report_data}>
            <FormLabel>Report Data</FormLabel>
            <Input type="text" name="report_data" value={formik.values?.report_data} onChange={formik.handleChange} />
            {formik.errors.report_data && <FormErrorMessage>{formik.errors?.report_data}</FormErrorMessage>}
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
    entity: 'lab_report',
    operation: AccessOperationEnum.CREATE,
  }),
)(LabReportCreatePage);
