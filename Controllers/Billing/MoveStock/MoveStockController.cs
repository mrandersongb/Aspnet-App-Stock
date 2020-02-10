using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using Backend.Entities.Billing.Stock;
using Backend.Models.Billing.Stock;
using Backend.Services.Billing.Stock;

namespace Backend.Controllers.Billing.Stock
{

    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class MoveStockController : ControllerBase
    {
        private IMoveStockService _moveStockService;
        private IMapper _mapper;

        public MoveStockController(
            IMoveStockService moveStockService,
            IMapper mapper)
        {
            _moveStockService = moveStockService;
            _mapper = mapper;
        }

        // Consulta produto por Código + Empresa
        // api/users/{company}/{id}
        [HttpPost("register")]
        public IActionResult Register([FromBody] MoveStockModel moveStockModel)
        {

            try
            {
                //var newMoveStock = _mapper.Map<MoveStock>(moveStockModel);
                var _moveStock = _moveStockService.Register(new MoveStock
                {
                    prod = moveStockModel.prod,
                    quant = moveStockModel.quant,
                    valor = moveStockModel.valor,
                    tipo = moveStockModel.tipo.Substring(0, 1),
                    ofabr = moveStockModel.ofabr,
                    usuario = moveStockModel.usuario,
                    data = DateTime.Today,
                    hora = string.Format("{0:HHMM}", DateTime.Now),
                    empresa = moveStockModel.empresa
                });

                if (!_moveStock)
                {
                    return BadRequest(new
                    {
                        found = false,
                        submitted = false,
                        message = "Erro ao movimentar estoque"
                    });
                }

                return Ok(new
                {
                    found = false,
                    submitted = true
                });

            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }

        }

    }
}
