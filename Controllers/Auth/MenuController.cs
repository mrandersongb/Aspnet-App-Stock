
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Backend.Services.Menu;
using Backend.Entities.Menu;

namespace Backend.Authorization {

    // Menus autorizados por usuário
    // Realiza a consulta e retorna a lista de menus
    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class MenuController : ControllerBase {

        IMenuService _menuService;
        ICompaniesService _companiesService;
        
        public MenuController(IMenuService menuService, ICompaniesService companiesService) { 
            _menuService = menuService;
            _companiesService = companiesService;
        }

        // devolve o menu do usuário com base no seu id
        //[AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetMenu() {

            try{
                var id = Request.Query["id"];
                var menuAuth = _menuService.GetMenu(int.Parse(id)) as MenuAuth;

                if(menuAuth == null) {
                    return BadRequest( new { message = "Erro ao carregar menu do usuário" });
                }

                return Ok(menuAuth.Items);           
            }catch(Exception ex) {
                throw new Exception(ex.Message);
            }
        }

        // Retorna lista de empresas do usuário
        //[AllowAnonymous]
        [HttpGet("companies/{id}")]
        public ActionResult GetCompanies() {
            try{
                var id = Request.Query["id"];
                var _userCompanies = _companiesService.GetCompanies(int.Parse(id));

                if(_userCompanies == null) {
                    return BadRequest( new { message = "Erro ao carregar empresas do usuário" });
                }

                return Ok(_userCompanies);
            }catch(Exception err){
                throw new Exception(err.Message);
            }
        }

    }

}