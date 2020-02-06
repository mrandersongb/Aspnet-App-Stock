import React from 'react';
import { connect } from 'dva';
import { ConnectState,ConnectProps, Loading, StateType } from '@/models/connect';
import { Dispatch } from 'redux';
import { Spin } from 'antd';

import styles from './style.less';

interface DispatchProps extends ConnectProps {
     loading:Loading
     dispatch:Dispatch;
     login:StateType;
};

// Anderson: 05-09-2019
// Função que efetua o logout do usuário.
class Logout extends React.Component<DispatchProps>{

  DoLogout = (dispatch:Dispatch) => {

    const { login } = this.props;

    //Dispara um Action de Logout para o model Login.
    if(dispatch){

      // Zera o estado da aplicação
      dispatch({
        type: 'companies/saveStateCompanies',
        payload: {
          companies: [],
          company: {}
        },
      })

      dispatch({
        type: 'menu/saveStateMenu',
        payload: { items : [] }
      })

      dispatch({
          type: 'login/logout',
          payload: {
            token: login.token
          }
        },
      );  
    }
  }

  componentDidMount(){
      const { dispatch } = this.props;
      this.DoLogout(dispatch);
  } 

  render(){
    const { loading: {
      models: {
        login
      }
    } } = this.props;

    return (
      <div className={styles.main}>
        <div style={{
            background: '#FFFFFF',
            paddingTop: '30%',
            paddingBottom: '30%',
            paddingLeft: '45%',
            borderRadius: '2%'
          }}>
          { login ? <Spin size="large" /> : '' }  
        </div>
      </div>
    );
  }

}

// Conecta Componente Logout ao Model Login
//export default Logout;
export default connect(({loading, login}:ConnectState) =>({
    loading,
    login
  }))(Logout);