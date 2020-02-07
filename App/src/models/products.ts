import { Effect } from 'dva';
import { Reducer } from 'redux';

import { fetchProduct, fetchProducts, saveProduct, saveMovest } from '@/services/product';

export interface Movest extends Products {
  ofabr?:string;
  amount?:number;
  type?:string;
}

export interface Products {
  code?: string;
  description?: string;
  unity?:string;
  company?:string;
}

// Anderson: 08-10-2019
// Componente possivelmente global
export interface ResultSubmitted {
  status:'success' | 'error' | 'info' | 'warning'| '404' | '403' | '500';
  title:string;
  subTitle:string;
}

export interface ProductState {
    product: Products;
    found:boolean;
    submitted:boolean;
    result:ResultSubmitted
}

export interface ProductModelType {
  namespace: 'products';
  state: ProductState;
  effects: {
    fetch: Effect;
    fetchProduct: Effect;
    clearCurrentProduct: Effect;
    saveProduct: Effect;
    // Anderson: 22.10.2019
    // Colocado aqui por enquanto
    // Deve ser movido para o MovestModel
    saveMovest: Effect;
  };
  reducers: {
    saveStateProduct: Reducer<ProductState>;
  };
}

const ProductModel: ProductModelType = {
  namespace: 'products',

  state: {
    product: {},
    found: false,
    submitted: false,
    result: {
      status: 'success',
      title: '',
      subTitle: ''
    }
  } ,

  effects: {

    // Anderson: 03.10.2019
    // Busca todos os produtos
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchProducts,payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },

    // Anderson: 03.10.2019
    // Busca o produto atráves do código
    *fetchProduct({ payload }, { call, put }) {

      const response = yield call(fetchProduct,payload);

      yield put({
        type: 'saveStateProduct',
        payload: response,
      });

    },

    // Limpa os dados do último produto.
    *clearCurrentProduct(_,{ put }) {
      yield put({
        type: 'saveStateProduct',
        payload: {
          product: {},
          found: false,
        },
      })
    },

    // Salva dados do produto no esprod.
    *saveProduct({ payload },{ call, put }){

      const response = yield call(saveProduct,payload);

      yield put({
        type: 'saveStateProduct',
        payload:  response ,
      })
    },

    // Salva dados no movest
    *saveMovest({ payload },{ call, put }){

      const response = yield call(saveMovest,payload);

      yield put({
        type: 'saveStateProduct',
        payload: { 
          product: {},
          found: false,
          submitted: true,
          result:  response ,
        }
      })
    }

  },

  reducers: {
    // Altera o estado com resultado da pesquisa.
    saveStateProduct(state,{ payload }) {
      return {
        ...state,
        product: payload.product,
        found: payload.found,
        submitted: payload.submitted,
        result: payload.result
      };
    },
  },

};

export default ProductModel;