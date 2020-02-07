import request from '@/utils/request';

import api from '../../config/api';
import { Movest, Products } from '@/models/products';

const API_PRODUCTS = `${api.url}:${api.port}/products/{company}`;
const API_PRODUCT_ID = `${api.url}:${api.port}/products`;

const API_MOVEST = `${api.url}:${api.port}/billing`;

export async function fetchProducts(): Promise<any> {
  return request(API_PRODUCTS);
}

export async function saveProduct(params: Products) {
  return request(API_PRODUCTS, {
    method: 'POST',
    data: params,
  });
}

// Buscar um produto pelo código + empresa
export async function fetchProduct(
    {company,product, token}:{company:string,product:string,token:string}
  ): Promise<Products> {

  const tokenFormat = `Bearer ${token}`

  return request(`${API_PRODUCT_ID}/${company}/${product}`, { 
      headers: {
        authorization: tokenFormat
      }

  });
}

/**
 * 
 * @param params Salva dados do movimento no backend
 */
export async function saveMovest(company:string, params: Movest){
  return request(`${API_MOVEST}/${company}/saveMovest`, {
    method: 'POST',
    data: params,
  });
}