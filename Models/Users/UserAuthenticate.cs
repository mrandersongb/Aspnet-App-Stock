using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Users
{
    public class UserAuthenticate
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}