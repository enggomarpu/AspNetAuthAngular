using System.Text.Json;

namespace WebApi.Errors
{
    public class ErrorDetails
	{
		public ErrorDetails(int sCode, string msg = null)
		{
			statusCode = sCode;
			message = msg ?? GenerateMessageStatusCode(sCode);
		}

		public int statusCode { get; set; }
		public string message { get; set; }
		public override string ToString() => JsonSerializer.Serialize(this);
		private string GenerateMessageStatusCode(int statusCode)
		{
			return statusCode switch
			{
				400 => "Bad request",
				401 => "Unauthorized",
				404 => "not found",
				500 => "internal server error",
				_ => ""
			};
		}
	}
}
