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
using Backend.Services;
using Backend.Entities.Users;
using Backend.Models.Users;

namespace Backend.Controllers {

    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class UsersController : ControllerBase {

         private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /*
            Endpoint - Rota de autenticação de usuário
        */
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserAuthenticate userParam)
        {
            // Consulta serviço               
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
            // Devolve erro de autenticação para o usuário
                return Unauthorized(new {
                    message = "Usuário e/ou Senha está incorreto" 
                });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Autenticação efetuda com sucesso
            // retorna informações básicas do usuário junto com o token
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Group = user.Groups,
                //FirstName = user.FirstName,
                //LastName = user.LastName,
                Status = "ok",
                Token = tokenString
            });
        }

        // Cadastra um novo usuário
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            try
            {
                // mapeia  o model para entidade
                var user = _mapper.Map<User>(model);

                // cria o usuário 
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // returna mensagem de erro, se houver alguma exceção
                return BadRequest(new { message = ex.Message });
            }
        }

        // Informaçoes de um único usuário
        // api/users/id
        [HttpGet("{id}")]
        public IActionResult GetUser(int id) {
            var user = _userService.GetById(id);
            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users =  _userService.GetAll();
            return Ok(users);
        }

    }
}



