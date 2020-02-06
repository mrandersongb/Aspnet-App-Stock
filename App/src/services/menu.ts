import request from '@/utils/request';
import api from '../../config/api';

const URL_MENU = `${api.url}:${api.port}/menu`;

// Consulta menus do usuário
export async function fetchMenu({ id , token}:{ id:number, token:string }): Promise<any> {

  return request(`${URL_MENU}/${id}`,{
    headers:{
      authorization: `Bearer ${token}`
    },
    params:{
      id: id
    }
  });

}
