import axios from 'axios';
import queryString from 'query-string';
import { PrescriptionInterface, PrescriptionGetQueryInterface } from 'interfaces/prescription';
import { GetQueryInterface } from '../../interfaces';

export const getPrescriptions = async (query?: PrescriptionGetQueryInterface) => {
  const response = await axios.get(`/api/prescriptions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPrescription = async (prescription: PrescriptionInterface) => {
  const response = await axios.post('/api/prescriptions', prescription);
  return response.data;
};

export const updatePrescriptionById = async (id: string, prescription: PrescriptionInterface) => {
  const response = await axios.put(`/api/prescriptions/${id}`, prescription);
  return response.data;
};

export const getPrescriptionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/prescriptions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePrescriptionById = async (id: string) => {
  const response = await axios.delete(`/api/prescriptions/${id}`);
  return response.data;
};
