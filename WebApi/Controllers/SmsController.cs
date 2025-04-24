using Azure.Communication.Sms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SmsController : ControllerBase
{
	private readonly IConfiguration _configuration;
	private readonly SmsClient _smsClient;

	public class SmsRequest
	{
		public string PhoneNumber { get; set; }
		public string Message { get; set; }
	}

	public SmsController(IConfiguration configuration)
	{
		//_configuration = configuration;
		//string connectionString = _configuration["SmsServiceAPI:ConnectionString"];
		_smsClient = new SmsClient("endpoint=https://ptpfm-communication-smtp.uk.communication.azure.com/;accesskey=EeYk8Je6xX5jADvc5PIY65TPIzr28iNFYVNk6DvYza1Sn9vIOZoFJQQJ99AKACULyCpdhvn3AAAAAZCSkS4X");
	}

	[AllowAnonymous]
	[HttpPost("send")]
	public async Task<IActionResult> SendSms([FromBody] SmsRequest request)
	{
		try
		{
			if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Message))
			{
				return BadRequest("Phone number and message are required.");
			}

			string fromNumber = "Gigatree";

			var sendResult = await _smsClient.SendAsync(
				from: fromNumber,
				to: request.PhoneNumber,
				message: request.Message
			);

			return Ok(new
			{
				MessageId = sendResult.Value.MessageId,
				Status = "Success",
				Sender = fromNumber,
				Recipient = request.PhoneNumber
			});
		}
		catch (Exception ex)
		{
			return StatusCode(500, new
			{
				Error = "Failed to send SMS",
				Message = ex.Message,
				InnerError = ex.InnerException?.Message
			});
		}
	}
}
