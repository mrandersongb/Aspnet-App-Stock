using System;
using System.Collections.Generic;
using System.Linq;

using Backend.Helpers;
using Backend.Entities.Menu;

namespace Backend.Services.Menu {
    // Interface para o menu
    public interface IMenuService
    {
        MenuAuth GetMenu(int id) ; 
    }
    public class MenuService : IMenuService
    {
        // acesso a base de dados
        private DPContext _context = null;
        private ModuleService _moduleService = null;
        private ScreenService _screenService = null;

        public MenuService(
            DPContext context 
            //ModuleService moduleService,
            //ScreenService screenService
            
        ) {
            this._context = context;
            this._moduleService =  new ModuleService(_context);
            this._screenService = new ScreenService(_context);
            //this._screenService = screenService;
        }

        // Consulta lista de menus autorizados por usuário
        public MenuAuth GetMenu(int id)
        {
            MenuAuth menu = null;

            // Filtra os módulos do usuário
            var userModules = this._context.DPP_UsuarioModulos.Where(
                userModule => userModule.Id_Usuario == id
            ).ToList();

            // Apenas os módulos
            //var modules = userModules.Distinct().ToList();
            //.Select(p => p.Id_Modulo).ToList();

            var modules = userModules.Select(p => p.Id_Modulo).Distinct().ToList();

            // se caso não existir módulo cadastrado para o usuário
            if(userModules == null || userModules.Count() == 0) {

                menu = new MenuAuth();
                    menu.Items = new List<MenuItem>();

                    menu.Items.Add(new MenuItem
                    {
                        path = "/",
                    });

                    menu.Items.Add(new MenuItem
                    {
                        name = "Deslogar",
                        path = "/user/logout",
                        icon = "logout"
                    });

               return menu; 
            }

            // Ordenar por Módulo e Tela
            userModules.OrderBy(sm => sm.Id_Modulo).ThenBy(sm => sm.Id_Tela);
            
            menu = new MenuAuth();
            menu.Items = new List<MenuItem>();
            menu.Items.Clear();

            //========================================================================
            // Menu de Empresas
            //========================================================================
            menu.Items.Add(new MenuItem {
                name = "Empresas",
                path = "/companies",
                icon = "shop"
            });


            //========================================================================
            // Adiciona os módulos do usuário
            //========================================================================       

            foreach (var i in modules) {

                if( i != 0 ) {
                    // consulta o módulo por id
                    var module = _moduleService.GetModule(i);

                    if( module != null ) {

                        menu.Items.Add(new MenuItem {
                            id = module.Id,
                            name = module.Descricao == null ? "" : module.Descricao,
                            path = module.Path == null ? "" : module.Path,
                            icon = module.Icone == null ? "" : module.Icone
                        });
                    }
                }
            }

            //===============================================================================
            // Adiciona as telas do usuário permitidas para cada módulo
            //===============================================================================
            foreach(var m in menu.Items){

                // join DPP_Usuarios e DPPTelas               
                string[] category = new string []{"M","C","R"};

                // lista de itens do menu (categorias)
                m.children = new List<SubMenuItem>();

                // Cada módulo possui 3 categorias
                // Manutenção,Cadastro e Relatórios
                foreach (var c in category) {

                    // Filtra as telas por módulo
                    var categoryModules = userModules.Where(
                        userModules => userModules.Id_Modulo == m.id
                    ).ToList();

                    // Consulta telas liberadas do módulo
                    // E filtra por categoria
                    if( categoryModules.Count != 0){

                        switch (c) {
                            case "M":
                                m.children.Add(new SubMenuItem {
                                    name = "Manutenção",
                                    path = $"{m.path}/maintenance",
                                    icon = m.icon,
                                });

                                break;
                            case "C":
                                m.children.Add(new SubMenuItem {
                                    name = "Cadastro",
                                    path = $"{m.path}/register",
                                    icon = m.icon,
                                });

                                break;
                            case "R":
                                m.children.Add(new SubMenuItem {
                                    name = "Relatórios",
                                    path = $"{m.path}/reports",
                                    icon = m.icon,
                                });

                                break;
                        }

                        
                        m.children[m.children.Count - 1].hideChildrenInMenu = true;
                        m.children[m.children.Count - 1].children = new List<SubMenuItemChildren>();

                        // rota de menu
                        m.children[m.children.Count - 1].children.Add(new SubMenuItemChildren {
                            name = "Menu",
                            path = $"{m.children[m.children.Count - 1].path}/menu",
                            exact = true
                        });

                        // lista Modulo / tela / categoria
                        foreach(var cm in categoryModules) {

                            var screenInfo = _screenService.GetScreen(cm.Id_Modulo, cm.Id_Tela);

                            if( screenInfo != null ) {
                                // Tela faz parte da categoria atual
                                if( screenInfo.Categoria == c) {

                                    if (screenInfo.Id != 0)
                                    {
                                        // Lista de telas correspodente a cada categoria do menu
                                        m.children[m.children.Count - 1].
                                            children.Add(new SubMenuItemChildren {
                                                id = screenInfo.Id,
                                                name = screenInfo.Nome == null ? "" : screenInfo.Nome,
                                                path = screenInfo.Rota == null ? "" : screenInfo.Rota,
                                                title = screenInfo.Titulo == null ? "" : screenInfo.Titulo,
                                                description = screenInfo.Descricao == null ? "" : screenInfo.Descricao,
                                                tag = screenInfo.Tag == null ? "" : screenInfo.Tag,
                                                exact = true

                                            }); 
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Adiciona a opção de logon no menu de módulos
            menu.Items.Add(new MenuItem {
                        name = "Deslogar",
                        path = "/logout",
                        icon = "logout"
                    });                            


            return menu;
        }

        
    }

}