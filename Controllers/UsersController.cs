// Gerência rotas do usuário : autenticação , cadastro , etc.
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Services;
using Backend.Models;

using Backend.Utils;

namespace Backend.Controllers {
    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class UsersController : ControllerBase {

        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }



        /*
            Endpoint - Rota de autenticação de usuário
        */
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromForm]AuthenticateModel userParam)
        {
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                // Devolve erro de autenticação para o usuário
                return BadRequest(new { message = Message.LoginError });

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



