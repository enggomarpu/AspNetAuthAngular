using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;
using System.Security.Claims;
using System.Text;
using WebApi.DTOs.Account;
using WebApi.Errors;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JWTService _jwtService;
        private readonly IMapper _mapper;
		private readonly EmailService _emailService;
		private readonly IConfiguration _config;

		public AccountController(
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            JWTService service, 
            IMapper mapper,
            EmailService emailService,
			IConfiguration config
		)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = service;
            _mapper = mapper;
			_emailService = emailService;
			_config = config;
		}

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            User user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ErrorDetails((int)HttpStatusCode.Unauthorized, "Invalid username or password"));

            if (user.EmailConfirmed == false) return Unauthorized(new ErrorDetails(401, "Please confirm your email."));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ErrorDetails((int)HttpStatusCode.Unauthorized, "Invalid username or password"));

            //var toBeReturnedDto = _mapper.Map<UserDto>(user);

            return CreateApplicationUserDto(user);
            //return Ok(toBeReturnedDto);
        }
        [Authorize]
        [HttpGet("refresh-user-token")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var tokenValue = HttpContext.Request.Headers.Authorization;
            var currentUser = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _userManager.FindByEmailAsync(currentUser);
			return CreateApplicationUserDto(user);
		}


		[HttpGet("confirm-email")]
		public async Task<ActionResult> ConfirmEmail([FromQuery] string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return BadRequest(new ErrorDetails((int)HttpStatusCode.BadRequest, $"User does not exists with this {email}"));

            if (user.EmailConfirmed == true) return BadRequest(new ErrorDetails((int)HttpStatusCode.BadRequest, $"Email is confirmed for this {email}"));

            try
            {
				//var token = await HttpContext.GetTokenAsync(JwtBearerDefaults.AuthenticationScheme);
				var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
				var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
				var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
                if (result.Succeeded) 
                {
					return Ok(true);
				}

                return BadRequest(new ErrorDetails((int)HttpStatusCode.BadRequest, "Invalid token"));
			}

            catch {
				return BadRequest(new ErrorDetails((int)HttpStatusCode.BadRequest, "Invalid token"));
			}


		}

		[HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterDto registerDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
            if(existingUser != null)
            {
                return BadRequest(new ErrorDetails((int)HttpStatusCode.BadRequest, "User already exists"));
            }

            var userToAdd = _mapper.Map<User>(registerDto);
          
           var result =  await _userManager.CreateAsync(userToAdd, registerDto.Password);
		   if (!result.Succeeded) return BadRequest(result.Errors);

            userToAdd.TwoFactorEnabled = true;


			try
            {
                if(await SendConfirmEMailAsync(userToAdd))
                {
					return Ok("Your account has been created, please check your email");
				}

				return BadRequest("Failed to send email. Please contact admin");
			}
            catch
            {
				return BadRequest("Failed to send email. Please contact admin");
			}

            
        }
        private UserDto CreateApplicationUserDto(User user)
        {
            return new UserDto
            {
                Email = user.Email,
                token = _jwtService.CreateToken(user),
            };
        }

		private async Task<bool> SendConfirmEMailAsync(User user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            
			token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var url = $"{_config["Email:Domain"]}/{_config["Email:ConfirmEmailPath"]}?token={token}&email={user.Email}";

			var body = $"<p>Hello: {user.FirstName} {user.LastName}</p>" +
			  $"<p>Username: {user.UserName}.</p>" +
			  "<p>In order to reset your password, please click on the following link.</p>" +
			  $"<p><a href=\"{url}\">Click here</a></p>" +
			  "<p>Thank you,</p>" +
			  $"<br>{_config["Email:ApplicationName"]}";

			var emailSend = new EmailSendDto(user.Email, "Forgot username or password", body);

			return await _emailService.SendEmailAsync(emailSend);


		}





	}
}
