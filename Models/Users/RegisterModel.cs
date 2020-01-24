using System.ComponentModel.DataAnnotations;
/*
    Dados obrigatórios do usuário para um novo cadastro.
*/
namespace Backend.Models.Users
{
    public class RegisterModel
    {
        //[Required]
        //public string FirstName { get; set; }

        //[Required]
        //public string LastName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Groups { get; set; }
    }
}