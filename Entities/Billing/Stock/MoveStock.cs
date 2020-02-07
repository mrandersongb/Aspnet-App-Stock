using System;

namespace Backend.Entities.Billing.Stock {
    public class MoveStock {

        public int ID { get;set; }   
        public string empresa { get;set; }
        public string prod { get;set; }
        public double quant { get;set; }
        public string ofabr { get;set; }
        public DateTime data { get;set; }
        public string hora { get;set; }
        public string usuario { get;set; }
        public string tipo { get;set; }
    }
}