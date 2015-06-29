//Converted from the DecodeAdobeKey function in the Enchanted Keyfinder Source
//By Sam Gleske
//Original algorithm by Dave Hope (http://www.davehope.co.uk)
//http://sf.net/projects/keyfinder
function DecodeAdobeKey(sAdobeEncryptedKey)
{
    var regex=/[0-9]{24}/g;
    if(!regex.test(sAdobeEncryptedKey))
    {
        return 'corrupted serial';
    }
    var AdobeCipher = new Array(),index=0,sAdobeDecryptedKey='';
    AdobeCipher[index++] = '0000000001';
    AdobeCipher[index++] = '5038647192';
    AdobeCipher[index++] = '1456053789';
    AdobeCipher[index++] = '2604371895';
    AdobeCipher[index++] = '4753896210';
    AdobeCipher[index++] = '8145962073';
    AdobeCipher[index++] = '0319728564';
    AdobeCipher[index++] = '7901235846';
    AdobeCipher[index++] = '7901235846';
    AdobeCipher[index++] = '0319728564';
    AdobeCipher[index++] = '8145962073';
    AdobeCipher[index++] = '4753896210';
    AdobeCipher[index++] = '2604371895';
    AdobeCipher[index++] = '1426053789';
    AdobeCipher[index++] = '5038647192';
    AdobeCipher[index++] = '3267408951';
    AdobeCipher[index++] = '5038647192';
    AdobeCipher[index++] = '2604371895';
    AdobeCipher[index++] = '8145962073';
    AdobeCipher[index++] = '7901235846';
    AdobeCipher[index++] = '3267408951';
    AdobeCipher[index++] = '1426053789';
    AdobeCipher[index++] = '4753896210';
    AdobeCipher[index++] = '0319728564';
   
    //decode the adobe key
   for(var i=0;i<24;i++)
   {
       if (i%4 == 0 && i>0)
           sAdobeDecryptedKey += '-';
       sAdobeDecryptedKey += AdobeCipher[i].charAt( sAdobeEncryptedKey.charAt(i) );
   }
   return sAdobeDecryptedKey;
}