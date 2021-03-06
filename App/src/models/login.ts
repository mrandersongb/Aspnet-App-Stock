import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { authenticate, unthenticate } from '../services/login';
import { getPageQuery } from '../utils/utils';

import { UserData } from './user';

export interface StateType extends UserData {
  status?: 'ok' | 'error';
  //currentAuthority: 'user' | 'guest' | 'admin' | '';
  // guarda a identificação do usuário logado
  token?: string;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const UserLoginModel: ModelType = {
  namespace: 'login',

  state: {
    status: undefined ,
    group: '',
    token: '',
    id: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {

      const response = yield call(authenticate, payload);

      // Acesso negado
      if( response.status >= 401 ) {

        // Armazena token
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error' } 
        });

      } else {

        yield put({
          type: 'changeLoginStatus',
          payload: response
        });

      }

      // Login efetuado com sucesso
      if (response.status === 'ok') {

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params as { redirect: string };
        if (redirect) {

          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }

          } else {
            window.location.href = redirect;
            return;
          }
        }

        // Anderson: 31.10.2019
        // redirecionava para a página principal do sistema
        // Após autenticação efetuada com sucesso
        yield put(routerRedux.replace(redirect || '/'));
        //yield put(routerRedux.replace(redirect || '/user/companies'));
      }

    },

    *logout({ payload }, { call,put }) {

      const response = yield call(unthenticate, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      yield put(
        routerRedux.push({
          pathname: '/user/login',
        })
      );
    },

  },

  reducers: {

    changeLoginStatus(state, { payload }) {

      return {
        ...state,
        status : payload.status ,
        token : payload.token || '' ,
        id : payload.id || '',
        group: payload.group||'',
        username: payload.username ||''
      };
    },

  },

};

export default UserLoginModel;
