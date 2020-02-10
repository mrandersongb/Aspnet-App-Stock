import { Effect } from 'dva';
import { Reducer } from 'redux';

import { Products } from '@/models/products';
import { register } from '@/services/movestock';

export interface Movest extends Products {
  ofabr?: string;
  amount?: number;
  type?: string;
}

// Anderson: 08-10-2019
// Componente possivelmente global
export interface ResultSubmitted {
  status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
  title: string;
  subTitle: string;
}

export interface MoveStockState {
  product: Products;
  submitted: boolean;
  result: ResultSubmitted;
}

export interface MoveStockModelType {
  namespace: 'movestock';
  state: MoveStockState;

  effects: {
    // Anderson: 10.02.2020
    register: Effect;
  };

  reducers: {
    updateStateMovest: Reducer<MoveStockState>;
  };
}

const MoveStockModel: MoveStockModelType = {
  namespace: 'movestock',

  state: {
    product: { value: 0 },
    submitted: false,
    result: {
      status: 'success',
      title: '',
      subTitle: '',
    },
  },

  effects: {
    // Grava dados no Movest
    *register({ payload }, { call, put }) {
      const response = yield call(register, payload);

      yield put({
        type: 'updateStateMovest',
        payload: {
          product: {},
          submitted: response.submitted,
          result: response,
        },
      });
    },
  },

  reducers: {
    // Altera o estado com resultado da pesquisa.
    updateStateMovest(state, { payload }) {
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

export default MoveStockModel;
