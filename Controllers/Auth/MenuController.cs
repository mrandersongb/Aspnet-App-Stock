
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


using Backend.Services.Menu;

namespace Backend.Authorization {

    // Menus autorizados por usuário
    // Realiza a consulta e retorna a lista de menus
    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class MenuController : ControllerBase {

        IMenuService _menuService;

        public MenuController(IMenuService menuService) { 
            _menuService = menuService;
        }

        // devolve o menu do usuário com base no seu id
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetMenu(int id) {

            try{
                var menuAuth = _menuService.GetMenu(id);

                if(menuAuth == null) {
                    return BadRequest( new { message = "Erro ao carregar menu do usuário" });
                }

                return Ok(menuAuth);           
            }catch(Exception ex) {
                throw new Exception(ex.Message);
            }
        }

    }

}