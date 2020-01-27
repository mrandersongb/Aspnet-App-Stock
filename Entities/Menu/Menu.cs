using System.Collections.Generic;

namespace Backend.Entities.Menu {
    // Menu autorizados para cada usuário
    public class Menu {
        public List<MenuItem> Itens { get; set; }

    }

    // Menu Módulos ex: Faturamento 
    public class MenuItem : MenuBase {

        //public string locale { get; set; }
        //public List<SubMenuItem> subMenuItem { get; set; }
        public List<SubMenuItem> children { get; set; }
    }


    // Menu Manutenção / Cadastro / Relatório
    public class SubMenuItem : MenuBase {

        public bool hideChildrenInMenu { get; set; }
        //public List<SubMenuItemChildren> subMenuItemChildren { get; set; }
        public List<SubMenuItemChildren> children { get; set; }
    }


    // Menu Telas do Módulo
    public class SubMenuItemChildren : MenuBase {
        public bool exact { get; set; }
        public string description { get; set; }
        public string tag { get; set; }
        public string title { get; set; }
    }


    // Menu Base
    public class MenuBase {
        public string id { get; set; }
        public string path { get; set; }
        public string name { get; set; }
        public string icon { get; set; }
    }
}