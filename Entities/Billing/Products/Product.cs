using System.ComponentModel.DataAnnotations;

namespace Backend.Entities.Billing.Products
{
    public class Product
    {
        [Key]
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public string Unid { get; set; }
        public decimal Valor { get; set; }
        public string Empresa { get; set; }
    }

}