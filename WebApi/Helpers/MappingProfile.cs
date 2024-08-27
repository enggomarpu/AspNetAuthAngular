using AutoMapper;
using WebApi.DTOs.Account;
using WebApi.Models;


namespace WebApi.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
           
            CreateMap<AppUser, UserDto>();
			CreateMap<AppUser, RegisterDto>();
            
            CreateMap<RegisterDto, AppUser>().ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

			CreateMap<UserDto, AppUser>();

        }
    }
}
