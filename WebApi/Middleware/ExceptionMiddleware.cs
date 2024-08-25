using System.Net;
using System.Text.Json;
using WebApi.Errors;

namespace WebApi.Middleware
{
	public class ExceptionMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly IHostEnvironment _env;

		public ExceptionMiddleware(RequestDelegate next,  IHostEnvironment env)
		{
			_next = next;
			_env = env;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}


			catch (Exception ex)
			{

				context.Response.ContentType = "application/json";

				var exceptionStatusCode = context.Response.StatusCode == (int)StatusCodes.Status401Unauthorized ? context.Response.StatusCode : (int)HttpStatusCode.InternalServerError;

				//if (ex.statusCode > 0)
				//{
				//	exceptionStatusCode = ex.statusCode;
				//}

				context.Response.StatusCode = exceptionStatusCode;
				var response = new ErrorDetails(exceptionStatusCode, ex.Message);

				if (_env.IsDevelopment())
				{
					response = new ErrorDetails(exceptionStatusCode, ex.Message);
				}


				var jsonResponse = JsonSerializer.Serialize(response);

				await context.Response.WriteAsync(jsonResponse);
			}

		}

	}
}
