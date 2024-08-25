using AutoMapper;
using WebApi.DTOs.Account;
using WebApi.Models;


namespace WebApi.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
           
            CreateMap<User, UserDto>();
			CreateMap<User, RegisterDto>();
            
            CreateMap<RegisterDto, User>().ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

			CreateMap<UserDto, User>();

        }
    }
}
