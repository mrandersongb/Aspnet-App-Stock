namespace Backend.Models.Users
{
    // Define a estrutura de dados dos usuários que são retornados durante as consulta por usuários.
  public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
    }
}