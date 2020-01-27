
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Authorization {

    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class MenuController : ControllerBase {

        public MenuController(){ }

    }

}