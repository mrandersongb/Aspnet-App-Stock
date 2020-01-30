using System.Collections.Generic;
using System.Linq;

using Backend.Helpers;
using Backend.Entities.Menu;

namespace Backend.Services.Menu {

    public interface IModuleService {
        Modules GetModule(int id);
    }

    public class ModuleService : IModuleService {

        private DataContext _context;

        public ModuleService(DataContext context) {
            _context = context;
        }

        // Consulta um módulo por id
        public Modules GetModule(int id) {

            var module = _context.DPP_Modulos.FirstOrDefault(
                m => m.Id == id
            );

            return module;
        }

    }

}