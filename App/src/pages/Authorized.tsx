import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
//import pathToRegexp from 'path-to-regexp';
//import Authorized from '@/utils/Authorized';

import RenderAuthorize from '@/components/Authorized';
//import { ConnectProps, ConnectState, UserModelState, StateType } from '@/models/connect';
import { ConnectProps, ConnectState, StateType } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  //user: UserModelState;
  login: StateType;
}

// const getRouteAuthority = (path: string, routeData: Route[]) => {
//   let authorities: string[] | string | undefined;

//   routeData.forEach(route => {
//     // match prefix
//     if (pathToRegexp(`${route.path}(.*)`).test(path)) {
//       // exact match
//       if (route.path === path) {
//         authorities = route.authority || authorities;
//       }
//       // get children authority recursively
//       if (route.routes) {
//         authorities = getRouteAuthority(path, route.routes) || authorities;
//       }
//     }
//   });

//   return authorities;
// };

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route,
  //user,
  login,
}) => {

  //const { currentUser } = user;
  //const { routes }:any = route;

  // Verifica se o usuário foi autenticado
  // e está logado.
  const { status,currentAuthority } = login;
  const isAuthenticated =(status == 'ok' && login.userid!== undefined);

  // Devolva lista de usuários autorizados
  // Ao acesso de rotas (menus)
  // Consulta back-end no futuro 
  const authorities = route ? route.authority : ''; 

  //const authorities = getRouteAuthority(location.pathname, routes);
  let Authorized = RenderAuthorize(currentAuthority);

  return (
    <Authorized
      authority={authorities}
      noMatch={
        isAuthenticated ? 
            <Redirect to="/exception/403" /> 
            : <Redirect to="/user/login" />
      }
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user, login }: ConnectState) => ({
  user,
  login,
}))(AuthComponent);


