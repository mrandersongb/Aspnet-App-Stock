import request from '@/utils/request';
import { FormDataType } from '../pages/user/login/index';

import api from '../../config/api.config';

const API_LOGIN = `${api.url}:${api.port}/api/login`;
const API_LOGOUT = `${api.url}:${api.port}/logout`;

export async function authenticate(params: FormDataType) {
  return request(API_LOGIN, {
    method: 'POST',
    data: params,
  });
}

export async function unthenticate() {
  return request(API_LOGOUT);
}