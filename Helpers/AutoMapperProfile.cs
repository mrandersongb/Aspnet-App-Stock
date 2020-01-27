using AutoMapper;
using Backend.Models.Users;
using Backend.Entities.Users;

namespace Backend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            //CreateMap<UpdateModel, User>();
        }
    }
}