/*
    Faz conexão com o banco de dados
    Gerencia e Mapeia tabelas do banco de dados com as classes
*/
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

using Backend.Entities.Users;

namespace Backend.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // efetua conexão ao banco de dados
            options.UseSqlServer(Configuration.GetConnectionString("DataplusParametros"));   
        }

        // Tabela de Usuários
        // Nome da Tabela deve ser o mesmo da tabela no banco de dados.
        public DbSet<User> DPP_Usuarios { get; set; }
    }
}