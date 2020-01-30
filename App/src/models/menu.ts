import { Effect } from 'dva';
import { Reducer } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';

import { fetchMenu } from '@/services/menu';

// Anderson: 08-10-2019
// Componente possivelmente global
export interface MenuItem extends MenuDataItem { 
    id:string;
    title:string;
    description: string;
    path:string;
    name:string;
    tag:string;
    locale:any;
}

export interface MenuState {
    items: MenuItem[];
    // Anderson: 04.11.2019
    // A primeira vez que o menu for chamando
    // Carrega apenas o Módulo de Empresas / Logout
    // A partir da segunda vez o que o menu for carregado
    // Carrega o menu completo com todos os módulos
    //firstLoad: boolean;
}

export interface MenuModelType {
  namespace: string;
  state: MenuState;
  effects: {
      changeStateMenu: Effect;
      fetchMenu: Effect;
  };
  reducers: {
    saveStateMenu: Reducer<MenuState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    items:[],
  } ,

  effects: {

    // Anderson: 29.10.2019
    // Devolve o menu do usuário
    *fetchMenu({ payload },{ call,put }){

        const response = yield call(fetchMenu,payload);

        yield put({
          type: 'saveStateMenu',
          payload: { items : response },
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
    saveStateMenu(state,{ payload }) {

      return {
        ...state,
        items: payload.items,
        firstLoad: payload.firstLoad
      };
    },
  },

};

export default MenuModel;