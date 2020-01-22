import React from 'react';

import {Button,Card,Form,Input,InputNumber,Empty,Divider,Spin,Result} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import styles from './style.less';

import {ProductState} from '@/models/products';
import { StateCompanies } from '@/models/companies';

const { Search } = Input;
const FormItem = Form.Item;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  finding: boolean;
  dispatch: Dispatch<any>;
  products: ProductState;
  history:any;
  route:any;
  companies: StateCompanies;
}

class DataCollector extends React.Component<BasicFormProps> {

  /**
   * Envia dados da movimentação de estoque.
   */
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form , products, route } = this.props;
    // Defini qual é o tipo de movimento (Entrada ou Saída)
    const { tag : type } = route;
    const { product } = products

    e.preventDefault();

    form.validateFieldsAndScroll(['amount','ofabr'],(err, values) => {

      const { amount, ofabr } = values;

      if (!err) {

        dispatch({
          type: 'products/saveMovest',
          payload: {
            code: product.code,
            amount,
            ofabr,
            type
          },
        });
        
      }

    });
  };

  // Sair da tela Coletor de Dados.
  backToMenu = () => {
    this.clearProduct();

    const { history } = this.props;
    // Volta para o menu
    history.push('/billing/maintenance/');
  }

  // Limpa os dados do último produto pesquisado.
  clearProduct = () => {

    const { dispatch } = this.props;
    if(dispatch){
      dispatch({
        type: 'products/clearCurrentProduct',
      });
    }
  }

  /**
   * Faz uma pesquisa pelo produto atráves do código
   */
  findProduct = () => {
    const { dispatch, form, companies } = this.props;
    const { company } = companies;
    const { idCompany } = company||{idCompany:''};

    form.validateFieldsAndScroll(['product'],(err, values) => {

      if (!err) {

        const { product } = values;

        dispatch({
          type: 'products/fetchProduct',
          payload:{ idCompany,product }
        });

        form.setFields({
          product: {
            value: '',
          },
        });
      }
    });

    

  }

  componentWillMount(){
    this.clearProduct();
  }

  render() {
    const { finding, products, submitting } = this.props;
    const {
      form: { getFieldDecorator},
    } = this.props;

    const { product } = products ;
    const { found } = products ;
    const { submitted } = products;
    const { result  } = products;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const ResultNode: React.ReactNode = (<Result {...result}/>);

    // Carrega dados do produto pesquisado.
    const FoundProductNode :React.ReactNode = (
      <>
        {
         //=======================================================
         // Código do Produto
         //=======================================================
        }

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <FormattedMessage id="dataCollector.product.label" />
            </span>
          }
        >
          <span className={styles.result}>{product ? product.code : ''}</span>
        </FormItem>

        {
         //=======================================================
         // Descrição do Produto
         //=======================================================
        }

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <FormattedMessage id="dataCollector.description.label" />
            </span>
          }
        >
          <span className={styles.result}>{product ? product.description : ''}</span>
        </FormItem>

        { 
         //=======================================================
         // Unidade
         //=======================================================
        }

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <FormattedMessage id="dataCollector.unity.label" />
            </span>
          }
        >
          <span className={styles.result}>{product ? product.unity : ''}</span>
        </FormItem>

        {
         //=======================================================
         // Quantidade
         //=======================================================
        }
        
        <FormItem
          {...formItemLayout}
          label={
            <span>
              <FormattedMessage id="dataCollector.amount.label" />
            </span>
          }
        >
          {getFieldDecorator('amount',{
              rules: [
                {
                  required: found,
                  message: formatMessage({ id: 'dataCollector.amount.required' }),
                },
              ]
            }
            )(
            <InputNumber
              min={0.01}
              decimalSeparator=','
              autoFocus={found}
            />,
          )}
        </FormItem> 

        {
         //=======================================================
         // Ordem de Fabricação
         //=======================================================
        }
        
        <FormItem
          {...formItemLayout}
          label={
            <span>
              <FormattedMessage id="dataCollector.ofabr.label" />
            </span>
          }
        >
          {getFieldDecorator('ofabr',{
              rules: [
                {
                  required: found,
                  message: formatMessage({ id: 'dataCollector.ofabr.required' }),
                },
              ]
            }
            )(
            <Input placeholder={formatMessage({ id: 'dataCollector.ofabr.placeholder' })} />,
          )}
        </FormItem>
      </>
    );

    return (
        <Card bordered={false}>
          <Form
            hideRequiredMark style={{ marginTop: 8 }}
          >
            {
            //=======================================================
            // Código do Produto
            //=======================================================
              submitting ? '' :
            <FormItem {...formItemLayout} label={<FormattedMessage id="dataCollector.product.label" />}>
            {getFieldDecorator('product', {
              rules: [
                {
                  required: !found,
                  message: formatMessage({ id: 'dataCollector.product.required' }),
                },
              ],
              })(
                  //Anderson: 07-10-2019
                  // Pesquisar produto
                  <Search allowClear autoFocus={!found} enterButton onSearch={this.findProduct} 
                      placeholder={formatMessage({ id: 'dataCollector.product.placeholder' })} />
                )
            }
            </FormItem> 

            }
          
            <Divider />
            {
              (finding || submitting) ? 
                // Espera o resultado do processo.
                <Spin size="large" style={{ marginLeft: '45%', marginRight: 8 }} /> :
                  // Ao final de cada envio ao servidor, mostra o resultado da operação.
                  (submitted ? ResultNode : 
                    (found ? 
                      // Ao final de cada pesquisa pelo produto, mostra o resultado da operação.
                      FoundProductNode : 
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    )
                  )

              //=======================================================
              // Salvar / Sair
              //=======================================================
            }

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
             { found ?
                <Button icon="save" onClick={this.handleSubmit}  
                  type="primary" htmlType="submit" loading={submitting}
                >
                  <FormattedMessage id="dataCollector.form.submit" />
                </Button>
                : ''
             }
              <Button onClick={this.backToMenu}  icon="close" type="danger" style={{ marginLeft: 8 }}>
                <FormattedMessage id="dataCollector.form.exit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
    );
  }
}

export default Form.create<BasicFormProps>()(
  connect((
    // Models
    { loading , products, companies }: { 
      // States
      loading: { effects: { [key: string]: boolean }},
      products: ProductState,
      companies: StateCompanies
    }) => ({
        // States para Props
        finding: loading.effects['products/fetchProduct'],
        submitting: loading.effects['products/saveProduct'],
        products,
        companies
  }))(DataCollector),
);