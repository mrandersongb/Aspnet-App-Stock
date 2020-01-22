import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { connect } from 'dva';
import { Dispatch } from 'redux';

import {MenuModelType, MenuState } from '@/models/menu';
import { StateCompanies } from '@/models/companies';

export interface Route {
  routes:any[];
}

export interface MenuProps {
  children:any;
  route: Route;
  location: any;
  menu:MenuState;
  companies: StateCompanies;
  dispatch: Dispatch<any>;
}

class BillingMain extends React.Component<MenuProps> {

  // Transforma rotas em items de menu
  getRoutesToItems = (routes:any[]) =>{
    let items = routes.map(i=>{
      const { id, title, description, path } = i;
      return { id, title, description, path };
    });

    // Remove rotas que não são items de menu
    // Que possui id inválidos
    items = items.filter(i=>i.id);
    return items;
  }

  render(){
    const { location: { pathname } } = this.props;
    const { route: { routes } } = this.props;
    const path:any[] = routes.filter((p:any) => p.path === pathname);
    const { name , tag } = path.length > 0 ? path[0] : { name:'', tag:'' };

    const { companies } = this.props;
    const { company } = companies;
    const { idCompany,title } = company||{ idCompany:'',title:'' };

    // Anderson: 09.10.2019
    // Define título da Tela
    const titles:string = `${name||''} ${tag?`(${tag})`:''}`;
    const subtitle: string = `[ Empresa: ${idCompany} - ${title} ]`;

    return(
      <PageHeaderWrapper title={`${titles}         ${subtitle}`}> 
        {this.props.children}
      </PageHeaderWrapper>
    );  
  }

}

export default connect(
  ({ menu,companies } : {menu: MenuModelType, companies:StateCompanies }) => ({
    menu , companies
}))(BillingMain);