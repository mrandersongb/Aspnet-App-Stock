
using System;
using System.Linq;
using System.Collections.Generic;

using Backend.Helpers;
using Backend.Entities.Menu;

namespace Backend.Services.Menu {

    public interface IScreenService {
        Screen GetScreen(int IdModule,int IdScreen);
        List<Screen> GetAll(int IdModule);
    }

    public class ScreenService : IScreenService {

        private DPContext _context;

        public ScreenService (DPContext context) {
            _context = context;
        }

        public List<Screen> GetAll(int IdModule)
        {
            var screenData = _context.DPP_Telas.Where(
                screen => screen.Id_Modulo == IdModule 
            ).ToList();

            return screenData;
        }

        // Consulta informações da tela
        public Screen GetScreen(int IdModule,int IdScreen) {

            var screenData = _context.DPP_Telas.First(
                screen => screen.Id_Modulo == IdModule && screen.Id == IdScreen
            );

            return screenData;
        }

    }



}