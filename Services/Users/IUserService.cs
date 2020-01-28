using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Backend.Entities.Users;
using Backend.Helpers;

namespace Backend.Services.Users
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.DPP_Usuarios.SingleOrDefault(x => x.Username == username);
                      
            // verifica se o usuário existe
            if (user == null)
                return null;

            // verifica se a senha está correta
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // usuário autenticado com sucesso
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.DPP_Usuarios;
        }

        public User GetById(int id)
        {
            return _context.DPP_Usuarios.Find(id);
        }

        // Cadastra um novo usuário.
        public User Create(User user, string password)
        {
            // valida a senha
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Senha é Obrigatória");

            if (_context.DPP_Usuarios.Any(x => x.Username == user.Username))
                throw new AppException("Usuário \"" + user.Username + "\" já existe");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.DPP_Usuarios.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.DPP_Usuarios.Find(userParam.Id);

            if (user == null)
                throw new AppException("Usuário não existe");

            // atualiza o usuário  foi modificado
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // notifica erro se o novo usuário já existe
                if (_context.DPP_Usuarios.Any(x => x.Username == userParam.Username))
                    throw new AppException("Usuário " + userParam.Username + " já  existe");

                user.Username = userParam.Username;
            }

            // atualiza os dados do usuário se foi fornecido
            if (!string.IsNullOrWhiteSpace(userParam.Username))
                user.Username = userParam.Username;

            //if (!string.IsNullOrWhiteSpace(userParam.LastName))
            //user.LastName = userParam.LastName;

            // atualiza a senha se foi fornecida
            if (!string.IsNullOrWhiteSpace(password))
            {
                // gera o hash da senha
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.DPP_Usuarios.Update(user);
            _context.SaveChanges();
        }

        // Exclui um usuário
        public void Delete(int id)
        {
            var user = _context.DPP_Usuarios.Find(id);
            if (user != null)
            {
                _context.DPP_Usuarios.Remove(user);
                _context.SaveChanges();
            }
        }

        // métodos hash privados
        // cria o hash da senha
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("Senha");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Valor não ser vazio ou conter espaços em branco.", "Senha");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("Senha");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Valor não pode ser vazio ou espaços em branco.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}