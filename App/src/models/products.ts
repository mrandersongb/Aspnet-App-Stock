import { Effect } from 'dva';
import { Reducer } from 'redux';

import { fetchProduct, fetchProducts, saveProduct } from '@/services/product';

export interface Products {
  code?: string;
  description?: string;
  unity?: string;
  value: Number;
  company?: string;
}

// Anderson: 08-10-2019
// Componente possivelmente global
export interface ResultSubmitted {
  status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
  title: string;
  subTitle: string;
}

export interface ProductState {
  product: Products;
  found: boolean;
}

export interface ProductModelType {
  namespace: 'products';
  state: ProductState;

  effects: {
    fetch: Effect;
    fetchProduct: Effect;
    clearCurrentProduct: Effect;
    saveProduct: Effect;
  };

  reducers: {
    saveStateProduct: Reducer<ProductState>;
  };
}

const ProductModel: ProductModelType = {
  namespace: 'products',

  state: {
    product: { value: 0 },
    found: false,
  },

  effects: {
    // Anderson: 03.10.2019
    // Busca todos os produtos
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchProducts, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },

    // Anderson: 03.10.2019
    // Busca o produto atráves do código
    *fetchProduct({ payload }, { call, put }) {
      const response = yield call(fetchProduct, payload);

      yield put({
        type: 'saveStateProduct',
        payload: response,
      });
    },

    // Limpa os dados do último produto.
    *clearCurrentProduct(_, { put }) {
      yield put({
        type: 'saveStateProduct',
        payload: {
          product: {},
          found: false,
        },
      });
    },

    // Salva dados do produto no esprod.
    *saveProduct({ payload }, { call, put }) {
      const response = yield call(saveProduct, payload);

      yield put({
        type: 'saveStateProduct',
        payload: response,
      });
    },
  },

  reducers: {
    // Altera o estado com resultado da pesquisa.
    saveStateProduct(state, { payload }) {
      return {
        ...state,
        product: payload.product,
        found: payload.found,
        submitted: payload.submitted,
        result: payload.result,
      };
    },
  },
};

export default ProductModel;
