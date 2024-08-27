using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;
using WebApi.Errors;

namespace WebApi.Extensions
{
	public static class ExtensionMethods
	{
		public static void ConfigureJWT(this IServiceCollection services, IConfiguration config)
		{
			services.AddAuthentication(options =>
			{
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
			.AddJwtBearer(options =>
		{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Key"])),
			ValidIssuer = config["JWT:Issuer"],
			ValidateIssuer = true,
			ValidateAudience = false,
		};

		options.Events = new JwtBearerEvents
		{
			OnChallenge = context =>
			{
				// Suppress the default response
				context.HandleResponse();

				context.Response.StatusCode = StatusCodes.Status401Unauthorized;
				context.Response.ContentType = "application/json";

				var response = new ErrorDetails(401, "Custom Unauthorized Response: Token is invalid or expired.");

				var jsonResponse = JsonSerializer.Serialize(response);

				return context.Response.WriteAsync(jsonResponse);

			}
		};



	});
		}
	}
}
