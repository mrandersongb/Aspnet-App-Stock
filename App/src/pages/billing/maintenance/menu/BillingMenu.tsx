import React from 'react';
import { connect } from 'dva';

import MenuModule from '@/pages/menuModule/MenuModule';
import { MenuProps } from '../BillingMain';
import { MenuModelType } from '@/models/menu';

// Anderson: 04-09-2019
// Menu Principal do Faturamento
// Renderiza o Menu Manutenção
const BillingMenu: React.FC<MenuProps> = (props: any) => {
  const { menuData } = props.menu;

  // Encontra os menus da categoria
  // Filtra os items de cada menu da categoria
  let filterRoutes: any[];
  filterRoutes = [];

  const menuDataRender = (menuList: any[]) => {
    if (menuList) {
      menuList.map(item => {
        if ('children' in item) {
          menuDataRender(item.children);
        } else {
          if (item.id !== 0) filterRoutes.push(item);
        }
      });
    }
  };

  menuDataRender(menuData);

  return (
    <MenuModule
      {...props}
      items={filterRoutes}
      icon="setting"
      rowKey="billingMain"
      onClickItem={() => {}}
    />
  );
};

export default connect(({ menu }: { menu: MenuModelType }) => ({
  menu,
}))(BillingMenu);
