using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using Backend.Entities.Billing.Stock;
using Backend.Models.Billing.Stock;
using Backend.Services.Billing.Stock;

using Backend.Utils;

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
                        submitted = false,
                        result = new Result
                        {
                            status = "error",
                            title = "Atenção: Falha na movimentação de estoque",
                            subTitle = "Não foi possível registrar um novo movimento."
                        }
                    });
                }

                var result = new
                {
                    status = "success",
                    title = "Operação concluída com sucesso",
                    subTitle = "Registrado novo movimento no estoque."
                };

                return Ok(new
                {
                    submitted = true,
                    result = result
                });

            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }

        }

    }
}
