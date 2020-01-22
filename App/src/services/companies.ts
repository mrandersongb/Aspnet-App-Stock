import request from '@/utils/request';
import api from '../../config/api.config';

const API_COMPANIES_ID = `${api.url}:${api.port}/users/`;

export async function fetchCompanies(id:string): Promise<any> {
  return request(`${API_COMPANIES_ID}/${id}/companies`);
}
