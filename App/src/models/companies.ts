import { Effect } from 'dva';
import { Reducer } from 'redux';

import { fetchCompanies } from '@/services/companies';

// Anderson: 08-10-2019
// Componente possivelmente global
export interface Companies { 
    idCompany:string;
    idUser:Number;
    title:string;
    description: string;
    path:string;
}

export interface StateCompanies {
    companies?: Companies[];
    company?:Companies;
}

export interface CompaniesModelType {
  namespace: string;
  state: StateCompanies;
  effects: {
      changeStateCompanies: Effect;
      fetchCompanies: Effect;
  };
  reducers: {
    saveStateCompanies: Reducer<StateCompanies>;
  };
}

const CompaniesModel: CompaniesModelType = {
  namespace: 'companies',

  state: {
    companies:[],
    company:undefined,
  } ,

  effects: {

    // Anderson: 29.10.2019
    // Devolve as empresas do usuário
    *fetchCompanies({payload},{call,put}){
        const response = yield call(fetchCompanies,payload);

        yield put({
          type: 'saveStateCompanies',
          payload: response,
        });
    },

    // Anderson: 03.10.2019
    // Salva o estado atual
    *changeStateCompanies({ payload }, { put }) {

      yield put({
        type: 'saveStateCompanies',
        payload: payload,
      });

    },
  },

  reducers: {
    // Salva o estado atual das empresas.
    saveStateCompanies(state,{ payload }) {
      return {
        ...state,
        companies: payload.companies,
        company: payload.company
      };
    },
  },

};

export default CompaniesModel;