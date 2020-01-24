// Dados do Usuário
namespace Backend.Entities.Users {
    public class User {
        public string Username { get; set; }
        //public string Avatar { get; set; }
        public int Id { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        //public string Title { get; set; }
        public string Groups { get; set; }
    }
}