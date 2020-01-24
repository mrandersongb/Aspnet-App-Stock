/*
 * Funções que auxiliam o desenvolvimento.
 */

using System;

namespace Backend.Common
{
    public static class Utils
    {
        
        /// <summary>
        /// Limita o número de caracters de uma variável do tipo texto.
        /// </summary>
        /// <param name="text"></param>
        /// <param name="countChar"></param>
        /// <returns></returns>
        public static string MaxChar(string text,int countChar, int startPos = 0)
        {
            if (text == null)
                return string.Empty;

            text = text.Trim();

            if(text.Length < countChar){
                return text.Substring(startPos, text.Length);
            }

            return text.Substring(startPos, countChar);
        }

        public static string Left(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;
            maxLength = Math.Abs(maxLength);

            return (value.Length <= maxLength
                   ? value
                   : value.Substring(0, maxLength)
                   );
        }
    }
}