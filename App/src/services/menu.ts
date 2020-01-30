import request from '@/utils/request';
import api from '../../config/api';

const URL_MENU = `${api.url}:${api.port}/menu`;

// Consulta menus do usuário
export async function fetchMenu(id: Number): Promise<any> {

  return request(`${URL_MENU}/${id}`);

}
