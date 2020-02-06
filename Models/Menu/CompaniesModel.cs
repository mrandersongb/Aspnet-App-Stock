using System.Collections.Generic;

namespace Backend.Models.Menu {
    public class CompaniesModel {
        public int Id { get;set; }
        public string Empresa { get; set; }    
        public string Razao { get;set; }
    }

    public class UserCompaniesAuth {
        public int IdUser { get; set; }
        public string IdCompany { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
    }

    public class CompaniesAuthorized
    {
        public List<UserCompaniesAuth> companies {get;set;}
        public UserCompaniesAuth company {get;set;}

        public CompaniesAuthorized(){
            companies = new List<UserCompaniesAuth>();
            //company = new UserCompaniesAuth();
        }
    }
}