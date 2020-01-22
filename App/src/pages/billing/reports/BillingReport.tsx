import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MenuModule from '@/pages/menuModule/MenuModule';

const list = [
  { id:'1',title: 'Notas Fiscais Emitidas'},
  { id:'4',title:'Movimentação do Estoque'},
  { id:'5',title:'Produtos em Estoque'},
  { id:'6',title:'Resumo para Produção'},
  { id:'7',title:'Lista de Preço e Serviços'},
  { id:'8',title:'Vendas - Curva ABC'},
  { id:'9',title:'Vendas - Comissões'},
  { id:'10',title:'Agrupamento de Produtos'},
  { id:'11',title:'Produtos por Placa'},
  { id:'12',title:'Cadastrais - Clientes'},
  { id:'12',title:'Apuração de Inconsistências'}
]

const BillingReporter: React.ReactNode = (props:any) => (
  <PageHeaderWrapper>
    <MenuModule {...props} listCardList={{list:list}} icon='profile' menuId='billingReport' />
  </PageHeaderWrapper>
);

export default BillingReporter;