using System.Collections.Generic;
using System.Linq;

using Backend.Models.Billing.Stock;
using Backend.Entities.Billing.Stock;
using Backend.Server;

namespace Backend.Services.Billing.Stock {

    public interface IMoveStockService{
        MoveStock Register(MoveStockModel moveStockModel);
    }

    public class MoveStockService: IMoveStockService
    {
        BillingContext _billingContext;

        public MoveStockService(BillingContext billingContext){
            _billingContext = billingContext;
        }

        public MoveStock Register(MoveStockModel moveStockModel){

                            

            return null;
        }
        
    }

}