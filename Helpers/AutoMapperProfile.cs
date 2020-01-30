using AutoMapper;

using Backend.Models.Users;
using Backend.Entities.Users;

using Backend.Models.Menu;
using Backend.Entities.Menu;

namespace Backend.Helpers {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile(){

            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<Modules, ModulesModel>();
            CreateMap<MenuAuth, MenuModel>();
            CreateMap<UserModules, UserModulesModel>();
            //CreateMap<UpdateModel, User>();
        }
    }
}