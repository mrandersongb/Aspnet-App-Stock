import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';

import PageLoading from '@/components/PageLoading';

import MenuModule, { MenuModuleProps } from '@/pages/menuModule/MenuModule';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';

import { StateType } from '@/models/login';
import { Companies } from '@/models/companies';

interface CompaniesProps extends MenuModuleProps {
  route: { name: string };
  companies: {
    companies: Companies[];
    company: Companies;
  };
  login: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

// Anderson: 05-09-2019
// Devolve as empresas permitidas para o usuário autenticado
@connect(({ companies, login, loading }: ConnectState) => ({
  companies,
  login,
  loading: loading.effects['companies/fetchCompanies'],
}))
class CompaniesList extends React.Component<CompaniesProps> {
  componentDidMount() {
    const { dispatch, login } = this.props;

    if (dispatch) {
      // empresas do usuário logado
      dispatch({
        type: 'companies/fetchCompanies',
        payload: { id: login.id, token: login.token },
      });
    }
  }

  // Anderson 31.10.2019
  // Atualiza o estado da empresa atual a ser carregada
  onClickCardItem = (item?: any): void => {
    const { dispatch, companies } = this.props;

    if (dispatch && item) {
      dispatch({
        type: 'companies/saveStateCompanies',
        payload: {
          ...companies,
          company: item,
        },
      });
    }
  };

  render() {
    const {
      companies: { companies },
      loading,
    } = this.props;

    let items: any[];
    items = companies;

    const { route } = this.props;
    const { name } = route;

    return (
      <>
        {loading ? (
          <PageLoading />
        ) : (
          <PageHeaderWrapper
            title={name || ''}
            content="Selecione qualquer empresa abaixo para iniciar :"
          >
            <MenuModule
              {...this.props}
              items={items}
              icon="shop"
              rowKey="MenuCompanies"
              onClickItem={this.onClickCardItem}
            />
          </PageHeaderWrapper>
        )}
      </>
    );
  }
}

// Conecta Componente ao estado
export default CompaniesList;
