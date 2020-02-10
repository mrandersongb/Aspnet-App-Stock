import request from '@/utils/request';

import api from '../../config/api';
import { Movest } from '@/models/moveStock';

const API_MOVEST = `${api.url}:${api.port}/movestock`;

/**
 *
 * @param params Salva dados do movimento no backend
 */
export async function register({
  movest,
  token,
  username,
}: {
  movest: Movest;
  token: string;
  username: string;
}) {
  const tokenFormat = `Bearer ${token}`;

  return request(`${API_MOVEST}/register`, {
    headers: {
      authorization: tokenFormat,
    },
    method: 'POST',
    data: {
      empresa: movest.company,
      prod: movest.code,
      quant: movest.amount,
      valor: 0,
      tipo: movest.type,
      ofabr: movest.ofabr,
      usuario: username,
    },
  });
}
