

using Backend.Entities.Billing.Products;
using Backend.Server;

namespace Backend.Services.Billing.Products {

    

    public interface IProductService
    {
        Products GetProduct(string id, string company);
    }

    public class ProductService: IProductService
    {

        BillingContext _billingContext;

        public ProductService(BillingContext billingContext){
            _billingContext = billingContext;
        }

        public Products GetProduct(string id, string company){

            return null;
        }
        
    }

}
