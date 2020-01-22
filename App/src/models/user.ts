import { Effect } from 'dva';
import { Reducer } from 'redux';

import { fetchUsers, fetchUser } from '@/services/user';


/**
 * Informações do usuário.
 */
export interface UserData {
  avatar?: string;
  username?: string;
  title?: string;
  group?: string;
  identifier?: string;
}

export interface UserModelState {
  currentUser?: UserData;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUsers: Effect;
    fetchUser: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    
    /**
     * Buscar dados de todos os usuários.
     * @param _ 
     * @param param1 
     */
    *fetchUsers(_, { call, put }) {
      const response = yield call(fetchUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    /**
     * Buscar dados de um usuário.
     * @param param0 
     * @param param1 
     */
    *fetchUser({ payload }, { call, put }) {

      const response = yield call(fetchUser,payload);

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });

    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },

    },
};

export default UserModel;
