import request from '@/utils/request';
import api from '../../config/api.config';

const URL_USERS = `${api.url}:${api.port}/users`;

export async function fetchUsers(): Promise<any> {
  return request(URL_USERS);
}

export async function fetchUser(id:string): Promise<any> {
  return request(`${URL_USERS}/${id}`);
}
