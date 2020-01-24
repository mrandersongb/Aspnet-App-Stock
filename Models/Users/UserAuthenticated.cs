// Descrição: Devolve informações básicas do usuário autenticado.
// Autor: mranderson86
// Empresa: Datapraxis Informática

using Backend.Entities.Users;

namespace Backend.Models.Users
{
    public class UserAuthenticated : User
    {
        //public string Username { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

    }
}