import { Alert } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';

import { connect } from 'dva';
import { StateType } from '../../../models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { ConnectState } from '@/models/connect';

const { UserName, Password, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<any>;
  login: StateType;
  submitting: boolean;
}

export interface FormDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({login,loading}: ConnectState) => ({
    login,
    submitting: loading.effects['login/login'],
  }),
)
class Login extends Component<LoginProps> {
  
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: any, values: FormDataType) => {
    //const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { status, 
    } = login;

    return (
      <div className={styles.main}>
        <LoginComponents
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          <React.Fragment/>
          <div style={{
              background: '#FFFFFF',
              padding: '5%',
              borderRadius: '2%'
            }}
          >

            {status === 'error' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-credentials' }),
              )}

            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />

            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if(this.loginForm){
                  this.loginForm.validateFields(this.handleSubmit);
                }

              }}
            />

            <Submit loading={submitting}>
              <FormattedMessage id="user-login.login.login" />
            </Submit>
          </div>
          
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
