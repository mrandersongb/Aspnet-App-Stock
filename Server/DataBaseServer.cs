using System;
using System.IO;
using System.Security;
using System.Collections.Generic;

using System.Data.SqlClient;

using Backend.Controllers.Security;

namespace Backend.Server.DataBaseServer
{
    public class DataServer{

        public static string FileConfigName = "CONF.DATAPLUS";
        public static string RootServerPath;
        public static string ServerAddress;

        // Credenciais para acessar dados do SQL server
        //public static SqlCredential Credential;

        public static Dictionary<string, string> Dados;

        /// <summary>
        /// Busca dados do servidor atráves do arquivo de configuração.
        /// </summary>
        /// <returns></returns>
        public static Dictionary<string, string> dataFromFile() 
        {
            string FullPathFile = RootServerPath + FileConfigName;

            // Verifica se o arquivo de configuração existe.
            if (File.Exists(FullPathFile)) {
                try {

                    StreamReader readerFile = new StreamReader(FullPathFile);

                    Dados = new Dictionary<string, string>();
                    Dados.Clear();

                    if (!readerFile.EndOfStream) Dados.Add("WhichDataBase", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathU", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathX", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath1", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath2", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath3", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath4", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath5", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath6", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPath7", readerFile.ReadLine());

                    if (!readerFile.EndOfStream) Dados.Add("NetPathParam", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathDP", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathCT", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathNF", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathPA", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathFI", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathAT", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("NetPathMaster", readerFile.ReadLine());

                    if (!readerFile.EndOfStream) Dados.Add("UserADMIN", readerFile.ReadLine());
                    if (!readerFile.EndOfStream) Dados.Add("PasswoordADMIN", readerFile.ReadLine());                                   

                } catch(Exception ex){
                    throw new Exception(ex.Message);
                }
            }
                                   
            return Dados;
        }

        // Configura endereço e usuário do servidor
        public static  void setupDataServer() {
                // Descriptografando arquivo
            try {
                string dataplusParam = SecurityData.DecryptString(Dados["NetPathParam"], "dataplus");
                string[] credentials = dataplusParam.Split(';');

                // Dados de acesso
                string serverAddress = credentials[0].Replace("SERVER=","");
                string userIdDatabase = credentials[2].Replace("USER ID=", "");
                string pswdDatabase = credentials[3].Replace("PASSWORD=", "");

                ServerAddress = serverAddress;

                SecureString passwordSecure = new SecureString();

                foreach( char c in pswdDatabase){
                    passwordSecure.AppendChar(c);
                }

                passwordSecure.MakeReadOnly();

                // Nova credentials
                //Credential = new SqlCredential(userIdDatabase, passwordSecure);
            }
            catch(Exception ex){
                throw new Exception(ex.Message);
            }
        }

    }
}