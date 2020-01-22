import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MenuModule from '@/pages/menuModule/MenuModule';

const list = [
  { id:'1',title: 'Clientes'},
  { id:'2',title: 'Produtos'},
  { id:'3',title:'Transportadores'},
  { id:'4',title:'Vendedores'},
  { id:'5',title:'Tributação'},
  { id:'6',title:'Dados Adicionais'},
  { id:'7',title:'Documentos Fiscais'},
  { id:'8',title:'Códigos de Serviços'},
  { id:'9',title:'Municípios do País'},
  { id:'10',title:'Municípios de SP'},
  { id:'11',title:'Municípios Isentos de ICMS'},
  { id:'12',title:'Configuração do Faturamento'},
  { id:'13',title:'Configuração de E-mails'},
  
]
// Anderson: 05-09-2019
// Renderiza o menu Cadastro do Faturamento
const BillingRegister: React.ReactNode = (props:any) => (
  <PageHeaderWrapper>
    <MenuModule {...props} listCardList={{list:list}} icon='user' menuId='billingRegister' />
  </PageHeaderWrapper>
);

export default BillingRegister;