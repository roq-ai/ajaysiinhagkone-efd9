import axios from 'axios';
import queryString from 'query-string';
import { LabReportInterface, LabReportGetQueryInterface } from 'interfaces/lab-report';
import { GetQueryInterface } from '../../interfaces';

export const getLabReports = async (query?: LabReportGetQueryInterface) => {
  const response = await axios.get(`/api/lab-reports${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLabReport = async (labReport: LabReportInterface) => {
  const response = await axios.post('/api/lab-reports', labReport);
  return response.data;
};

export const updateLabReportById = async (id: string, labReport: LabReportInterface) => {
  const response = await axios.put(`/api/lab-reports/${id}`, labReport);
  return response.data;
};

export const getLabReportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/lab-reports/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLabReportById = async (id: string) => {
  const response = await axios.delete(`/api/lab-reports/${id}`);
  return response.data;
};
