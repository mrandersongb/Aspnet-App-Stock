import request from '@/utils/request';
import { FormDataType } from '../pages/user/login/index';

import api from '../../config/api';

const API_LOGIN = `${api.url}:${api.port}/users/authenticate`;
const API_LOGOUT = `${api.url}:${api.port}/users/unthenticate`;

// rota para autenticação do usuário
export async function authenticate(userInfo: FormDataType) {
  return request(API_LOGIN,{ method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    }
  );
}

// rota para desatenticar usuário do sistema
export async function unthenticate({ token } : { token: string } ) {

  const tokenFormat = `Bearer ${token}`;

  return request(API_LOGOUT, {
    method:'POST',
    headers: {
      authorization: tokenFormat
    }
  });
}