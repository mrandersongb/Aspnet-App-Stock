import { Card, List,Icon } from 'antd';
import React, { Component } from 'react';

import { CardListItemDataType } from './data';
import styles from './style.less';
import { Link } from 'umi';

export interface MenuModuleProps {
  items: CardListItemDataType[];
  loading: boolean;
  icon:string;
  rowKey:string,
  onClickItem:(item?:any) => (void);
}

// Anderson: 04-09-2019
// Renderiza o Menu Principal de cada módulo
// Faturamento - Financeiro - Contabilidade.
class MenuModule extends Component<MenuModuleProps> {

  render() {
    const {
      items,
      loading,
      icon,
      rowKey,
      onClickItem
    } = this.props;

    

    // Anderson: 26-09-2019
    // Recebe a lista e monta o menu
    // Controi uma lista de card representando as opções de tela.
    return (
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey={rowKey}
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={items}
            renderItem={item => {
                return (
                  
                  <Link to={item.path||''}>
                    <List.Item key={item.id}>
                      
                      <Card
                        hoverable
                        className={styles.card}
                        onClick={()=>onClickItem(item)}
                      >
                        <Card.Meta
                          title={<a>{item.title}</a>}
                          description={<a>{item.description}</a>}
                          avatar={<Icon type={icon} />}
                          
                        /> 
                      </Card>
                      
                    </List.Item>
                  </Link>
                  
                );
            }}
          />
        </div>
    );
  }
}

export default MenuModule;