import axios from 'axios';
import queryString from 'query-string';
import { ClinicInterface, ClinicGetQueryInterface } from 'interfaces/clinic';
import { GetQueryInterface } from '../../interfaces';

export const getClinics = async (query?: ClinicGetQueryInterface) => {
  const response = await axios.get(`/api/clinics${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClinic = async (clinic: ClinicInterface) => {
  const response = await axios.post('/api/clinics', clinic);
  return response.data;
};

export const updateClinicById = async (id: string, clinic: ClinicInterface) => {
  const response = await axios.put(`/api/clinics/${id}`, clinic);
  return response.data;
};

export const getClinicById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/clinics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClinicById = async (id: string) => {
  const response = await axios.delete(`/api/clinics/${id}`);
  return response.data;
};
