using System;
using System.Collections.Generic;
using System.Linq;

using Backend.Helpers;
using Backend.Server;
//using Backend.Entities.Menu;
using Backend.Models.Menu;

namespace Backend.Services.Menu {

    public interface ICompaniesService
    {
        CompaniesAuthorized GetCompanies(int id); 
    }

    public class CompaniesService : ICompaniesService {

        DPContext _context;
        DataPlusContext _dataplus;

        public CompaniesService(DPContext context, DataPlusContext dataplus) {
            _context = context;
            _dataplus = dataplus;
        }

        // Devolve as empresas autorizadas para o usuário
        // Parâmetro: id do usuário
        public CompaniesAuthorized GetCompanies(int id) {

            var userCompanies = _context.DPP_UsuarioEmpresas.Where(
                user => user.Id_Usuario == id
            ).ToList();

            // Consulta empresas por usuário
            var userCompaniesAuth = 
                new CompaniesAuthorized(); 
            
            foreach(var uc in userCompanies){
                var empr = _dataplus.DPEmpr.First(e => e.Empresa == uc.Id_Empresa);

                if(empr != null){
                    // consulta dados da empresa 
                    userCompaniesAuth.companies.Add( new UserCompaniesAuth {
                        IdUser = uc.Id_Usuario,
                        IdCompany = uc.Id_Empresa,
                        Title = empr.Razao,
                        Description = empr.Razao,
                        Path = "/billing"
                    });
                }
            }

            return userCompaniesAuth;
        }

    }

}