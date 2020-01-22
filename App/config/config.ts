import { IConfig, IPlugin } from 'umi-types';
// https://umijs.org/config/
import defaultSettings from './defaultSettings'; 

import slash from 'slash2';
import webpackPlugin from './plugin.config'; // Anderson: 16-08-2019

// Rotas (Módulos e Menus)
import Routes from './routes.config';

const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design

//export const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

const isAntDesignProPreview = false;
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // usar a localização de idiomas.
        enable: true,
        // idioma padrão.
        default: 'pt-BR',
        // Quando True, o componente `navigator.language` sobrepõe o idioma padrão.
        baseNavigator: false,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
    },
  ],
]; // preview.pro.ant.design GA

// if (isAntDesignProPreview) {
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
//   plugins.push([
//     'umi-plugin-pro',
//     {
//       serverUrl: 'https://ant-design-pro.netlify.com',
//     },
//   ]);
// }

export default {
  plugins,
  block: {
    //defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    //ie: 11,
    chrome: 49
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: Routes.routes,
  theme: {
    'primary-color': primaryColor,
  },
  define: {},
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
} as IConfig;
