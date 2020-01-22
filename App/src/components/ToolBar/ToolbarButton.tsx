//import { Command } from 'gg-editor';
import React from 'react';
import { Tooltip,Button } from 'antd';
//import IconFont from './common/IconFont';
import styles from './index.less';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

interface ToolbarButtonProps {
  command: string;
  icon?: string;
  text?: string;
  type:'default'|'primary'|'danger';
}
const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  const { command, icon, text,type } = props;

  return (
    <Button name={command} icon={icon} type={type}>
      <Tooltip
        title={text || upperFirst(command)}
        placement="bottom"
        overlayClassName={styles.tooltip}
      >
        {/* <IconFont type={`icon-${icon || command}`} /> */}
      </Tooltip>
      {text}
    </Button>
  );
};

export default ToolbarButton;
