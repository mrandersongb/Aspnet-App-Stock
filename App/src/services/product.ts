import request from '@/utils/request';

import api from '../../config/api.config';
import { Movest, Products } from '@/models/products';

const API_PRODUCTS = `${api.url}:${api.port}/billing/{company}/products`;
const API_PRODUCT = `${api.url}:${api.port}/billing/{company}/saveProduct`;
const API_PRODUCT_ID= `${api.url}:${api.port}/billing`;

const API_MOVEST = `${api.url}:${api.port}/billing`;

export async function fetchProducts(): Promise<any> {
  return request(API_PRODUCTS);
}

export async function saveProduct(params: Products) {
  return request(API_PRODUCT, {
    method: 'POST',
    data: params,
  });
}

export async function fetchProduct({idCompany,product}:any): Promise<Products> {
  return request(`${API_PRODUCT_ID}/${idCompany}/fetchProduct/${product}`);
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