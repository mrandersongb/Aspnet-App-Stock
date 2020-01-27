import request from '@/utils/request';
import api from '../../config/api';

const URL_MENU = `${api.url}:${api.port}/users/`;

export async function fetchMenu(id: string): Promise<any> {
  return request(`${URL_MENU}/${id}/menu`);
}
