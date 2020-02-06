

using Backend.Entities.Billing.Products;

namespace Backend.Services.Billing.Products {

    public interface IProductService
    {
            Products GetProduct(string Id, string company);
    }

    public class ProductService: IProductService
    {
        public ProductService(){

        }

        public GetProduct(string Id, string company){
            
        }
        
    }

}
