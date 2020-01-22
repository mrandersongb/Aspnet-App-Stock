/*
    Serviços disponivéis para operações com usuários.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

// Gerência token jwt
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

using Backend.Models;
using Backend.Helpers;

namespace Backend.Services
{

    // Interface de serviços disponível para o usuário
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }
    public class UserService : IUserService {
        // Fake Data Users 
        private List<User> _users = new List<User>
        { 
            new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        };

        // Acessa as propriedades da aplicação
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        // Serviço de autenticação do usuário
        public User Authenticate(string username, string password)
        {
            // procura na base de dados se o usuário existe
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // returna null se o usuário não existir
            if (user == null)
                return null;

            // autenticado com sucesso , gera um token jwt
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove a senha antes de retornar dados
            user.WithoutPassword();
            
            return user;
        }

        // Devolve todos os usuário sem a senha
        public IEnumerable<User> GetAll()
        {
            // retorna todos os usuários sem a senha
            return _users.WithoutPasswords();
        }
    }
}