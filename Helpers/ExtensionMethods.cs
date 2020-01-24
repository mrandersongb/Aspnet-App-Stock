using System.Collections.Generic;
using System.Linq;

using Backend.Entities.Users;

namespace Backend.Helpers
{
    public static class ExtensionMethods
    {
        // Método que remove a senha da lista de usuários.
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users) {
            return users.Select(x => x.WithoutPassword());
        }

        // Método que remove a senha de um único usuário.
        public static User WithoutPassword(this User user) {
            user.PasswordHash = null;
            return user;
        }
    }
}