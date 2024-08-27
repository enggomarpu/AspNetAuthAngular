using System.ComponentModel.DataAnnotations;

namespace WebApi.DTOs.Account
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
