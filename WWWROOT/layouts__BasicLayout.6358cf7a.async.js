(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"3a4m":function(e,t,a){e.exports=a("usdK").default},CWS2:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var r=n(a("W9HT"));a("Pwec");var l=n(a("CtXQ"));a("lUTK");var o=n(a("BvKs"));a("Telt");var u=n(a("Tckk")),c=a("Y2fQ"),d=n(a("q1tI")),i=a("MuoO"),s=n(a("3a4m")),f=n(a("uZXw")),p=n(a("h3zL"));class m extends d.default.Component{constructor(){super(...arguments),this.onMenuClick=(e=>{var t=e.key;if("logout"!==t)s.default.push("/account/".concat(t));else{var a=this.props.dispatch;a&&a({type:"login/logout"})}})}render(){var e=this.props,t=e.menu,a=e.login;if(!t)return d.default.createElement("span",{className:"".concat(p.default.action," ").concat(p.default.account)},d.default.createElement(u.default,{size:"small",className:p.default.avatar,src:a.avatar,alt:"avatar"}),d.default.createElement("span",{className:p.default.name},a.username));var n=d.default.createElement(o.default,{className:p.default.menu,selectedKeys:[],onClick:this.onMenuClick},d.default.createElement(o.default.Item,{key:"center"},d.default.createElement(l.default,{type:"user"}),d.default.createElement(c.FormattedMessage,{id:"menu.account.center",defaultMessage:"account center"})),d.default.createElement(o.default.Item,{key:"settings"},d.default.createElement(l.default,{type:"setting"}),d.default.createElement(c.FormattedMessage,{id:"menu.account.settings",defaultMessage:"account settings"})),d.default.createElement(o.default.Divider,null),d.default.createElement(o.default.Item,{key:"logout"},d.default.createElement(l.default,{type:"logout"}),d.default.createElement(c.FormattedMessage,{id:"menu.account.logout",defaultMessage:"logout"})));return a&&a.username?d.default.createElement(f.default,{overlay:n},d.default.createElement("span",{className:"".concat(p.default.action," ").concat(p.default.account)},d.default.createElement(u.default,{size:"small",className:p.default.avatar,src:a.avatar,alt:"avatar"}),d.default.createElement("span",{className:p.default.name},a.title||a.username))):d.default.createElement(r.default,{size:"small",style:{marginLeft:8,marginRight:8}})}}var g=(0,i.connect)(e=>{var t=e.login,a=e.user;return{login:t,user:a.currentUser}})(m);t.default=g},Kkfi:function(e,t,a){e.exports={menu:"antd-pro-components-select-lang-index-menu",dropDown:"antd-pro-components-select-lang-index-dropDown"}},QyDn:function(e,t,a){e.exports={container:"antd-pro-components-header-dropdown-index-container"}},bx7e:function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=r(a("p0pE")),o=n(a("Hx5s")),u=n(a("q1tI")),c=r(a("wY1l")),d=a("MuoO"),i=a("Y2fQ"),s=r(a("eTk0")),f=r(a("sgkG")),p=r(a("pE08")),m=e=>e.map(e=>{var t=(0,l.default)({},e,{children:e.children?m(e.children):[]});return s.default.check(e.authority,t,null)}),g=e=>{var t=e.dispatch,a=e.children,n=e.settings,r=e.login,l=e.menuData,d=e.companies,s=d.company;(0,u.useEffect)(()=>{t&&(t({type:"settings/getSetting"}),t({type:"menu/fetchMenu",payload:{id:r.id,token:r.token}}))},[]);var g=e=>t&&t({type:"global/changeLayoutCollapsed",payload:e});return u.default.createElement(u.default.Fragment,null,u.default.createElement(o.default,Object.assign({logo:p.default,onCollapse:g,menuItemRender:(e,t)=>{return e.isUrl?t:u.default.createElement(c.default,{to:e.path||""},t)},breadcrumbRender:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return[{path:"/",breadcrumbName:(0,i.formatMessage)({id:"menu.home",defaultMessage:"Home"})},...e]},itemRender:(e,t,a,n)=>{var r=0===a.indexOf(e);return r?u.default.createElement(c.default,{to:n.join("/")},e.breadcrumbName):u.default.createElement("span",null,e.breadcrumbName)},footerRender:()=>u.default.createElement(o.DefaultFooter,{links:[{key:"Dataplus",title:"DataPraxis Inform\xe1tica",blankTarget:!1,href:""}],copyright:"2019"}),menuDataRender:()=>{return l?s?l||m:[l[0],l[l.length-1]]:[]},formatMessage:i.formatMessage,rightContentRender:e=>u.default.createElement(f.default,Object.assign({},e))},e,n),a))},y=(0,d.connect)(e=>{var t=e.global,a=e.settings,n=e.login,r=e.menu,l=e.companies;return{collapsed:t.collapsed,settings:a,login:n,menuData:r.menuData,companies:l}})(g);t.default=y},eTk0:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.reloadAuthorized=void 0;var r=n(a("/BMA")),l=a("xKgJ"),o=(0,r.default)((0,l.getAuthority)()),u=()=>{o=(0,r.default)("")};t.reloadAuthorized=u;var c=o;t.default=c},h3zL:function(e,t,a){e.exports={logo:"antd-pro-components-global-header-index-logo",menu:"antd-pro-components-global-header-index-menu",trigger:"antd-pro-components-global-header-index-trigger",right:"antd-pro-components-global-header-index-right",action:"antd-pro-components-global-header-index-action",search:"antd-pro-components-global-header-index-search",account:"antd-pro-components-global-header-index-account",avatar:"antd-pro-components-global-header-index-avatar",dark:"antd-pro-components-global-header-index-dark",name:"antd-pro-components-global-header-index-name"}},"jsC+":function(e,t,a){"use strict";a.r(t);var n=a("XBQK"),r=a("q1tI"),l=a("TSYQ"),o=a.n(l),u=a("2/Rp"),c=a("H84U"),d=a("CtXQ");function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},s.apply(this,arguments)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function m(e,t,a){return t&&p(e.prototype,t),a&&p(e,a),e}function g(e,t){return!t||"object"!==i(t)&&"function"!==typeof t?y(e):t}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function h(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}function b(e,t){return b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},b(e,t)}var E=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},k=u["default"].Group,O=function(e){function t(){var e;return f(this,t),e=g(this,v(t).apply(this,arguments)),e.renderButton=function(t){var a=t.getPopupContainer,l=t.getPrefixCls,c=e.props,i=c.prefixCls,f=c.type,p=c.disabled,m=c.onClick,g=c.htmlType,y=c.children,v=c.className,h=c.overlay,b=c.trigger,O=c.align,C=c.visible,w=c.onVisibleChange,x=c.placement,P=c.getPopupContainer,M=c.href,j=c.icon,_=void 0===j?r["createElement"](d["default"],{type:"ellipsis"}):j,N=c.title,S=E(c,["prefixCls","type","disabled","onClick","htmlType","children","className","overlay","trigger","align","visible","onVisibleChange","placement","getPopupContainer","href","icon","title"]),T=l("dropdown-button",i),I={align:O,overlay:h,disabled:p,trigger:p?[]:b,onVisibleChange:w,placement:x,getPopupContainer:P||a};return"visible"in e.props&&(I.visible=C),r["createElement"](k,s({},S,{className:o()(T,v)}),r["createElement"](u["default"],{type:f,disabled:p,onClick:m,htmlType:g,href:M,title:N},y),r["createElement"](n["a"],I,r["createElement"](u["default"],{type:f},_)))},e}return h(t,e),m(t,[{key:"render",value:function(){return r["createElement"](c["a"],null,this.renderButton)}}]),t}(r["Component"]);O.defaultProps={placement:"bottomRight",type:"default"},n["a"].Button=O;t["default"]=n["a"]},sgkG:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Pwec");var r=n(a("CtXQ"));a("5Dmo");var l=n(a("3S7+")),o=n(a("q1tI")),u=a("MuoO"),c=a("Y2fQ"),d=n(a("CWS2")),i=n(a("trCS")),s=n(a("h3zL")),f=e=>{var t=e.theme,a=e.layout,n=s.default.right;return"dark"===t&&"topmenu"===a&&(n="".concat(s.default.right,"  ").concat(s.default.dark)),o.default.createElement("div",{className:n},o.default.createElement(l.default,{title:(0,c.formatMessage)({id:"component.globalHeader.help"})},o.default.createElement("a",{target:"_blank",href:"",rel:"noopener noreferrer",className:s.default.action},o.default.createElement(r.default,{type:"question-circle-o"}))),o.default.createElement(d.default,{menu:!0}),o.default.createElement(i.default,{className:s.default.action}))},p=(0,u.connect)(e=>{var t=e.settings;return{theme:t.navTheme,layout:t.layout}})(f);t.default=p},trCS:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Pwec");var r=n(a("CtXQ"));a("lUTK");var l=n(a("BvKs")),o=a("Y2fQ"),u=n(a("q1tI")),c=n(a("TSYQ")),d=n(a("uZXw")),i=n(a("Kkfi")),s=e=>{var t=e.className,a=(0,o.getLocale)(),n=e=>{var t=e.key;return(0,o.setLocale)(t,!1)},s=["pt-BR"],f={"pt-BR":"Portugu\xeas"},p={"pt-BR":"\ud83c\udde7\ud83c\uddf7"},m=u.default.createElement(l.default,{className:i.default.menu,selectedKeys:[a],onClick:n},s.map(e=>u.default.createElement(l.default.Item,{key:e},u.default.createElement("span",{role:"img","aria-label":f[e]},p[e])," ",f[e])));return u.default.createElement(d.default,{overlay:m,placement:"bottomRight"},u.default.createElement("span",{className:(0,c.default)(i.default.dropDown,t)},u.default.createElement(r.default,{type:"global",title:(0,o.formatMessage)({id:"navBar.lang"})})))},f=s;t.default=f},uZXw:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("qVdP");var r=n(a("jsC+")),l=n(a("Y/ft")),o=n(a("q1tI")),u=n(a("TSYQ")),c=n(a("QyDn")),d=e=>{var t=e.overlayClassName,a=(0,l.default)(e,["overlayClassName"]);return o.default.createElement(r.default,Object.assign({overlayClassName:(0,u.default)(c.default.container,t)},a))},i=d;t.default=i},usdK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.push=l,t.replace=o,t.go=u,t.goBack=c,t.goForward=d,t.default=void 0;var n=r(a("RFCh"));function r(e){return e&&e.__esModule?e:{default:e}}function l(){n.default.push.apply(n.default,arguments)}function o(){n.default.replace.apply(n.default,arguments)}function u(){n.default.go.apply(n.default,arguments)}function c(){n.default.goBack.apply(n.default,arguments)}function d(){n.default.goForward.apply(n.default,arguments)}var i={push:l,replace:o,go:u,goBack:c,goForward:d};t.default=i},xKgJ:function(e,t,a){"use strict";function n(e){var t,a="undefined"===typeof e?localStorage.getItem("antd-pro-authority"):e;try{a&&(t=JSON.parse(a))}catch(e){t=a}return"string"===typeof t?[t]:t}function r(e){var t="string"===typeof e?[e]:e;return localStorage.setItem("antd-pro-authority",JSON.stringify(t))}Object.defineProperty(t,"__esModule",{value:!0}),t.getAuthority=n,t.setAuthority=r}}]);