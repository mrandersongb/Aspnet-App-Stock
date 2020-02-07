using AutoMapper;

using Backend.Models.Users;
using Backend.Entities.Users;

using Backend.Models.Menu;
using Backend.Entities.Menu;

using Backend.Entities.Billing.Products;
using Backend.Models.Billing.Products;

using Backend.Models.Billing.Stock;
using Backend.Entities.Billing.Stock;

namespace Backend.Helpers {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile(){

            CreateMap<User, UserModel>();
            CreateMap<User, RegisterModel>();
            CreateMap<Modules, ModulesModel>();
            CreateMap<MenuAuth, MenuModel>();
            CreateMap<UserModules, UserModulesModel>();
            CreateMap<UserCompanies,UserCompaniesModel>();
            CreateMap<Companies, CompaniesModel>();
            CreateMap<Product, ProductsModel>();
            CreateMap<MoveStock, MoveStockModel>();
        }
    }
}