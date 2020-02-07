using System.Collections.Generic;
using System.Linq;
using System;

using Backend.Models.Billing.Stock;
using Backend.Entities.Billing.Stock;
using Backend.Server;

namespace Backend.Services.Billing.Stock {

    public interface IMoveStockService{
        bool Register(MoveStock stockModel);
    }

    public class MoveStockService: IMoveStockService
    {
        BillingContext _billingContext;

        public MoveStockService(BillingContext billingContext){
            _billingContext = billingContext;
        }

        public bool Register(MoveStock moveStock){

            try{

                _billingContext.movest.Add(moveStock);
                _billingContext.SaveChanges();

                return true;
            }catch(Exception err){
                throw new Exception(err.Message);
            }
            
        }
        
    }

}