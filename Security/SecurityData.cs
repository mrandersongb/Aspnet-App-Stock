using System.Security.Cryptography;
using System.IO;
using System.Text;
using System;

using Backend.Common;

namespace Backend.Controllers.Security {

    public class SecurityData {

        public static string EncryptString(string strtext, string _key) {
            return Encrypt(strtext, _key);
        }

        public static string DecryptString(string strtext, string _key) {
            return Decrypt(strtext, _key);
        }

        //Função para criptografar o texto
        private static string Encrypt(string strText, string strEncrKey) {
            //byte[] byKey;

            //byte[] IV = { &H12, &H34, &H56, &H78, &H90, &HAB, &HCD, &HEF };

            //================================================================
            // Anderson: 23.10.2019 
            // Devo está chave nas futuras implementações
            //================================================================
            byte[] IV = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF } ;

            try {
                //byKey = Encoding.UTF8.GetBytes(Utils.Left(strEncrKey, 8));

                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                byte[] inputByteArray = Encoding.UTF8.GetBytes(strText);
                MemoryStream ms = new MemoryStream();
                //CryptoStream cs = new CryptoStream(
                //ms, des.CreateEncryptor(byKey, IV), CryptoStreamMode.Write);

                //cs.Write(inputByteArray, 0, inputByteArray.Length);
                //cs.FlushFinalBlock();
                return Convert.ToBase64String(ms.ToArray());

            } catch (Exception ex) {
                return ex.Message;
            }
        }

        //Função usada para descriptografar o texto
        private static string Decrypt(string strText , string sDecrKey) { 
            //byte[] byKey;

            //byte[] IV = { &H12, &H34, &H56, &H78, &H90, &HAB, &HCD, &HEF };
            //================================================================
            // Anderson: 23.10.2019 
            // Devo trocar está chave nas futuras implementações
            //================================================================
            byte[] IV = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
            byte[] inputByteArray;
                        
            try{
                inputByteArray = new byte[strText.Length];
                //byKey = Encoding.UTF8.GetBytes(Utils.Left(sDecrKey, 8));
    
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();

                inputByteArray = Convert.FromBase64String(strText);

                MemoryStream ms = new MemoryStream();
                //CryptoStream cs = new CryptoStream(
                //    ms, des.CreateDecryptor(byKey, IV), CryptoStreamMode.Write);

                //cs.Write(inputByteArray, 0, inputByteArray.Length);
                //cs.FlushFinalBlock();
    
                Encoding encoding = Encoding.UTF8;
                return encoding.GetString(ms.ToArray());
            } catch(Exception ex){
                throw new Exception(ex.Message);
            }

    }


}

}