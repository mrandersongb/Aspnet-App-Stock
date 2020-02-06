/*
    Faz conexão com o banco de dados
    Gerencia e Mapeia tabelas do banco de dados com as classes
*/
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Backend.Entities.Billing.Products;

namespace Backend.Server
{

    // Gerencia conexão com a base Dataplus Parâmetros
    // Avaliar: criar uma única base de dados
    public class BillingContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public BillingContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // efetua conexão ao banco de dados
            options.UseSqlServer(Configuration.GetConnectionString("NF"));   
        }

        // Empresas
        // Nome da Tabela deve ser o mesmo da tabela no banco de dados.
        public DbSet<Products> ESProd { get; set; }
    }
}