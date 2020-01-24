import request from '@/utils/request';
import { FormDataType } from '../pages/user/login/index';

import api from '../../config/api.config';

const API_LOGIN = `${api.url}:${api.port}/users/authenticate`;
const API_LOGOUT = `${api.url}:${api.port}/users/unthenticate`;

export async function authenticate(userInfo: FormDataType) {
  return request(API_LOGIN,{ method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    }
  );
}

export async function unthenticate() {
  return request(API_LOGOUT);
}