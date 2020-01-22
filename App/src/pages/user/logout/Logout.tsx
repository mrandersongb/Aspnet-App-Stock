import React from 'react';
import { connect } from 'dva';
import { ConnectState,ConnectProps, Loading } from '@/models/connect';
import { Dispatch } from 'redux';
import { Spin } from 'antd';

import styles from './style.less';

interface DispatchProps extends ConnectProps {
     loading:Loading
     dispatch:Dispatch;
};

// Anderson: 05-09-2019
// Função que efetua o logout do usuário.
class Logout extends React.Component<DispatchProps>{

  DoLogout = (dispatch:Dispatch) => {

    //Dispara um Action de Logout para o model Login.
    if(dispatch){
      dispatch({
          type: 'login/logout',
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
export default connect(({loading}:ConnectState) =>({
    loading
  }))(Logout);