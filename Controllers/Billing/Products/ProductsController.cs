// Gerência rotas do usuário : autenticação , cadastro , etc.
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Helpers;
using Backend.Entities.Billing.Products;
using Backend.Services.Billing.Products;

namespace Backend.Controllers
{

    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class ProductsController : ControllerBase
    {
        private IProductService _productService;
        public ProductsController(
            IProductService productService)
        {
            _productService = productService;
        }

        // Consulta produto por Código + Empresa
        // api/users/{company}/{id}
        [HttpGet("{company}/{id}")]
        public IActionResult GetProduct(string company, string id)
        {

            try
            {
                var _product = _productService.GetProduct(id, company);

                if (_product == null)
                {
                    return BadRequest(new
                    {
                        found = false,
                        message = "Produto não encontrado"
                    });
                }

                var product = new
                {
                    code = _product.Codigo,
                    description = _product.Descricao,
                    unity = _product.Unid,
                    value = _product.Valor,
                    company = _product.Empresa
                };

                return Ok(new
                {
                    product,
                    found = true
                });

            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }

        }

    }
}