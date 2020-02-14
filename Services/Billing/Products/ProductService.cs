using System.Collections.Generic;
using System.Linq;
using System;

using Backend.Entities.Billing.Products;
using Backend.Server;

namespace Backend.Services.Billing.Products
{

    public interface IProductService
    {
        Product GetProduct(string id, string company);
    }

    public class ProductService : IProductService
    {
        BillingContext _billingContext;

        public ProductService(BillingContext billingContext)
        {
            _billingContext = billingContext;
        }

        public Product GetProduct(string id, string company)
        {
            try
            {
                var _product = _billingContext.esprod.FirstOrDefault(
                p => p.Codigo == id && p.Empresa == company);

                return _product;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

    }

}
