/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, Dispatch, StateType } from '@/models/connect';

//import logo from '../assets/logo.png';
import logo from '../assets/dataplus_logo.svg';
import {MenuItem} from '@/models/menu';
import { StateCompanies } from '@/models/companies';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  login:StateType;
  dispatch: Dispatch;
  menuItems: MenuItem[];
  companies: StateCompanies;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};


/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

// Anderson: 16-08-2019 
// Função que constrói o Rodapé da Página
// Informações sobre a Datapraxis informática
//const footerRender: BasicLayoutProps['footerRender'] = (_, defaultDom) => {
//return defaultDom;
//};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings, login, menuItems,companies  } = props;

  const { company } = companies;

  /**
   * constructor
   */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });

      // menu do usuário logado
      dispatch({
        type: 'menu/fetchMenu',
        payload: login.userid
      });

      // dados do usuário logado.
      dispatch({
        type: 'user/fetchCurrent',
        payload:login.userid
      });
      
    }
  }, []);

  /*
   * Menu lateral sofreu mudanças
   */
  const handleMenuCollapse = (payload: boolean): void =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <>
      <ProLayout
        logo={logo}

        onCollapse={handleMenuCollapse}

        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path||''}>{ defaultDom }</Link>;
        }}

        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: `Home`,
            }),
          },
          ...routers,
        ]}

        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}

        footerRender={ ()=> <DefaultFooter 
          links={[
            {
              key:'Dataplus 2.0',
              title: 'DataPraxis Informática',
              blankTarget: false,
              href: ''
            }
          ]}
          copyright={"2019"}  />
        }

        menuDataRender={()=> {
          if( company ) {
            return menuItems || menuDataRender;
          } else {
            return [
              // Anderson: 05.11.2019
              // Força o usuário há escolher pelo menos uma empresa.
              menuItems[0],
              menuItems[menuItems.length - 1]
            ];
          }
        }}

        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}

        {...props}
        {...settings}
      >

        { children }
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings,login, menu, companies }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  login,
  menuItems : menu.items,
  companies
}))(BasicLayout);
