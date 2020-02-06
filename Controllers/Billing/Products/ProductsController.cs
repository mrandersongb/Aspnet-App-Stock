// Gerência rotas do usuário : autenticação , cadastro , etc.
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

using Backend.Helpers;

namespace Backend.Controllers {

    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class ProductsController : ControllerBase {

        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ProductsController(
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        // Cadastrar um novo produto
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(int id , string description)
        {
            try
            {
                return Ok();
            }
            catch (AppException ex)
            {
                // returna mensagem de erro, se houver alguma exceção
                return BadRequest(new { message = ex.Message });
            }
        }

        // Consulta produto por Código + Empresa
        // api/users/{id}
        [HttpGet("{id}")]
        public IActionResult GetProduct() {

            try{
                var id = Request.Query["id"];
                var company = Request.Query["company"];

                //var user = _productService.GetById(int.Parse(id), company);
                return Ok();
                
            }catch(Exception err){
                throw new Exception(err.Message);
            }
            
        }

        // Consulta todos os produtos por Empresa
        [HttpGet]
        public IActionResult GetAll()
        {
            //var users =  _userService.GetAll();
            return Ok();
        }

    }
}