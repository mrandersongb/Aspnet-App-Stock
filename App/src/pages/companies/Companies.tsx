import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';

import MenuModule, { MenuModuleProps} from '@/pages/menuModule/MenuModule';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';

import { StateType } from '@/models/login';
import { Companies } from '@/models/companies';

interface CompaniesProps extends MenuModuleProps {
  route : { name:string };
  companies : {
    companies : Companies[],
    comSpany: Companies
  };
  login: StateType;
  dispatch: Dispatch;
}

// Anderson: 05-09-2019
// Devolve as empresas permitidas para o usuário autenticado
@connect(({ companies ,login }:ConnectState) => ({
  companies ,login
}))
class CompaniesList extends React.Component<CompaniesProps>{

  componentDidMount() {
    const { dispatch,login} = this.props;
  
      if (dispatch) {
     
        // empresas do usuário logado
        dispatch({
          type: 'companies/fetchCompanies',
          payload: login.userid
        });
     
        
      }
  }

  // Anderson 31.10.2019
  // Atualiza o estado da empresa atual a ser carregada
  onClickCardItem = (item?:any):void => {
     const { dispatch,companies } = this.props;
     
     if(dispatch && item){
        dispatch({
          type: 'companies/saveStateCompanies',
          payload: {
            ...companies,
            company: item
          },
        });
     }
  };

  render(){

    const { companies : { companies } } = this.props;

    // const companies:any = [
    //     {
    //         id: '0001',
    //         title: 'Campos Capachos',
    //         description: 'Campos Ind.e Com. de Capachos.',
    //         path: '/billing'
    //     },
    // ]

    let items:any[] ;
    items =companies;

    //console.log(companies);
    // items = companies.map((c)=>{
    //   return items.push({ 
    //       id: c.idCompany, 
    //       title : c.title , 
    //       description: c.description ,
    //       path: c.path
    //     });
    // });

    const { route } = this.props;
    const { name } = route;

    return (
      <PageHeaderWrapper title={name||''} content='Selecione qualquer empresa abaixo para iniciar :'>
        <MenuModule 
          {...this.props}

          items={ items } 

          icon='shop' 
          rowKey='MenuCompanies' 
          onClickItem = {this.onClickCardItem}
        />
      </PageHeaderWrapper>
    );
  }

}

// Conecta Componente ao estado
export default CompaniesList;