import React from 'react';
import ToolbarButton from './ToolbarButton';
//import styles from './index.less';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

// Anderson: 30-09-2019
// Cria a barra de ferramentas padrão 
const FlowToolbar = () => (
  <ButtonGroup>
    <ToolbarButton command="plus" icon={'plus'} text={'Adicionar'} type={'primary'} />
    <ToolbarButton command="edit" icon={'edit'} text={'Alterar'} type={'danger'} />
  </ButtonGroup>
);

export default FlowToolbar;
