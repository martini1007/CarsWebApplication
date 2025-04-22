using System.ComponentModel.DataAnnotations;

namespace Cars.Api
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$", ErrorMessage = "Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one digit.")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}
