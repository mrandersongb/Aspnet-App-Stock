// Rotas de Navegação do Sistema
export default {
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        // Página de Login (Pública)
        // Login do Usuário
        {
          path: '/user',
          redirect: '/user/login/',
        },
        {
          name: 'logout',
          path: '/user/logout',
          component: './user/logout/Logout',
        },

        {
          name: 'login',
          path: '/user/login/',
          component: './user/login',
        },
      ],
    },

    // Anderson: 03-09-2019
    // Página de Acesso não permitido
    // Usuário autenticado - porém sem acesso a nenhuma página do sistema.
    {
      path: '/exception',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/exception', redirect: '/exception/403/' },
        {
          path: '/exception/403/',
          component: './exception/403',
        },
      ],
    },

    // Página Principal do Sistema
    // Usuário autenticado e com permissão de acesso.
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['user', 'admin'],
      routes: [
        // Menu de Módulos
        //{ path: '/', redirect: '/billing/maintenance/' },
        { path: '/', redirect: '/companies/' },

        {
          name: 'Empresas',
          path: '/companies',
          icon: 'shop',
          component: './companies/Companies',
          hideChildrenInMenu: true,
          routes: [],
        },

        {
          path: '/billing', // Faturamento
          name: 'Faturamento',
          icon: 'file',
          routes: [
            { path: '/billing', redirect: '/billing/maintenance/' },
            {
              path: '/billing/maintenance',
              name: 'Manutenção',
              icon: 'setting',
              component: './billing/maintenance/BillingMain',
              hideChildrenInMenu: true,
              routes: [
                { path: '/billing/maintenance', redirect: '/billing/maintenance/menu/' },
                {
                  path: '/billing/maintenance/menu/',
                  name: 'Menu',
                  component: './billing/maintenance/menu/BillingMenu',
                },
                {
                  id: '5',
                  path: '/billing/maintenance/datacollector/output/',
                  name: 'Movimentação de Estoque',
                  component: './billing/maintenance/datacollector/DataCollector',
                  description: 'Saída (Coletor de Dados)',
                  title: 'Movimentação de Estoque',
                  tag: 'Saída',
                },
                {
                  id: '6',
                  path: '/billing/maintenance/datacollector/input/',
                  name: 'Movimentação de Estoque',
                  component: './billing/maintenance/datacollector/DataCollector',
                  description: 'Entrada (Coletor de Dados)',
                  title: 'Movimentação de Estoque',
                  tag: 'Entrada',
                },
              ],
            },
          ],
        },

        {
          path: '/logout',
          name: 'Deslogar',
          icon: 'logout',
          //component: './user/logout/Logout',
          routes: [{ path: '/logout', redirect: '/user/logout' }],
        },
      ],
    },
  ],
};
