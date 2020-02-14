import { Effect } from 'dva';
import { Reducer } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';

import { fetchMenu } from '@/services/menu';

// Anderson: 08-10-2019
// Componente possivelmente global
export interface MenuItem extends MenuDataItem {
  id: string;
  title: string;
  description: string;
  path: string;
  name: string;
  tag: string;
  locale: any;
}

export type MenuDataState = MenuItem[];

export interface MenuModelType {
  namespace: string;
  state: MenuDataState;
  effects: {
    changeStateMenu: Effect;
    fetchMenu: Effect;
  };
  reducers: {
    saveStateMenu: Reducer<MenuDataState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: [],

  effects: {
    // Anderson: 29.10.2019
    // Devolve o menu do usuário
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(fetchMenu, payload);

      yield put({
        type: 'saveStateMenu',
        payload: { items: response },
      });
    },

    // Anderson: 03.10.2019
    // Salva o estado menu atual
    *changeStateMenu({ payload }, { put }) {
      yield put({
        type: 'saveStateMenu',
        payload: payload,
      });
    },
  },

  reducers: {
    // Salva o estado do menu atual.
    saveStateMenu(state = [], { payload }) {
      return {
        ...state,
        menuData: payload.items,
      };
    },
  },
};

export default MenuModel;
