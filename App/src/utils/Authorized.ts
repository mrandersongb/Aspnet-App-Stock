import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getAuthority());

//Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize('');
};

// Anderson: 03-09-2019
// Recebe o nível de hieraquia do usuário ex: Admin ou User
// E verifica se ele tem autorização de acesso ao menus.
// Válidação em fase de Desenvolvimento - Isso deverá vir do Servidor.
//let Authorized = RenderAuthorize('');

export { reloadAuthorized };
export default Authorized;
