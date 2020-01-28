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
        private DataContext _context = null;
        private ModuleService _moduleService;

        public MenuService(DataContext context, ModuleService moduleService) {
            this._context = context;
            this._moduleService = moduleService;
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
            var modules = userModules.Distinct()
                .Select(p => p.Id_Modulo).ToList();

            // se caso não existir módulo cadastrado para o usuário
            if(userModules == null || userModules.Count() == 0) {
               return menu; 
            }

            // Ordenar por Módulo e Tela
            userModules.OrderBy(sm => sm.Id_Modulo).ThenBy(sm => sm.Id_Tela);
            
            menu = new MenuAuth();
            menu.Itens = new List<MenuItem>();
            menu.Itens.Clear();

            //========================================================================
            // Menu de Empresas
            //========================================================================
            menu.Itens.Add(new MenuItem {
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
                    var module = _moduleService.GetModule( i );

                    if( module != null ) {

                        menu.Itens.Add(new MenuItem {
                            id = module.Id_Modulo,
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
            foreach(var m in menu.Itens){

                // join DPP_Usuarios e DPPTelas               

                string[] category = new string []{"M","C","R"};

                // Cada módulo possui 3 categorias
                // Manutenção,Cadastro e Relatórios
                foreach (var c in category) {

                    var categoryModules = userModules.FirstOrDefault(
                        
                    );


                }


            }                            


            return menu;
        }

        
    }

}