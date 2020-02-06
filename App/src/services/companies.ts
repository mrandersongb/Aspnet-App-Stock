import request from '@/utils/request';
import api from '../../config/api';

const API_COMPANIES_ID = `${api.url}:${api.port}/menu`;

// Consulta lista de empresas por usuário
export async function fetchCompanies({ id,token }:{ id:Number,token:string }): Promise<any> {
  return request(`${API_COMPANIES_ID}/companies/${id}`,{
    headers: {
      authorization: `Bearer ${token}`
    },
    params:{
      id: id
    }
  });
}
