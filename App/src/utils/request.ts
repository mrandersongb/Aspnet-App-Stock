/**
 * request
 * api: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '200',
  201: '201',
  202: '202',
  204: '204',
  400: { title: 'Produto não encontrado', description: 'Verifique o código e tente novamente' },
  401: { title: 'Falha de Autenticação', description: 'Usuário ou/e Senha está incorreto.' },
  403: '403',
  404: '404',
  406: '406',
  410: '410',
  422: '422',
  500: '500',
  502: '502',
  503: '503',
  504: '504',
};

/**
 *
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || {
      title: `${response.status}: ${response.statusText}`,
      description: '',
    };

    const { status } = response;

    notification.error({
      //message: `${status}: ${statusText}`,
      message: `${status}: ${errorText.title}`,
      description: errorText.description,
      duration: 10,
    });
  }

  return response;
};

/**
 * Requisição
 */
const request = extend({
  errorHandler, // Mensagem de erros vind do servidor
  credentials: 'include', // Incluir credenciais na requisição
});

export default request;
