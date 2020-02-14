import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import { ConnectProps, ConnectState } from '@/models/connect';

import logo from '../assets/dataplus_logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  return (
    <>
      <DocumentTitle
        title={getPageTitle({
          pathname: location.pathname,
          breadcrumb,
          formatMessage,
          ...props,
        })}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <img alt="Dataplus" className={styles.logo} src={logo} />
              <div className={styles.title_subtitle}>
                <div className={styles.title}>DataPlus</div>
                <div className={styles.desc}>DataPraxis Informática</div>
              </div>
            </div>

            {children}
          </div>
          <DefaultFooter
            links={[
              {
                key: 'Dataplus',
                title: 'DataPraxis Informática',
                blankTarget: false,
                href: '',
              },
            ]}
            copyright={'2019'}
          />
        </div>
      </DocumentTitle>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
