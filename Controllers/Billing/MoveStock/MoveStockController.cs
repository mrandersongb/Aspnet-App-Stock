using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models.Billing.Stock;

namespace Backend.Controllers.Billing.Stock {

    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class MoveStockController : ControllerBase {
        private IMoveStockService _moveStockService;
        public MoveStockController(
            IMoveStockService moveStockService)
        {
            _moveStockService = moveStockService;
        }

        // Consulta produto por Código + Empresa
        // api/users/{company}/{id}
        [HttpPost("register")]
        public IActionResult Register([FromBody] MoveStockModel  moveStockModel) {

            try{


                var _product = _moveStockService.GetProduct(id,company); 
                                
                if(_product == null){
                    return BadRequest(new { message = "Produto não encontrado" });
                }

                var product = new { 
                    code = _product.Codigo ,
                    description = _product.Descricao,
                    unity = _product.Unid,
                    company = _product.Empresa
                };

                return Ok( new {
                     product , found = true , submitted = false
                });
                
            }catch(Exception err){
                throw new Exception(err.Message);
            }
            
        }

    }
}
