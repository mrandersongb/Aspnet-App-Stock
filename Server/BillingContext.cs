/*
    Faz conexão com o banco de dados
    Gerencia e Mapeia tabelas do banco de dados com as classes
*/
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Backend.Entities.Billing.Products;
using Backend.Entities.Billing.Stock;

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

        // Produtos
        public DbSet<Product> esprod { get; set; }
        // Movest
        public DbSet<MoveStock> movest { get;set; }
    }
}