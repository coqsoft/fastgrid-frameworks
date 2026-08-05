"use strict"
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! UTF8Store 

//! Version 1.0.0
//! Version explanation: "major.minor.build" - build = contains bug changes, minor = can contain also new small features, major - can contain also new big features and in rare cases can contain also backward incompatible changes

//! Contains static JavaScript functions in global UTF8Store object. 
//! If present FastGrid, the UTF8Store object is shared with global FGrid object and the methods are accessible from both the objects.
//! Major static functions are: WriteValue() - save 1 value, WriteValues() - save more values, ReadValue() - load one value, ReadValues() - load more values, GetUCode() - create ucode, FindUCode() - data analyse

//! UTF8 Store stores any numbers, strings or special values in one Unicode string.
//! The values storage is optimized to be as short as possible when the Unicode string is saved in UTF8 encoding.
//! UTF8 Store is part of FastGrid development, but can be used also separately without FastGrid in any project.
//! Using UTF8 store is free of charge, but the UTF8 store script source codes must not be modified.

//! Storage type is specified by ucode 32bit integer passed to every function. The ucode must be the same for the value write and read.

//! The UTF8 store string contains only the stored values; to read the value you have to know its ucode type and its position in the UTF8 store string.
//! The UTF8 store is designed to save values of tables, where column value types (ucode) and their positions are the same for every row that is saved to the UTF8 store.

//! Main advantages:
//! Any value from the UTF8 store string can be read directly and very fast without any parsing or decompressing other values or the whole UTF8 store string.
//! The UTF8 store string allocates remarkably less memory (many times less) than any array of the stored numbers or strings.
//! The UTF8 store string can be sent raw from server to client or back without any changes. It is shorter than any other format and can be also effectivelly zip compressed by server.
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var FGrid = FGrid || null, UTF8STORE = FGrid&&!FGrid.CUNPow10 ? FGrid : {}, UTF8Store = UTF8Store&&FGrid&&!FGrid.CUNPow10 ? UTF8Store : UTF8STORE; //! If included in FastGrid, preserves included another UTF8Store
var module = module || {}; if(module.exports!=FGrid) module.exports = UTF8Store;
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UTF8STORE.CUNPow10 = [
   1e-10,1e-9,1e-8,1e-7,1e-6,1e-5,1e-4,1e-3,1e-2,0.1,1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13,1e14,1e15,1e16,1e17,1e18,1e19,1e20,
   1e21,1e22,1e23,1e24,1e25,1e26,1e27,1e28,1e29,1e30,1e31,1e32,1e33,1e34,1e35,1e36,1e37,1e38,1e39,1e40,1e41,1e42,1e43,1e44,1e45,1e46,1e47,1e48,1e49,1e50,
   1e51,1e52,1e53,1e54,1e55,1e56,1e57,1e58,1e59,1e60,1e61,1e62,1e63,1e64,1e65,1e66,1e67,1e68,1e69,1e70,1e71,1e72,1e73,1e74,1e75,1e76,1e77,1e78,1e79,1e80,
   1e81,1e82,1e83,1e84,1e85,1e86,1e87,1e88,1e89,1e90,1e91,1e92,1e93,1e94,1e95,1e96,1e97,1e98,1e99,1e100,
   1e101,1e102,1e103,1e104,1e105,1e106,1e107,1e108,1e109,1e110,1e111,1e112,1e113,1e114,1e115,1e116,1e117,1e118,1e119,1e120,
   1e121,1e122,1e123,1e124,1e125,1e126,1e127,1e128,1e129,1e130,1e131,1e132,1e133,1e134,1e135,1e136,1e137,1e138,1e139,1e140,
   1e141,1e142,1e143,1e144,1e145,1e146,1e147,1e148,1e149,1e150,1e151,1e152,1e153,1e154,1e155,1e156,1e157,1e158,1e159,1e160,
   1e161,1e162,1e163,1e164,1e165,1e166,1e167,1e168,1e169,1e170,1e171,1e172,1e173,1e174,1e175,1e176,1e177,1e178,1e179,1e180,
   1e181,1e182,1e183,1e184,1e185,1e186,1e187,1e188,1e189,1e190,1e191,1e192,1e193,1e194,1e195,1e196,1e197,1e198,1e199,1e200,
   1e201,1e202,1e203,1e204,1e205,1e206,1e207,1e208,1e209,1e210,1e211,1e212,1e213,1e214,1e215,1e216,1e217,1e218,1e219,1e220,
   1e221,1e222,1e223,1e224,1e225,1e226,1e227,1e228,1e229,1e230,1e231,1e232,1e233,1e234,1e235,1e236,1e237,1e238,1e239,1e240,
   1e241,1e242,1e243,1e244,1e245,1e246,1e247,1e248,1e249,1e250,1e251,1e252,1e253,1e254,1e255,1e256,1e257,1e258,1e259,1e260,
   1e261,1e262,1e263,1e264,1e265,1e266,1e267,1e268,1e269,1e270,1e271,1e272,1e273,1e274,1e275,1e276,1e277,1e278,1e279,1e280,
   1e281,1e282,1e283,1e284,1e285,1e286,1e287,1e288,1e289,1e290,1e291,1e292,1e293,1e294,1e295,1e296,1e297,1e298,1e299,1e300,
   1e301,1e301,1e303,1e304,1e305,1e306,1e307,1e308
   ];
UTF8STORE.CUNLog10 = {1e-10:0,1e-9:1,1e-8:2,1e-7:3,1e-6:4,1e-5:5,1e-4:6,1e-3:7,1e-2:8,0.1:9,1:10,10:11,100:12,1e3:13,1e4:14,1e5:15,1e6:16,1e7:17,1e8:18,1e9:19,1e10:20};
UTF8STORE.CUNPow2 = [2,4,16,256,65536,4294967296,18446744073709552000,3.402823669209385e+38,1.157920892373162e+77,1.3407807929942597e+154,8.98846567431158e+307]; //! The last one is 2^1023 instead 2^1024
UTF8STORE.CUNPow210 = [10,100,1e4,1e8,1e16,1e32,1e64,1e128,1e256];
UTF8STORE.CUNPow210L = [9.99999999999999,99.9999999999999,9999.99999999999,99999999.9999999,9.99999999999999e15,9.99999999999999e31,9.99999999999999e63,9.99999999999999e127,9.99999999999999e255];
UTF8STORE.CUNEmptyString = (function(){ for(var s="        ",i=0;i<7;i++) s += s; return s; })(); //! Empty string 1024 characters
UTF8STORE.CUNEscape = (function(){ //! Unsupported characters that are escaped, as "\\x00" => "\x00", "\x00" => "\\x00", "\\u0000" => "\u0000", "\u0000" => "\\u0000", code => 1
   var O = [0,0x1f,0x22,0x22,0x5c,0x5c,0x85,0x85,0xa0,0xa0,0x7f,0x7f,0x2028,0x2029,0xd800,0xdfff,0xfdd0,0xfdef,0xfff0,0xfff8,0xfffe,0xffff];
   for(var i=0,S=[];i<O.length;i+=2) for(var j=O[i],e=O[i+1];j<=e;j++){ 
      var a = String.fromCharCode(j), b = (j==0 ? "\\x00" : j<0x10 ? "\\x0"+j.toString(16) : j<0x100 ? "\\x"+j.toString(16) : j<0x1000 ? "\\u0"+j.toString(16) : "\\u"+j.toString(16)).toLowerCase();
      S[a] = b; S[b] = a; S[b.toUpperCase()] = a; S[j] = 1;
      }
   return S;
   })();
UTF8STORE.CUNDate1 = [50000,36864,49152,51840]; //! Maximal dates coded for 0x4 - 0x7
UTF8STORE.CUNMaxBits = [63400,31691,15855,7927,3963,1981];
UTF8STORE.CUNDiv1 = [1,0.1,0.01,0.001,0.0001,2,5,10,100,1e3,6e4,36e5,864e5,1/24,1/1440,1/86400];
UTF8STORE.CUNDiv1M= [1,10,100,1e3,1e4,0.5,0.2,0.1,0.01,0.001,1/6e4,1/36e5,1/864e5,24,1440,86400];
UTF8STORE.CUNDiv2 = [1,0.1,1e-2,1e-3,1e-4,1e-5,1e-6,1e-7,1e-8,1e3,6e4,36e5,864e5,1/24,1/1440,1/86400];
UTF8STORE.CUNDiv2M =[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e-3,1/6e4,1/36e5,1/864e5,24,1440,86400];
UTF8STORE.CUNDiv3 = [1,0.1,1e-2,1e-3,1e-4,1e-5,1e-6,1e-7,1e-8,1e-9,1e-10,1e-11,1e-12,1e-13,1e-14,1e-15];
UTF8STORE.CUNDiv3M= [1,10,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13,1e14,1e15];
UTF8STORE.CUNSep1 = ["","","","","", "", " ", " "," "," ", "  ","  ","", "", " ", " ","  ","  "," ", " ", " ", " ", "  ", "  ", "  ","   ", "   ","   ","    ","    ","    ","    "]; //! Added to Null / NaN / Empty for 0xC0 - 0xFF
UTF8STORE.CUNSep2 = ["","","",""," "," ","  "," "," ","  ","  ","  "," "," ","  "," ","  ","  ","  ","  ","  ","  ","   ","   ","  ","    ","   ","   ","    ","    ","    ","    "]; //! Added to one item strings for 0xC0 - 0xFF
UTF8STORE.CUNChars= [0, 0, 0, 0, 2,  2,  3,   3,  3,  3,   4,   4,   2,  2,  3,   3,  4,   4,   3,   3,   3,   3,   4,    4,    4,   5,     5,    5,    6,     6,     6,     6     ]; //! Count of characters in 0xC0 - 0xFF
UTF8STORE.CUNTypes= [0, 0, 0, 0,131,67,129,  66,130, 65, 128,  64,   3, 11,  9,  10,  0,   8,   7,  23,  47,  15,  19,    45,  14,   9,    20,   42,    0,    16,    40,     8     ]; //! Bit types of 0xC0 - 0xFF: 1 - part1 is 1 char, 2 - part2 is 1 char, 4 - part3 is 1 char, 8 - part2 is in utexts, 16 - part3 is in utexts and part2 is in texts, 32 - part3 is in texts and part2 is in utexts, 64 - part1 is number, 128 - part2 is number
UTF8STORE.CUNUnused = { //! Unused basic codes 0 - 255
   0x0:1,0x10:1, 0x18:1,0x19:1,0x1A:1,0x1B:1,0x1C:1,0x1D:1,0x1E:1, 0x20:1, 0x26:1,0x27:1,0x28:1,0x29:1,0x2A:1,0x2B:1,0x2C:1,0x2D:1,0x2E:1,0x2F:1,0x30:1, 
   0x35:1,0x36:1,0x37:1,0x38:1,0x39:1,0x3A:1,0x3B:1,0x3C:1,0x3D:1,0x3E:1,0x3F:1,0x40:1, 
   0x88:1,0x89:1,0x8A:1, 0x90:1, 0x98:1,0x99:1,0x9A:1,0x9B:1,0x9C:1,0x9D:1,0x9E:1, 0xA0:1, 0xA6:1,0xA7:1,0xA8:1,0xA9:1,0xAA:1,0xAB:1,0xAC:1,0xAD:1,0xAE:1,0xAF:1,0xB0:1, 
   0xB5:1,0xB6:1,0xB7:1,0xB8:1,0xB9:1,0xBA:1,0xBB:1,0xBC:1,0xBD:1,0xBE:1,0xBF:1
   };
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Returns ucode number from its parameters. 
//! Returns negative number between -1 and -12 on incorrect input, the negative value is position of the incorrect parameter (from -1), e.g. -3 is incorrect decimals
//! chars = number of chars: 1,2,3,5
//! sign = 0 - positive + small negative, 1 - positive + negative
//! decimals = number of decimal places the number can have, e.g. 2 means 0.00, 4 means 0.0000. Can be negative to ignore digits, like -2 is rounded to hundreds, -3 is rounded to thousands
//!       It changes the limits, e.g. for limits = 0, sign = 0, decimals = 2, the limits are <-1.00,630.00>, for decimals = -1 the limits are <-1000,630000>
//!       a) for chars = 1 can be -3 to 4; b) for chars = 2 can be 0 to 7, c) for chars 3 and 5 can be 0,2,4 to 14
//! multiple = which numbers will be coded smaller, can be 1,10,100,1000,10000,..., e.g. 100 means that numbers 0, 100, 200, 300, .... will be coded smaller than 1,2,...,101,102,...
//!       a) for chars = 1 can be 1,10,100; b) for chars = 2 can be 1,10,100,1000,10000,100000 (1000000 cannot be used due double float precision problems)
//! limits = a) for chars = 1 and sign = 0: 0 = <-100,63000>   (314 strings),   1 = <-100,50000>   (13314 strings), 2 = <-100,40000>   (23314 strings),   
//!                                         3 = <-100,20000>   (43314 strings), 4 = <-100,10000>   (53314 strings)
//!                                         5 = <-10000,50000> (3414 strings),  6 = <-10000,40000> (13414 strings), 7 = <-10000,20000> (33414 strings)
//!          b) for chars = 1 and sign = 1: 0 = <-31500,31500> (314 strings),   1 = <-25000,25000> (13314 strings), 2 = <-20000,20000> (23314 strings), 
//!                                         3 = <-10000,10000> (43314 strings), 4 = <-5000,5000>   (53314 strings)
//!          c) for chars = 2 it is number of significant digits:
//!                                         0 = 10 digits (limits <0,4e9> / <-2e9,2e9>), 1 = 9 digits (limits <0,1e13> / <-1e10,1e10>), 
//!                                         2 = 8 digits (limits <0,1e48> / <-1e28,1e28>), 3 = 7 digits (limits <0,1e100> (1e-100) / <-1e100,1e100> (+/-1e-100)) - ignores decimals
//! base is base number subtracted from the number before stored and added back when number returned from store. Cannot be set with chars2.
//! If set chars2, the chars2, sign2, decimals2, multiple2, limit2 are used for coding numbers that the chars cannot code to strings array as numbers in chars+1 instead of string.
UTF8STORE.GetUCode = function(chars,sign,decimals,multiple,limits,varstrings,escape,base,chars2,sign2,decimals2,multiple2,limits2){
if(typeof(chars)=="object"){
   //return UTF8STORE.GetUCode(A.chars,A.sign,A.decimals,A.multiple,A.limits,A.varstrings,A.escape,A.base,A.chars2,A.sign2,A.decimals2,A.multiple2,A.limits2); }
   var A = chars, a = Object.keys(A).length; 
   if(A.chars!=null){ chars = A.chars; a--; } if(A.sign!=null){ sign = A.sign; a--; } if(A.decimals!=null){ decimals = A.decimals; a--; } 
   if(A.multiple!=null){ multiple = A.multiple; a--; } if(A.limits!=null){ limits = A.limits; a--; } if(A.varstrings!=null){ varstrings = A.varstrings; a--; } 
   if(A.escape!=null){ escape = A.escape; a--; } if(A.base!=null){ base = A.base; a--; } 
   if(A.chars2!=null){ chars2 = A.chars2; a--; } if(A.sign2!=null){ sign2 = A.sign2; a--; } if(A.decimals2!=null){ decimals2 = A.decimals2; a--; } 
   if(A.multiple2!=null){ multiple2 = A.multiple2; a--; } if(A.limits2!=null){ limits2 = A.limits2; a--; }
   if(a<0) return -16;
   }
var un = 0; 
if(chars2>0) { 
   if(base) return -8; 
   un = UTF8STORE.GetUCode(chars2,sign2,decimals2,multiple2,limits2); if(un<0) return un-8; 
   un = (un&0x7f)<<16 | (un&0x7c00)<<13 | 0x8000; 
   }
var b = [null,0,1,2,null,3][chars||1]; if(b==null) return -1;
if(decimals<0||decimals>15) return -3;
if(multiple>9){ if(UTF8STORE.CUNLog10[multiple]==null) return -4; multiple = UTF8STORE.CUNLog10[multiple]-9; }
if(multiple<0||multiple>(b==0?3:6)) return -4;
if(limits<0||(b>=1?limits>3:sign?limits>4&&limits<8||limits>12:limits>15)) return -5;
if(limits>0&&base) limits -= 8;
if(escape<0||escape>3) return -7;
if(limits==3&&b>=1) decimals = 0;
un |= b<<4 | (sign ? 0x40 : 0) | (varstrings ? 0x80 : 0) | (decimals ? decimals-0 : 0) | (multiple>1 ? multiple : 1)<<10 | (limits ? (limits>=8 ? (limits&7)<<12|0x8000 : limits << (b==0 ? 12 : 13)) : 0) | (escape ? escape<<8 : 0);
return base ? UTF8STORE.AddUCodeBase(un,base) : un;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Parses ucode back to source parameters
//! Error ucode returns null
//! For complex ucode returns [0: chars, 1: sign, 2: decimals, 3: multiple, 4: limits, 5: varstrings, 6: escape, 7: base, 8: chars2, 9: sign2,  10: decimals2, 11: multiple2, 12: limits2]
//! For basic ucode returns [0: ucode, 1: base, 2: separator, 3: len1, 4: len2, 5: varstrings, 6: escape]
UTF8STORE.ParseUCode = function(ucode,options){
var un = ucode; if(un<0&&un>=-16) return null;

//! ---- Complex ucode ---
if(un&0x1C00){ 
   var b = (un&0x30)==0x30 ? 5 :  (un>>4&3)+1; // . chars 1,2,3,5
   var A = [b, un&0x40 ? 1 : 0, un&15, UTF8STORE.CUNPow10[(b==1 ? un>>10&3 : un>>10&7)+9], b==1 ? un>>12&15 : un>>13&3, un&0x80 ? 1 : 0, un>>8&3];
   if(un&0x8000&&un>0xFFFF){ un >>= 16; A[8] = (un&0x30)==0x30 ? 5 :  (un>>4&3)+1; A[9] = un&0x40 ? 1 : 0; A[10] = un&0xF; A[11] = UTF8STORE.CUNPow10[(un>>7&7)+9]; A[12] = un>>10&3; } //! UCode2
   else if(un<0||un>0xFFFF) A[7] = UTF8STORE.GetUCodeBase(un); //! Base
   return A;
   }

//! --- Basic UCode ---
if(un&0x6000) return [un]; //! Fixed data
var u = un&0x7F, b = un>>>15, A = [u]; if(un&0x300) A[6] = un>>8&3;
if(u==0x5){ if(un&0x80) A[5] = 1; if(b) A[1] = b; return A; }
if(u>=0x4&&u<=0x7||u>=0x14&&u<=0x17||u==0x24||u==0x25||u==0x34){
   if(un&0x80) A[5] = 1; if(!b) return A;
   var h = u==0x6&&b&0x10000; if(h) b &= 0xFFFF;
   var y = Math.floor(b/384)+(u==0x6?1950:1900); b = b%384; b = options&4 ? new Date(Date.UTC(y,b>>5,(b&31)+1,(h?12:0))) : new Date(y,b>>5,(b&31)+1,(h?12:0));
   A[1] = options&8 ? b-0 : b; return A;
   }
u = un&0xFF;
if(u>=0xC0&&u<=0xDF){ A[0] = u; if(b) A[2] = String.fromCharCode(b); return A; }
if(u>=0xE0&&u<=0xFF){ A[0] = u; if(b){ if(b&0xFF) A[3] = b&0xff; if(b&0xFF00) A[4] = b>>8; } return A; }
if(b) A[1] = UTF8STORE.GetUCodeBase(un);
return A;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Adds group separator to the string s
UTF8STORE.AddGroups = function(s){
s += "";
if(s.indexOf("e")>=0) return s.replace(/([\d\.]{1,5})\d*e/i,"$1e").replace(/0+e/i,"e").replace(/\.e/i,"e");
if(s.indexOf(".")>=0) while(1) { var o =  s.replace(/(\d)(\d\d\d)([\s\,\.])/,"$1 $2$3"); if(s==o) return s; s = o; }
while(1) { var o = s.replace(/(\d)(\d\d\d)(\s|\,|$)/,"$1 $2$3"); if(s==o) return s; s = o; }
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Returns string with debugging information about given ucode
UTF8STORE.DebugUCode = function(ucode){
var A = UTF8STORE.ParseUCode(ucode);

//! --- Error ucode ---
if(A==null){
   if(ucode==-16) return "!!! Error code -16, unknown parameter in GetUCode()";
   if(ucode>=0||ucode<-13) return "!!! Unknown error code "+ucode;
   return "!!! Error code "+ucode + ", incorrect '"+["chars","sign","decimals","multiple","limits","varstrings","escape","base","chars2","sign2","decimals2","multiple2","limits2"][-ucode-1]+"' in GetUCode()";
   }

//!--- Complex ucode ---
if(ucode&0x1C00){ 
   var s = (A[5]?"! ":"")+"Complex ucode, chars: "+A[0]+", sign: "+A[1]+", decimals: "+A[2]+", multiple: "+A[3]+", limits: "+A[4] + (A[5]?", ! varstrings: "+A[5]:"") + (A[6] ? ", escape: "+A[6] : "")
         + (A[7]!=null?", base: "+A[7]:"")
         + (A[8]!=null ? ", chars2: "+A[8]+", sign2: "+A[9]+", decimals2: "+A[10]+", multiple2: "+A[11]+", limits2: "+A[12] : "") + " [";
   for(var ci=0;ci<2;ci++){
      if(A[0]==1){
         var prec = ["integer","0.0","0.00","0.000","0.0000","* 2","* 5","* 10","* 100","* 1 000","* 60 000","* 3 600 000","* 86 400 000","/ 24","/ 1440","/ 86400"][A[2]];
         var max = (A[1] ? [31500,25000,20000,10000,5000] : [63000,50000,40000,20000,10000,50000,40000,20000])[A[4]&3];
         var min = A[1] ? -max : (A[1]&3)<=4 ? -100 : -10000, mul = UTF8STORE.CUNDiv1[A[2]];
         s += UTF8STORE.AddGroups(Math.ceil(min*mul*10000)/10000)+" ~ "+UTF8STORE.AddGroups(Math.floor(max*mul*10000)/10000)+"; precision: "+prec+" + "+(63400-max+min)+" texts]";
         }
      else if(A[0]==2){
         var prec = ["integer","0.0","0.00","0.000","0.0000","0.00000","0.000000","0.0000000","0.00000000","* 1 000","* 60 000","* 3 600 000","* 86 400 000","/ 24","/ 1440","/ 86400"][A[2]];
         var max = (A[1] ? [2e9,1e12,1e27,1e100] : [4e9,1e10,1e47,1e150])[A[4]];
         var min = A[1] ? -max : 0, mul = UTF8STORE.CUNDiv2[A[2]];
         s += UTF8STORE.AddGroups(A[4]==3?min:Math.ceil(min*mul))+" ~ "+UTF8STORE.AddGroups(A[4]==3?max:Math.floor(max*mul))+"; precision: "+(A[4]==3?"1e-100, max 7 digits":prec+(A[4]==0?"":A[4]==1?", max 9 digits":", max 8 digits"))+" + 10M texts]";
         }
      else {
         var prec = ["integer","0.0","0.00","0.000","0.0000","0.00000","0.000000","0.0000000","0.00000000","0.000000000","0.0000000000","0.00000000000","0.000000000000","0.0000000000000","0.00000000000000","0.000000000000000","0.0000000000000000"][A[2]];
         var max = [1e14,1e22,1e111,1e150][A[4]], min = -max, mul = UTF8STORE.CUNDiv3[A[2]];
         s += UTF8STORE.AddGroups(A[4]==3?min:min*mul<10?Math.ceil(min*mul*1000)/1000:Math.ceil(min*mul))+" ~ "+UTF8STORE.AddGroups(A[4]==3?max:max*mul<10?Math.floor(max*mul*1000)/1000:Math.floor(max*mul))+"; precision: "+(A[4]==3?"1e-150, max 11 digits":prec+(A[4]==0?"":", max "+(14-A[4])+" digits"))+(A[0]==5?" + double [-1e308 ~ 1e308, precision:1e-322, max 15 digits]":"")+" + texts]";
         }
      if(A[8]==null) break;
      s += "; 2nd: ["; A = A.splice(8,13);
      }
   return s;
   }

//! --- Basic ucode ---
if(ucode>0x2000&&ucode<0x2400) return "Fixed length data, "+(ucode&0x3FF)+" chars";
var u = ucode&0x7CFF, esc = A[6] ? ", escape: "+A[6] : "", b = !A[1] ? "" : typeof(A[1])=="object" ? ", base: "+A[1].toLocaleDateString("en-US") : ", base: "+A[1];
if(u==0x1) return "Positive integer 1 char [0 ~ 63400]";
if(u==0x2) return "Integer 1 char [-31700 ~ 31700]";
if(u==0x3) return "String 1 char [63401 texts]";
if(u==0x83) return "! String 1 char ! varstrings";
if(u==0x4) return "Date yyyy-MM-dd 1 char"+b+esc+" [years "+(b?(A[1].getFullYear()-65)+" ~ "+(A[1].getFullYear()+65):"1960 ~ 2090")+" + 6700 texts]";
if(u==0x84) return "! Date yyyy-MM-dd 1 char + ! varstrings"+b+esc+" [years "+(b?(A[1].getFullYear()-65)+" ~ "+(A[1].getFullYear()+65):"1960 ~ 2090")+"]";
if(u==0x5) return "Short date MM-dd HH:mx 1 char"+b+esc+" [in year "+(b?A[1]:"1970")+" + 13268 texts]";
if(u==0x85) return "! Short date MM-dd HH:mx 1 char + ! varstrings"+b+esc+" [in year "+(b?A[1]:"1970")+"]";
if(u==0x6) return "Time hh:mm:ss 1 char"+b+esc+" [on day "+(b?A[1].toLocaleDateString("en-US")+(A[1].getHours()?" pm" : "am"):"1/1/1970 am")+" + 7124 texts]";
if(u==0x86) return "! Time hh:mm:ss 1 char + ! varstrings"+b+esc+" [on day "+(b?A[1].toLocaleDateString("en-US")+(A[1].getHours()?" pm" : "am"):"1/1/1970 am")+"]";
if(u==0x7) return "Time HH:mm:sx 1 char"+b+esc+" [on day "+(b?A[1].toLocaleDateString("en-US"):"1/1/1970")+" + 5780 text]";
if(u==0x87) return "! Time HH:mm:sx 1 char + ! varstrings"+b+esc+" [on day "+(b?A[1].toLocaleDateString("en-US"):"1/1/1970")+"]";
if(u==0x8) return "Positive integer add 1 char [0 ~ (add to bits 0: 63400, 1: 31688, 2: 15852, 3: 7924, 4: 3960, 5: 1978)]";
if(u==0x9) return "Integer add 1 char [add to bits 0: -31700 ~ 31700, 1: -15844 ~ 15844, 2: -7926 ~ 7926, 3: -3962 ~ 3962, 4: -1980 ~ 1980, 5: -989 ~ 989]";
if(u==0xA) return "String add 1 char [(add to bits 0: 63401, 1: 15851, 2: 15844, 3: 7925, 4: 3961, 5: 1979) texts]";
if(u==0xB) return "1 bit, 2 numbers"+b+" ["+(b?A[1]+", "+(A[1]+1):"0, 1")+"]";
if(u==0xC) return "2 bits, 4 numbers"+b+" ["+(b?A[1]+" ~ "+(A[1]+3):"0 ~ 3")+"]";
if(u==0xD) return "3 bits, 8 numbers"+b+" ["+(b?A[1]+" ~ "+(A[1]+7):"0 ~ 7")+"]";
if(u==0xE) return "4 bits, 16 numbers"+b+" ["+(b?A[1]+" ~ "+(A[1]+15):"0 ~ 15")+"]";
if(u==0xF) return "5 bits, 32 numbers"+b+" ["+(b?A[1]+" ~ "+(A[1]+31):"0 ~ 31")+"]";
if(u==0x8B) return "1 bit, 2 strings";
if(u==0x8C) return "2 bits, 4 strings";
if(u==0x8D) return "3 bits, 8 strings";
if(u==0x8E) return "4 bits, 16 strings";
if(u==0x8F) return "5 bits, 32 strings";
if(u==0x11) return "Positive integer 2 chars [-10,000,000 ~ 4,000,000,000 + 10M texts]";
if(u==0x91) return "! Positive integer 2 chars + ! varstrings [-10,000,000 ~ 4,000,000,000]";
if(u==0x12) return "Integer 2 chars [-2,000,000,000 ~ 2,000,000,000 + 10M texts]";
if(u==0x92) return "! Integer 2 chars + ! varstrings [-2,000,000,000 ~ 2,000,000,000]";
if(u==0x13) return "String 2 chars [unlimited texts]";
if(u==0x93) return "! String 2 chars ! varstrings";
if(u==0x14) return "Date and time yyyy-MM-dd HH:mm:ss 2 chars"+b+esc+" [years "+(b?(A[1].getFullYear()-60)+" ~ "+(A[1].getFullYear()+60):"1965 ~ 2085")+" + 5M texts]";
if(u==0x94) return "! Date and time yyyy-MM-dd HH:mm:ss 2 chars + ! varstrings"+b+esc+" [years "+(b?(A[1].getFullYear()-60)+" ~ "+(A[1].getFullYear()+60):"1965 ~ 2085")+"]";
if(u==0x15) return "Date and time yyyy-MM-dd HH:mm 2 chars"+b+esc+" [years "+(b?(A[1].getFullYear()-3600)+" ~ "+(A[1].getFullYear()+3600):"-1575 ~ 5625")+" + 5M texts]";
if(u==0x95) return "! Date and time yyyy-MM-dd HH:mm 2 chars + ! varstrings"+b+esc+" [years "+(b?(A[1].getFullYear()-3600)+" ~ "+(A[1].getFullYear()+3600):"-1575 ~ 5625")+"]";
if(u==0x16) return "Time and date yyyy-MM-dd HH:mm:ss 2 chars"+b+esc+" [years "+(b?(A[1].getFullYear()-60)+" ~ "+(A[1].getFullYear()+60):"1965 ~ 2085")+" + 5M texts]";
if(u==0x96) return "! Time and date yyyy-MM-dd HH:mm:ss 2 chars + ! varstrings"+b+esc+" [years "+(b?(A[1].getFullYear()-60)+" ~ "+(A[1].getFullYear()+60):"1965 ~ 2085")+"]";
if(u==0x17) return "Time HH:mm:ss.fff 2 chars"+b+esc+" [on day "+(b?A[1].toLocaleDateString("en-US"):"1/1/1970")+"]";
if(u==0x97) return "! Time HH:mm:ss.fff 2 chars + ! varstrings"+b+esc+" [on day "+(b?A[1].toLocaleDateString("en-US"):"1/1/1970")+"]";
if(u==0x1F) return "Float 2 chars [-1e38 ~ 1e38, min 1e-33, max 7 digits + 10M texts]";
if(u==0x9F) return "! Float 2 chars + ! varstrings [-1e38 ~ 1e38, min 1e-33, max 7 digits]";
if(u==0x21) return "(positive) Integer 3 chars [-1e14 ~ 1e14 + texts]";
if(u==0xA1) return "! (positive) Integer 3 chars + ! varstrings [-1e14 ~ 1e14]";
if(u==0x22) return "Integer 3 chars [-1e14 ~ 1e14 + texts]";
if(u==0xA2) return "! Integer 3 chars + ! varstrings [-1e14 ~ 1e14]";
if(u==0x23) return "String 3 chars [unlimited texts]";
if(u==0xA3) return "! String 3 chars ! varstrings";
if(u==0x24) return "Date and time yyyy-MM-dd HH:mm:ss.fff 3 chars"+b+esc+(b?(A[1].getFullYear()-3000)+" ~ "+(A[1].getFullYear()+3000):"-975 ~ 5025")+" + texts]";
if(u==0xA4) return "! Date and time yyyy-MM-dd HH:mm:ss.fff 3 chars + ! varstrings"+b+esc+(b?(A[1].getFullYear()-3000)+" ~ "+(A[1].getFullYear()+3000):"-975 ~ 5025")+"]";
if(u==0x25) return "Date and time yyyy-MM-dd HH:mm:ss 3 chars"+b+esc+" [unlimited dates]";
if(u==0xA5) return "! Date and time yyyy-MM-dd HH:mm:ss 3 chars + ! varstrings"+b+esc+" [unlimited dates]";
if(u==0x31) return "Double float + (positive) interger 5 chars [-1e308 ~ 1e308, min 1e-323, max 15 digits + texts]";
if(u==0xB1) return "! Double float + (positive) integer 5 chars + ! varstrings [-1e308 ~ 1e308, min 1e-323, max 15 digits]";
if(u==0x32) return "Double float + integer 5 chars [-1e308 ~ 1e308, min 1e-323, max 15 digits + texts]";
if(u==0xB2) return "! Double float + integer 5 chars + ! varstrings [-1e308 ~ 1e308, min 1e-323, max 15 digits]";
if(u==0x33) return "String 5 chars [unlimited texts]";
if(u==0xB3) return "! String 5 chars ! varstrings";
if(u==0x34) return "Date and time yyyy-MM-dd HH:mm:ss.fff 5 chars"+b+esc+" [unlimited dates]";
if(u==0xB4) return "! Date and time yyyy-MM-dd HH:mm:ss.fff 5 chars + ! varstrings"+b+esc+" [unlimited dates]";
if(u>0x40&&u<=0x80||ucode==0x80) return "Fixed length string, "+(ucode==0x80?64:u-0x40)+" chars" + esc;
if(u>=0xc0&&u<=0xff){ //! Separated strings + Adjacent strings
   return (u>=0xe0 ? (u<=0xe3?"! ":"")+"Adjacent strings, first length "+(A[3]?A[3]:u>=0xe4&&u<0xeb?"calculated":"4")+(u>=0xf2?", second length "+(A[4]||A[3]||4):"")+", " : (u<=0xc3?"! ":"")+"Strings separated by '"+(A[2]?A[2]:" ")+"', ") + 
      ["! var strings in 1 or 3 chars","! var strings in 1 or 3 chars, even in utexts","! var strings in 2 chars","! var strings in 2 chars, even in utexts",
       "string 1 char + number 1 char", "number 1 char + string 1 char", "string 1 char + number 2 chars", "number 2 chars + string 1 char", 
       "string 2 chars + number 1 char", "number 1 char + string 2 chars", "string 2 chars + number 2 chars", "number 2 chars + string 2 chars",
       "1 char + 1 char", "1 char + 1 char in utexts", "1 char + 2 chars in utexts", "2 chars + 1 char in utexts", "2 chars + 2 chars", "2 chars + 2 chars in utexts", 
       "1 char + 1 char + 1 char", "1 char + 1 char + 1 char in utexts", "1 char + 1 char in utexts + 1 char", "1 char + 1 char in utexts + 1 char in utexts",
       "1 char + 1 char + 2 chars in utexts", "1 char + 2 chars in utexts + 2 chars", "2 chars + 1 char in utexts + 1 char in utexts", 
       "1 char + 2 chars in utexts + 2 chars in utexts", "2 chars + 2 chars + 1 char in utexts", "2 chars + 1 char in utexts + 2 chars", 
       "2 chars + 2 chars + 2 chars", "2 chars + 2 chars + 2 chars in utexts", "2 chars + 2 chars in utexts + 2 chars", "2 chars + 2 chars in utexts + 2 chars in utexts"]
       [u>=0xe0 ? u-0xe0 : u-0xc0] + esc;
   }
return "!! Unknown ucode 0x"+ucode.toString(16);
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Lists ucodes, without second ucode, base, escape, multiple and fixed length data
UTF8STORE.DebugUCodes = function(settings){
var s = "", html = settings&1;
for(var i=-16;i<=255;i++){ 
   var d = UTF8STORE.DebugUCode(i); 
   s += (html?"<span style='color:"+(d[2]=="!"?"red;font-weight:bold":d[1]=="!"?"red":d[0]=="!"?"#777":"black")+"'>":"")+Number(i).toString(16)+" = "+d+(html?"</span><br/>":"\n"); 
   }

for(var li=0;li<16;li++){
   for(var si=0;si<2;si++){
      for(var di=0;di<16;di++){
         var i = UTF8STORE.GetUCode({chars:1,sign:si,decimals:di,limits:li}); if(i<0) continue;
         var d = UTF8STORE.DebugUCode(i); 
         s += (html?"<span style='color:"+(d[2]=="!"?"red;font-weight:bold":d[1]=="!"?"red":d[0]=="!"?"#777":"black")+"'>":"")+Number(i).toString(16)+" = "+d+(html?"</span><br/>":"\n"); 
         }  
      }
   }

for(var ci=2;ci<=5;ci++){
   if(ci==4) ci++;
   for(var li=0;li<4;li++){
      for(var di=0;di<16&&(!di||li!=3);di++){
         for(var si=0;si<2;si++){
            var i = UTF8STORE.GetUCode({chars:ci,sign:si,decimals:di,limits:li}), d = UTF8STORE.DebugUCode(i);
            s += (html?"<span style='color:"+(d[2]=="!"?"red;font-weight:bold":d[1]=="!"?"red":d[0]=="!"?"#777":"black")+"'>":"")+Number(i).toString(16)+" = "+d+(html?"</span><br/>":"\n"); 
            }  
         }
      }
   }
return s;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Adds base as base/separator/len1 and len2 and esc  to the ucode un and returns the ucode. Useful for special ucodes 0x8 - 0xF and 0xC0 - 0xFF with base number or separator
UTF8STORE.AddToUCode = function(ucode,base,len2,escape){
var un = ucode, u = un&0x207F;
if(escape) escape = u==0x1||u==0x2||u==0x8||u==0x9||u>=0xB&&u<=0xf&&~un&0x80 ? 0 : (escape&3)<<8;
if(u==0x4||u==0x7||u>=0x14&&u<=0x17||u==0x24||u==0x25||u==0x34){
   if(typeof(base)!="object") base = new Date(base);
   if(base){ 
      base = len2&4 ? base.getUTCDate()-1+(base.getUTCMonth()<<5)+(base.getUTCFullYear()-1900)*384 : base.getDate()-1+(base.getMonth()<<5)+(base.getFullYear()-1900)*384; 
      base = (base<1?1:base<=0x1FFFF?base:0x1FFFF)<<15; 
      }
   return un&0x7FFF|escape|base;
   }
if(u==0x5){
   if(base>0&&base<3000) return un&0x7FFF|escape|(base<<15);
   if(typeof(base)!="object") base = new Date(base);
   return un&0x7FFF|escape|(!base?0:len2&4?base.getUTCFullYear()<<15:base.getFullYear()<<15);
   }
if(u==0x6){
   if(typeof(base)!="object") base = new Date(base);
   var h = 0; 
   if(base){ 
      h = len2&4 ? base.getUTCHours()>=12 : base.getHours()>=12; 
      base = len2&4 ? base.getUTCDate()-1+(base.getUTCMonth()<<5)+(base.getUTCFullYear()-1950)*384 : base.getDate()-1+(base.getMonth()<<5)+(base.getFullYear()-1950)*384;
      base = (base<1?1:base<=0xFFFF?base:0xFFFF)<<15; 
      }
   return un&0x7FFF|escape|base|(h?0x80000000:0);
   }
u = un&0x20FF;
if(u>=0xC0&&u<=0xDF){ var s = typeof(base)=="string" ? base.charCodeAt(0) : base; return un&0x7FFF|escape|(s!=32?s<<15:0); }
if(u>=0xE0&&u<=0xFF) return un&0x7FFF|escape|(base<<15)|(len2<<23);
return base&&un>0x3 ? UTF8STORE.AddUCodeBase(un|escape,base) : un|escape;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Adds base number to the ucode un and returns the ucode. Useful for special ucodes 0x8 - 0xF used with base number.
UTF8STORE.AddUCodeBase = function(un,base){
if(un&0x1C00){ var b = un>>4&0x3, decimals = un&15; if(b<=1 && decimals>=(b?9:5)) base = decimals<=12 ? base/UTF8STORE.CUNDiv1[decimals] : base*UTF8STORE.CUNDiv1M[decimals]; }
if(base>=0&&base<32768&&(base>=10||base%1<0.00000001)) return un&0x7FFF | base<<16;
var n = 32768; if(base<0){ base = -base; n = 49152; }
base *= 1e13;
for(var i=0,e=0;i<9;i++){ e <<= 1; if(base>=UTF8STORE.CUNPow210L[8-i]) { base /= UTF8STORE.CUNPow210[8-i]; e |= 1; } }
return un&0x7FFF | Math.floor(base*10+163*e+n)<<16;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Returns base number from given ucode. Used just for testing.
UTF8STORE.GetUCodeBase = function(ucode){
var un = ucode, base = un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
if(!(un&0x1C00)) return base;
var b = un>>4&0x3, decimals = un&15; return b<=1 && decimals>=(b?9:5) ? (decimals<=12 ? base/UTF8STORE.CUNDiv1M[decimals] : base*UTF8STORE.CUNDiv1[decimals]) : base;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Returns size of given ucode in chars. For ucode = 0xB - 0xF returns floating point number. For unused ucodes and var strings returns 0.
UTF8STORE.GetUCodeSize = function(ucode){
var u = ucode&0x7CFF;
return u&0x1c00 ? ((u&0x30)==0x30 ? 5 : (u>>4&3)+1)
      : u<=0xA ? 1 : u<=0xF ? (u==0xB ? 1/6 : u==0xC ? 1/3 : u==0xD ? 0.5 : u==0xE ? 2/3 : 5/6) : u&0x6000 ? (u<=0x23ff ? u-0x2000 : -1)
      : u>=0x40&&u<=0x80 ? u-0x40 : u>=0xc0&&u<=0xff ? UTF8STORE.CUNChars[(u&0xdf)-0xc0] 
      : u&0x80 ? (u==0x8B ? 1/6 : u==0x8C ? 1/3 : u==0x8D ? 0.5 : u==0x8E ? 2/3 : u==0x8F ? 5/6 : 0)
      : UTF8STORE.CUNUnused[u&0xFF] ? -1 : (u&0x30)==0x30 ? 5 : (u>>4&3)+1;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Adds size of given ucode in chars to position and returns the position. For ucode=4/5/6 returns floating point number. Cannot be used for var strings ucode&0x80.
UTF8STORE.AddUCodeSize = function(ucode,position){
var un = ucode; if(un>=0x8&&un<=0xF){ position += un==0xB ? 1/6 : un==0xC ? 1/3 : un==0xD ? 0.5 : un==0xE ? 2/3 : 5/6; var pp = Math.ceil(position); return position>pp-0.1 ? pp : position; }
var u = un&0x7CFF; return Math.ceil(position) + (u<=0xA ? 1 : u>=0x40&&u<=0x80 ? u-0x40 : u>=0xc0&&u<=0xff ? UTF8STORE.CUNChars[(u&0xdf)-0xc0] : u&0x80 ? 0 : (u&0x30)==0x30 ? 5 : (u>>4&3)+1);
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Replaces unsupported characters in both directions, as "\\x00" => "\x00", "\x00" => "\\x00", "\\u0000" => "\u0000", "\u0000" => "\\u0000", code => 1
UTF8STORE.EscapeUNRep = function(s){ return UTF8STORE.CUNEscape[s]; }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Support function for WriteValue(). Replaces special characters in s according to the rep
//! rep = 1 - prefixes \\, \n, \r, \t and \" by \\, 2 - like 1 plus replaces 007F character by "\x7F", 3 - like 2 plus replaces all 0000 - 000F by "\xXX"
UTF8STORE.EscapeUN = function(s,rep,vs){ 
if(typeof(s)!="string") s += "";
if(s.indexOf("\\")>=0) s = s.replace(/\\/g,"\\\\");
if(s.indexOf("\n")>=0) s = s.replace(/\n/g,"\\n");
if(s.indexOf("\r")>=0) s = s.replace(/\r/g,"\\r");
if(s.indexOf("\t")>=0) s = s.replace(/\t/g,"\\t");
if(s.indexOf("\"")>=0) s = s.replace(/\"/g,"\\\"");
if(rep==1) return s;
if(!vs&&s.indexOf("\x7f")>=0) s = s.replace(/\x7f/g,"\\x7f");
if(rep==2) return s;
//if(s.indexOf("\x85")>=0) s = s.replace(/\x85/g,"\\x85");
//if(s.indexOf("\xa0")>=0) s = s.replace(/\xa0/g,"\\xa0");
//if(s.indexOf("\u2028")>=0) s = s.replace(/\u2028/g,"\\u2028");
//if(s.indexOf("\u2029")>=0) s = s.replace(/\u2029/g,"\\u2029");
if(s.search(/[\0-\x1f\x85\xa0\u2028\u2029\ud800-\udfff\ufdd0-\ufdef\ufff0-\ufff8\ufffe\uffff]/)>=0) s = s.replace(/[\0-\x1f\x85\xa0\u2028\u2029\ud800-\udfff\ufdd0-\ufdef\ufff0-\ufff8\ufffe\uffff]/g,UTF8STORE.EscapeUNRep);
return s;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Support function for ReadValue(). Replaces back the special characters in s according to the rep
//! rep = 1 - prefixes \\, \n, \r, \t and \" by \\, 2 - like 1 plus replaces 007F character by "\x7F", 3 - like 2 plus replaces all 0000 - 000F by "\xXX"
UTF8STORE.UnescapeUN = function(s,rep,options,vs){ 
if(typeof(s)!="string") return s;
if(s.indexOf("\\")<0){
   if(~options&1) return s; 
   var n = s-0; return (options&2 ? n+""==s : n||n===0) ? n : s;
   }
var a = s.indexOf("\\\\")>=0;
if(a) s = s.replace(/\\\\/g,"\ufffe");
if(rep>=2&&!vs&&s.indexOf("\\x7f")>=0) s = s.replace(/\\x7f/gi,"\x7f");
if(s.indexOf("\\n")>=0) s = s.replace(/\\n/g,"\n");
if(s.indexOf("\\r")>=0) s = s.replace(/\\r/g,"\r");
if(s.indexOf("\\t")>=0) s = s.replace(/\\t/g,"\t");
if(s.indexOf("\\\"")>=0) s = s.replace(/\\\"/g,"\"");
//if(rep==3&&s.indexOf("\\")>=0) s = s.replace(/\\x[01][\dabcdef]|\\x85|\\xa0|\\u2028|\\u2029/gi,function(s){ return UTF8STORE.CUNHex32[s]; });
if(rep==3&&s.indexOf("\\")>=0) s = s.replace(/\\x[\dabcdefABCDEF]{2}|\\u[\dabcdefABCDEF]{4}/gi,UTF8STORE.EscapeUNRep);
if(a) s = s.replace(/\ufffe/g,"\\");
if(~options&1) return s; 
var n = s-0; return (options&2 ? n+""==s : n||n===0) ? n : s;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Support function for WriteValue(). Returns variable length string, length in one or two bytes
UTF8STORE.ToVarStringUN = function(s,un,error,spc){
if(un&0x8000 && un&0x1c00) {
   var v = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,(error&1?error&3:3)|(error&4?error&12:12)|(error&16?error&48:48));
   if(v!=null) return (un&0x7c4f)==3 ? v : un&32 ? "!"+v : "#"+v;
   }
if(typeof(s)!="string") { if(typeof(s)=="boolean") s = s ? "1" : "0";  else if(typeof(s)=="object") s = UTF8STORE.ToString(s); else s += ""; }
else if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3,1);
var v = s.length; if(v<=63400) { v += v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130; return (un&0x7c4f)==3 ? String.fromCharCode(v) + s : spc<0 ? (un&32 ? "!" : "#") + s : " "+String.fromCharCode(v) + s; }
var v2 = v>>15; v &= 32767; v2 += v2<56 ? v2+36 : v2<96 ? v2+37 : v2<122 ? v2+38 : v2<8193 ? v2+39 : v2<55255 ? v2+41 : v2<62887 ? v2+2089 : v2<63399 ? v2+2121 : v2+2130; v += v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130; return (un&0x7c4f)==3 ? "$"+String.fromCharCode(v2,v) + s : " $"+String.fromCharCode(v2,v) + s; 
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Support function for ReadValue(). Returns var string or char 2 number. ui points to space character as the var string prefix
UTF8STORE.FromVarStringUN = function(v,un,U,ui,P,options){
if(un&0x8000 && un&0x1c00 && v!=32 && (un&0x7c4f)!=3) return UTF8STORE.ReadValue(U,un&0x380|un>>16&0x7f|un>>13&0x7c00,ui+1,null,null,options,P); //! Returns char 2 number
if(v==32) { var v = U.charCodeAt(++ui); if(v==32&&!(un&48)) { if(P!=null) P[0] = ui+1; return NaN; } }    //! returns NaN from 32,32 in 1 CHAR
else if(!(un&0x1c00)&&(un&0x6C4F)>=0x4&&(un&0x6C4F)<=0x7) return UTF8STORE.ReadValue(U,(un&0x20)==0x20?0xB4:(un&0x7F)==0x15?0xA5:0xA4,ui+1,null,null,options,P); //! Returns char 2 date
v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<63399 ? v+2121 : v+2130;
var l = v; if(!v) { v = U.charCodeAt(++ui); var v2 = U.charCodeAt(++ui); v = (v-(v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<63399 ? v+2121 : v+2130)<<15) + v2-(v2<92 ? 36 : v2<133 ? 37 : v2<160 ? 38 : v2<0x2028 ? 39 : v2<0xd800 ? 41 : v2<0xfdd0 ? 2089 : v2<63399 ? v2+2121 : v2+2130); l = v+4; }
v = U.slice(ui+1,ui+l+1); 
if(un&0x300) v = UTF8STORE.UnescapeUN(v,un>>8&3,options,1);
if(P!=null) P[0] = ui+l+1;
if(~options&1) return v;         //! returns var string
if(typeof(v)!="string") return v;
var n = v-0; return (options&2 ? n+""==v : n||n===0) ? n : v;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Returns number of bytes that given strings will allocate in UTF8
UTF8STORE.GetUTF8Length = function(text){
if(typeof(text)!="string") return 0;
for(var i=0,l=text.length,n=0;i<l;i++) { var v = text.charCodeAt(i); n += v<128 ? 1 : v<2048 ? 2 : 3; }
return n;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Rounds number to given number of digits. max is maximal exponent of the number, 308 by default
UTF8STORE.UTF8Round = function(v,dig,max){
if(!v) return 0;
var ne = v<0 ? v>-1 : v<1, a = v<0 ? (ne ? -1/v : -v) : ne ? 1/v : v, n = 8, l = max?max+10:308;
while(n<l-1){ var mm = n+l>>1; if(a<=UTF8STORE.CUNPow10[mm]) l = mm; else n = mm; }
l = a<=UTF8STORE.CUNPow10[n] ? n-10 : l-10;
if(ne){ a = UTF8STORE.CUNPow10[l+dig+9]; return Math.round(v*a)/a; }       //! negative exponent, only 6 digits
if(l<=dig) { a = UTF8STORE.CUNPow10[dig-l+10]; return Math.round(v*a)/a; } //! small number <1e8
a = UTF8STORE.CUNPow10[l-dig+10]; return Math.round(v/a)*a;                //! big number
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UTF8STORE.ToUTF8Date = function(s,options){
if(typeof(s)=="object") return s==null ? null : s.getUTCFullYear ? s : NaN;
if(~options&1) return s;
if(typeof(s)=="number"){ 
   if(s%1||s<-6.3072e13||s>3.1436e15||isNaN(s)) return s;
   var v = new Date(s); return options&2&&v-0+""!=s ? s : v;
   }
if(typeof(s)!="string" || options&2) return s; // @@@ Pri options&2 neparsuje retezec, protoze to nikdy neodpovida
var v = new Date(s); return isNaN(v) ? s : v;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UTF8STORE.ToString = function(s,options){
if(!s||typeof(s)!="object") return s+"";
if(s&&s.getDate){
   if(options&8) return s-0+"";
   if(options&4){ var d = s.getUTCDate(), M = s.getUTCMonth(), y = s.getUTCFullYear(), h = s.getUTCHours(), m = s.getUTCMinutes(), ss = s.getUTCSeconds(); }
   else { var d = s.getDate(), M = s.getMonth(), y = s.getFullYear(), h = s.getHours(), m = s.getMinutes(), ss = s.getSeconds(); }
   return y+"-"+(M<9?"0"+(M+1):M+1)+"-"+(d<10?"0"+d:d)+(h||m|ss ? "T"+(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(ss<10?"0"+ss:ss) : "");
   }
if(s.join) return s.join(",");
return s+"";
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//. Returns number of bytes that allocate given numbers converted by String.fromCharCode
UTF8STORE.FromCharCodeTest = function(a,b,c,d,e){
return (a==null?0:a<128?1:a<2048?2:3) + (b==null?0:b<128?1:b<2048?2:3) + (c==null?0:c<128?1:c<2048?2:3) + (d==null?0:d<128?1:d<2048?2:3) + (e==null?0:e<128?1:e<2048?2:3);
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Converts values in array values to UTF8 string
//! ucodes can be array of the ucode numbers for values (ucodes has the same length as values) or one ucode number as the same for all values
//! If set positions, fills here positions of the values in the returned string. positions will have the same length as values.
//! error, texts, utexts and options have the same meaning as in WriteValue function.
//! If the result for any value in values is null (according to error = 3/12/48/64), the function returns null
//! If set PP, si can exceed sl for multi bits to finish string with the whole chars and sets to PP[0] final real si, used only in recursion
//! If set test, returns length of the string in UTF8 bytes instead of the string itself
//! --- Values W ---
UTF8STORE.WriteValues = function(values,ucodes,error,texts,utexts,options,positions,start,length,PP,test){
var S = values; if(S==null||ucodes==null||typeof(S)!="object") return null;
var si = start||0, sl = length==null||length>S.length ? S.length : length, P = positions;
if(sl-si>1100&&!test) { //! To speed up string concatenation
   var A = [], N = [], o;
   while(sl-si>1100) { o = UTF8STORE.WriteValues(S,ucodes,error,texts,utexts,options,P,si,si+1000,N); si = N[0]; A[A.length] = o; if(o==null) return null; }
   o = UTF8STORE.WriteValues(S,ucodes,error,texts,utexts,options,P,si,null,PP); A[A.length] = o;
   return o==null ? null : A.join("");
   }
var O = test ? 0 : "", v;
var f = test ? UTF8STORE.FromCharCodeTest : String.fromCharCode; //! Accepts floating point value as char code and strips the decimals (like Math.floor()) from it

//! --- All values have the same un ---
if(typeof(ucodes)!="object" || ucodes.length==1){
   var un = typeof(ucodes)=="object" ? ucodes[0] : ucodes, u = un&0x7c7f, asi = 0;
   var r = un>=0&&un<=65535||un&0x8000 ? 0 : un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
   if(un&0x80&&u>=0xB&&u<=0xF){
      if(texts==null) { if(error&64) return null; }  //! No texts[]
      else {
         if(texts.tmp==null) texts.tmp = {}; 
         if(options&64 && texts.cnt==null) texts.cnt = [];
         for(var V=[];si<sl;si++){
            var s = S[si]; if(typeof(s)=="object") s = UTF8STORE.ToString(s,options); var v = texts.tmp[s]; 
            if(v==null) { 
               v = texts.length; if(v>=1<<u-0xa) { if(error&64) return null; v = 0; }      //! Full texts[]
               else { texts.tmp[s] = v; if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3); if(test) texts.length++; else texts[v] = s; }
               }
            if(options&64) texts.cnt[v] = ++texts.cnt[v]||1;
            V[V.length] = v;
            }
         asi = si; S = V; si = 0; sl = S.length;
         }
      }
   if(u==0xB) for(;si<sl;si+=6) { //! 1 bit
      v = (S[si]-r&1)<<5 | (S[si+1]-r&1)<<4 | (S[si+2]-r&1)<<3 | (S[si+3]-r&1)<<2 | (S[si+4]-r&1)<<1 | S[si+5]-r&1;
      O += f(v<56 ? v+36 : v+37);
      if(P!=null) { var q = si/6; P.push(q,q+1/6,q+1/3,q+0.5,q+2/3,q+5/6); if(si>sl-6) P.length -= si-sl+6; }
      }
   else if(u==0xC) for(;si<sl;si+=3) { //! 2 bits
      v = (S[si]-r&3)<<4 | (S[si+1]-r&3)<<2 | S[si+2]-r&3; 
      O += f(v<56 ? v+36 : v+37); 
      if(P!=null) { var q = si/3; P.push(q,q+1/3,q+2/3); if(si>sl-3) P.length -= si-sl+3; } 
      }
   else if(u==0xD) for(;si<sl;si+=2) { //! 3 bits
      v = (S[si]-r&7)<<3 | S[si+1]-r&7; O += f(v<56 ? v+36 : v+37); 
      if(P!=null) { P.push(si>>1,(si>>1)+0.5); if(si>sl-2) P.length--; }
      }
   else if(u==0xE) for(;si<sl;si+=3) { //! 4 bits
      v = (S[si]-r&15)<<2 | S[si+1]-r>>2&3; O += f(v<56 ? v+36 : v+37);
      if(P!=null) { var q = si*2/3; P.push(q,q+2/3,q+4/3); if(si==sl-2) P.length--; }
      if(si==sl-1 && !PP) { if(P!=null) P.length--; break; }
      v = (S[si+1]-r&3)<<4 | S[si+2]-r&15; O += f(v<56 ? v+36 : v+37);
      }
   else if(u==0xF) for(;si<sl;si+=6) { //! 5 bits
      v = (S[si]-r&31)<<1 | S[si+1]-r>>4&1; O += f(v<56 ? v+36 : v+37);
      v = (S[si+1]-r&15)<<2 | S[si+2]-r>>3&3; O += f(v<56 ? v+36 : v+37);
      v = (S[si+2]-r&7)<<3 | S[si+3]-r>>2&7; O += f(v<56 ? v+36 : v+37);
      v = (S[si+3]-r&3)<<4 | S[si+4]-r>>1&15; O += f(v<56 ? v+36 : v+37);
      v = (S[si+4]-r&1)<<5 | S[si+5]-r&31; O += f(v<56 ? v+36 : v+37);
      if(P!=null) { var q = si*5/6; P.push(q,q+5/6,q+5/3,q+15/6,q+10/3,q+25/6); }
      if(si>sl-6 && !PP) { if(P!=null) P.length -= si-sl+6; if(si>sl-5&&!test) O = O.slice(0,sl-si-5); break; }
      }
   else if(test) for(;si<sl;si++) { v = UTF8STORE.WriteValue(S[si],un,error,texts,utexts,options,test); if(v==null) return null; O += typeof(v)=="string" ? UTF8STORE.GetUTF8Length(v) : v; }
   else if(P!=null) for(;si<sl;si++) { P[si] = O.length; v = UTF8STORE.WriteValue(S[si],un,error,texts,utexts,options); if(v==null) return null; O += v; }
   else for(;si<sl;si++) { v = UTF8STORE.WriteValue(S[si],un,error,texts,utexts,options); if(v==null) return null; O += v; }
   if(PP) PP[0] = si+asi;
   return O;
   }

//! --- Every value has its un ---
var UN0 = ucodes[0], unl = ucodes.length;
for(;si<sl;si++){
   var un = ucodes[si>=unl?si%unl:si]; if(un==null) un = UN0;
   var u = un&0x7c7f;

   //! --- Value in the whole chars ---
   if(u<0xB||u>0xF) { 
      if(P!=null&&!test) P[P.length] = O.length; 
      v = UTF8STORE.WriteValue(S[si],un,error,texts,utexts,options); if(v==null) return null; 
      O += test ? UTF8STORE.GetUTF8Length(v) : v; 
      if(utexts&&options&16){ texts = utexts; utexts = null; }
      continue; 
      }

   //! --- 1 - 5 bits ---
   var b = 0, v = 0;
   while(1){
      var s = S[si];
      if(un&0x80&&u>=0xB){
         if(texts==null) { if(error&64) return null; s = 0; }  //! No texts[]
         else {
            if(texts.tmp==null) texts.tmp = {}; 
            if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
            var n = texts.tmp[s]; 
            if(n==null) { 
               n = texts.length; if(n>=1<<u-0xa) { if(error&64) return null; s = 0; }      //! Full texts[]
               else { texts.tmp[s] = n; if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3); if(test) texts.length++; else texts[n] = s; }
               }
            s = n; if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[n] = texts.cnt[n]++||1; }
            }
         }
      else if((un<0||un>65535)&&~un&0x8000&&(s||s===0)) s -= un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
      if(P!=null&&!test) P[P.length] = O.length+b/6;
      if(u==0xB) { v = v<<1|s&1; b++; } //! 1 bit
      else if(u==0xC){  //! 2 bits
         if(b==5){ v <<= 1; v |= s>>1&1; O += f(v<56 ? v+36 : v+37); b = 1; v = s&1; }
         else { v = v<<2|s&3; b += 2; }
         }
      else if(u==0xD){  //! 3 bits
         if(b==4){ v <<= 2; v |= s>>1&3; O += f(v<56 ? v+36 : v+37); b = 1; v = s&1; }
         else if(b==5){ v <<= 1; v |= s>>2&1; O += f(v<56 ? v+36 : v+37); b = 2; v = s&3; }
         else { v = v<<3|s&7; b += 3; }
         }
      else if(u==0xE){  //! 4 bits
         if(b==3){ v <<= 3; v |= s>>1&7; O += f(v<56 ? v+36 : v+37); b = 1; v = s&1; }
         else if(b==4){ v <<= 2; v |= s>>2&3; O += f(v<56 ? v+36 : v+37); b = 2; v = s&3; }
         else if(b==5){ v <<= 1; v |= s>>3&1; O += f(v<56 ? v+36 : v+37); b = 3; v = s&7; }
         else { v = v<<4|s&15; b += 4; }
         }
      else if(u==0xF){  //! 5 bits
         if(b==2){ v <<= 4; v |= s>>1&15; O += f(v<56 ? v+36 : v+37); b = 1; v = s&1; }
         else if(b==3){ v <<= 3; v |= s>>2&7; O += f(v<56 ? v+36 : v+37); b = 2; v = s&3; }
         else if(b==4){ v <<= 2; v |= s>>3&3; O += f(v<56 ? v+36 : v+37); b = 3; v = s&7; }
         else if(b==5){ v <<= 1; v |= s>>4&1; O += f(v<56 ? v+36 : v+37); b = 4; v = s&15; }
         else { v = v<<5|s&31; b += 5; }
         }
      else if(b){ //! Multi bits
         var a;
         if(s==null) a = 50;
         else if(s==="") a = 52;
         else {
            if(typeof(s)!="string") a = s; else if(options&1){ a = s-0; if(options&2&&a+""!=s) a = NaN; } else a = NaN;
            if(u>=0xA){
               if(texts==null&&(utexts==null||~un&0x8000)) { if(error&64) return null; a = -4; u = 0x8; }                                //! No texts[], returns null or NaN
               else if(un&0x8000) { s = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,error,texts); if(s=="! ") { a = -4; u = 0x8; } else if(utexts){ un &= ~0x300; texts = utexts; } } //! 2 CHARS number as string
               if(u>=0xA){
                  if(texts.tmp==null) texts.tmp = {}; if(typeof(s)=="object") s = UTF8STORE.ToString(s,options); a = texts.tmp[s]; 
                  if(a==null) { 
                     a = texts.length; texts.tmp[s] = a;
                     if(un&0x300&&~un&0x8000) s = UTF8STORE.EscapeUN(s,un>>8&3);
                     if(test) texts.length++; else texts[a] = s;
                     }
                  if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[a] = texts.cnt[a]++||1; }
                  }
               }
            else if(u==0x9&&a) a = a<0 ? (-a<<1)-1 : a<<1;
            else if(a<0) { if(error&4){ if(error&8) return null; a = 0; } else if(error&64&&~error&8) return null; else a = -2; } //! Negative error, saves NaN or 0 or returns null
            if(!a&&a!==0){ if(error&16) { if(error&32) return null; a = -1; } else if(error&64&&~error&32) return null; else a = -2; }  //! String error, saves NaN or 0 or returns null
            if(a<0) a += 53; else if(a>=50) a += 3; //! includes null, NaN, "" as 50, 51, 52
            if(a>UTF8STORE.CUNMaxBits[b]){ if(error&4){ if(error&8) return null; a = UTF8STORE.CUNMaxBits[b] - (u==0x9&&a&1 ? 1 : 0); } else if(error&64&&~error&8) return null; else { a = -4; b = 0; } } //! Range error, saves NaN or maximum or returns null
            }
         v = b ? v<<6-b | a&((1<<6-b)-1) | a<<b&~63 : a;
         O += f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130); //! Saves correct number
         b = 0; v = 0;
         }
      else { si--; if(P!=null) P.length--; break; } //! Multi bits value in the whole char
      si++; un = ucodes[si>=unl?si%unl:si]; if(un==null) un = UN0;
      u = un&0x7c7f;
      if(u<0x8||u>0xF||si>=sl&&(!PP||!b||b==6)){ if(b) { v <<= 6-b; O += f(v<56 ? v+36 : v+37); } si--; break; }
      if(b==6){ O += f(v<56 ? v+36 : v+37); b = 0; v = 0; }
      if(utexts&&options&16){ texts = utexts; utexts = null; }
      } 
   }
if(PP) PP[0] = si;
return O;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Converts value to string according to FastGrid ucode type.
//! If value cannot be placed to result string (converted to number exactly), it is stored according to the error:
//!    1, 2. bits &3  - Floating point numbers            0 to texts,   1 as rounded to max decimals,    2 as NaN,    3 return null
//!    3, 4. bits &12 - Too big and too small numbers     0 to texts,   4 as maximal / minimal number,   8 as NaN,   12 return null
//!    5, 6. bits &48 - Strings                           0 to texts,  16 as empty string "",           32 as NaN,   48 return null
//!    7. bit     &64 - Full or unset texts in 0 options  0 as NaN,    64 return null
//! If value cannot be converted to number at all (it is string), it is always stored to texts (if set) or in result string (if set var string ucode&0x80), otherwise stored in returned string as NaN
//! texts is an array where the value is stored if it cannot be converted to number, according to the error. The index into texts is returned in result string. If the texts is full, it returns NaN in the result string.
//! utexts can be set as other array to store coded numbers as strings in the second type (neg2,dig2,round2,limit2 in GetUCode). It must be passed to ReadValue as joined string without separators = texts.join("")
//! function sets property texts.tmp and fills it by indexes of texts to reuse indexes for the same strings
//! options&1 - tries to convert string type to number as value-0
//! If set test, returns length of the string in UTF8 bytes instead of the string itself. In some cases it still returns the string!
//! The generated strings contain only safe Unicode JavaScript string characters (also without double quotes and backslash): u20 - u21, u23 - u5B, u5D - u2027, u202A - uD7FF, uE000 - uFDCF, uFDF0 - uFFFD
//! +++ CODING +++
//!                       1 char    2 ch   3 ch  5 chars
//! Codes null as       "!",        "!!", "!!!", "!!!!!"
//! Codes NaN  as       " " / "  ", "! ", "!  ", "!    " (1 char codes NaN as "  " on var string &0x80)
//! Codes ""   as       "#" / "#!", "!#", "!! ", "!!#  " (5 chars Infinity: "!!$  ", -Infinity: "!!%  ") (1 char codes "" as "#!" on Num2 var string &0x80 and &0x8000)
//! Codes 0    as       "$",        "$#", "###", "#####"
//! Chars prefix        ---         " ",  " ",   " "
//! String prefix       ---         ---   "!",   "!"
//! Var String prefix   " ",        " ",  " ",   " "
//! Num2 var texts prefix "#",        "#",  "!",   ---
//! Special bits 0xB - 0xF codes only number 0 - 63
//! Fixed length string 1 char (0x41) codes null as "\u0381", NaN as "\u0380" and "" as "\x7f"
//! Fixed length string 2+ chars (0x42+) codes null as "\x7f!" plus spaces, NaN as "\x7f\x7f" plus spaces and "" as "\x7f " plus spaces
//! Fixed length string 1+ char (0x441+) always codes the string of expected length (fills the rest by spaces)
//! First 92 chars (35-91, 93-127) are coded in 1 byte (1 char ucode has only 91 chars, 36-91, 93-127)
//! Next 1918 chars are coded in 2 bytes (128-2047)
//! Next 61400 chars are coded in 3 bytes (2048-8231, 8234-55295, 57344-64975, 65008-65533)
//! Maximum numbers per Unicode char is 63404 (63400 for 1 char ucode)
//! Positive 1 char codes positive numbers from start to their limit, next codes negative numbers in 3 bytes to their limit and next codes strings till end of range in 3 bytes.
//! Integer 1 char codes numbers from start to their limit, next codes strings till end of range in 3 bytes.
//! 2 chars codes numbers by characters 35-91, 93-115, 448-8231, 8234-55295, 57344-64975, 65008-65533 in the first char.
//! 2 chars codes strings by characters 118-125, 128-287 in the first char. Character 116 is num2 var string prefix, character 117 in the first char is reserved.
//! Positive 2 chars codes negative numbers by characters 126-127, 288-447 in the first char. Integer 2 char codes in this range next 10M strings.
//! 3 chars codes numbers in the whole range of all 3 chars (63416 numbers)
//! 3 chars codes strings with character 32 in the first char and characters 35-91, 93-2047 in the next two chars. Optionally used 2048+ characters in the third char for 4M+ strings
//! 5 chars codes double float in characters 35-50 in the first char and in full range of the next 4 chars, size is 13 bytes.
//! 5 chars codes integers in characters 51-91, 93-2047 and characters 35-91, 93-2047 in the next 4 chars, size varies in 5 - 10 bytes.
//! 5 chars codes strings with character 32 in the first char and 35-91, 93-127 in the next 4 characters, size is 5 bytes.
//! --- Value W ---
UTF8STORE.WriteValue = function(value,ucode,error,texts,utexts,options,test){
var f = test ? UTF8STORE.FromCharCodeTest : String.fromCharCode; //! Accepts floating point value as char code and strips the decimals (like Math.floor()) from it
var v, un = ucode, s = value;

//! --- Special 1 CHAR without strings --- Basic1 W --- 
//! 0x1: 0 ... 63400, values 0 ... 90 are in 1 byte, values 91 ... 2008 are in 2 bytes, other values are in 3 bytes
//! 0x2: -31700 ... 31700, values -45 ... 45 are in 1 byte, values -1004 ... -46 and 46 ... 1004 are in 2 bytes, other values are in 3 bytes
//! 0x8: Multiple bits saved single as 0x1
//! 0x9: Multiple bits saved single as 0x2
//! Stores integers, always cuts off the decimals (ignores error&3)
if(un==0x1||un==0x2||un==0x8||un==0x9){
   if(s==null) return "!";
   if(s==="") return "#";
   if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
   if((un==0x2||un==0x9)&&v) v = v<-31700 ? 63401 : v<=-1 ? (-v<<1)-1 : v<0 ? 0 : v<=31700 ? v<<1 : 63402;
   else if(v<0){ if(v<=-1) return error&4 ? (error&8 ? null : "$") : error&64&&~error&8 ? null : " "; v = 0; }   //! Negative number for 0x1, returns 0 / NaN / null
   if(v<=63400) return f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130); //! Returns correct number
   if(v) return error&4 ? (error&8 ? null : f((un==0x2||un==0x9)&&v&1 ? 0xfffc : 0xfffd)) : error&64&&~error&8 ? null : " "; //! Too big number, returns 63413 (only for 0x2 as -31700) / 63400 (for 0x2 is 31700) / NaN / null
   return error&16 ? (error&32 ? null : "#") : error&64&&~error&32 ? null : " ";                           //! String, returns "" / NaN / null
   }

//! --- Special fixed length data --- FixData W ---
if(un>=0x2000&&un<=0x23ff){
   var l = un-0x2000; if(!l) return null;
   if(s==null) return UTF8STORE.CUNEmptyString.slice(0,l);                 //! returns null
   if(typeof(s)!="string") {
      if(typeof(s)=="boolean") s = s ? "1" : "0";                      //! Converts Boolean => 1 / 0
      else if(!s && s!==0) return UTF8STORE.CUNEmptyString.slice(0,l);     //! NaN as input, returns NaN
      else s += "";
      }
   if(s.length<=l) return s.length==l ? s : s+UTF8STORE.CUNEmptyString.slice(0,l-s.length);
   if(error&12) return error&4 ? (error&8 ? null : s.slice(0,l)) : error&64&&~error&8 ? null : UTF8STORE.CUNEmptyString.slice(0,l); //! returns truncated / null / NaN
   return s.slice(0,l);
   }

var uspec = un&0x7c4f; //! un without bytes (0x30), var string (0x80), escape (0x300) and next chars 2 (0x7FF8000)

//! --- Special bits 0xB - 0xF without strings --- Bits W ---
//! 0xB = 1 bit (values 0/1, 6 per byte), 0xC = 2 bits (values 0-3, 3 per byte), 0xD = 3 bits (values 0-7, 2 per byte), 0xE = 4 bits (values 0-15, 3 per 2 bytes), 0xF = 5 bits (values 0-31, 6 per 5 bytes)
//! s must contain all bits per byte, value 0 - 63; bigger bits go first, e.g. for 0xB: 7 = 000111 => ui=2 is 0, ui=5 is 1
if(uspec<=0xF && uspec>=0xB && !(un&0x30)){ 
   if(un&0x80){ 
      if(texts==null) { if(error&64) return null; s = 0; }  //! No texts[]
      else {
         if(texts.tmp==null) texts.tmp = {}; 
         if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
         var n = texts.tmp[s]; 
         if(n==null) { 
            n = texts.length; if(n>=1<<uspec-0xa) { if(error&64) return null; s = 0; }      //! Full texts[]
            else { texts.tmp[s] = n; if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3); if(test) texts.length++; else texts[n] = s; }
            }
         s = n; if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[n] = texts.cnt[n]++||1; }
         }
      }
   var v = (s&63)<<0x10-uspec; return f(v<56 ? v+36 : v+37);
   }

if(uspec<=0x80 && (uspec>=0x40||(un&0xff)==0x80)){

   //! --- Separated strings --- SepStr W ---
   if(un&0x80&&(un&0xff)!=0x80){
      var u = un&0xdf;
      if(s==null) return "!!"+UTF8STORE.CUNSep1[u-0xc0];
      if(s==="") return u<=0xc3 ? " " : "  "+UTF8STORE.CUNSep1[u-0xc0];
      if(texts==null) return error&64 ? null : "! "+UTF8STORE.CUNSep1[u-0xc0]; //! No texts[], returns null or NaN
      if(texts.tmp==null) texts.tmp = {}; 
      if(options&64 && texts.cnt==null) texts.cnt = [];
      var c = un&0x20 ? null : un>32768 ? String.fromCharCode(un>>15) : " ", l1, l2; //! c is null for adjacent strings
      if(c==null) { l1 = un>32768 ? un>>15&255 : 4; l2 = un>0x800000 ? un>>23&255 : l1; }
      if(typeof(s)!="string") {
         if(typeof(s)=="boolean") s = s ? "1" : "0";        //! Converts Boolean => 1 / 0
         else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
         else if(!s && s!==0) return "! "+UTF8STORE.CUNSep1[u-0xc0];  //! NaN as input, returns NaN
         else s += "";
         }
      var p1 = c!=null ? s.indexOf(c) : s.length<=l1 ? -1 : l1, s1 = p1<0 ? s : s.slice(0,p1), s2, s3, p2;
      if(u<=0xc3){ //! var length
         var o = "", odd = 0, bb = u==0xc1||u==0xc3; if(bb){ var ostr = texts; if(!utexts) utexts = texts; if(utexts.tmp==null) utexts.tmp = {}; if(options&64 && texts.cnt==null) texts.cnt = []; }
         while(1){
            v = texts.tmp[s1]; 
            if(v==null) { 
               v = texts.length; texts.tmp[s1] = v; 
               if(un&0x300 && typeof(s1)=="string") s1 = UTF8STORE.EscapeUN(s1,un>>8&3);
               if(test) texts.length++; else texts[v] = s1;
               }
            if(options&64) texts.cnt[v] = ++texts.cnt[v]||1;
            o += u>=0xc2 ? UTF8STORE.WriteValue(v,0x11) : v>63400 ? "!"+UTF8STORE.WriteValue(v,0x11) : f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130);
            if(p1<0) return o+" ";
            if(c==null){ p2 = p1+(odd?l1:l2); odd = !odd; s1 = s.slice(p1,p2); p1 = p2<s.length ? p2 : -1; }
            else { p2 = s.indexOf(c,p1+1); s1 = p2<0 ? s.slice(p1+1) : s.slice(p1+1,p2); p1 = p2; }
            if(bb) texts = texts==utexts ? ostr : utexts;
            }
         }
      var t = UTF8STORE.CUNTypes[u-0xc0], emp = 0, v2 = null;
      var b1 = t&1; //! If the first part is 1 char
      if(t&64){     //! The first part is a number
         if(un<32768&&c==null){ p1 = s.search(/\D/); if(!p1){ s1 = ""; emp = 1; } else s1 = p1<0 ? s : s.slice(0,p1); } //! zero length, searches for the first character
         v = s1-0; if(!v&&v!=0||v<0||v>(b1?63400:4e9)||s1[0]=="0"&&s1.length>1||v!=Math.floor(v)||(options&2&&v+""!=s1)||!p1&&c!=null) { p1 = 0; emp = 1; c = null;  }
         }
      else {
         if(t&128){ 
            if(un<32768&&c==null){ p1 = s.search(/\d/); s1 = p1<0 ? s : s.slice(0,p1); } //! zero length, searches for the first character
            if(p1>=0){ s2 = s.slice(c==null?p1:p1+1); v2 = s2-0; if(!v2&&s2!="0"||v2<0||v2>(b1?63400:4e9)||s2[0]=="0"&&s2.length>1||v2!=Math.floor(v2)||(options&2&&v2+""!=s2)) { s1 = s; p1 = -1; } }
            }
         v = texts.tmp[s1]; 
         if(v==null) { 
            v = texts.length; if(b1&&v>63400) return error&64 ? null : "! "+UTF8STORE.CUNSep1[u-0xc0];  //! Full texts[], returns null or NaN
            texts.tmp[s1] = v; if(un&0x300 && typeof(s1)=="string") s1 = UTF8STORE.EscapeUN(s1,un>>8&3);
            if(test) texts.length++; else texts[v] = s1;
            }
         if(options&64) texts.cnt[v] = ++texts.cnt[v]||1;
         }
      s1 = emp ? (b1?"#":"!#") : b1 ? f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130) : UTF8STORE.WriteValue(v,0x11);
      if(p1<0) return s1 + UTF8STORE.CUNSep2[u-0xc0];
      var ostr = texts; 
      if(t&8&&utexts!=null){ texts = utexts; if(texts.tmp==null) texts.tmp = {}; if(texts.cnt==null) texts.cnt = []; } //! If the second part is from utexts
      p2 = u<=0xd1 ? -1 : c!=null ? s.indexOf(c,p1+1) : s.length<=p1+l2 ? -1 : p1+l2;
      var b2 = t&2; //! If the second part is 1 char
      if(v2!=null) v = v2;
      else {
         s2 = p2<0 ? s.slice(c==null?p1:p1+1) : s.slice(c==null?p1:p1+1,p2);
         v = texts.tmp[s2]; 
         if(v==null) { 
            v = texts.length; if(b2&&v>63400) return error&64 ? null : "! "+UTF8STORE.CUNSep1[u-0xc0];  //! Full texts[], returns null or NaN
            texts.tmp[s2] = v; if(un&0x300) s2 = UTF8STORE.EscapeUN(s2,un>>8&3);
            if(test) texts.length++; else texts[v] = s2;
            }
         if(options&64) texts.cnt[v] = ++texts.cnt[v]||1;
         }
      s2 = b2 ? f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130) : UTF8STORE.WriteValue(v,0x11);
      if(u<=0xd1) return s1+s2; //! Only two parts
      var b3 = t&4; //! If the third part is 1 char
      if(p2<0) return s1+s2+(b3?" ":"  ");
      if(t&16&&utexts!=null){ texts = utexts; if(texts.tmp==null) texts.tmp = {}; if(texts.cnt==null) texts.cnt = []; } //! If the third part is from utexts, but the second part is from texts
      else if(t&32) texts = ostr; //! If the third part is from texts, but the second part is from utexts
      var s3 = s.slice(c==null?p2:p2+1);
      v = texts.tmp[s3]; 
      if(v==null) { 
         v = texts.length; if(b3&&v>63400) return error&64 ? null : "! "+UTF8STORE.CUNSep1[u-0xc0];  //! Full texts[], returns null or NaN
         texts.tmp[s3] = v; if(un&0x300) s3 = UTF8STORE.EscapeUN(s3,un>>8&3);
         if(test) texts.length++; else texts[v] = s3;
         }
      if(options&64) texts.cnt[v] = ++texts.cnt[v]||1;
      s3 = b3 ? f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130) : UTF8STORE.WriteValue(v,0x11);
      return s1+s2+s3;
      }

   //! --- Special fixed length string --- FixStr W ---
   //! 0x41 (1 char) - 0x80 (64 chars)
   var l = (un&0xff)-0x40, ss; if(!l) return null;
   if(s==null) return l==1 ? "\u0381" : "\x7f!"+UTF8STORE.CUNEmptyString.slice(0,l-2);                 //! returns null
   if(typeof(s)!="string") {
      if(typeof(s)=="boolean") s = s ? "1" : "0";                                                  //! Converts Boolean => 1 / 0
      else if(!s && s!==0) return l==1 ? "\u0380" : "\x7f\x7f"+UTF8STORE.CUNEmptyString.slice(0,l-2);  //! NaN as input, returns NaN
      else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
      else s += "";
      ss = s; //! Unescaped string
      }
   else { ss = s; if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3); }
   var sl = un&0x8000 ? ss.length : s.length;
   if(sl<=l) return sl==l ? s : s + "\x7f"+UTF8STORE.CUNEmptyString.slice(0,l-sl-1);
   if(l==1) return error&4 ? (error&8 ? null : s[0]) : error&64&&~error&8 ? null : "\u0380";     //! returns truncated to 1 char / null / NaN
   if(texts==null||error&12) return error&4 ? (error&8 ? null : s.slice(0,l)) : error&64&&~error&8 ? null : "\x7f\x7f"+UTF8STORE.CUNEmptyString.slice(0,l-2); //! returns truncated / null / NaN
   s = UTF8STORE.WriteValue(ss,(l==2?0x3:l==3?0x13:0x23)|un&0x300,0,texts,null,options,test?2:0);
   return s==null ? null : l<=4 ? "\x7f"+s : "\x7f"+s+UTF8STORE.CUNEmptyString.slice(0,l-4);                  //! Stores in texts and returns index
   }

var un2 = un&0x8000 && un&0x1c00, ubytes = un&48; //! 0 = 1 char, 1 = 2 chars, 2 = 3 chars, 3 = 5 chars

if(!(un&0x1c00) && (un&0x6000||UTF8STORE.CUNUnused[un&0xFF])) return null; //! Unused codes

//! --- 1 CHAR --- Char1 W ---
if(!ubytes) {
   if(s==null) return "!";

   //! --- 1 CHAR numbers --- Num1 W ---
   //! 1,2,3. bits &0x0F      - divide by: 0 - 1000, 1 - 100, 2 - 10, 3 - 1, 4 - 0.1, 5 - 0.01, 6 - 0.001, 7 - 0.0001
   //! 5,6. bits &0x30        - bytes: 0 = 1 CHAR
   //! 7. bit &0x40           - signed: 0 (0) = positive + small negative, positive coded smaller, values 0 ... 90 are in 1 byte, values 91 ... 2010 are in 2 bytes, other values are in 3 bytes
   //!                                  1 (8) = integer number (negative and positive coded in the same size), values -45 ... 45 are in 1 byte, values -1005 - -46 ... 46 ... 1005 are in 2 bytes, other values are in 3 bytes
   //! 8. bit 0x80            - variable strings: 0 = stores strings to texts/utexts, 1 (0x80) = stores strings directly to output
   //! 9,10. bits &0x300      - escaping strings, 0 (0) - no escape, 1 (0x100) escape \, \n, \r, \t and \", 2 (0x200) - escape also 007F, 3 (0x300) - escape also 0000 - 000F
   //! 11,12. bits &0xC00     - round: the rounded numbers are coded smaller - 0 = special numbers, 1 (0x400) = no round, 2 (0x800) = round to tens, 3 (0xc00) = round to hundreds
   //! 13,14,15. bits &0x7000 - limits for positive: 0 (0)    = <-100,63000>     (300 strings),   1 (0x1000) = <-100,50000>   (13300 strings), 2 (0x2000) = <-100,40000>   (23300 strings),   
   //!                                               3 (0x3000) = <-100,20000>   (43300 strings), 4 (0x4000) = <-100,10000>   (53300 strings)
   //!                                               5 (0x5000) = <-10000,50000> (3400 strings),  6 (0x6000) = <-10000,40000> (13400 strings), 7 (0x7000) = <-10000,20000> (33400 strings)
   //!                        - limits for integers: 0 (0)      = <-31500,31500> (300 strings),   1 (0x1000) = <-25000,25000> (13300 strings), 2 (0x2000) = <-20000,20000> (23300 strings), 
   //!                                               3 (0x3000) = <-10000,10000> (43300 strings), 4 (0x4000) = <-5000,5000>   (53300 strings)
   var max = 0, urnd = un&0xc00, mmax = 63400;
   if(urnd){
      if(s==="") return un&0x80&&un2 ? "#!" : "#";                            //! Returns ""
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      var a; //if(v===0) return "$"; //! Returns 0
      var uneg = un&0x40, ulim = un>>12&7, min = uneg||un2&&ulim<=4 ? 0 : ulim<=4 ? -100 : -10000;
      max = ulim==0 ? 63000 : ulim==1||ulim==5 ? 50000 : ulim==2||ulim==6 ? 40000 : ulim==3||ulim==7 ? 20000 : 10000;
      if(v||v===0){ //! Number
         var udiv = un&15;
         var b = un>=0&&un<=65535||un2 ? 0 : un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16; //! base
         if(udiv) { v = udiv<=4||udiv>=13 ? v*UTF8STORE.CUNDiv1M[udiv] : v/UTF8STORE.CUNDiv1[udiv]; if(b) v -= udiv<=4 ? b*UTF8STORE.CUNDiv1M[udiv] : b; a = Math.floor(v-0+0.5); }   //! divide
         else { if(b) v -= b; a = Math.floor(v); if(a!=v) a = Math.floor(v-0+0.5); }
         var o = a; if(uneg) { var m = 0; max >>= 1; if(a<0){ m = 1; a = -a; } }
         if(a<min||a>max) { if(error&8) return error&4 ? null : un&0x80 ? "  " : " "; a = ~error&4 ? null : a<min ? min : max; }       //! Too big or too small number, returns null/NaN or continues with limit or continues as string
         else if(o!=v&&((error&3)!=1/*||UTF8STORE.CUNDiv1[udiv]>1*/)&&((o>v?o-v:v-o)>0.0000001/*||o==0&&v<0.00001&&v>-0.00001*/)){ 
            var d = v<0 ? -v : v; 
            if(d<1e7 || d<1e14 && (a>v?a-v:v-a) > (d<1e8?1e-6:d<1e9?1e-5:d<1e10?1e-4:d<1e11?1e-3:d<1e12?1e-2:0.1)){
               if(error&2) return error&1 ? null : un&0x80 ? "  " : " "; a = null; //! Floating point number no round, returns null/NaN or continues as string
               }
            }
         if(a!=null) { //! Number is in range and rounded
            if(a<0) { if(ulim) a = max-a; else return f(65121-a); }
            else {
               if(urnd==0x800){ v = a/10; a = v==Math.floor(v) ?  v : a*0.9+max/10+1; }
               else if(urnd==0xc00){ v = a/100; a = v==Math.floor(v) ? v : a*0.99+max/100+1; }
               if(uneg){ a <<= 1; if(m) a--; }
               }
            if(un2) return f(a<56 ? a+36 : a<73 ? a+37 : a<8093 ? a+139 : a<55155 ? a+141 : a<62787 ? a+2189 : a+2221);
            return f(a<56 ? a+36 : a<96 ? a+37 : a<122 ? a+38 : a<8193 ? a+39 : a<55255 ? a+41 : a<62887 ? a+2089 : a<63399 ? a+2121 : a+2130);
            }
         if(uneg) max <<= 1;
         }
      else if(typeof(s)=="number") return un&0x80 ? "  " : " ";
      else if(error&32) return error&16 ? null : un&0x80 ? "  " : " "; else if(error&16) return "#"; //! string = returns null/NaN/"" or continues for error = 0
      max += 1-min; //! For negative integer numbers there is reserved 100 or 10000 characters
      }

   //! --- Variable length string 0x81, 0x82 or with escape --- Var1 W ---
   else if(uspec<=0x2||uspec==0x8||uspec==0x9){
      if(s==="") return un2 ? "#!" : "#";                                 //! returns ""
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      if(v===0) return "$";       //! returns 0
      if(!v) return error&32 ? (error&16 ? null : un&0x80 ? "  " : " ") : error&16 ? "#!" : typeof(s)=="number" ? (un&0x80 ? "  " : " ") : un&0x80 ? UTF8STORE.ToVarStringUN(s,un,error) : error&64 ? null : " "; //! string = returns var string or null/NaN/""
      if(uspec==0x2||uspec==0x9) v = v<-31700 ? 63401 : v<=-1 ? (-v<<1)-1 : v<0 ? 0 : v<=31700 ? v<<1 : 63402;
      else if(v<0){ if(v<=-1) return error&4 ? (error&8 ? null : "$") : error&64&&~error&8 ? null : " "; v = 0; }  //! Negative number for 0x1, returns 0 / NaN / null
      if(v>=0 && v<=63400) return f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130);      //! returns integer
      return error&8 ? (error&4 ? null : "  ") : error&4 ? f(uspec==0x2&&v&1 ? 0xfffc : 0xfffd) : un&0x80 ? UTF8STORE.ToVarStringUN(s,un,error) : error&64 ? null : " "; //! big number / float, returns var string or null/NaN/""
      }

   //! --- Date 1 char --- Date1 W ---
   else if(uspec>=0x4&&uspec<=0x7){
      if(s==null) return "!";
      if(s==="") return un&0x80 ? "#!" : "#";                                 //! returns ""
      max = UTF8STORE.CUNDate1[uspec-4];
      if(typeof(s)!="object" && options&1) s = UTF8STORE.ToUTF8Date(s,options);
      if(typeof(s)!="object"){ max = 63400+max >> 1; if(!s&&s!==0) return un&0x80 ? "  " : " "; } //! NaN
      else {
         if(uspec==0x4){      //! yyyy-MM-dd
            v = (options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+s.getUTCFullYear()*384 : s.getDate()-1+(s.getMonth()<<5)+s.getFullYear()*384) - (un>0x8000||un<0 ? (un>>>15)+1900*384 : 2025*384); 
            v = v<=-1 ? (-v<<1)-1 : v<<1; //! Saves difference = Integer, including negative
            if(v>=max&&(error&12)==4) v = v&1?max-1:max-2;                                      //! Cuts too big
            else if((error&3)!=1 && ((options&4?s.getUTCHours()||s.getUTCMinutes():s.getHours()||s.getMinutes())||s%60000) && (v<max||~error&8)) v = -1;     //! It has set time, does not round
            }
         else if(uspec==0x5){ //! MM-dd HH:mx
            v = options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+s.getUTCHours()*384 : s.getDate()-1+(s.getMonth()<<5)+s.getHours()*384; 
            var m = options&4 ? s.getUTCMinutes() : s.getMinutes(); if(m) v += Math.floor(m/15)*9216;
            if((error&12)!=4 && (options&4?s.getUTCFullYear():s.getFullYear())!=(un>0x8000?un>>>15:1970)) v = max;              //! Another year, errors
            else if((error&3)!=1 && (m%15||s%60000)) v = -1;                                           //! It has set minutes, does not round
            }
         else if(uspec==0x6){ //! hh:mm:ss (max 12 hours)
            v = s.getSeconds() + (options&4 ? (s.getUTCMinutes()<<6)+(s.getUTCHours()%12<<12) : (s.getMinutes()<<6)+(s.getHours()%12<<12));
            if((error&12)!=4 && ((un>0x8000||un<0) 
               ? (options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+(s.getUTCFullYear()-1950)*384 : s.getDate()-1+(s.getMonth()<<5)+(s.getFullYear()-1950)*384)
               + ((options&4 ? s.getUTCHours() : s.getHours())>=12?0x10000:0)!=((un>>>15)&0x1FFFF) 
               : options&4 ? s.getUTCDate()!=1||s.getUTCMonth()!=0||s.getUTCFullYear()!=1970||s.getUTCHours()>=12
               : s.getDate()!=1||s.getMonth()!=0||s.getFullYear()!=1970||s.getHours()>=12)) v = max; //! Another day, errors
            else if((error&3)!=1 && s%1000) v = -1; //! It has set milliseconds, does not round
            }
         else if(uspec==0x7){ //! HH:mm:sx
            v = options&4 ? s.getUTCHours()+s.getUTCMinutes()*24 : s.getHours()+s.getMinutes()*24; 
            var m = s.getSeconds(); if(m) v += (m&1&&!(m%5) ? (m-5)/10+30 : m>>1) * 1440;            //! 2 seconds or 5 seconds
            if((error&12)!=4 && ((un>0x8000||un<0) 
               ? (options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+(s.getFullUTCYear()-1900)*384 : s.getDate()-1+(s.getMonth()<<5)+(s.getFullYear()-1900)*384)!=(un>>>15) 
               : options&4 ? s.getUTCDate()!=1||s.getUTCMonth()!=0||s.getUTCFullYear()!=1970 : s.getDate()!=1||s.getMonth()!=0||s.getFullYear()!=1970)) v = max; //! Another date, errors
            else if((error&3)!=1 && s%2000 && s%5000) v = -1; //! It has set seconds, does not round
            }
         if(v<0){ //! It has set time, errors or stores in texts 
            if(error&2) return error&1 ? null : un&0x80 ? "  " : " "; 
            if(uspec>=0x6&&(error&12)==4){ //! Sets base date to the date to ignore the date and save only time by 0x24
               s = new Date(s); 
               if(un>0x8000||un<0){ var y = Math.floor((un>>>15)/384)+1900, b = (un>>>15)%384; if(options&4) s.setUTCFullYear(y,b>>5,(b&31)+1); else s.setFullYear(y,b>>5,(b&31)+1); }
               else if(options&4) s.setUTCFullYear(1970,0,1); else s.setFullYear(1970,0,1);
               } 
            }                   
         else if(v<max) return f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130); //! Returns correct number
         else if(error&8) return error&4 ? null : un&0x80 ? "  " : " ";                         //! Outside range, errors or stores in texts
         s = UTF8STORE.WriteValue(s,0x24|un&0xFFFF8080,error,texts,null,options);               //! ucode2
         if(un&0x80) return UTF8STORE.ToVarStringUN(s,un,error,-1);                             //! returns var string
         if(utexts){ un &= ~0x300; texts = utexts; } if(!texts||texts.length>=63400-max) return error&64 ? null : " ";
         mmax = 63400+max-1 >> 1;
         }
      }

   //! --- string 0x3 / 0x83 ---
   else if(s==="") return un&0x80&&un2 ? "#!" : "#";                    //! returns ""
   else if(typeof(s)=="boolean") s = s ? "1" : "0";                     //! Converts Boolean => 1 / 0
   else if(typeof(s)=="number"){ if(!isFinite(s)) return un&0x80 ? "  " : " "; } //! NaN as input, returns NaN
   else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);

   //! --- variable length string ---
   if(un&0x80) return UTF8STORE.ToVarStringUN(s,un,error);                          //! returns var string

   //! --- 1 CHAR strings --- Str1 W ---
   //! Maximum is 63401 strings for un = 0x3
   if(texts==null&&(utexts==null||!un2)) return error&64 ? null : " ";  //! No texts[], returns null or NaN
   if(un2 && un>65536) { s = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,error,texts,null,options,test?2:0); if(s=="! ") return " "; if(utexts){ un &= ~0x300; texts = utexts; } } //! 2 CHARS number as string
   if(texts.tmp==null) texts.tmp = {}; 
   v = texts.tmp[s]; 
   if(v==null) { 
      v = texts.length; if(v+max>mmax) return error&64 ? null : " ";      //! Full texts[], returns null or NaN
      texts.tmp[s] = v; if(un&0x300&&!un2&&typeof(s)!="number") s = UTF8STORE.EscapeUN(s,un>>8&3);
      if(test) texts.length++; else texts[v] = s;
      }
   if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[v] = ++texts.cnt[v]||1; }
   v += un2 && uspec!=0x3 && v<100 ? 73 : max; 
   return f(v<56 ? v+36 : v<96 ? v+37 : v<122 ? v+38 : v<8193 ? v+39 : v<55255 ? v+41 : v<62887 ? v+2089 : v<63399 ? v+2121 : v+2130);  //! Returns index to texts
   }

//! --- 2 CHARS --- Char2 W ---
if(ubytes==0x10){
   var v2; 
   if(s==null) return "!!";
   if(s==="") return "!#";
   var spc = 0; //! Date as string or ucode2

   //! ---- Basic2 W ---
   //! -1e7 ... 4e9 or string, values <-183; 7,359> in 2 bytes, <-18,743; -184> and <7,360; 302,271> in 3 bytes, <-448,749; -18,744> and <302,272; 13,816,111> in 4 bytes, 
   //!                                <-1,000,000; -448,750> and <13,816,112; 131,814,697> in 5 bytes, <131,814,698; 4,000,000,000> in 6 bytes
   //!                        strings <0; 735> in 2 bytes, <736; 30,815> in 3 bytes, <30,816; 829,239> in 4 bytes, <829,240; 10,653,719> in 5 bytes
   //! -2e9 ... 2e9 or string, values <-3,679; 3,679> in 2 bytes, <-151,135; -3,680> and <3,680; 151,135> in 3 bytes, <-6,908,055; -151,136> and <151,136; 6,908,055>  in 4 bytes, 
   //!                                <-65,907,348; -6,908,056> and <6,908,056; 65,907,348> in 5 bytes, <-2,000,000,000; -65,907,349> and <65,907,349; 2,000,000,000> in 6 bytes
   //!                        strings <0; 735> in 2 bytes, <736; 30,815> in 3 bytes, <30,816; 829,239> in 4 bytes, <829,240; 20,926,949> in 5 bytes
   if(uspec<=0x2) { 
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      if(v===0) return "$#"; 
      if(uspec==0x2) { if(v) v = v<-2e9 ? 4e9+1 : v<=-1 ? (-v<<1)-1 : v<0 ? 0 : v<=2e9 ? v<<1 : 4e9+2; if(v<0) v += 0x100000000; if(v>4e9) { if(error&8) return error&4 ? null : "! "; v = error&4 ? 4e9-(v&1) : null; } }
      else if(v<-1e7||v>4e9) { if(error&8) return error&4 ? null : "! "; v = ~error&4 ? null : v<0 ? -1e7 : 4e9; }
      }

   //! Simple string, <0; 7,359> in 2 bytes, <7,360; 302,271> in 3 bytes, <302,272; 13,816,111> in 4 bytes, <13,816,112; 131,814,697> in 5 bytes, <131,814,698; 4,000,000,000> in 6 bytes
   else if(uspec==0x3){
      if(un&0x80) return typeof(s)=="number"&&!s&&s!==0 ? "! " : UTF8STORE.ToVarStringUN(s,un,error);
      if(un2 && un>65536) { s = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,error,texts,null,options,test?2:0); if(s[0]=="!"&&s[1]==" ") return "! ";  if(utexts){ un &= ~0x300; texts = utexts; } } //! 5 CHARS number as string
      else if(typeof(s)=="boolean") return s ? " 1" : " 0";    //! Returns Boolean as 1 / 0
      else if(typeof(s)=="number"){ if(s>=0 && s<=9 && s==Math.floor(s)) return f(32,s+48); if(!s) return "! "; un &= ~0x300; } //! 1 digit or NaN as input, returns NaN
      else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
      else if(s.length==1){ var v = s.charCodeAt(0); if(!UTF8Store.CUNEscape[v]) return f(32,v); }  //! 1 char
      if(texts==null) return error&64 ? null : "! ";
      if(texts.tmp==null) texts.tmp = {}; v = texts.tmp[s]; 
      if(v==null) { v = texts.length; texts.tmp[s] = v; if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3); if(test) texts.length++; else texts[v] = s; }
      if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[v] = ++texts.cnt[v]||1; }
      }

   //! --- Date 2 chars --- Date2 W ---
   else if(uspec<=0x7){
      if(typeof(s)!="object" && options&1) s = UTF8STORE.ToUTF8Date(s,options);
      if(typeof(s)!="object"){ spc = 1; if(!s&&s!==0) return "! "; } //! NaN
      else {
         if(uspec==0x7){ //! Time HH:mm:ss:ffff
            v = (options&4 ? s.getUTCHours() + s.getUTCMinutes()*24 : s.getHours() + s.getMinutes()*24) + s.getSeconds()*1440 + s.getMilliseconds()*86400;
            if((error&12)!=4 && ((un>0x8000||un<0) //! Another date, errors
               ? (options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+(s.getUTCFullYear()-1900)*384 : s.getDate()-1+(s.getMonth()<<5)+(s.getFullYear()-1900)*384)!=(un>>>15) 
               : options&4 ? s.getUTCDate()!=1||s.getUTCMonth()!=0||s.getUTCFullYear()!=1970 : s.getDate()!=1||s.getMonth()!=0||s.getFullYear()!=1970)) v = -2; 
            }
         else {
            v = options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+s.getUTCFullYear()*384 : s.getDate()-1+(s.getMonth()<<5)+s.getFullYear()*384;
            v -= (un>0x8000||un<0 ? (un>>>15)+1900*384 : 2025*384);
            v = v<=-1 ? (-v<<1)-1 : v<<1;                                                       //! Saves difference = Integer, including negative
            if(uspec==0x5){   //! yyyy-MM-dd HH:mm
               if(v>=2775800) v = (error&12)==4 ? 2775798|v&1 : -2; 
               else if((error&3)!=1 && s%60000) v = -1;
               if(v>=0) v += (options&4 ? s.getUTCHours() + s.getUTCMinutes()*24 : s.getHours() + s.getMinutes()*24) * 2775800;        
               }
            else { //! 0x4 / 0x6 yyyy-MM-dd HH:mm:ss
               if(v>=46296) v = (error&12)==4 ? 46294|v&1 : -2; 
               else if((error&3)!=1 && s%1000) v = -1;
               if(v>=0){ 
                  var t = (options&4 ? s.getUTCHours() + s.getUTCMinutes()*24 : s.getHours() + s.getMinutes()*24) + s.getSeconds()*1440;
                  if(uspec==0x4) v += t * 46296;    //! Date smaller 
                  else v = v*86400 + t;             //! Time smaller
                  }
               }
            }
         if(v<0){ 
            if(error&8&&v==-2) return error&4 ? null : "! ";                                               //! Outside
            if(error&2&&v==-1) return error&1 ? null : un&0x80 ? "  " : " ";                               //! It has set time, errors or stores in texts 
            v = null; spc = -1; s = UTF8STORE.WriteValue(s,(uspec==0x5?0x25:0x24)|un&0xFFFF8080,error,texts,null,options); if(utexts){ un &= ~0x300; texts = utexts; }  //! ucode2
            }
         }
      }

   //! --- Float2 W --- 
   //! Single float, numbers with 7 digits precision -1e38 ... 1e38, minimal not zero number is 1e-33. The number differs from IEEE 754 Single float in maximal negative exponent, it is reduced from 38 to 33.
   //! Integer values <-92; 91> in 2 bytes, <-9,372; 9,371> in 3 bytes, <-224,375; 224,375> in 4 bytes, <-500,000; 500,000> in 5 bytes, all the rest in 6 bytes
   else if(uspec==0xF){
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      if(v===0) return "$#";
      if(v){
         var sg = 0; if(v<0) { sg = 0x800000; v = -v; }
         if(v<5e6 && v==Math.floor(v)) v = -(v<<1)-(sg?1:0);
         else {
            var n = v<1, a = n ? 1/v : v;
            for(var i=0,e=0;i<10;i++){ e <<= 1; if(a>=UTF8STORE.CUNPow2[9-i]) { a /= UTF8STORE.CUNPow2[9-i]; e |= 1; } }
            if(n) e = -1-e;
            if(e>=127) { if(error&8) return error&4 ? null : "! "; else if(error&4){ e = 126; v = 1.701411834604692e+38; } else v = null; }
            if(e<=-111) { if(error&8) return error&4 ? null : "! "; else if(error&4) return "$#"; else v = null; }
            if(v) {
               e -= 23;
               v = e>=128 ? v/(1<<(e&31))/0x100000000000000000000000000000000 : e>=96 ? v/(1<<(e&31))/0x1000000000000000000000000 : e>=64 ? v/(1<<(e&31))/0x10000000000000000 
                 : e>=32 ? v/(1<<(e&31))/0x100000000 : e>=0 ? v/(1<<e) : e>-32 ? v*(1<<-e) : e>-64 ? v*(1<<(-e&31))*0x100000000 
                 : e>-96 ? v*(1<<(-e&31))*0x10000000000000000 : e>-128 ? v*(1<<(-e&31))*0x1000000000000000000000000 : v*(1<<(-e&31))*0x100000000000000000000000000000000;
               v = (e+134)*0x1000000 + sg + ((v<0?-v:v)&0x7FFFFF);
               }
            }
         }
      }

   //! --- 2 CHARS numbers --- Num2 W ---
   //! 1,2,3,4. bits &0x0F    - divide by: 0 - 1, 1 - 0.1, 2 - 0.01, 3 - 0.001, 4 - 0.0001, 5 - 0.00001, 6 - 0.000001, 7 - 0.0000001
   //! 5,6. bits &0x30        - bytes: 1 (0x10) = 2 CHARS
   //! 7. bit &0x40           - signed: 0 (0)    = positive + small negative, positive coded smaller, number of bytes like in 0x11
   //!                                  1 (0x40) = integer number (negative and positive coded in the same size), number of bytes like in 0x12
   //! 8. bit &0x80           - var string: 0 = strings to texts, 1 (0x80) = strings to output, the output size varies
   //! 9,10. bits &0x300      - escaping strings, 0 (0) - no escape, 1 (0x100) escape \, \n, \r, \t and \", 2 (0x200) - escape also 007F, 3 (0x300) - escape also 0000 - 000F
   //! 11,12,13. bits &0x1C00 - round: the rounded numbers are coded smaller - 0 = special numbers,   1 (0x400) = no round,   2 (0x800) = to 10,       3 (0xc00) = to 100, 
   //!                                                                         4 (0x1000) = to 1,000, 5 (0x1400) = to 10,000, 6 (0x1800) = to 100,000, 7 (0x1c00) = N/A
   //! 14,15. bits &0x6000    - number of significant digits, 0 (0) = 10 digits (limits <0,4e9> / <-2e9,2e9>),        1 (0x2000) = 9 digits (limits <0,1e13> / <-1e10,1e10>), 
   //!                                                        2 (0x4000) = 8 digits (limits <0,1e47> / <-1e27,1e27>), 3 (0x6000) = 7 digits (limits <0,2e100> (1e-100) / <-1e100,1e100> (+/-1e-100))
   else {
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      if(v===0) return "$#";
      if(v){
         var uneg = un&0x40, udig = un&0x6000, a; 
         if(udig==0x6000) { if(v>=-1e200&&v<=1e200) a = v*1e105; else if(error&8) return error&4 ? null : "!  "; else a = ~error&4 ? null : v < 0 ? -1e305 : 1e305; }  //! digits 384 (3), exponent +/- 100
         else {
            var udiv = un&15, d = null;
            var b = un>=0&&un<=65535||un2 ? 0 : un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16; //! base
            if(udiv) { v = udiv<=8||udiv>=13 ? v*UTF8STORE.CUNDiv2M[udiv] : v/UTF8STORE.CUNDiv2[udiv]; if(b){ d = v<0 ? -v : v; v -= udiv<=8 ? b*UTF8STORE.CUNDiv2M[udiv] : b; } a = Math.floor(v-0+0.5); }   //! divide
            else { if(b) v -= b; a = Math.floor(v); if(a!=v) a = Math.floor(v-0+0.5); }
            if(a!=v&&((error&3)!=1/*||UTF8STORE.CUNDiv2[udiv]>1*/)&&((a>v?a-v:v-a)>0.0000001/*||a==0&&v<0.0000001&&v>-0.0000001*/)){ 
               if(d==null) d = v<0 ? -v : v; 
               if(d<1e7 || d<1e14 && (a>v?a-v:v-a) > (d<1e8?1e-6:d<1e9?1e-5:d<1e10?1e-4:d<1e11?1e-3:d<1e12?1e-2:0.1)){
                  if(error&2) return error&1 ? null : "! "; a = null; //! Floating point number no round, returns null/NaN or continues as string
                  }
               }
            }
         if(a!=null) { //! Number is in range and rounded
            if(uneg) { var m = 0; if(a<0){ m = 1; a = -a; } }
            if(udig){ //! digits
               if(udig==0x4000) { //! 8 digits
                  if(a>1e8) {
                     var n = 19, l = uneg?38:58; 
                     if(a<=UTF8STORE.CUNPow10[l]){
                        while(n<l-1){ var mm = n+l>>1; if(a<=UTF8STORE.CUNPow10[mm]) l = mm; else n = mm; }
                        if(a<=UTF8STORE.CUNPow10[n]) l = n; a = Math.floor(a/UTF8STORE.CUNPow10[l-8]+1e8*(l-18)+0.5);
                        }
                     }
                  } 
               else if(udig==0x6000) { //! 7 digits
                  if(a>=1e5) { 
                     for(var i=0,e=0;i<8;i++){ e <<= 1; if(a>=UTF8STORE.CUNPow210L[7-i]) { a /= UTF8STORE.CUNPow210[7-i]; e |= 1; } }
                     a = e==205&&a<1 ? 2e9 : Math.floor(a*1e6+1e7*(e-5)); 
                     } 
                  else { if(error&3) return ~error&1 ? "! " : error&2 ? null : "$#"; a = null; } //! Returns 0 / NaN / null or continues as string
                  }       
               else if(a>1e9){ if(a<=1e10) a = Math.floor(a/10+1e9); else if(!uneg){ if(a<=1e11) a = Math.floor(a/100+2e9); else if(a<=1e12) a = Math.floor(a/1000+3e9); } } //! 0x2000 - 9 digits
               }
            if(a<-1e7 || a>(uneg?2e9:4e9)) { if(error&8) return error&4 ? null : "! "; a = ~error&4 ? null : a<0 ? -1e7 : uneg ? 2e9 : 4e9; }
            var urnd = un&0x1c00;
            if(urnd>0x400 && a){  //! Round 1 - 1e5
               if(urnd==0x800)       { v = a/10; a = v==Math.floor(v) ?  v : a<0 ? a-v-1000001 : uneg ? a-v+200000001 : a-v+400000001; }
               else if(urnd==0xc00)  { v = a/100; a = v==Math.floor(v) ?  v : a<0 ? a-v-100001 : uneg ? a-v+20000001 : a-v+40000001; }
               else if(urnd==0x1000) { v = a/1000; a = v==Math.floor(v) ?  v : a<0 ? a-v-10001 : uneg ? a-v+2000001 : a-v+4000001; }
               else if(urnd==0x1400) { v = a/10000; a = v==Math.floor(v) ?  v : a<0 ? a-v-1001 : uneg ? a-v+200001 : a-v+400001; }
               else if(urnd==0x1800) { v = a/100000; a = v==Math.floor(v) ?  v : a<0 ? a-v-101 : uneg ? a-v+20001 : a-v+40001; }
               } 
            if(uneg && a){ a <<= 1; if(a<0) a = a+0x100000000; if(m) a--; }  //! integer
            v = a;
            }
         else v = null;
         }
      }
   
   //! --- Converts number to UTF8 --- Data2 W ---
   if(!v&&uspec!=0x3){
      if(v===0) return "$#";
      else if(typeof(s)=="number"&&v!=null) return "! "; //! NaN
      }
   else if(v>=-1e7 && v<=4e9){
      if(v<0) {
         v = -v;
         if(v<478180){
            if(v<17806){
               if(v<184){ v2 = v>>1; v = (v&1)+89; }                                    //!                                                             184 =>   v =        89 -     90          [2]; v2 =       0 -       91 [2 chars]
               else if(v<2194){ v -= 184; v2 = v; v = 91; }                             //!              2194 -              184 =            2010 =>   v =        91 -     91          [1]; v2 =       0 -   2009 [2-3 chars]
               else if(v<6030){ v -= 2194; v2 = (v>>1)+92; v = (v&1)+89; }              //!              6030 -            2194 =            3836 =>   v =        89 -     90          [2]; v2 =     92 -   2009 [3 chars]
               else { v -= 6030; v2 = v>>7; v = (v&127)+92; }                           //!            17806 -            6030 =          11776 =>   v =        92 -   219      [128]; v2 =       0 -       91 [3 chars]
               }
            //else if(v<000000){ v -= 000000; v2 = v>>4; v = (v&15)+220; }             //!    000000 -              000000 =            1472 =>   v =      220 -   235        [16]; v2 =       0 -       91 [3 chars]
            //else if(v<000000){ v -= 000000; v2 = v>>3; v = (v&7)+236; }              //!    000000 -              000000 =              736 =>   v =      236 -   243          [8]; v2 =       0 -       91 [3 chars]
            //else if(v<000000){ v -= 000000; v2 = v>>1; v = (v&1)+244; }              //!    000000 -              000000 =            6030 =>   v =      244 -   246  xxx   [3]; v2 =       0 -   2009 [3 -4 chars]
            else if(v<263310){ v -= 17806; v2 = (v>>7)+92; v = (v&127)+92; }            //!          263310 -          17806 =        245504 =>   v =        92 -   219      [128]; v2 =     92 -   2009 [4 chars]
            else if(v<293998){ v -= 263310; v2 = (v>>4)+92; v = (v&15)+220; }           //!          293998 -        263310 =          30688 =>   v =      220 -   235        [16]; v2 =     92 -   2009 [4 chars]
            else if(v<416786){ v -= 293998; v2 = (v>>1)+2010; v = (v&1)+89; }           //!          416786 -        293998 =        122788 =>   v =        89 -     90          [2]; v2 = 2010 - 63403 [4 chars]
            else { v -= 416786; v2 = v+2010; v = 91; }                                  //!          478180 -        416786 =          61394 =>   v =        91 -     91          [1]; v2 = 2010 - 63403 [4 chars]
            }
         else if(v<984676){ v -= 478180; v2 = (v>>3)+92; v = (v&7)+236; }               //!          984676 -        478180 =        506496 =>   v =      236 -   243          [8]; v2 =     92 - 63403 [4 -5 chars]
         else if(v<8843108){ v -= 984676; v2 = (v>>7)+2010; v = (v&127)+92; }           //!        8843108 -        984676 =      7858432 =>   v =        92 -   219      [128]; v2 = 2010 - 63403 [5 chars]
         else if(v<9825412){ v -= 8843108; v2 = (v>>4)+2010; v = (v&15)+220; }          //!        9825412 -      8843108 =        982304 =>   v =      220 -   235        [16]; v2 = 2010 - 63403 [5 chars]
         else if(v<9948200){ v -= 9825412; v2 = (v>>1)+2010; v = (v&1)+244; }           //!        9948200 -      9825412 =        122788 =>   v =      244 -   245          [2]; v2 = 2010 - 63403 [5 chars]
         else { v -= 9948200; v2 = v+2010; v = 246; }                                   //!      10009594 -      9948200 =          61394 =>   v =      246 -   246          [1]; v2 = 2010 - 63403 [5 chars]
         }
      else if(v<366432){
         if(v<160800){
            if(v<5888){ v2 = v>>6; v = (v&63)+1; }                                      //!                                                           5888 =>   v =          1 -     64        [64];  v2 =       0 -     91 [2 chars]
            else if(v<38048){ v -= 5888; v2 = v>>4; v = (v&15)+65; }                    //!           38048 -             5888 =          32160 =>   v =        65 -     80        [16];  v2 =       0 - 2009 [2 - 3 chars]
            else { v -= 38048; v2 = (v>>6)+92; v = (v&63)+1; }                          //!         160800 -           38048 =        122752 =>   v =          1 -     64        [64];  v2 =     92 - 2009 [3 chars]
            }
         else if(v<255008){ v -= 160800; v2 = v>>10; v = (v&1023)+397; }                //!         255008 -         160800 =          94208 =>  v =      397 -   1420   [1024]; v2 =       0 -       91 [3 chars]
         else if(v<302112){ v -= 255008; v2 = v>>9; v = (v&511)+1421; }                 //!         302112 -         255008 =          47104 =>  v =    1421 -   1932     [512]; v2 =       0 -       91 [3 chars]
         else { v -= 302112; v2 = v>>5; v = (v&31)+1933; }                              //!         366432 -         302112 =          64320 =>  v =    1933 -   1964       [32]; v2 =       0 -   2009 [3 - 4 chars]
         }
      else if(v<12894464){
         if(v<10256640){
            if(v<2330464){ v -= 366432; v2 = (v>>10)+92; v = (v&1023)+397; }            //!       2330464 -         366432 =       1964032 =>  v =      397 -   1420   [1024]; v2 =     92 -   2009 [4 chars]
            else if(v<6259680){ v -= 2330464; v2 = (v>>6)+2010; v = (v&63)+1; }         //!       6259680 -       2330464 =       3929216 =>  v =          1 -       64       [64]; v2 = 2010 - 63403 [4 chars]
            else if(v<7241984){ v -= 6259680; v2 = (v>>4)+2010; v = (v&15)+65; }        //!       7241984 -       6259680 =         982304 =>  v =        65 -       80       [16]  v2 = 2010 - 63403 [4 chars]
            else { v -= 7241984; v2 = v>>15; v = (v&32767)+1965; }                      //!     10256640 -       7241984 =       3014656 =>  v =    1965 - 34732 [32768]; v2 =       0 -       91 [4 chars]
            }
         else if(v<11763968){ v -= 10256640; v2 = v>>14; v = (v&16383)+34733; }         //!     11763968 -     10256640 =       1507328 =>  v =  34733 - 51116 [16384]; v2 =       0 -       91 [4 chars]
         else if(v<12517632){ v -= 11763968; v2 = v>>13; v = (v&8191)+51117; }          //!     12517632 -     11763968 =         753664 =>  v =  51117 - 59308   [8192]; v2 =       0 -       91 [4 chars]
         else { v -= 12517632; v2 = v>>12; v = (v&4095)+59309; }                        //!     12894464 -     12517632 =         376832 =>  v =  59309 - 63404   [4096]; v2 =       0 -       91 [4 chars]
         }
      else if(v<220128064){
         if(v<45310208){ v -= 12894464; v2 = (v>>9)+92; v = (v&511)+1421; }             //!     45310208 -     12894464 =     32415744 =>  v =    1421 -  1932      [512]; v2 =     92 - 63403 [4 - 5 chars]
         else if(v<108177664){ v -= 45310208; v2 = (v>>10)+2010; v = (v&1023)+397; }    //!   108177664 -     45310208 =     62867456 =>  v =      397 -  1420    [1024]; v2 = 2010 - 63403 [5 chars]
         else if(v<110142272){ v -= 108177664; v2 = (v>>5)+2010; v = (v&31)+1933; }     //!   110142272 -   108177664 =       1964608 =>  v =    1933 -  1964        [32]; v2 = 2010 - 63403 [5 chars]
         else if(v<172991296){ v -= 110142272; v2 = (v>>15)+92; v = (v&32767)+1965; }   //!   172991296 -   110142272 =     62849024 =>  v =    1965 - 34732 [32768]; v2 =     92 -   2009 [5 chars]
         else if(v<204415808){ v -= 172991296; v2 = (v>>14)+92; v = (v&16383)+34733; }  //!   204415808 -   172991296 =     31424512 =>  v =  34733 - 51116 [16384]; v2 =     92 -   2009 [5 chars]
         else { v -= 204415808; v2 = (v>>13)+92; v = (v&8191)+51117; }                  //!   220128064 -   204415808 =     15712256 =>  v =  51117 - 59308   [8192]; v2 =     92 -   2009 [5 chars]
         }
      else if(v<479454016){ v -= 220128064; v2 = (v>>12)+92; v = (v&4095)+59309; }      //!   479454016 -   220128064 =   259325952 =>  v =  59309 - 63404   [4096]; v2 =     92 - 63403 [5 - 6 chars]
      else if(v<2491212608){ v -= 479454016; v2 = (v>>15)+2010; v = (v&32767)+1965; }   //! 2491212608 -   479454016 = 2011758592 =>  v =    1965 - 34732 [32768]; v2 = 2010 - 63403 [6 chars]
      else if(v<3497091904){ v -= 2491212608; v2 = (v>>14)+2010; v = (v&16383)+34733; } //! 3497091904 - 2491212608 = 1005879296 =>  v =  34733 - 51116 [16384]; v2 = 2010 - 63403 [6 chars]
      else { v -= 3497091904; v2 = (v>>13)+2010; v = (v&8191)+51117; }                  //! 4000031552 - 3497091904 =   502939648 =>  v =  51117 - 59308   [8192]; v2 = 2010 - 63403 [6 chars]
      return f(v<57 ? v+35 : v<97 ? v+36 : v<123 ? v+37 : v<8194 ? v+38 : v<55256 ? v+40 : v<62888 ? v+2088 : v<63400 ? v+2120 : v+2129, v2<57 ? v2+35 : v2<97 ? v2+36 : v2<123 ? v2+37 : v2<8194 ? v2+38 : v2<55256 ? v2+40 : v2<62888 ? v2+2088 : v2<63400 ? v2+2120 : v2+2129);
      }

   //! --- variable length string ---
   if(un&0x80) return v==null||!(error&48) ? UTF8STORE.ToVarStringUN(s,un,error,spc) : ~error&16 ? "! " : error&32 ? null : "!#";  //! returns var string

   //! --- 2 CHARS strings --- Str2 W ---
   if(typeof(s)=="boolean") return s ? " 1" : " 0";                                          //! Converts true / false => 1 / 0
   if(typeof(s)=="number"){ if(s>=0 && s<=9 && s==Math.floor(s)) return f(32,s+48); un &= ~0x300; }       //! 1 digit
   else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
   else if(s.length==1){ var v = s.charCodeAt(0); if(!UTF8Store.CUNEscape[v]) return f(32,v); } //! char
   if(error&48&&v!=null) return ~error&16 ? "! " : error&32 ? null : "!#";                        //! No strings
   if(texts==null&&(utexts==null||!un2)) return error&64 ? null : "! ";                     //! No texts[], returns null or NaN
   if(un2 && un>65536) { s = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,error,texts,null,options,test?2:0); if(s=="!    ") return "! "; if(utexts){ un &= ~0x300; texts = utexts; } } //! 5 CHARS number as string
   if(texts.tmp==null) texts.tmp = {}; 
   v = texts.tmp[s]; 
   if(v==null) { 
      v = texts.length; if(v>=(spc?5e6:1e7)&&(~un&0x40||v>=2e7)) return error&64 ? null : "! ";
      texts.tmp[s] = v; if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3);
      if(test) texts.length++; else texts[v] = s;
      }
   if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[v] = ++texts.cnt[v]||1; }
   if(spc) v = (v<<1)+(spc<0?0:1);
   if(v<304048){
      if(v<16080){ v2 = v>>3; v = (v&7)+81; }                                        //!                                                          16080 =>  v =        81 -       88         [8]; v2 =       0 -   2009 [2 - 3 chars]
      else if(v<27856){ v -= 16080; v2 = v>>7; v = (v&127)+247; }                    //!           27856 -           16080 =           11776 =>  v =      247 -     374     [128]; v2 =       0 -       91 [3 chars]
      //else if(v<000000){ v -= 000000; v2 = v>>4; v = (v&15)+375; }           //!    000000 -              000000 =            1472 =>   v =      375 -   390        [16]; v2 =       0 -       91 [3 chars]
      //else if(v<000000){ v -= 000000; v2 = v>>2; v = (v&3)+391; }            //!    000000 -              000000 =              368 =>   v =      391 -   394          [4]; v2 =       0 -       91 [3 chars]
      //else if(v<000000){ v -= 000000; v2 = v>>1; v = (v&1)+395; }            //!    000000 -              000000 =            4020 =>   v =      395 -   396          [2]; v2 =       0 -   2009 [3 -4 chars]
      else if(v<273360){ v -= 27856; v2 = (v>>7)+92; v = (v&127)+247; }              //!         273360 -           27856 =         245504 =>  v =      247 -     374      [128]; v2 =     92 -   2009 [4 chars]
      else { v -= 273360; v2 = (v>>4)+92; v = (v&15)+375; }                          //!         304048 -         273360 =           30688 =>  v =      375 -     390        [16]; v2 =     92 -   2009 [4 chars]
      }
   else if(v<795200){ v -= 304048; v2 = (v>>3)+2010; v = (v&7)+81; }                 //!         795200 -         304048 =         491152 =>  v =        81 -       88          [8]; v2 = 2010 - 63403 [4 chars]
   else if(v<1048448){ v -= 795200; v2 = (v>>2)+92; v = (v&3)+391; }                 //!       1048448 -         795200 =         253248 =>  v =      391 -     394          [4]; v2 =     92 - 63403 [4 -5 chars]
   else if(v<8906880){ v -= 1048448; v2 = (v>>7)+2010; v = (v&127)+247; }            //!       8906880 -       1048448 =       7858432 =>  v =      247 -     374      [128]; v2 = 2010 - 63403 [5 chars]
   else if(v<9889184){ v -= 8906880; v2 = (v>>4)+2010; v = (v&15)+375; }             //!       9889184 -       8906880 =         982304 =>  v =      375 -     390        [16]; v2 = 2010 - 63403 [5 chars]
   else if(v<10011972){ v -= 9889184; v2 = (v>>1)+2010; v = (v&1)+395; }             //!     10011972 -       9889184 =         122788 =>  v =      395 -     396          [2]; v2 = 2010 - 63403 [5 chars]
   else {
      v -= 10011972;
      if(v<478180){
         if(v<17806){
            if(v<184){ v2 = v>>1; v = (v&1)+89; }                                    //!                                                             184 =>   v =        89 -     90          [2]; v2 =       0 -       91 [2 chars]
            else if(v<2194){ v -= 184; v2 = v; v = 91; }                             //!              2194 -              184 =            2010 =>   v =        91 -     91          [1]; v2 =       0 -   2009 [2-3 chars]
            else if(v<6030){ v -= 2194; v2 = (v>>1)+92; v = (v&1)+89; }              //!              6030 -            2194 =            3836 =>   v =        89 -     90          [2]; v2 =     92 -   2009 [3 chars]
            else { v -= 6030; v2 = v>>7; v = (v&127)+92; }                           //!            17806 -            6030 =          11776 =>   v =        92 -   219      [128]; v2 =       0 -       91 [3 chars]
            }
         //else if(v<000000){ v -= 000000; v2 = v>>4; v = (v&15)+220; }             //!    000000 -              000000 =            1472 =>   v =      220 -   235        [16]; v2 =       0 -       91 [3 chars]
         //else if(v<000000){ v -= 000000; v2 = v>>3; v = (v&7)+236; }              //!    000000 -              000000 =              736 =>   v =      236 -   243          [8]; v2 =       0 -       91 [3 chars]
         //else if(v<000000){ v -= 000000; v2 = v>>1; v = (v&1)+244; }              //!    000000 -              000000 =            6030 =>   v =      244 -   246  xxx   [3]; v2 =       0 -   2009 [3 -4 chars]
         else if(v<263310){ v -= 17806; v2 = (v>>7)+92; v = (v&127)+92; }            //!          263310 -          17806 =        245504 =>   v =        92 -   219      [128]; v2 =     92 -   2009 [4 chars]
         else if(v<293998){ v -= 263310; v2 = (v>>4)+92; v = (v&15)+220; }           //!          293998 -        263310 =          30688 =>   v =      220 -   235        [16]; v2 =     92 -   2009 [4 chars]
         else if(v<416786){ v -= 293998; v2 = (v>>1)+2010; v = (v&1)+89; }           //!          416786 -        293998 =        122788 =>   v =        89 -     90          [2]; v2 = 2010 - 63403 [4 chars]
         else { v -= 416786; v2 = v+2010; v = 91; }                                  //!          478180 -        416786 =          61394 =>   v =        91 -     91          [1]; v2 = 2010 - 63403 [4 chars]
         }
      else if(v<984676){ v -= 478180; v2 = (v>>3)+92; v = (v&7)+236; }               //!          984676 -        478180 =        506496 =>   v =      236 -   243          [8]; v2 =     92 - 63403 [4 -5 chars]
      else if(v<8843108){ v -= 984676; v2 = (v>>7)+2010; v = (v&127)+92; }           //!        8843108 -        984676 =      7858432 =>   v =        92 -   219      [128]; v2 = 2010 - 63403 [5 chars]
      else if(v<9825412){ v -= 8843108; v2 = (v>>4)+2010; v = (v&15)+220; }          //!        9825412 -      8843108 =        982304 =>   v =      220 -   235        [16]; v2 = 2010 - 63403 [5 chars]
      else if(v<9948200){ v -= 9825412; v2 = (v>>1)+2010; v = (v&1)+244; }           //!        9948200 -      9825412 =        122788 =>   v =      244 -   245          [2]; v2 = 2010 - 63403 [5 chars]
      else { v -= 9948200; v2 = v+2010; v = 246; }                                   //!      10009594 -      9948200 =          61394 =>   v =      246 -   246          [1]; v2 = 2010 - 63403 [5 chars]
      }
   return f(v<57 ? v+35 : v<97 ? v+36 : v<123 ? v+37 : v<8194 ? v+38 : v<55256 ? v+40 : v<62888 ? v+2088 : v<63400 ? v+2120 : v+2129, v2<57 ? v2+35 : v2<97 ? v2+36 : v2<123 ? v2+37 : v2<8194 ? v2+38 : v2<55256 ? v2+40 : v2<62888 ? v2+2088 : v2<63400 ? v2+2120 : v2+2129);
   }

//! --- 3 CHARS --- Char3 W ---
if(ubytes==0x20){
   var v, v2, v3; 
   if(s==null) return "!!!";
   if(s==="") return "!! ";
   var spc = 0; //! Date as string or ucode2

   //! --- Basic3 W ---
   //! -1e14 - 1e14 or string, values <0; 778,687> in 3 bytes, <778,688; 49,531,327> in 4 bytes, <49,531,328; 2,626,198,879> in 5 bytes, 
   //!                                <2,626,198,880; 74,784,621,919> in 6 bytes, <74,784,621,920; 1,794,598,183,855> in 7 bytes, 
   //!                                <1,794,598,183,856; 23,513,811,959,215> in 8 bytes, <-1e14; -1> and <23,513,811,959,216; 1e14> in 9 bytes
   //! -1e14 - 1e14 or string, values <-389,344; 389,343> in 3 bytes, <-24,765,664; -389,345> and <389,344; 24,765,663> in 4 bytes, <-1,313,099,440; -24,765,665> and <24,765,664; 1,313,099,439> in 5 bytes,
   //!                                <-37,392,310,960; -1,313,099,441> and <1,313,099,440; 37,392,310,959> in 6 bytes, <-897,299,091,928; -37,392,310,961> and <37,392,310,960; 897,299,091,927> in 7 bytes,
   //!                                <-11,756,905,979,608; -897,299,091,929> and <897,299,091,928; 11,756,905,979,607> in 8 bytes, <-1e14; -11,756,905,979,609> and <11,756,905,979,608; 1e14> in 9 bytes
   //!                        strings <0; 7,359> in 3 bytes, <7,360; 302,271> in 4 bytes, <302,272; 13,816,111> in 5 bytes, <13,816,112; 131,814,697> in 6 bytes, <131,814,698; 4,000,000,000> in 7 bytes
   if(uspec<=0x2){
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      if(v===0) return "###"; 
      if(uspec==0x2) { if(v) v = v<=-1 ? -v*2-1 : v<1 ? 0 : v*2; if(v>2e14) { if(error&8) return error&4 ? null : "!  "; v = error&4 ? 2e14-(v&1) : null; } }
      else if(v<-1e14||v>1e14){ if(error&8) return error&4 ? null : "!  "; v = ~error&4 ? null : v<0 ? 2e14 : 1e14; }
      else if(v<0) v = v<=-1 ? 1e14-v : 0;
      }

   //! Simple string, <0; 778,687> in 3 bytes, <778,688; 49,531,327> in 4 bytes, <49,531,328; 2,626,198,879> in 5 bytes, ...
   else if(uspec==0x3){
      if(un&0x80) return typeof(s)=="number"&&!s&&s!==0 ? "!  " : UTF8STORE.ToVarStringUN(s,un,error);
      if(un2 && un>65536) { s = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,error,texts,null,options,test?2:0); if(s=="!    ") return "! "; if(utexts){ un &= ~0x300; texts = utexts; } } //! 5 CHARS number as string
      else if(typeof(s)=="boolean") return s ? " 1\x7f":" 0\x7f";    //! Returns Boolean as 1 / 0
      else if(typeof(s)=="number"){ if(s>=0 && s<=99 && s==Math.floor(s)) return s<=9 ? f(32,s+48,0x7f) : f(32,s/10+48,s%10+49); if(!s) return "!  "; un &= ~0x300; } //! 1-2 digits or NaN as input, returns NaN
      else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
      else if(s.length==1){ v = s.charCodeAt(0); if(!UTF8Store.CUNEscape[v]) return " "+s+"\x7f"; } //! 1 char
      else if(s.length==2){ v = s.charCodeAt(0); v2 = s.charCodeAt(1); if(!UTF8Store.CUNEscape[v] && !UTF8Store.CUNEscape[v2]) return " "+s; } //! 2 chars
      if(texts==null) return error&64 ? null : "!  ";
      if(texts.tmp==null) texts.tmp = {}; 
      v = texts.tmp[s]; 
      if(v==null) {
         v = texts.length; texts.tmp[s] = v; 
         if(un&0x300) s = UTF8STORE.EscapeUN(s,un>>8&3);
         if(test) texts.length++; else texts[v] = s; 
         }
      if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[v] = ++texts.cnt[v]||1; }
      if(v===0) return "###";
      }

   //! --- Date 3 chars --- Date3 W ---
   else if(uspec<=0x7){
      if(typeof(s)!="object" && options&1) s = UTF8STORE.ToUTF8Date(s,options);
      if(typeof(s)!="object"){ spc = 1; if(!s&&s!==0) return "!  "; } //! NaN
      else {
         v = (options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+s.getUTCFullYear()*384 : s.getDate()-1+(s.getMonth()<<5)+s.getFullYear()*384) - (un>0x8000||un<0 ? (un>>>15)+1900*384 : 2025*384);
         v = v<=-1 ? (-v<<1)-1 : v<<1;                                                       //! Saves difference = Integer, including negative
         var t = (options&4 ? s.getUTCHours() + s.getUTCMinutes()*24 : s.getHours() + s.getMinutes()*24) + s.getSeconds()*1440;
         if(uspec==0x4){
            if(v<2314800) v += (t + s.getMilliseconds()*86400) * 2314800;    //! yyyy-MM-dd HH:mm:ss.fff, +/- 3000 years
            else if(error&8) return error&4 ? null : "! "; 
            else if(error&4&&uspec==0x4) v = (2314798|v&1) + (t + s.getMilliseconds()*86400) * 2314800;
            else v = null;
            }
         else if(uspec==0x5){
            if((error&3)==1||!s.getMilliseconds()) v += t * 2314800000;      //! yyyy-MM-dd HH:mm:ss
            else if(error&2) return error&1 ? null : "! "; 
            else v = null;
            }
         if(v==null&&(texts||utexts||un&0x80)){ s = UTF8STORE.WriteValue(s,0x34|un&0xFFFF8080); spc = -1; if(utexts){ un &= ~0x300; texts = utexts; } }
         }
      }


   //! --- 3 CHARS numbers --- Num3 W ---
   //! 1,2,3,4. bits &0x0F    - divide by: 0 - 1, 1 - 0.01, 2 - 0.0001, 3 - 0.000001, 4 - 0.00000001, 5 - 0.0000000001, 6 - 0.000000000001, 7 - 0.00000000000001
   //! 5,6. bits &0x30        - bytes:  2 (0x20) = 3 CHARS
   //! 7. bit &0x40           - signed: 0 (0) = positive coded smaller
   //!                                  1 (0x40) = negative and positive coded in the same size
   //! 8. bit &0x80           - var string: 0 = strings to texts, 1 (0x80) = strings to output, the output size varies
   //! 9,10. bits &0x300      - escaping strings, 0 (0) - no escape, 1 (0x100) escape \, \n, \r, \t and \", 2 (0x200) - escape also 007F, 3 (0x300) - escape also 0000 - 000F
   //! 11,12,13. bits &0x1C00 - round: the rounded numbers are coded smaller - 0 = special numbers,   1 (0x400) = no round,   2 (0x800) = to 10,       3 (0xc00) = to 100, 
   //!                                                                         4 (0x1000) = to 1,000, 5 (0x1400) = to 10,000, 6 (0x1800) = to 100,000, 7 (0x1c00) = N/A
   //! 14,15. bits &0x6000    - number of significant digits, 0 (0) = 14 digits (limits <-1e14,1e14>),        1 (0x2000) = 13 digits (limits <-1e22,1e22>), 
   //!                                                        2 (0x4000) = 12 digits (limits <-1e111,1e111>), 3 (0x6000) = 11 digits (limits <-1e150,1e150> (+/-1e-150))
   else {
      if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;
      if(v===0) return "###";
      if(v){
         var udig = un&0x6000; 
         if(udig==0x6000) { if(v>=-1e150&&v<=1e150) a = v*1e158; else if(error&8) return error&4 ? null : "!  "; else a = ~error&4 ? null : v < 0 ? -1e308 : 1e308; }  //! digits 384 (3), exponent +/- 150
         else {
            var udiv = un&15;
            if((un>65535||un<0)&&!un2) v -= un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16; //! base
            if(udiv/* && v>=-1e100 && v<=1e100*/) { v *= UTF8STORE.CUNDiv3M[udiv]; a = Math.floor(v-0+0.5); } //! divide
            else { a = Math.floor(v); if(a!=v) a = Math.floor(v-0+0.5); }
            if(a!=v&&(error&3)!=1&&((a>v?a-v:v-a)>0.0000001||a==0&&v<0.0000001&&v>-0.0000001)){
               var d = v<0 ? -v : v; 
               if(d<1e7 || d<1e14 && (a>v?a-v:v-a) > (d<1e8?1e-6:d<1e9?1e-5:d<1e10?1e-4:d<1e11?1e-3:d<1e12?1e-2:0.1)){
                  if(error&2) return error&1 ? null : "!  "; a = null; //! Floating point number no round, returns null/NaN or continues as string
                  }
               }
            }
         if(a!=null){
            var m = 0; if(a<0){ m = 1; a = -a; }
            if(udig){ //! digits
               if(udig==0x6000) { if(a>1e11) { for(var i=0,e=0;i<9;i++){ e <<= 1; if(a>=UTF8STORE.CUNPow210L[8-i]) { a /= UTF8STORE.CUNPow210[8-i]; e |= 1; } } a = Math.floor(a*1e10+1e11*(e-10)); }} //! 11 digits
               else if(udig==0x4000){ if(a>1e12) { for(var i=0,e=0;i<8;i++){ e <<= 1; if(a>=UTF8STORE.CUNPow210L[7-i]) { a /= UTF8STORE.CUNPow210[7-i]; e |= 1; } } a = Math.floor(a*1e11+1e12*(e-11)); if(e==111&&a==1.001e14) a = 1e14; } } //! 12 digits
               else if(a>1e13) for(var i=25;i<33;i++) if(a<=UTF8STORE.CUNPow10[i]) { a = Math.floor(a/UTF8STORE.CUNPow10[i-13]+1e13*(i-23)+0.5); break; }             //! 0x2000 = 13 digits
               }
            if(a>1e14&&a) { if(error&8) return error&4 ? null : "!  "; a = ~error&4 ? null : 1e14; }
            else {
               var urnd = un&0x1c00;
               if(urnd>0x400 && a<=1e11){ //! Round 1 - 1e5
                  if(urnd==0x800)       { v = a/10; a = v==Math.floor(v) ?  v : Math.floor(a-v+10000000001); }
                  else if(urnd==0xc00)  { v = a/100; a = v==Math.floor(v) ?  v : Math.floor(a-v+1000000001); }
                  else if(urnd==0x1000) { v = a/1000; a = v==Math.floor(v) ?  v : Math.floor(a-v+100000001); }
                  else if(urnd==0x1400) { v = a/10000; a = v==Math.floor(v) ?  v : Math.floor(a-v+10000001); }
                  else if(urnd==0x1800) { v = a/100000; a = v==Math.floor(v) ?  v : Math.floor(a-v+1000001); }
                  }
               }
            if(un&0x40 && a) a = m ? a*2-1 : a*2;   //! integer
            else if(m && a) a += 1e14;              //! positive
            v = a; if(v===0) return "###"; if(v<1) v = null;
            }
         else v = null;
         }
      }
   
   //! --- Converts number to UTF8 --- Data3 W ---
   if(!v){
      if(v===0) return "###";
      else if(typeof(s)=="number"&&v!=null) return "!  "; //! NaN
      else if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
      }
   else if(v<=2e14){
      if(v<2104018288){
         if(v<17012640){ v3 = v%2010; v2 = v/2010%92; v /= 92*2010; }                                                    //! 1+1+(1-2) =               17012640
         else if(v<33246592){ v -= 17012640; v3 = v%92; v2 = v/92%92; v = v/92/92+92; }                                  //! 2+1+1       =               16233952
         else if(v<387923152){ v -= 33246592; v3 = v%2010; v2 = v/2010%1918+92; v /= 2010*1918; }                        //! 1+2+(1-2) =             354676560
         else if(v<726365760){ v -= 387923152; v3 = v%1918+92; v2 = v/1918%92; v = v/1918/92+92; }                       //! 2+1+2       =             338442608
         else if(v<1064808368){ v -= 726365760; v3 = v%92; v2 = v/92%1918+92; v = v/92/1918+92; }                        //! 2+2+1       =             338442608
         else if(v<1584413328){ v -= 1064808368; v3 = v%92; v2 = v/92%61390+2010; v /= 92*61390; }                       //! 1+3+1       =             519604960
         else { v -= 1584413328; v3 = v%61390+2010; v2 = v/61390%92; v /= 61390*92; }                                    //! 1+1+3       =             519604960
         }
      else if(v<67619426288){
         if(v<13456257088){ v -= 2104018288; v3 = v%2010; v2 = v/2010%92; v = v/2010/92+2010; }                          //! 3+1+(1-2)  =         11352238800
         else if(v<24288890928){ v -= 13456257088; v3 = v%92; v2 = v/92%1918+92; v = v/92/1918+2010; }                   //! 3+2+1        =        10832633840
         else if(v<35121524768){ v -= 24288890928; v3 = v%61390+2010; v2 = v/61390%1918+92; v /= 61390*1918; }           //! 1+2+3        =        10832633840     
         else if(v<45954158608){ v -= 35121524768; v3 = v%61390+2010; v2 = v/61390%92; v = v/61390/92+92; }              //! 2+1+3        =        10832633840
         else if(v<56786792448){ v -= 45954158608; v3 = v%1918+92; v2 = v/1918%61390+2010; v /= 1918*61390; }            //! 1+3+2        =        10832633840
         else { v -= 56786792448; v3 = v%92; v2 = v/92%61390+2010; v = v/92/61390+92; }                                  //! 2+3+1        =        10832633840
         }
      else if(v<300512085280){ v -= 67619426288; v3 = v%63308+92; v2 = v/63308%1918+92; v = v/63308/1918+92; }           //! 2+2+(2-3)  =      232892658992
      else if(v<526348951640){ v -= 300512085280; v3 = v%1918+92; v2 = v/1918%1918+92; v = v/1918/1918+2010; }           //! 3+2+2        =      225836866360
      else if(v<752185818000){ v -= 526348951640; v3 = v%1918+92; v2 = v/1918%61390+2010; v = v/1918/61390+92; }         //! 2+3+2        =      225836866360
      else if(v<1098909171200){ v -= 752185818000; v3 = v%61390+2010; v2 = v/61390%61390+2010; v = v/61390/61390; }      //! 1+3+3        =      346723353200
      else if(v<1445632524400){ v -= 1098909171200; v3 = v%61390+2010; v2 = v/61390%92; v = v/61390/92+2010; }           //! 3+1+3        =      346723353200
      else if(v<9020784045400){ v -= 1445632524400; v3 = v%2010; v2 = v/2010%61390+2010; v = v/2010/61390+2010; }        //! 3+3+(1-2)  =    7575151521000
      else if(v<16249212213200){ v -= 9020784045400; v3 = v%61390+2010; v2 = v/61390%61390+2010; v = v/61390/61390+92; } //! 2+3+3        =    7228428167800
      else { v -= 16249212213200; v3 = v%61390+2010; v2 = v/61390%63308+92; v = v/61390/63308+2010; }                    //! 3+(2-3)+3  = 238590891786800 => 254840104000000
      return f(v<57 ? v+35 : v<97 ? v+36 : v<123 ? v+37 : v<8194 ? v+38 : v<55256 ? v+40 : v<62888 ? v+2088 : v<63400 ? v+2120 : v+2129, 
              v2<57 ? v2+35 : v2<97 ? v2+36 : v2<123 ? v2+37 : v2<8194 ? v2+38 : v2<55256 ? v2+40 : v2<62888 ? v2+2088 : v2<63400 ? v2+2120 : v2+2129, 
              v3<57 ? v3+35 : v3<97 ? v3+36 : v3<123 ? v3+37 : v3<8194 ? v3+38 : v3<55256 ? v3+40 : v3<62888 ? v3+2088 : v3<63400 ? v3+2120 : v3+2129);
      }
   else if(v===0) return "###";
   
   //! --- variable length string ---
   if(un&0x80) return v==null||!(error&48) ? UTF8STORE.ToVarStringUN(s,un,error,spc) : ~error&16 ? "!  " : error&32 ? null : "!! ";  //! returns var string

   //! --- 3 CHARS strings --- Str3 W ---
   if(typeof(s)=="string"){
      if(s.length==1){ v = s.charCodeAt(0); if(!UTF8Store.CUNEscape[v]) return " "+s+"\x7f"; } //! 1 char
      if(s.length==2){ v = s.charCodeAt(0); v2 = s.charCodeAt(1); if(!UTF8Store.CUNEscape[v] && !UTF8Store.CUNEscape[v2]) return " "+s; } //! 2 chars
      }
   if(error&48) return ~error&16 ? "!  " : error&32 ? null : "!!#  ";
   if(texts==null) return error&64 ? null : "!  ";
   if(un2 && un>65536) { s = UTF8STORE.WriteValue(s,un&0x380|un>>16&0x7f|un>>13&0x7c00,error,texts,null,options,test?2:0); if(s=="!    ") return "!  "; if(utexts){ un &= ~0x300; texts = utexts; } } //! 5 CHARS number as string
   if(texts.tmp==null) texts.tmp = {}; 
   v = texts.tmp[s]; 
   if(v==null) { 
      v = texts.length; texts.tmp[s] = v; 
      if(un&0x300&&typeof(s)=="string") s = UTF8STORE.EscapeUN(s,un>>8&3);
      if(test) texts.length++; else texts[v] = s;
      }
   if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[v] = ++texts.cnt[v]||1; }
   return "!" + UTF8STORE.WriteValue(spc<0?-v-1:v,spc?0x12:0x11,4); //! Date codes as 0x12 = positive string, negative ucode2
   }

//! --- 5 CHARS --- Char5 W ---
if(un<0&&un>-100) return null; //! Incorrect un
if(s==null) return "!!!!!";    //! null
if(s==="") return "!!#  ";     //! Empty string
if(uspec==0x3) v = null;

//! --- Date5 W ---
else if(uspec==0x4){           //!  Date 5 chars
   if(typeof(s)!="object" && options&1) s = UTF8STORE.ToUTF8Date(s,options);
   if(typeof(s)!="object"){ v = null; if(!s&&s!==0) return "!    "; s += ""; } //! NaN
   else {
      var d = (options&4 ? s.getUTCDate()-1+(s.getUTCMonth()<<5)+s.getUTCFullYear()*384 : s.getDate()-1+(s.getMonth()<<5)+s.getFullYear()*384) - (un>0x8000||un<0 ? (un>>>15)+1900*384 : 2025*384);
      var t = (options&4 ? s.getHours() + s.getMinutes()*24 : s.getHours() + s.getMinutes()*24) + s.getSeconds()*1440 + s.getMilliseconds()*86400;
      return UTF8STORE.WriteValue(d,0x12)+UTF8STORE.WriteValue(t,0x11)+" "; //! The last char is a reserve
      }
   }
else if(typeof(s)!="string") v = s; else if(options&1){ v = s-0; if(options&2&&v+""!=s) v = NaN; } else v = NaN;

var v2, v3, v4, v5;
if(v===0) return "#####";      //! 0

//! --- string --- Str5 W ---
if(!v){
   if(un&0x80) return typeof(s)=="number" && !s ? "!    " : v==null||!(error&48) ? UTF8STORE.ToVarStringUN(s,un,error) : ~error&16 ? "!    " : error&32 ? null : "!!#  ";  //! returns var string
   if(typeof(s)!="string") { 
      if(uspec!=0x3) return "!    ";                                            //! NaN
      if(typeof(s)=="boolean") return s ? " 1\x7f\x7f\x7f" : " 0\x7f\x7f\x7f";   //! Bool
      if(!s) return "!    ";                                                     //! NaN
      if(typeof(s)=="object") s = UTF8STORE.ToString(s,options);
      else if(s>-1000&&s<10000&&s==Math.floor(s)) s += "";                       //! Saves as digits
      }
   if(typeof(s)=="string" && s.length<=4){
      v = s.charCodeAt(0); 
      if(!UTF8Store.CUNEscape[v]){
         if(s.length==1) return " "+s+"\x7f\x7f\x7f"; //! 1 char
         v2 = s.charCodeAt(1);
         if(!UTF8Store.CUNEscape[v2]){
            if(s.length==2) return " "+s+"\x7f\x7f"; //! 2 chars
            v3 = s.charCodeAt(2); 
            if(!UTF8Store.CUNEscape[v3]){
               if(s.length==3) return " "+s+"\x7f"; //! 3 chars
               v4 = s.charCodeAt(3); if(!UTF8Store.CUNEscape[v4]) return " "+s; //! 4 chars
               }
            }
         }
      }
   if(error&48) return ~error&16 ? "!    " : error&32 ? null : "!!#  ";
   if(texts==null) return error&64 ? null : "!    ";                        //! returns NaN / null
   if(texts.tmp==null) texts.tmp = {}; 
   v = texts.tmp[s]; 
   if(v==null) { 
      v = texts.length; texts.tmp[s] = v; 
      if(un&0x300 && typeof(s)=="string") s = UTF8STORE.EscapeUN(s,un>>8&3);
      if(test) texts.length++; else texts[v] = s;
      }
   if(options&64){ if(texts.cnt==null) texts.cnt = []; texts.cnt[v] = ++texts.cnt[v]||1; }
   v5 = v%92; v4 = v/92%92; v3 = v/8464%92; v2 = v/778688;
   return f(33,v2<57?v2+35:v2+36,v3<57?v3+35:v3+36,v4<57?v4+35:v4+36,v5<57?v5+35:v5+36);
   }
var ov = v;

//! --- Basic5 W ---
//! -1e14 - 1e14 or double float or string, values <0; 5,444,586,495> in 5 bytes, <5,444,586,496; 597,496,646,655> in 6 bytes, <597,496,646,656; 26,307,688,877,055> in 7 bytes, 
//!                                                <26,307,688,877,056; 1e14> and <-1e14; -1> in 8 bytes
//! -1e14 - 1e14 or double float or string, values <-2,722,293,248; 2,722,293,247> in 5 bytes, <-298,748,323,328; -2,722,293,249> and <2,722,293,248; 298,748,323,327> in 6 bytes, 
//!                                                <-13,153,844,438,528; -298,748,323,329> and <298,748,323,328; 13,153,844,438,527> in 7 bytes, 
//!                                                <-1e14; -13,153,844,438,529> and <13,153,844,438,528; 1e14> in 8 bytes
//! double float <-1.7977e308; 1.7977e308>, minimal positive value 1e-323. Always in 13 bytes
//! strings <0; 7,359> in 3 bytes, <7,360; 302,271> in 4 bytes, <302,272; 13,816,111> in 5 bytes, <13,816,112; 131,814,697> in 6 bytes, <131,814,698; 4,000,000,000> in 7 bytes
if(uspec<=0x2) { 
   if(v<-1e14||v>1e14||v!=Math.floor(v)) v = null;
   else if(uspec==0x2) v = v<0 ? -v*2-1 : v*2;
   else if(v<0) v = 1e14-v;
   }

//! --- 5 CHARS numbers --- Num5 W ---
//! The ranges and options are the same as 3 CHARS numbers
//! 1,2,3,4. bits &0x0F    - divide by: 0 - 1, 1 - 0.01, 2 - 0.0001, 3 - 0.000001, 4 - 0.00000001, 5 - 0.0000000001, 6 - 0.000000000001, 7 - 0.00000000000001
//! 5,6. bits &0x30        - bytes:  2 (0x20) = 3 CHARS
//! 7. bit &0x40           - signed: 0 (0) = positive coded smaller
//!                                  1 (0x40) = negative and positive coded in the same size
//! 8. bit &0x80           - var string: 0 = strings to texts, 1 (0x80) = strings to output, the output size varies
//! 9,10. bits &0x300      - escaping strings, 0 (0) - no escape, 1 (0x100) escape \, \n, \r, \t and \", 2 (0x200) - escape also 007F, 3 (0x300) - escape also 0000 - 000F
//! 11,12,13. bits &0x1C00 - round: the rounded numbers are coded smaller - 0 = special numbers,   1 (0x400) = no round,   2 (0x800) = to 10,       3 (0xc00) = to 100, 
//!                                                                         4 (0x1000) = to 1,000, 5 (0x1400) = to 10,000, 6 (0x1800) = to 100,000, 7 (0x1c00) = N/A
//! 14,15. bits &0x6000    - number of significant digits, 0 (0) = 14 digits (limits <-1e14,1e14>),        1 (0x2000) = 13 digits (limits <-1e22,1e22>), 
//!                                                        2 (0x4000) = 12 digits (limits <-1e111,1e111>), 3 (0x6000) = 11 digits (limits <-1e150,1e150> (+/-1e-150))
else {
   var udig = un&0x6000, udiv = un&15; 
   if((un>65535||un<0)&&!un2) v -= un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16; //! base
   if(udig==0x6000) v = v>=1e150||v<=-1e150 ? null : v*1e158;  //! digits 0x6000 (3), exponent +/- 150
   else if(udiv/* && v>=-1e100 && v<=1e100*/) v *= UTF8STORE.CUNDiv3M[udiv]; //! divide
   var a = Math.floor(v); if(a!=v) a = Math.floor(v-0+0.5);
   var o = a, m = 0; if(a<0){ m = 1; a = -a; }
   if(o==v) {
      if(udig){ //! digits
         if(udig==0x6000) { if(a>1e11) { for(var i=0,e=0;i<9;i++){ e <<= 1; if(a>=UTF8STORE.CUNPow210L[8-i]) { a /= UTF8STORE.CUNPow210[8-i]; e |= 1; } } a = Math.floor(a*1e10+1e11*(e-10)); }} //! 11 digits
         else if(udig==0x4000){ if(a>1e12) { for(var i=0,e=0;i<8;i++){ e <<= 1; if(a>=UTF8STORE.CUNPow210L[7-i]) { a /= UTF8STORE.CUNPow210[7-i]; e |= 1; } } a = Math.floor(a*1e11+1e12*(e-11)); if(e==111&&a==1.001e14) a = 1e14; } } //! 12 digits
         else if(a>1e13) for(var i=25;i<33;i++) if(a<=UTF8STORE.CUNPow10[i]) { a = Math.floor(a/UTF8STORE.CUNPow10[i-13]+1e13*(i-23)+0.5); break; } //! 0x2000 = 13 digits
         }
      if(a>1e14) a = null;
      else {
         var urnd = un&0x1c00;
         if(urnd>0x400 && a<=1e11){ //! Round 1 - 1e5
            if(urnd==0x800)       { v = a/10; a = v==Math.floor(v) ?  v : Math.floor(a-v+10000000001); }
            else if(urnd==0xc00)  { v = a/100; a = v==Math.floor(v) ?  v : Math.floor(a-v+1000000001); }
            else if(urnd==0x1000) { v = a/1000; a = v==Math.floor(v) ?  v : Math.floor(a-v+100000001); }
            else if(urnd==0x1400) { v = a/10000; a = v==Math.floor(v) ?  v : Math.floor(a-v+10000001); }
            else if(urnd==0x1800) { v = a/100000; a = v==Math.floor(v) ?  v : Math.floor(a-v+1000001); }
            }
         if(un&0x40 && a) a = m ? a*2-1 : a*2;   //! integer
         else if(m && a) a += 1e14;              //! positive
         }
      v = a; if(v===0) return "#####";
      }
   else v = null;
   }
if(v===0) return "#####";

//! --- Data5 W ---
if(v>0 && v<=2e14 && v==Math.floor(v)){
   if(v<459475756032){
      if(v<118952378880){ v5 = v%2010; v4 = v/2010%92; v3 = v/184920%92; v2 = v/17012640%92; v = v/1565162880+16; } //! 1+1+1+1+(1-2) => 76*92*92*92*2010
      else if(v<232460171264){ v -= 118952378880; v5 = v%92; v4 = v/92%1918+92; v3 = v/176456%92; v2 = v/16233952%92; v = v/1493523584+16; } //! 1+1+1+2+1 => 76*92*92*92*1918
      else if(v<345967963648){ v -= 232460171264; v5 = v%92; v4 = v/92%92; v3 = v/8464%1918+92; v2 = v/16233952%92; v = v/1493523584+16; } //! 1+1+2+1+1 => 76*92*92*92*1918
      else { v -= 345967963648; v5 = v%92; v4 = v/92%92; v3 = v/8464%92; v2 = v/778688%1918+92; v = v/1493523584+16; } //! 1+2+1+1+1 => 76*92*92*92*1918
      }
   else if(v<13923396058368){
      if(v<3461458159872){ v -= 459475756032; v5 = v%2010; v4 = v/2010%92; v3 = v/184920%92; v2 = v/17012640%92; v = v/1565162880+92; } //! 2+1+1+1+(1-2) => 92*92*92*1918*2010
      else if(v<6326036393984){ v -= 3461458159872; v5 = v%92; v4 = v/92%1918+92; v3 = v/176456%92; v2 = v/16233952%92; v = v/1493523584+92; } //! 2+1+1+2+1 => 92*92*92*1918*1918
      else if(v<9190614628096){ v -= 6326036393984; v5 = v%92; v4 = v/92%92; v3 = v/8464%1918+92; v2 = v/16233952%92; v = v/1493523584+92; } //! 2+1+2+1+1 => 92*92*92*1918*1918
      else if(v<11557005343232){ v -= 9190614628096; v5 = v%92; v4 = v/92%92; v3 = v/8464%1918+92; v2 = v/16233952%1918+92; v = v/31136719936+16; } //! 1+2+2+1+1 => 76*92*92*1918*1918
      else { v -= 11557005343232; v5 = v%92; v4 = v/92%1918+92; v3 = v/176456%92; v2 = v/16233952%1918+92; v = v/31136719936+16; } //! 1+2+1+2+1 => 76*92*92*1918*1918
      }
   else if(v<23388958918912) {
      if(v<16289786773504){ v -= 13923396058368; v5 = v%1918+92; v4 = v/1918%92; v3 = v/176456%92; v2 = v/16233952%1918+92; v = v/31136719936+16; } //! 1+2+1+1+2 => 76*92*92*1918*1918
      else if(v<18656177488640){ v -= 16289786773504; v5 = v%1918+92; v4 = v/1918%92; v3 = v/176456%1918+92; v2 = v/338442608%92; v = v/31136719936+16; } //! 1+1+2+1+2 => 76*92*92*1918*1918
      else if(v<21022568203776){ v -= 18656177488640; v5 = v%1918+92; v4 = v/1918%1918+92; v3 = v/3678724%92; v2 = v/338442608%92; v = v/31136719936+16; } //! 1+1+1+2+2 => 76*92*92*1918*1918
      else { v -= 21022568203776; v5 = v%92; v4 = v/92%1918+92; v3 = v/176456%1918+92; v2 = v/338442608%92; v = v/31136719936+16; } //! 1+1+2+2+1 => 76*92*92*1918*1918
      }
   else if(v<85973765990272){ v -= 23388958918912; v5 = v%2010; v4 = v/2010%92; v3 = v/184920%92; v2 = v/17012640%1918+92; v = v/32630243520+92; } //! 2+2+1+1+(1-2) => 92*92*1918*1918*2010
   else if(v<145693994827520){ v -= 85973765990272; v5 = v%92; v4 = v/92%1918+92; v3 = v/176456%92; v2 = v/16233952%1918+92; v = v/31136719936+92; } //! 2+2+1+2+1 => 92*92*1918*1918*1918
   else { v -= 145693994827520; v5 = v%92; v4 = v/92%92; v3 = v/8464%1918+92; v2 = v/16233952%1918+92; v = v/31136719936+92; } //! 2+2+2+1+1 => 92*92*1918*1918*1918 => 205414223664768
   return f(v<57?v+35:v<97?v+36:v<123?v+37:v+38,v2<57?v2+35:v2<97?v2+36:v2<123?v2+37:v2+38,v3<57?v3+35:v3<97?v3+36:v3<123?v3+37:v3+38,v4<57?v4+35:v4<97?v4+36:v4<123?v4+37:v4+38,v5<57?v5+35:v5<97?v5+36:v5<123?v5+37:v5+38);
   }

//! --- Double5 W ---
//! Double float, full IEEE 754 Double float, +/- 1e308, minimal non zero 1e-308, 9 bytes
v = ov;
if(v==Infinity||v==-Infinity) return v<0 ? "!!%  " : "!!$  "; //! +/- Infinity
var m = 0; if(v<0) { m = 1; v = -v; }
if(v<1e-290){
   var e = Math.floor(Math.log(v)/Math.LN2)+1023; if(e<0) e = 0;
   v = v/Math.pow(2,e?e-1075:-1074);
   }
else {
   var n = 0; if(v<1) { n = 1; v = 1/v; }
   for(var i=0,e=0;i<10;i++){ e <<= 1; if(v>=UTF8STORE.CUNPow2[9-i]) { v /= UTF8STORE.CUNPow2[9-i]; e |= 1; } }
   if(n) { v = 9007199254740992/v; e = 1022-e; }
   else { e += 1023; v *= 4503599627370496; }
   }
var v2 = v%0x40000000; v = Math.floor(v/0x40000000); //! v2 = 22 bits, v = 30 bits
return f((m<<3)+(e>>8&7)+35,((e&255)<<7)+(v>>15&127)+0x4000,(v&0x7fff)+0x4000,(v2>>15)+0x4000,(v2&0x7fff)+0x4000);
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Converts unicode string in U on position ui (ui is in chars regardless on un size; ui can be null for 0) to numbers according to FastGrid un types in ucodes array
//! --- Values R ---
UTF8STORE.ReadValues = function(U,ucodes,index,texts,utexts,options,index_out,values_out,start,length){
var v, v2, ul = U.length, ui = index || 0, P = index_out, O = values_out||[], p = start==null ? O.length : start;
if(!ul) { if(P) P[0] = ui; return O; }

//! --- All values have the same un ---
if(typeof(ucodes)!="object" || ucodes.length==1){
   var un = typeof(ucodes)=="object" ? ucodes[0] : ucodes, u = un&0x7c7f, sl = length||1e10;
   if(u<0xB||u>0xF) { 
      var size = UTF8STORE.GetUCodeSize(un);
      if(size) {
         ui = Math.floor(ui+0.95); ul -= size;
         while(ui<=ul&&sl--) { O[p++] = UTF8STORE.ReadValue(U,un,ui,texts,utexts,options); ui += size; }
         if(P) P[0] = ui;         
         }
      else {
         if(!P) P = [ui]; else P[0] = ui;
         while(P[0]<ul&&sl--) O[p++] = UTF8STORE.ReadValue(U,un,P[0],texts,utexts,options,P); 
         }
      return O; 
      }
   if(ui>=ul) return O;
   if(!P) P = [];
   while(ui!=Math.floor(ui)&&ui<ul) { O[p++] = UTF8STORE.ReadValue(U,un,ui,texts,utexts,options,P); ui = P[0]; if(sl&&!--sl) return O; }
   var oi = O.length, r = un>=0&&un<=65535||un&0x8000||un&0x80 ? 0 : un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
   if(u==0xB) while(ui<ul&&sl>=6) { sl -= 6; v = U.charCodeAt(ui++); v -= v<92 ? 36 : 37; O[p++] = (v>>5&1)+r; O[p++] = (v>>4&1)+r; O[p++] = (v>>3&1)+r; O[p++] = (v>>2&1)+r; O[p++] = (v>>1&1)+r; O[p++] = (v&1)+r; } //! 1 bit
   else if(u==0xC) while(ui<ul&&sl>=3) { sl -= 3; v = U.charCodeAt(ui++); v -= v<92 ? 36 : 37; O[p++] = (v>>4&3)+r; O[p++] = (v>>2&3)+r; O[p++] = (v&3)+r; }                 //! 2 bits
   else if(u==0xD) while(ui<ul&&sl>=2) { sl -= 2; v = U.charCodeAt(ui++); v -= v<92 ? 36 : 37; O[p++] = (v>>3&7)+r; O[p++] = (v&7)+r; }                        //! 3 bits
   else if(u==0xE) while(ui<ul&&sl>=3) { sl -= 3; v = U.charCodeAt(ui++); var v2 = U.charCodeAt(ui++); v -= v<92 ? 36 : 37; v2 -= v2<92 ? 36 : 37; O[p++] = (v>>2&15)+r; O[p++] = (v<<2&12|v2>>4&3)+r; O[p++] = (v2&15)+r; } //! 4 bits
   else if(u==0xF) while(ui<ul&&sl>=6) {  //! 5 bits
      sl -= 6; 
      v = U.charCodeAt(ui++); var v2 = U.charCodeAt(ui++), v3 = U.charCodeAt(ui++), v4 = U.charCodeAt(ui++), v5 = U.charCodeAt(ui++);
      v -= v<92 ? 36 : 37; v2 -= v2<92 ? 36 : 37; v3 -= v3<92 ? 36 : 37; v4 -= v4<92 ? 36 : 37; v5 -= v5<92 ? 36 : 37;
      O[p++] = (v>>1&31)+r; O[p++] = (v<<4&16|v2>>2&15)+r; O[p++] = (v2<<3&24|v3>>3&7)+r; O[p++] = (v3<<2&28|v4>>4&3)+r; O[p++] = (v4<<1&30|v5>>5&1)+r; O[p++] = (v5&31)+r;
      }
   if(un&0x80 && texts!=null) for(;oi<O.length;oi++) O[oi] = texts[O[oi]];
   P[0] = ui; if(P[0]<ul&&sl) while(sl-->0) O[p++] = UTF8STORE.ReadValue(U,un,P[0],texts,utexts,options,P);
   return O;
   }


//! --- Every value has its un ---
var UN0 = ucodes[0], si = 1, un = UN0, unl = ucodes.length, sl = length||unl; if(options&32){ si = p%unl; un = ucodes[si++]; if(si==unl) si = 0; sl += si-1; }
var uu = un&0x7c7f; if(uu<0x8||uu>0xF) ui = Math.floor(ui+0.95);
while(1){
   
   //! --- Whole chars ---
   while(uu<0x8||uu>0xF) {
      if(ui>=ul) { if(P) P[0] = ui; return O; }
      var size = UTF8STORE.GetUCodeSize(un);
      if(size) { O[p++] = UTF8STORE.ReadValue(U,un,ui,texts,utexts,options); ui += size; }
      else { if(!P) P = []; O[p++] = UTF8STORE.ReadValue(U,un,ui,texts,utexts,options,P); ui = P[0]; }
      if(si>=sl) { if(P) P[0] = ui; return O; }
      if(si==unl){ sl -= si; si = 0; }
      un = ucodes[si++]; if(un==null) un = UN0; uu = un&0x7c7f;
      if(utexts&&options&16){ texts = utexts; utexts = null; }
      } 

   //! --- Bits ---
   var u = Math.floor(ui); v = U.charCodeAt(u); 
   ui = Math.floor(ui*100)-u*100;
   if(ui>=95){ v = U.charCodeAt(++u); if(u>=ul) { if(P) P[0] = ui; return O; } ui = 0; } //! Bad rounding, value is in the next char
   var b = ui<5 ? 0 : ui<25 ? 1 : ui<45 ? 2 : ui<55 ? 3 : ui<75 ? 4 : 5;
   v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130;
   while(1){
      var r = un>=0&&un<=65535||un&0x8000 ? 0 : un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16, o;
      if(uu==0xB) { o = (v>>(5-b)&1)+r; b++; } //! 1 bit
      else if(uu==0xC){ //! 2 bits
         if(b<=4){ o = (v>>(4-b)&3)+r; b += 2; }
         else { 
            v2 = U.charCodeAt(++u); v2 -= v2<92 ? 36 : v2<133 ? 37 : v2<160 ? 38 : v2<0x2028 ? 39 : v2<0xd800 ? 41 : v2<0xfdd0 ? 2089 : v2<0xfff0 ? 2121 : 2130; 
            o = ((v&1)<<1 | v2>>5&1)+r; b = 1; v = v2; 
            }
         }
      else if(uu==0xD){ //! 3 bits
         if(b<=3){ o = (v>>(3-b)&7)+r; b += 3; }
         else {
            v2 = U.charCodeAt(++u); v2 -= v2<92 ? 36 : v2<133 ? 37 : v2<160 ? 38 : v2<0x2028 ? 39 : v2<0xd800 ? 41 : v2<0xfdd0 ? 2089 : v2<0xfff0 ? 2121 : 2130;
            if(b==4) { o = ((v&3)<<1 | v2>>5&1)+r; b = 1; } 
            else { o = ((v&1)<<2 | v2>>4&3)+r; b = 2;  } 
            v = v2; 
            }
         }
      else if(uu==0xE){ //! 4 bits
         if(b<=2) { o = (v>>(2-b)&15)+r; b += 4; }
         else {
            v2 = U.charCodeAt(++u); v2 -= v2<92 ? 36 : v2<133 ? 37 : v2<160 ? 38 : v2<0x2028 ? 39 : v2<0xd800 ? 41 : v2<0xfdd0 ? 2089 : v2<0xfff0 ? 2121 : 2130;
            if(b==3) { o = ((v&7)<<1 | v2>>5&1)+r; b = 1;  } 
            else if(b==4) { o = ((v&3)<<2 | v2>>4&3)+r; b = 2; } 
            else { o = ((v&1)<<3 | v2>>3&7)+r; b = 3; } 
            v = v2; 
            }
         }
      else if(uu==0xF){ //! 5 bits
         if(b<=1) { o = (v>>(1-b)&31)+r; b += 5; }
         else {
            v2 = U.charCodeAt(++u); v2 -= v2<92 ? 36 : v2<133 ? 37 : v2<160 ? 38 : v2<0x2028 ? 39 : v2<0xd800 ? 41 : v2<0xfdd0 ? 2089 : v2<0xfff0 ? 2121 : 2130; 
            if(b==2) { o = ((v&15)<<1 | v2>>5&1)+r; b = 1;  } 
            else if(b==3) { o = ((v&7)<<2 | v2>>4&3)+r; b = 2;  } 
            else if(b==4) { o = ((v&3)<<3 | v2>>3&7)+r; b = 3; } 
            else { o = ((v&1)<<4 | v2>>2&15)+r; b = 4; } 
            v = v2; 
            }
         }
      else { //! Multi bits
         if(b) { v = v&((1<<6-b)-1) | (v&~63)>>b; if(v>=53) v -= 3; else if(v>=50) v -= 53; }
         if(v<0) o = v==-3 ? null : v==-1 ? "" : NaN;
         else if(uu<=0x9) o = uu!=0x9 ? v+r : ((v&1)!=0 ? -(v>>1)-1 : v>>1)+r;
         else if(texts==null&&(utexts==null||~un&0x8000)) o = NaN;
         else if(un&0x8000) o = UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts);
         else o = UTF8STORE.ReadValueNum(texts[v],un,options);//! string or 2 CHARS number
         b = 6;
         }
      if(un&0x80 && texts!=null && uu>=0xB){ o = texts[o]; if(un&0x300) o = UTF8STORE.UnescapeUN(o,un>>8&3,options); }
      O[p++] = o;
      if(u>=ul) { if(P) P[0] = b?u+b/6:u; return O; }
      if(si>=sl) { if(P) P[0] = b?u+b/6:u; return O; }
      if(si==unl){ sl -= si; si = 0; }
      un = ucodes[si++]; if(un==null) un = UN0; uu = un&0x7c7f;
      if(uu<0x8||uu>0xF) { ui = b?u+1:u; if(P) P[0] = ui; break; }
      if(b==6) { v = U.charCodeAt(++u); v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130; b = 0; if(u>=ul) { if(P) P[0] = ui; return O; } }
      if(utexts&&options&16){ texts = utexts; utexts = null; }
      }
   }
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Converts string to number according to the options. Support function for ReadValue and ReadValues.
UTF8STORE.ReadValueNum = function(s,un,options){
if(typeof(s)!="string") return s;
if(un&0x300) s = UTF8STORE.UnescapeUN(s,un>>8&3,options);
if(~options&1) return s;
var v = s-0; return (options&2 ? v+""==s : v||v===0) ? v : s;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Converts unicode string in U on position ui (ui is in chars regardless on un size; ui can be null for 0) to number according to FastGrid un type
//! The texts is array of strings that are indexed by value
//! utexts is joined string as utexts passed to WriteValue. Except for 0xc0 <= un <= 0xff is array of next strings.
//! If set P, sets P[0] to the next ui
//! --- Value R ---
UTF8STORE.ReadValue = function(U,ucode,index,texts,utexts,options,index_out){
if(typeof(U)!="string") return null;
var v, v2, v3, v4, v5, un = ucode, P = index_out;

//! --- Special 1 CHAR without strings or string only without escape, as fast as possible --- Basic1 R ---
if(un<=0x3&&un>0){
   var ui = index ? Math.floor(index+0.95) : 0; if(P!=null) P[0] = ui+1;
   v = U.charCodeAt(ui);
   if(v<=35) return v==33 ? null : v==32 ? NaN : ""; 
   v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130; 
   if(un==0x3) return texts==null ? NaN : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v]; //! Returns string for 0x3
   return un==0x1 ? v : v&1 ? -(v>>1)-1 : v>>1; //! Returns integer for 0x1 / 0x2
   }

//! --- Fixed length data --- FixData R ---
if(un>=0x2000&&un<=0x23ff){
   var l = un-0x2000; if(!l) return null;
   var ui = index ? Math.floor(index+0.95) : 0;
   if(P!=null) P[0] = ui+l;
   return U.slice(ui,ui+l);
   }

var uspec = un&0x7c4f; //! un without bytes (0x30), var string (0x80), escape (0x300) and next chars 2 (0x7ff8000)

//! --- Special bits - 0xB = 1 bit (values 0/1, 6 per byte), 0xC = 2 bits (values 0-3, 3 per byte), 0xD = 3 bits (values 0-7, 2 per byte), ... bigger bits go first --- 
//! --- Bits R ---
if(uspec<=0xF && uspec>=0x8 && !(un&0x30)){ 
   var u = index ? Math.floor(index) : 0, a = index ? Math.floor(index*100)-u*100 : 0, nus = ~un&0x80||texts==null, us = !nus&&~options&1&&!(un&0x300); v = U.charCodeAt(u); v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130; 
   var r = un>=0&&un<=65535||un&0x8000||un&0x80 ? 0 : un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
   if(uspec==0xB){  //! 1 bit
      if(a<95){ if(P!=null) P[0] = a<75 ? (index||0)+1/6 : u+1; v = a<5 ? v>>5&1 : a<25 ? v>>4&1 : a<45 ? v>>3&1 : a<55 ? v>>2&1 : a<75 ? v>>1&1 : v&1; return nus ? v+r : us ? texts[v] : UTF8STORE.ReadValueNum(texts[v],un,options); }
      if(P!=null) P[0] = u+1/6; var v2 = U.charCodeAt(u+1); v2 -= v2<92 ? 35 : 36; return nus ? ((v2>>5)&1)+r : us ? texts[(v2>>5)&1] : UTF8STORE.ReadValueNum(texts[(v2>>5)&1],un,options); //! Bad rounding, value is in the next char
      }
   if(uspec==0xC){  //! 2 bits
      if(a<5) { if(P!=null) P[0] = u+1/3; return nus ? (v>>4&3)+r : us ? texts[v>>4&3] : UTF8STORE.ReadValueNum(texts[v>>4&3],un,options); }
      if(a<25){ if(P!=null) P[0] = u+0.5; return nus ? (v>>3&3)+r : us ? texts[v>>3&3] : UTF8STORE.ReadValueNum(texts[v>>3&3],un,options); }
      if(a<45){ if(P!=null) P[0] = u+2/3; return nus ? (v>>2&3)+r : us ? texts[v>>2&3] : UTF8STORE.ReadValueNum(texts[v>>2&3],un,options); }
      if(a<55){ if(P!=null) P[0] = u+5/6; return nus ? (v>>1&3)+r : us ? texts[v>>1&3] : UTF8STORE.ReadValueNum(texts[v>>1&3],un,options); }
      if(a<75){ if(P!=null) P[0] = u+1; return nus ? (v&3)+r : us ? texts[v&3] : UTF8STORE.ReadValueNum(texts[v&3],un,options); }
      var v2 = U.charCodeAt(u+1); v2 -= v2<92 ? 36 : 37;
      if(a<95){ if(P!=null) P[0] = u+7/6; return nus ? ((v&1)<<1 | v2>>5&1)+r : us ? texts[(v&1)<<1 | v2>>5&1] : UTF8STORE.ReadValueNum(texts[(v&1)<<1 | v2>>5&1],un,options); } //! 1. bit in the first char, 2. bit in the next char
      if(P!=null) P[0] = u+4/3; return nus ? ((v2>>4)&3)+r : us ? texts[(v2>>4)&3] : UTF8STORE.ReadValueNum(texts[(v2>>4)&3],un,options); //! Bad rounding, value is in the next char
      }
   if(uspec==0xD){  //! 3 bits
      if(a<5) { if(P!=null) P[0] = u+0.5; return nus ? (v>>3&7)+r : us ? texts[v>>3&7] : UTF8STORE.ReadValueNum(texts[v>>3&7],un,options); }
      if(a<25){ if(P!=null) P[0] = u+2/3; return nus ? (v>>2&7)+r : us ? texts[v>>2&7] : UTF8STORE.ReadValueNum(texts[v>>2&7],un,options); }
      if(a<45){ if(P!=null) P[0] = u+5/6; return nus ? (v>>1&7)+r : us ? texts[v>>1&7] : UTF8STORE.ReadValueNum(texts[v>>1&7],un,options); } 
      if(a<55){ if(P!=null) P[0] = u+1; return nus ? (v&7)+r : us ? texts[v&7] : UTF8STORE.ReadValueNum(texts[v&7],un,options); }
      var v2 = U.charCodeAt(u+1); v2 -= v2<92 ? 36 : 37;
      if(a<75){ if(P!=null) P[0] = u+7/6; return nus ? ((v&3)<<1 | v2>>5&1)+r : us ? texts[(v&3)<<1 | v2>>5&1] : UTF8STORE.ReadValueNum(texts[(v&3)<<1 | v2>>5&1],un,options); } //! 1. and 2. bit in the first char, 3. bit in the next char
      if(a<95){ if(P!=null) P[0] = u+4/3; return nus ? ((v&1)<<2 | v2>>4&3)+r : us ? texts[(v&1)<<2 | v2>>4&3] : UTF8STORE.ReadValueNum(texts[(v&1)<<2 | v2>>4&3],un,options); } //! 1. bit in the first char, 2. and 3. bit in the next char
      if(P!=null) P[0] = u+1.5; return nus ? ((v2>>3)&7)+r : us ? texts[(v2>>3)&7] : UTF8STORE.ReadValueNum(texts[(v2>>3)&7],un,options); //! Bad rounding, value is in the next char
      }
   if(uspec==0xE){  //! 4 bits
      if(a<5) { if(P!=null) P[0] = u+2/3; return nus ? (v>>2&15)+r : us ? texts[v>>2&15] : UTF8STORE.ReadValueNum(texts[v>>2&15],un,options); }
      if(a<25){ if(P!=null) P[0] = u+5/6; return nus ? (v>>1&15)+r : us ? texts[v>>1&15] : UTF8STORE.ReadValueNum(texts[v>>1&15],un,options); }
      if(a<45){ if(P!=null) P[0] = u+1; return nus ? (v&15)+r : us ? texts[v&15] : UTF8STORE.ReadValueNum(texts[v&15],un,options); } 
      var v2 = U.charCodeAt(u+1); v2 -= v2<92 ? 36 : 37;
      if(a<55){ if(P!=null) P[0] = u+7/6; return nus ? ((v&7)<<1 | v2>>5&1)+r : us ? texts[(v&7)<<1 | v2>>5&1] : UTF8STORE.ReadValueNum(texts[(v&7)<<1 | v2>>5&1],un,options); } //! 1., 2. and 3. bit in the first char, 4. bit in the next char
      if(a<75){ if(P!=null) P[0] = u+4/3; return nus ? ((v&3)<<2 | v2>>4&3)+r : us ? texts[(v&3)<<2 | v2>>4&3] : UTF8STORE.ReadValueNum(texts[(v&3)<<2 | v2>>4&3],un,options); } //! 1. and 2. bit in the first char, 3. and 4. bit in the next char
      if(a<95){ if(P!=null) P[0] = u+1.5; return nus ? ((v&1)<<3 | v2>>3&7)+r : us ? texts[(v&1)<<3 | v2>>3&7] : UTF8STORE.ReadValueNum(texts[(v&1)<<3 | v2>>3&7],un,options); } //! 1. bit in the first char, 2., 3. and 4. bit in the next char
      if(P!=null) P[0] = u+1.5; return nus ? ((v2>>2)&15)+r : us ? texts[(v2>>2)&15] : UTF8STORE.ReadValueNum(texts[(v2>>2)&15],un,options); //! Bad rounding, value is in the next char
      }
   if(uspec==0xF){  //! 5 bits
      if(a<5) { if(P!=null) P[0] = u+5/6; return nus ? (v>>1&31)+r : us ? texts[v>>1&31] : UTF8STORE.ReadValueNum(texts[v>>1&31],un,options); }
      if(a<25){ if(P!=null) P[0] = u+1; return nus ? (v&31)+r : us ? texts[v&31] : UTF8STORE.ReadValueNum(texts[v&31],un,options); }
      var v2 = U.charCodeAt(u+1); v2 -= v2<92 ? 36 : 37;
      if(a<45){ if(P!=null) P[0] = u+7/6; return nus ? ((v&15)<<1 | v2>>5&1)+r : us ? texts[(v&15)<<1 | v2>>5&1] : UTF8STORE.ReadValueNum(texts[(v&15)<<1 | v2>>5&1],un,options); } //! 1., 2., 3. and 4. bit in the first char, 5. bit in the next char
      if(a<55){ if(P!=null) P[0] = u+4/3; return nus ? ((v&7)<<2 | v2>>4&3)+r : us ? texts[(v&7)<<2 | v2>>4&3] : UTF8STORE.ReadValueNum(texts[(v&7)<<2 | v2>>4&3],un,options); }  //! 1., 2. and 3. bit in the first char, 4. and 5. bit in the next char
      if(a<75){ if(P!=null) P[0] = u+1.5; return nus ? ((v&3)<<3 | v2>>3&7)+r : us ? texts[(v&3)<<3 | v2>>3&7] : UTF8STORE.ReadValueNum(texts[(v&3)<<3 | v2>>3&7],un,options); }  //! 1. and 2. bit in the first char, 3., 4. and 5. bit in the next char
      if(a<95){ if(P!=null) P[0] = u+5/3; return nus ? ((v&1)<<4 | v2>>2&15)+r : us ? texts[(v&1)<<4 | v2>>2&15] : UTF8STORE.ReadValueNum(texts[(v&1)<<4 | v2>>2&15],un,options); } //! 1. bit in the first char, 2., 3., 4. and 5. bit in the next char
      if(P!=null) P[0] = u+1.5; return nus ? ((v2>>1)&31)+r : us ? texts[(v2>>1)&31] : UTF8STORE.ReadValueNum(texts[(v2>>1)&31],un,options); //! Bad rounding, value is in the next char
      }
   if(a>=95) { index = u+1; un -= 7; uspec -= 7; } //! Bad rounding, uses next char without bits and continues as 0x1 / 0x2
   else if(a<5) { un -= 7; uspec -= 7; }        //! Without other bits, continues as 0x1 / 0x2
   else {
      v = a<25 ? v&31|(v&~63)>>1 : a<45 ? v&15|(v&~63)>>2 : a<55 ? v&7|(v&~63)>>3 : a<75 ? v&3|(v&~63)>>4 : v&1|(v&~63)>>5;
      if(v>=53) v -= 3; else if(v>=50) return v==50 ? null : v==51 ? NaN : "";
      if(P!=null) P[0] = u+1;
      if(uspec==0xA){ //! Returns string for 0x3
         if(texts==null&&(utexts==null||~un&0x8000)) return NaN;
         if(un&0x8000) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
         return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
         }
      return uspec==0x8 ? v : v&1 ? -(v>>1)-1 : v>>1; //! Returns integer for 0x8 / 0x9
      }
   } 

var ui = index ? Math.floor(index+0.95) : 0;

if(uspec<=0x80 && (uspec>=0x40||(un&0xff)==0x80)){

   //! --- Separated strings --- SepStr R ---
   if(un&0x80 && (un&0xff)!=0x80){
      var u = un&0xdf, c = un&0x20 ? "" : un>32768 ? String.fromCharCode(un>>15) : " ";
      v = U.charCodeAt(ui);
      if(u<=0xc3){ //! Variable count of strings
         if(v==32) { if(P) P[0] = ui+1; return ""; }                         //! "" as " "
         if(v==33){ v2 = U.charCodeAt(ui+1); if(v2<=33) { if(P) P[0] = ui+2; return v2==33 ? null : NaN; } } //! null as "!!" or NaN as "! "
         if(texts==null) { if(P){ while(U.charCodeAt(ui++)!=32&&ui<U.length); P[0] = ui; } return NaN; }
         var o = "", bb = u==0xc1||u==0xc3; if(bb){ var ostr = texts; if(!utexts) utexts = texts; }
         while(1){
            if(v!=33) o += texts[u<=0xc1 ? v - (v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130) : UTF8STORE.ReadValue(U,0x11,ui++)];
            else if(u<=0xc1 && U.charCodeAt(ui+1)>33) { o += texts[UTF8STORE.ReadValue(U,0x11,++ui)]; ui++; }
            v = U.charCodeAt(++ui);
            if(v==32||v==null) { if(P) P[0] = ui+1; return un&0x300 ? UTF8STORE.UnescapeUN(o,un>>8&3,options) : o; }
            o += c;
            if(bb) texts = texts==utexts ? ostr : utexts;
            }
         }
      if(P) P[0] = ui+UTF8STORE.CUNChars[u-0xc0];
      if(texts==null) return NaN;
      if(v==32) return "";
      var t = UTF8STORE.CUNTypes[u-0xc0];
      if(v==33){ var v2 = U.charCodeAt(ui+1); if(t&1||v2!=35) return v2==33 ? null : NaN; }
      var o = t&1 ? v - (v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130) : UTF8STORE.ReadValue(U,0x11,ui++); //! If the first part is 1 char
      if(~t&64) o = texts[o];//! The first part is not a number
      else if(o<0||o===""){ c = ""; o = ""; } //! The first part was not a number
      v = U.charCodeAt(++ui);
      if(v==32) return un&0x300 ? UTF8STORE.UnescapeUN(o,un>>8&3,options) : o;
      var ostr = texts; if(t&8&&utexts!=null) texts = utexts; //! If the second part is from utexts
      v = t&2 ? v - (v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130) : UTF8STORE.ReadValue(U,0x11,ui++); //! If the second part is 1 char
      o += c + (t&128 ? v : texts[v]);//! The second part is a number
      if(u<=0xd1) return un&0x300 ? UTF8STORE.UnescapeUN(o,un>>8&3,options) : o;
      v = U.charCodeAt(++ui);
      if(v==32) return un&0x300 ? UTF8STORE.UnescapeUN(o,un>>8&3,options) : o;
      if(t&16) texts = utexts ? utexts : ostr; //! If the third part is from utexts, but the second part is from texts
      else if(t&32) texts = ostr;      //! If the third part is from texts, but the second part is from utexts
      o += c + texts[t&4 ? v - (v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130) : UTF8STORE.ReadValue(U,0x11,ui++)]; //! If the third part is 1 char
      return un&0x300 ? UTF8STORE.UnescapeUN(o,un>>8&3,options) : o;
      }

   //! --- Fixed length string --- FixStr R ---
   //! 0x41 (1 char) - 0x80 (64 chars)
   var l = (un&0xff)-0x40; if(!l) return null;
   if(P!=null) P[0] = ui+l;
   v = U.charCodeAt(ui);
   if(l==1) return v==0x381 ? null : v==0x380 ? NaN : v==0x7f ? "" : U[ui];
   if(v==0x7f) { v2 = U.charCodeAt(ui+1); return v2==33 ? null : v2==32 ? "" : v2==0x7f ? NaN : UTF8STORE.ReadValue(U,(l==2?0x3:l==3?0x13:0x23)|un&0x300,ui+1,texts,null,options); }
   var s = U.slice(ui,ui+l), p = s.indexOf("\x7f"); if(p>=0) s = s.slice(0,p);
   return un&0x300 ? UTF8STORE.UnescapeUN(s,un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(s,un,options) : s;
   }

var ubytes = un&48, vs = un&0x80, un2 = un&0x8000 && un&0x1c00; v = U.charCodeAt(ui);

//! --- 1 CHAR  --- Char1 R ---
if(!ubytes){
   if(P!=null) P[0] = ui+1;
   if(v==33) return null;   //! For 33 always returns null

   //! --- Base positive and integer with var string or escape --- Var1 R ---
   if(uspec<=0x3){
      if(v==35&&(!vs||!un2||U.charCodeAt(ui+1)==33)) return "";
      if(vs){ if(v<=33||uspec==0x3) return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options); } //! Returns var string or 2 CHAR number
      else if(v<=33) return v==33 ? null : v==32 ? NaN : ""; 
      v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130;
      if(uspec==0x3){ //! string or 2 CHARS number
         if(texts==null&&(utexts==null||!un2)) return NaN;
         if(un2) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
         return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
         }
      return uspec==0x1 ? v : v&1 ? -(v>>1)-1 : v>>1;  //! Returns integer
      }

   //! --- Date 1 char --- Date1 R ---
   if(uspec>=0x4&&uspec<=0x7){
      if(v<=35){
         if(!vs) return v==33 ? null : v==32 ? NaN : ""; 
         if(U.charCodeAt(ui+1)<=33){ if(P!=null) P[0] = ui+2; return v==32 ? NaN : ""; }
         return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options); //! Returns var string or 2 CHAR number
         }
      v -= v<92 ? 36 : v<133 ? 37 : v<160 ? 38 : v<0x2028 ? 39 : v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130; 
      var max = UTF8STORE.CUNDate1[uspec-4];
      if(v>=max){ //! String or un2
         if(texts==null&&(utexts==null||!un2)) return NaN;
         var smax = 63400+max>>1; if(v>=smax) return un&0x300 ? UTF8STORE.UnescapeUN(texts[v-smax],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v-smax],un,options) : texts[v-smax];
         v -= max; return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,0x24|un&0xFFFF8080,!utexts||typeof(utexts)!="string"?0:v*3,texts,null,options);
         }
      if(uspec==0x4){ //! yyyy-MM-dd
         v = (v&1 ? -(v>>1)-1 : v>>1) + (un>0x8000||un<0 ? (un>>>15) + 1900*384 : 2025*384);
         var y = Math.floor(v/384); v = v%384;
         v = options&4 ? new Date(Date.UTC(y,v>>5,(v&31)+1)) : new Date(y,v>>5,(v&31)+1); return options&8 ? v-0 : v;
         }
      if(uspec==0x5){ //! MM-dd HH:mx
         var h = Math.floor(v/384); v = v%384; 
         v = options&4 ? new Date(Date.UTC(un>0x8000?un>>>15:1970,v>>5,(v&31)+1,h%24,h>=24?Math.floor(h/24)*15:0)) : new Date(un>0x8000?un>>>15:1970,v>>5,(v&31)+1,h%24,h>=24?Math.floor(h/24)*15:0); 
         return options&8 ? v-0 : v;
         } 
      if(uspec==0x6){
         if(un>=0&&un<=0x8000){ v = options&4 ? new Date(Date.UTC(1970,0,1,v>>12,(v>>6)&63,v&63)) : new Date(1970,0,1,v>>12,(v>>6)&63,v&63); return options&8 ? v-0 : v; } //! hh:mm:ss (max 12 hours)
         var h = un&0x80000000; if(h) un &= 0x7FFFFFFF;
         var y = Math.floor((un>>>15)/384)+1950, b = (un>>>15)%384; 
         v = options&4 ? new Date(Date.UTC(y,b>>5,(b&31)+1,(h?12:0)+(v>>12),(v>>6)&63,v&63)) : new Date(y,b>>5,(b&31)+1,(h?12:0)+(v>>12),(v>>6)&63,v&63); //! hh:mm:ss (max 12 hours) + base
         return options&8 ? v-0 : v;
         }
      var m = Math.floor(v/1440); if(m) m = m>=30 ? (m-30)*10+5 : m<<1;        
      if(un>=0&&un<=0x8000){ v = options&4 ? new Date(Date.UTC(1970,0,1,v%24,Math.floor(v/24)%60,m)) : new Date(1970,0,1,v%24,Math.floor(v/24)%60,m); return options&8 ? v-0 : v; }  //! HH:mm:sx
      var y = Math.floor((un>>>15)/384)+1900, b = (un>>>15)%384; 
      v = options&4 ? new Date(Date.UTC(y,b>>5,(b&31)+1,v%24,Math.floor(v/24)%60,m)) : new Date(y,b>>5,(b&31)+1,v%24,Math.floor(v/24)%60,m);  //! HH:mm:sx + base
      return options&8 ? v-0 : v;
      }

   //! --- 1 CHAR var string or null/NaN/"" ---
   if(v<=35) {
      if(v==35){
         if(!vs||!un2) return "";
         if(U.charCodeAt(ui+1)==33){ if(P) P[0] = ui+2; return ""; }
         }
      return vs ? UTF8STORE.FromVarStringUN(v,un,U,ui,P,options) : NaN;
      }

   //! --- 1 CHAR numbers --- Num1 R ---
   var uneg = un&0x40; 
   if(v<92) v -= 36; else if(v<133) v -= 37; else if(v<160) v -= 38; else if(v<0x2028) v -= 39;
   else if(un&0x7000) {                 //! limit > 0
      var ulim = un>>12&7, min = uneg&&!un2 ? 0 : ulim<=4 ? -100 : -10000, max = ulim==1||ulim==5 ? 50000 : ulim==2||ulim==6 ? 40000 : ulim==3||ulim==7 ? 20000 : 10000;
      v -= v<0xd800 ? 41 : v<0xfdd0 ? 2089 : v<0xfff0 ? 2121 : 2130;
      if(v>(un2&&ulim>4?max+100:max)-min){ //! string or 2 CHARS number
         v -= un2&&ulim<=4 ? max-min-99 : max-min+1;
         if(texts==null&&(utexts==null||!un2)) return NaN;
         //if(un2&&un>65536) return UTF8STORE.ReadValue(!utexts?texts[v-100]:typeof(utexts)!="string"?utexts[v-100]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?(v-100)*5:(v-100)*3):un&0x100000?(v-100)<<1:(v-100),texts,null,options);
         if(un2&&un>65536) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
         return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
         }
      else if(v>(un2&&ulim>4?max+100:max)&&(!un2||ulim>4)) v = un2&&ulim>4?max-v+100:max-v;
      }
   else if(uneg&&!un2?v>=65122:v>=65222) {  //! 1 CHAR string for limit = 0
      v -= uneg||un2 ? (v<0xfff0 ? 65122 : 65131) : (v<0xfff0 ? 65222 : 65231);
//!      !utexts ? 0 : un&0x200000 ? (un&0x100000 ? v*5 : v*3) : un&0x100000 ? v<<1 : v;
//!      !utexts?0:un&0x20000?(un&0x10000?v*5:v*3):un&10000?v<<1:v
      if(texts==null&&(utexts==null||!un2)) return NaN;
      if(un2&&un>65536) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
      return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
      }
   else v = v<0xd800 ? v-41 : v<0xfdd0 ? v-2089 : v<65122||un2 ? v-2121 : 65121-v; //! number for limit = 0
   if(un2) {
      if(v>=173) v -= 100;
      else if(v>=73) { 
         v -= 73; 
         if(texts==null&&(utexts==null||!un2)) return NaN;
         if(un2&&un>65536) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
         return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v]; 
         }
      }
   if(un&0x800) { //! round
      var m = 0; if(uneg) { m = v&1; if(m) v++; }
      if(un&0x400){  //! hundreds
         var ulim = un>>12&7, max = ulim==0 ? 630 : ulim==1||ulim==5 ? 500 : ulim==2||ulim==6 ? 400 : ulim==3||ulim==7 ? 200 : 100;
         if(v<=max) {  if(uneg) v = m ? -v*50 : v*50; else if(v>0) v *= 100; } 
         else { v = Math.ceil((v-max-0.999)*1.0101010101010101); if(uneg) v = m ? -(v>>1) : v>>1; }
         }
      else { //! tens
         var ulim = un>>12&7, max = ulim==0 ? 6300 : ulim==1||ulim==5 ? 5000 : ulim==2||ulim==6 ? 4000 : ulim==3||ulim==7 ? 2000 : 1000;
         if(v<=max) { if(uneg) v = m ? -v*5 : v*5; else if(v>0) v *= 10; }  //! tens
         else { v = Math.ceil((v-max-0.99)*1.11111111111111111); if(uneg) v = m ? -(v>>1) : v>>1; }
         }
      }
   else if(uneg) v = v&1 ? -(v>>1)-1 : v>>1;
   var udiv = un&15; if(udiv) v = udiv>=5&&udiv<=12 ? v*UTF8STORE.CUNDiv1[udiv] : v/UTF8STORE.CUNDiv1M[udiv];     //! divide
   if((un>65535||un<0)&&!un2) { //! base
      var b = un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
      v += udiv<=4 ? b : udiv<=12 ? b*UTF8STORE.CUNDiv1[udiv] : b/UTF8STORE.CUNDiv1M[udiv];
      }
   return v;
   }     

//! --- 2 CHARS --- Char2 R ---
v2 = U.charCodeAt(ui+1);
if(ubytes==0x10){
   if(P!=null) P[0] = ui+2;
   if(v<=35){
      if(v==33 && v2<=35) return v2==32 ? NaN : v2==33 ? null : "";
      if(v==32) return vs ? UTF8STORE.FromVarStringUN(v,un,U,ui,P,options) : U[ui+1]; //! 1 char
      if(v==35) return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options); //! char 2 + var string
      }
   if(vs&&uspec==0x3) return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options);

   //! --- Reads data 2 chars --- Data2 R ---
   v2 -= v2<92 ? 35 : v2<133 ? 36 : v2<160 ? 37 : v2<0x2028 ? 38 : v2<0xd800 ? 40 : v2<0xfdd0 ? 2088 : v2<0xfff0 ? 2120 : 2129;
   v -= v<92 ? 35 : v<133 ? 36 : v<160 ? 37 : v<0x2028 ? 38 : v<0xd800 ? 40 : v<0xfdd0 ? 2088 : v<0xfff0 ? 2120 : 2129;
   //if(v<=80) v += v2<2010 ? (v<65 ? (v2<92 ? (v2<<6)-1 : (v2<<6)+38047) : (v2<<4)+5823) : v<65 ? (v2<<6)+2330463 : (v2<<4)+6259615; //! First part of positive number
   if(v<=80) v += v<=64 ? (v2<<6) + (v2<92 ? -1 : v2<2010 ? 32159 : 2201823) : (v2<<4) + (v2<2010 ? 5823 : 6227455); //! First part of positive number
   else if(v<=88||v>=247&&v<=396) {      //! string or 5 CHARS number
      if(v<=88) v += (v2<<3) + (v2<2010 ? -81 : 287887); 
      else if(v<=374) v += (v2<<7) + (v2<2010 ? 15833 : 790921);
      else if(v<=390) v += (v2<<4) + (v2<2010 ? 271513 : 8874345);
      else v += v<=394 ? (v2<<2) + 794441 : (v2<<1) + 9884769;
      if(texts==null&&(utexts==null||!un2)) return NaN;
      if(uspec>=4&&uspec<=7){
         if(~v&1) return UTF8STORE.ReadValue(!utexts?texts[v>>1]:typeof(utexts)!="string"?utexts[v>>1]:utexts,(uspec==0x5?0x25:0x24)|un&0xFFFF8080,!utexts||typeof(utexts)!="string"?0:(v>>1)*3,texts,null,options); //! Date un2
         v >>= 1;
         }
      if(un2) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
      return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
      } 
   else if(v<=246){                      //! Negative number
      if(v<=90) v += (v2<<1) + (v2<92 ? -89 : v2<2010 ? 1921 : 289889);
      else if(v<=91) v += v2 + (v2<2010 ? 93 : 414685);
      else if(v<=219) v += (v2<<7) + (v2<92 ? 5938 : v2<2010 ? 5938 : 727304);
      else if(v<=235) v += (v2<<4) + (v2<2010 ? 261618 : 8810728);
      else v += v<=243 ? (v2<<3) + 477208 : v<=245 ? (v2<<1) + 9821148 : v2 + 9945944;
      if(un&0x40) { 
         v += 10011972; 
         if(texts==null&&(utexts==null||!un2)) return NaN;
         if(un2) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
         return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v]; 
         }
      v = -v; 
      }
   else if(v<=1964) v += v<=1420 ? (v2<<10) + (v2<92 ? 160403 : v2<2010 ? 271827 : 43251571) : v<=1932 ? (v2<<9) + (v2<92 ? 253587 : 12845939) : (v2<<5) + (v2<2010 ? 300179 : 108111411); //! The second part of the positive number
   else if(v<=34732) v += (v2<<15) + (v2<92 ? 7240019 : v2<2010 ? 107125651 : 413588371); //! The third part of the positive number
   else if(v<=51116) v += (v2<<14) + (v2<92 ? 10221907 : v2<2010 ? 171449235 : 2458246035);
   else if(v<=59308) v += (v2<<13) + (v2<92 ? 11712851 : v2<2010 ? 203611027 : 3480574867); 
   else v += (v2<<12) + (v2<92 ? 12458323 : 219691923);

   //! --- Special 2 chars --- Basic2 R ---
   if(uspec==0x1) return v; //! Positive
   if(uspec==0x2){ if(v&1) { v >>= 1; return v<0 ? -v-0x80000001 : -v-1; } else { v >>= 1; return v<0 ? v+0x80000000 : v; } }          //! Integer
   if(uspec==0x3){ //! String
      if(texts==null&&(utexts==null||!un2)) return NaN;
      if(un2) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
      return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];  
      }

   //! Date 2 chars --- Date2 R ---
   if(uspec<=0x6){ 
      var d, t; 
      if(uspec==0x4){ d = v%46296; t = Math.floor(v/46296); } 
      else if(uspec==0x5){ d = v%2775800; t = Math.floor(v/2775800); } 
      else { d = Math.floor(v/86400); t = v%86400; }
      d = (d&1 ? -(d>>1)-1 : d>>1) + (un>0x8000||un<0 ? (un>>>15) + 1900*384 : 2025*384);
      var y = Math.floor(d/384); d = d%384;
      if(t) v = options&4 ? new Date(Date.UTC(y,d>>5,(d&31)+1,t%24,Math.floor(t/24)%60,Math.floor(t/1440))) : new Date(y,d>>5,(d&31)+1,t%24,Math.floor(t/24)%60,Math.floor(t/1440));  //! yyyy-MM-dd HH:mm:ss
      else v = options&4 ? new Date(Date.UTC(y,d>>5,(d&31)+1)) : new Date(y,d>>5,(d&31)+1);           //! yyyy-MM-dd
      if(y<=99&&y>=0) v[options&4?"setUTCFullYear":"setFullYear"](y);
      return options&8 ? v-0 : v;
      }  

    //! --- Time 2 chars ---
   if(uspec==0x7){
      if(un<0x8000&&un>=0){ 
         v = options&4 ? new Date(Date.UTC(1970,0,1,v%24,Math.floor(v/24)%60,Math.floor(v/1440)%60,Math.floor(v/86400))) : new Date(1970,0,1,v%24,Math.floor(v/24)%60,Math.floor(v/1440)%60,Math.floor(v/86400));  //! HH:mm:ss.fff
         return options&8 ? v-0 : v;
         }
      var d = (un>>>15) + 1900*384, y = Math.floor(d/384); d = d%384;
      v = options&4 ? new Date(Date.UTC(y,d>>5,(d&31)+1,v%24,Math.floor(v/24)%60,Math.floor(v/1440)%60,Math.floor(v/86400))) : new Date(y,d>>5,(d&31)+1,v%24,Math.floor(v/24)%60,Math.floor(v/1440)%60,Math.floor(v/86400)); //! yyyy-MM-dd HH:mm:ss.fff
      return options&8 ? v-0 : v;
      }

   //! --- Single float, 134 = 111+23 (111 is base bias, 23 is added for normalization a implicit 24 bit) --- Float2 R ---
   if(uspec==0xF){ 
      if(v<=0) return (v&1 ? (v>>1)+1 : -v>>1);
      var e = Math.floor(v/0x1000000)-134, m = v&0x800000; 
      v = e>=-133  ? (v&0x7fffff)|0x800000 : (v&0x7fffff)<<1;
      v =  e>=128 ? v*(1<<(e&31))*0x100000000000000000000000000000000 : e>=96 ? v*(1<<(e&31))*0x1000000000000000000000000 
           : e>=64 ? v*(1<<(e&31))*0x10000000000000000 : e>=32 ? v*(1<<(e&31))*0x100000000 : e>=0 ? v*(1<<(e&31)) 
           : e>-32 ? v/(1<<(-e&31)) : e>-64 ? v/(1<<(-e&31))/0x100000000 : e>-96 ? v/(1<<(-e&31))/0x10000000000000000 
           : e>-128 ? v/(1<<(-e&31))/0x1000000000000000000000000 : v/(1<<(-e&31))/0x100000000000000000000000000000000;
      return UTF8STORE.UTF8Round(v<0?(m?v:-v):m?-v:v,7,38); //! Round to 7 digits
      }

   //! --- Number 2 chars --- Num2 R ---
   var uneg = un&0x40, m = 0; if(uneg) { m = v&1; if(m) v++; }
   var urnd = un&0x1c00;
   if(urnd>0x400) {   //! round
      if(urnd==0x800)       v = v<0 ? (v<-1e6 ? Math.floor((v+1000000.99)*1.1111111111111111) : v*10)     : v>4e8 ? Math.ceil((uneg?v/2-200000000.99:v-400000000.99)*1.1111111111111111) : uneg ? v*5     : v*10; 
      else if(urnd==0xc00)  v = v<0 ? (v<-1e5 ? Math.floor((v+100000.999)*1.0101010101010101) : v*100)    : v>4e7 ? Math.ceil((uneg?v/2-20000000.999:v-40000000.999)*1.0101010101010101) : uneg ? v*50    : v*100; 
      else if(urnd==0x1000) v = v<0 ? (v<-1e4 ? Math.floor((v+10000.9999)*1.0010010010010010) : v*1000)   : v>4e6 ? Math.ceil((uneg?v/2-2000000.9999:v-4000000.9999)*1.0010010010010010) : uneg ? v*500   : v*1000;
      else if(urnd==0x1400) v = v<0 ? (v<-1e3 ? Math.floor((v+1000.99999)*1.0001000100010001) : v*10000)  : v>4e5 ? Math.ceil((uneg?v/2-200000.99999:v-400000.99099)*1.0001000100010001) : uneg ? v*5000  : v*10000;
      else if(urnd==0x1800) v = v<0 ? (v<-1e2 ? Math.floor((v+100.999999)*1.0000100001000010) : v*100000) : v>4e4 ? Math.ceil((uneg?v/2-20000.999999:v-40000.999099)*1.0000100001000010) : uneg ? v*50000 : v*100000;
      }  
   else if(uneg) { v >>= 1; if(v<0) v += 0x80000000; }
   if(un&0x6000){ //! digits
      if(~un&0x2000){ if(v>1e8) { var a = Math.floor((v-1)/1e8); v = (v-a*1e8)*UTF8STORE.CUNPow10[a+10]; } }  //! 0x4000 = 8 digits
      else if(un&0x4000) { var a = Math.floor((v-1)/1e7); v = UTF8STORE.UTF8Round(a>=96 ? (v-a*1e7)*UTF8STORE.CUNPow10[a-96] : a>=0 ? (v-a*1e7)/UTF8STORE.CUNPow10[116-a] : 0,a>=2?7:5+a,uneg?100:150); return m ? -v : v; } //! 0x6000 = 7 digits
      else if(v>1e9) v = v<=2e9 ? (v-1e9)*10 : v<=3e9 ? (v-2e9)*100 : (v-3e9)*1000; //! 0x2000 = = 9 digits
      }
   if(m) v = -v;
   var udiv = un&15; if(udiv) v = udiv>=9&&udiv<=12  ? v*UTF8STORE.CUNDiv2[udiv] : v/UTF8STORE.CUNDiv2M[udiv];     //! divide
   if((un>65535||un<0)&&!un2) { //! base
      var b = un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16;
      v += udiv<=8 ? b : udiv<=12 ? b*UTF8STORE.CUNDiv2[udiv] : b/UTF8STORE.CUNDiv2M[udiv];
      }
   return v;
   }

//! --- 3 CHARS --- Char3 R ---
v3 = U.charCodeAt(ui+2);
if(ubytes==0x20){
   if(P!=null) P[0] = ui+3;
   if(v==33) {
      if(v2<=33) return v2==32 ? NaN : v3==33 ? null : ""; //! NaN / null / ""
      if(vs) return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options);
      v = UTF8STORE.ReadValue(U,uspec>=0x4&&uspec<=0x7?0x12:0x11,ui+1);
      if(texts==null&&(utexts==null||!un2&&v>=0)) return NaN;
      if(v<0) return UTF8STORE.ReadValue(!utexts?texts[-v-1]:typeof(utexts)!="string"?utexts[-v-1]:utexts,0x34|un&0xFFFF8080,!utexts||typeof(utexts)!="string"?0:-v*5-5); //! Date 3 chars
      if(un2) return UTF8STORE.ReadValue(!utexts?texts[v]:typeof(utexts)!="string"?utexts[v]:utexts,un&0x380|un>>16&0x7f|un>>13&0x7c00,!utexts||typeof(utexts)!="string"?0:un&0x200000?(un&0x100000?v*5:v*3):un&0x100000?v<<1:v,texts,null,options);
      return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
      }
   if(v==32) return vs ? UTF8STORE.FromVarStringUN(v,un,U,ui,P,options) : v3==127 ? U[ui+1] : U.slice(ui+1,ui+3);                                        //! char + 2 chars
   if(vs&&uspec==0x3) return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options);

   //! --- Reads data 3 chars --- Data3 R ---
   v -= v<92 ? 35 : v<133 ? 36 : v<160 ? 37 : v<0x2028 ? 38 : v<0xd800 ? 40 : v<0xfdd0 ? 2088 : v<0xfff0 ? 2120 : 2129;
   v2 -= v2<92 ? 35 : v2<133 ? 36 : v2<160 ? 37 : v2<0x2028 ? 38 : v2<0xd800 ? 40 : v2<0xfdd0 ? 2088 : v2<0xfff0 ? 2120 : 2129;
   v3 -= v3<92 ? 35 : v3<133 ? 36 : v3<160 ? 37 : v3<0x2028 ? 38 : v3<0xd800 ? 40 : v3<0xfdd0 ? 2088 : v3<0xfff0 ? 2120 : 2129;
   if(v<92){ //! 1++
      if(v2<92) v = v3<2010 ? v*184920+v2*2010+v3 : v*5647880+v2*61390+v3+1584411318;                                                                 //! 1+1+(1-2) / 1+1+3
      else if(v2<2010) v = v3<2010 ? v*3855180+v2*2010+v3+33061672 : v*117746020+v2*61390+v3+24283241038;                                             //! 1+2+(1-2) / 1+2+3
      else v = v3<92 ? v*5647880+v2*92+v3+1064623448 : v3<2010 ? v*117746020+v2*1918+v3+45950303336 : v*3768732100+v2*61390+v3+752062422090;          //! 1+3+1 / 1+3+2 / 1+3+3
      }
   else if(v<2010){ //! 2++
      if(v2<92) v = v3<92 ? v*8464+v2*92+v3+16233952 : v3<2010 ? v*176456+v2*1918+v3+371689108 : v*5647880+v2*61390+v3+34601917798;                   //! 2+1+1 / 2+1+2 / 2+1+3
      else if(v2<2010) v = v3<92 ? v*176456+v2*92+v3+710123344 : v*121424744+v2*63308+v3+56513186196-70660784;                                                 //! 2+2+1 / 2+2+(2-3)
      else v = v3<92 ? v*5647880+v2*92+v3+56267002568 : v3<2010 ? v*117746020+v2*1918+v3+515512462528 : v*3768732100+v2*61390+v3+8673937296290;       //! 2+3+1 / 2+3+2 / 2+3+3
      }
   else if(v2<92) v = v3<2010 ? v*184920+v2*2010+v3+1732329088 : v*5647880+v2*61390+v3+1087556930390;                                                 //! 3+1+(1-2) / 3+1+3
   else if(v2<2010) v = v3<92 ? v*176456+v2*92+v3+13101572064 : v3<2010 ? v*3678724+v2*1918+v3+293117673492 : v*3886478120+v2*61390+v3+8437385542110; //! 3+2+1 / 3+2+2 / 3+2+3
   else v = v3<2010 ? v*123393900+v2*2010+v3+1197606745300 : v*3886478120+v2*61390+v3+8437385542110;                                                  //! 3+3+(1-2) / 3+3+3

   //! --- Special 3 chars --- Basic3 R ---
   if(uspec==0x1) return v>1e14 ? 1e14-v : v;   //! Positive
   if(uspec==0x2) return v&1 ? (-v-1)/2 : v/2;  //! Integer
   if(uspec==0x3) return texts==null ? NaN : un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];   //! String

   //! --- Date 3 chars --- Date3 R ---
   if(uspec<=0x7){
      var d = uspec==0x5 ? v%2314800000 : v%2314800, t = Math.floor(uspec==0x5 ? v/2314800000 : v/2314800);
      d = (d&1 ? -(d>>1)-1 : d>>1) + (un>0x8000||un<0 ? (un>>>15) + 1900*384 : 2025*384);
      var y = Math.floor(d/384); d = d%384; if(y<0&&d) d += 384;
      v = options&4 ? new Date(Date.UTC(y,d>>5,(d&31)+1,t%24,Math.floor(t/24)%60,Math.floor(t/1440)%60,Math.floor(t/86400))) : new Date(y,d>>5,(d&31)+1,t%24,Math.floor(t/24)%60,Math.floor(t/1440)%60,Math.floor(t/86400)); //! yyyy-MM-dd HH:mm:ss
      if(y<=99&&y>=0) v[options&4?"setUTCFullYear":"setFullYear"](y);
      return options&8 ? v-0 : v;
      }

   //! --- Number 3 chars --- Num3 R ---
   var uneg = un&0x40, m = 0, urnd = un&0x1c00; if(uneg) { m = v&1; if(m) v++; v /= 2; } else if(v>1e14) { m = 1; v = v-1e14; }
   if(urnd>0x400 && v<=1e11) { //! round
      if(urnd==0x800)      v = v>1e10 ? Math.ceil((v-10000000000.99)*1.1111111111111111) : v*10;
      else if(urnd==0xc00)  v = v>1e9 ? Math.ceil((v-1000000000.999)*1.0101010101010101) : v*100;
      else if(urnd==0x1000) v = v>1e8 ? Math.ceil((v-100000000.9999)*1.0010010010010010) : v*1000;
      else if(urnd==0x1400) v = v>1e7 ? Math.ceil((v-10000000.99999)*1.0001000100010001) : v*10000;
      else if(urnd==0x1800) v = v>1e6 ? Math.ceil((v-1000000.999999)*1.0000100001000010) : v*100000;
      }    
   if(un&0x6000){ //! digits
      if(~un&0x2000){ if(v>1e12) { var a = Math.floor((v-1)/1e12); v = (v-a*1e12)*UTF8STORE.CUNPow10[a+10]; } } //! 0x4000 = 12 digits
      else if(un&0x4000) { var a = Math.floor((v-1)/1e11); v = a>=148 ? (v-a*1e11)*UTF8STORE.CUNPow10[a-148] : a>=0 ? (v-a*1e11)/UTF8STORE.CUNPow10[168-a] : 0; return m ? -v : v; }  //! 0x6000 = 11 digits
      else if(v>1e13) { var a = Math.floor((v-1)/1e13); v = (v-a*1e13)*UTF8STORE.CUNPow10[a+10]; } //! 0x2000 = 13 digits  
      }
   if(m) v = -v;
   if(un&15) v /= UTF8STORE.CUNDiv3M[un&15];     //! divide
   if((un>65535||un<0)&&!un2) v += un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16; //! base
   return v;
   }
 
//! --- 5 CHARS --- Char5 R ---
if(un<0&&un>-100) return null;
if(P!=null) P[0] = ui+5;
if(v==32) return vs ? UTF8STORE.FromVarStringUN(v,un,U,ui,P,options) : v3==127 ? U[ui+1] : U.slice(ui+1,ui+(U.charCodeAt(ui+3)==127?3:U.charCodeAt(ui+4)==127?4:5)); //! 1,2,3,4 chars
if(v==33&&v2<=33) return v2==32 ? NaN : v3==33 ? null : v3==35 ? "" : v3==36 ? Infinity : -Infinity;
if(vs&&uspec==0x3) return UTF8STORE.FromVarStringUN(v,un,U,ui,P,options);

//! --- Date5 R ---
if(uspec==0x4&&v!=33){ //! Date 5 chars
   var d = UTF8STORE.ReadValue(U,0x12,ui) + (un>0x8000||un<0 ? (un>>>15) + 1900*384 : 2025*384), t = UTF8STORE.ReadValue(U,0x11,ui+2);
   var y = Math.floor(d/384); d = d%384; if(y<0&&d) d += 384;
   v = options&4 ? new Date(Date.UTC(y,d>>5,(d&31)+1,t%24,Math.floor(t/24)%60,Math.floor(t/1440)%60,Math.floor(t/86400))) : new Date(y,d>>5,(d&31)+1,t%24,Math.floor(t/24)%60,Math.floor(t/1440)%60,Math.floor(t/86400));     //! yyyy-MM-dd HH:mm:ss.fff
   if(y<=99&&y>=0) v[options&4?"setUTCFullYear":"setFullYear"](y);
   return options&8 ? v-0 : v;
   }
v4 = U.charCodeAt(ui+3); v5 = U.charCodeAt(ui+4);
if(v==33){
   if(texts==null) return NaN;
   v2 -= v2<92 ? 35 : 36; v3 -= v3<92 ? 35 : 36; v4 -= v4<92 ? 35 : 36; v5 -= v5<92 ? 35 : 36; v = v2*778688+v3*8464+v4*92+v5;
   return un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];
   }

//! --- Double float, 1 bit sign 11 bits exponent, 52 bits fraction (precision to 15 digits) --- Double5 R ---
if(v<51){
   var e = (((v-35)&7)<<8)+((v2-0x4000)>>7), o = ((v5-0x4000)+((v4-0x4000)<<15))+((v3-0x4000)+((((v2-0x4000)&127)+(e?128:0))<<15))*0x40000000;
   if((v-35)&8) o = -o;
   e -= e ? 1075 : 1074; //! 1075 = 1023+52 (52 is implicit 53. bit)
   if(e<0){ e = -e; for(var i=0;e;i++,e>>=1) if(e&1) o /= UTF8STORE.CUNPow2[i]; if(i==11) o /= 2; }
   else for(var i=0;e;i++,e>>=1) if(e&1) o *= UTF8STORE.CUNPow2[i];
   return o;
   }

//! --- Integer --- Data5 R ---
v -= v<92 ? 35 : v<133 ? 36 : v<160 ? 37 : 38; v2 -= v2<92 ? 35 : v2<133 ? 36 : v2<160 ? 37 : 38; v3 -= v3<92 ? 35 : v3<133 ? 36 : v3<160 ? 37 : 38; 
v4 -= v4<92 ? 35 : v4<133 ? 36 : v4<160 ? 37 : 38; v5 -= v5<92 ? 35 : v5<133 ? 36 : v5<160 ? 37 : 38;
if(v<92){        //! 1++++
   if(v2<92){    //! 1+1+++
      if(v3<92){ //! 1+1+1++
         if(v4<92) v = v*1565162880 + v2*17012640 + v3*184920 + v4*2010 + v5 - 25042606080;    //! 1+1+1+1+(1-2)
         else if(v5<92) v = v*1493523584 + v2*16233952 + v3*176456 + v4*92 + v5 + 95055993072; //! 1+1+1+2+1
         else v = v*31136719936 + v2*338442608 + v3*3678724 + v4*1918 + v5 + 18157989793116;   //! 1+1+1+2+2
         }
      else if(v4<92){ //! 1+1+2+1+
         if(v5<92) v = v*1493523584 + v2*16233952 + v3*8464 + v4*92 + v5 + 208563015232;       //! 1+1+2+1+1
         else v = v*31136719936 + v2*338442608 + v3*176456 + v4*1918 + v5 + 15791583020484;    //! 1+1+2+1+2
         }
      else v = v*31136719936 + v2*338442608 + v3*176456 + v4*92 + v5 + 20524364442384;         //! 1+1+2+2+1 (NO 1+1+2+2+2)
      }
   else if(v3<92){ //! 1+2+1++
      if(v4<92){   //! 1+2+1+1+
         if(v5<92) v = v*1493523584 + v2*778688 + v3*8464 + v4*92 + v5 + 321999947008;         //! 1+2+1+1+1
         else v = v*31136719936 + v2*16233952 + v3*176456 + v4*1918 + v5 + 13423715015716;     //! 1+2+1+1+2
         }
      else v = v*31136719936 + v2*16233952 + v3*176456 + v4*92 + v5 + 11057324292208;          //! 1+2+1+2+1 (NO 1+2+1+2+2)
      }
   else v = v*31136719936 + v2*16233952 + v3*8464 + v4*92 + v5 + 8690932806848;                //! 1+2+2+1+1 (NO 1+2+2+1+2, 1+2+2+2+x)
   }
else if(v2<92){ //! 2+1+++
   if(v3<92){   //! 2+1+1++
      if(v4<92) v = v*1565162880 + v2*17012640 + v3*184920 + v4*2010 + v5 + 315480771072;      //! 2+1+1+1+(1-2)
      else v = v*1493523584 + v2*16233952 + v3*176456 + v4*92 + v5 + 3324053981680;            //! 2+1+1+2+1 (NO 2+1+1+2+2)
      }
   else v = v*1493523584 + v2*16233952 + v3*8464 + v4*92 + v5 + 6188631445568;                 //! 2+1+2+1+1 (NO 2+1+2+1+2, 2+1+2+2+x)
   }
else if(v3<92){ 
   if(v4<92) v = v*32630243520 + v2*17012640 + v3*184920 + v4*2010 + v5 + 20385411352192;      //! 2+2+1+1+(1-2)
   else v = v*31136719936 + v2*16233952 + v3*176456 + v4*92 + v5 + 83107694224112;             //! 2+2+1+2+1 (NO 2+2+1+2+2)
   }
else v = v*31136719936 + v2*16233952 + v3*8464 + v4*92 + v5 + 142827922291136;                 //! 2+2+2+1+1 (NO 2+2+2+1+2, 2+2+2+2+x)

//! --- Basic5 R ---
if(uspec==0x1) return v>1e14 ? 1e14-v : v;
if(uspec==0x2) return v5&1 ? -Math.floor(v/2)-1 : Math.floor(v/2);
if(uspec==0x3) return texts==null ? NaN : un&0x300 ? UTF8STORE.UnescapeUN(texts[v],un>>8&3,options) : options&1 ? UTF8STORE.ReadValueNum(texts[v],un,options) : texts[v];   //! String

//! --- Num5 R ---
var uneg = un&0x40, m = 0, urnd = un&0x1c00; if(uneg) { m = v5&1; if(m) v++; v /= 2; } else if(v>1e14) { m = 1; v = v-1e14; }
if(urnd>0x400 && v<=1e11) { //! round
   if(urnd==0x800)      v = v>1e10 ? Math.ceil((v-10000000000.99)*1.1111111111111111) : v*10;
   else if(urnd==0xc00)  v = v>1e9 ? Math.ceil((v-1000000000.999)*1.0101010101010101) : v*100;
   else if(urnd==0x1000) v = v>1e8 ? Math.ceil((v-100000000.9999)*1.0010010010010010) : v*1000;
   else if(urnd==0x1400) v = v>1e7 ? Math.ceil((v-10000000.99999)*1.0001000100010001) : v*10000;
   else if(urnd==0x1800) v = v>1e6 ? Math.ceil((v-1000000.999999)*1.0000100001000010) : v*100000;
   }    
if(un&0x6000){ //! digits
   if(~un&0x2000){ if(v>1e12) { var a = Math.floor((v-1)/1e12); v = (v-a*1e12)*UTF8STORE.CUNPow10[a+10]; } } //! 0x4000 = 12 digits
   else if(un&0x4000) { var a = Math.floor((v-1)/1e11); v = a>=148 ? (v-a*1e11)*UTF8STORE.CUNPow10[a-148] : a>=0 ? (v-a*1e11)/UTF8STORE.CUNPow10[168-a] : 0; un &= ~7; }  //! 0x6000 = 11 digits
   else if(v>1e13) { var a = Math.floor((v-1)/1e13); v = (v-a*1e13)*UTF8STORE.CUNPow10[a+10]; } //! 0x2000 = 13 digits  
   }
if(m) v = -v;
if(un&15) v /= UTF8STORE.CUNDiv3M[un&15];     //! divide
if((un>65535||un<0)&&!un2) v += un&0x80000000 ? ((un>>16)&0x3FFF)%163*UTF8STORE.CUNPow10[Math.floor(((un>>16)&0x3FFF)/163)]/(un&0x40000000?-1e4:1e4) : un>>16; //! base
return v;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UTF8STORE.ReadInt = function(U,ucode,index,texts,utexts,options,index_out){ var o = UTF8STORE.ReadValue(U,ucode,index,texts,utexts,options|1,index_out); return !o||!isFinite(o) ? 0 : o<-0x80000000 ? -0x80000000 : o>0x7FFFFFFF ? 0x7FFFFFFF : Math.round(o); }
UTF8STORE.ReadDouble = function(U,ucode,index,texts,utexts,options,index_out){ var o = UTF8STORE.ReadValue(U,ucode,index,texts,utexts,options|1,index_out)-0; return !o||!isFinite(o) ? 0 : o-0; }
UTF8STORE.ReadString = function(U,ucode,index,texts,utexts,options,index_out){ var o = UTF8STORE.ReadValue(U,ucode,index,texts,utexts,options&~3,index_out); return o ? (typeof(o)=="object" ? UTF8STORE.ToString(o,options) : o+"") : o===0 ? "0" : ""; }
UTF8STORE.ReadDateTime = function(U,ucode,index,texts,utexts,options,index_out){ var o = UTF8STORE.ReadValue(U,ucode,index,texts,utexts,options|1,index_out); return !o||!isFinite(o) ? null : typeof(o)=="object" ? o : new Date(o); }
UTF8STORE.ReadDate = function(U,ucode,index,texts,utexts,options,index_out){ var o = UTF8STORE.ReadValue(U,ucode,index,texts,utexts,options|1,index_out); if(!o||!isFinite(o)) return null; if(typeof(o)!="object") o = new Date(o); if(o) o.setHours(0,0,0,0); return o; }
UTF8STORE.ReadTime = function(U,ucode,index,texts,utexts,options,index_out){ var o = UTF8STORE.ReadValue(U,ucode,index,texts,utexts,options|1,index_out); if(!o||!isFinite(o)) return null; if(typeof(o)!="object") o = new Date(o); if(o) o.setFullYear(1970,0,1); return o; }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UTF8STORE.TestUCode = function(values,ucode,base,error){
var un = base!=null ? UTF8STORE.AddUCodeBase(ucode,base) : ucode;
var S = {}, S2 = {}; S.length = 0; S2.length = 0; 
var s = UTF8STORE.WriteValues(values,un,error|64,S,S2,0,null,null,null,null,1);
if(s==null) return null;
var s1 = 0; if(S.length) for(var n in S.tmp) s1 += UTF8STORE.GetUTF8Length(n)+1;
var s2 = 0; if(S2.length) for(var n in S2.tmp) s2 += UTF8STORE.GetUTF8Length(n);
return [un, s+s1+s2, s, s1, S.length, s2, S2.length, error];
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! type&1 base, type&2 utexts, type&4 variable strings, type&8 - can reduce digits / precision
//! maxtest - maximum items from values for testing all options. All items are tested only against the few (maxcount) best results.
UTF8STORE.FindUCode = function(values,type,error,options,maxtest,maxcount){
var vs = type&4 ? 0x80 : 0;
var N = [], NN = [], nnl = 0, S = [], SS = {}, ssl = 0, O = [], A = [];  //! N = numbers, S = strings, O = null/NaN/Infinity/"", A = all (strings converted to numbers), SS/NN = strings/numbers as keys, ssl/nnl = count of unique strings / numbers
var T1 = new Date()-0;

for(var i=0;i<values.length;i++) { 
   var s = values[i];
   if(typeof(s)=="number") { A[A.length] = s; if(isFinite(s)) { N[N.length] = s; if(NN[s]==null) NN[s] = nnl++; }  else O[O.length] = s; }
   else if(typeof(s)=="boolean") { A[A.length] = s; N[N.length] = s ? 1 : 0; }
   else if(s==null) { A[A.length] = s; O[O.length] = s; }
   else {
      if(options&1){ var v = s-0; if(isFinite(v)&&(~options&2||v+""==s)){ A[A.length] = v; N[N.length] = v; if(NN[s]==null) NN[s] = nnl++; continue; } } 
      if(typeof(s)=="string"){ A[A.length] = s; if(s==="") O[O.length] = s; else { S[S.length] = s; if(SS[s]==null) SS[s] = ssl++; } }
      }
   }
var T2 = new Date()-0;

N.sort(function(a,b){ return a-b; });
var T3 = new Date()-0;

var nl = N.length, len = ssl+nnl, base = 0, neg = 0; //! base = average value, neg = count of negative numbers
var dec = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  //! dec = count of values with given decimal places (exactly).
var dec2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //! dec2 = count of values acceptable for given decimals in 1 char.
var mul = [0.5,0.2,0.1,0.01,0.001,1/6e4,1/36e5,1/864e5];
for(var ni=0;ni<nl;ni++) {
   var n = N[ni];
   base += n;
   if(n<0) neg++;
   if(Math.abs(Math.floor(n+0.5)-n)>0.0000001){ //! decimal
      for(var i=1;i<=8;i++){ var v = n*UTF8STORE.CUNPow10[i+10]; if(Math.abs(Math.floor(v+0.5)-v)<0.0000001) break; }
      if(i==9) for(;i<=14;i++){ var v = n*UTF8STORE.CUNPow10[i+10]; if(Math.abs(Math.floor(v+0.5)-v)<UTF8STORE.CUNPow10[i-5]) break; }
      dec[i]++;
      if(Math.abs(Math.floor(n*24+0.5)-n*24)<0.0000001) dec2[13]++;       //! hours in day
      if(Math.abs(Math.floor(n*1440+0.5)-n*1440)<0.0000001) dec2[14]++;   //! minutes in day
      if(Math.abs(Math.floor(n*86400+0.5)-n*86400)<0.0000001) dec2[15]++; //! seconds in day
      }
   else { //! integer
      dec[0]++;
      for(var i=0;i<mul.length;i++) if(Math.abs(Math.floor(n*mul[i]+0.5)-n*mul[i])<0.0000001) dec2[i+5]++;
      }
   }
base = Math.round(base/nl);
var UN = [], min = N[Math.floor(nl/100)], max = N[Math.ceil(nl*0.99)-1];           //! min = minimal number on 1 percentile, max maximal number on 99 percentile
for(var i=1,decmax=0;i<dec.length;i++) if(dec[i]>dec[decmax]) decmax = i;          //! decmax = the most often digits count in the numbers
for(var i=dec.length-1,decmin=0;i>=0;i--) if(dec[i]>nl/100) { decmin = i; break; } //! decmin = maximal count of decimals in the numbers
var decpow = decmin ? Math.pow(10,decmin) : 1;                                     //! decpow = 10 ^ decmin
var T4 = new Date()-0;

//! --- Tests maxtest values ---
var AA = A; if(!maxtest) maxtest = 100000;
if(A.length>maxtest*1.1){
   //A.sort();
   var Q = [0.2,0.5,0.1,0.7,0.8,0.3,0.9,0.4,0,0.6];
   var step = A.length/maxtest; A = [];
   for(var i=0;i<maxtest;i++) A[i] = AA[Math.floor(i*step+step*Q[i%10]+0.5)];
   }
var T5 = new Date()-0;

//! --- Main testing function ---
function Test(un,base,e){
if(e==null) { e = error; un += vs; }
var s = UTF8STORE.TestUCode(A,un,base,e);
if(s!=null) UN[UN.length] = s;
}

//! --- Tests first 3 best UN from unl position with the next bytes to utexts ---
//! bytes can be 0x10, 0x20, 0x30
function Test2(bytes,unl){
for(var i=unl,UU=[];i<UN.length;i++) if(UN[i][0]<65536&&UN[i][0]>0) UU[UU.length] = UN[i];
UU.sort(SortCmp);
var p = 0;
for(var ii=0;ii<UU.length;ii++){
   var uu = UU[ii];
   if(uu[4]<len/(!p ? 100 : p==1 ? 20 : 5)) continue;
   if(p++>=3) break;
   if(uu[4]&&bytes==0x10) Test(uu[0]|0x8000);
   for(var b=bytes;b<=bytes;b+=0x10) { //! Now sets b<=bytes instead of 0x30 to use one next bytes un to reduce testing time
      for(var d=0;d<=15;d++) {
         if(d>=9&&b==0x10 ? dec2[d]<nl/50||dec2[d]<dec[decmax]/5/*||!decmin&&d>=9&&d<=12*/ : dec[d]<nl/50||dec[d]<dec[decmax]/5) continue;
         for(var l=0x0000;l<=0x6000;l+=0x2000){
            for(var m=0x400;m<=0x1800;m+=0x400) {
               if(neg<nnl/3) Test((l|m)<<13 | (d|b)<<16 | 0x8000 | uu[0]); 
               if(neg>nnl/5) Test((l|m)<<13 | (d|b|0x40)<<16 | 0x8000 | uu[0]);
               }
            if(~type&8) break;
            }
         }
      }
   }
}

//! --- Compare function for sorting UN ---
function SortCmp(a,b){ return a[1]!=b[1] ? a[1]-b[1] : a[0]-b[0]; }

//! --- bits ---
if(!ssl&&!O.length&&!vs&&len<=32&&!decmin) for(var un=0xB;un<=0xF;un++) if(N[N.length-1]-N[0]<=1<<un-0xA) Test(un|N[0]<<16,N[0],63);
if(!O.length&&!vs&&len<=32) for(var un=0x8B;un<=0x8F;un++) if(len<=1<<un-0x8A) Test(un,null,63);

//! --- 1 char ---
if((!ssl||(error&16)!=(error&32)) && (N[0]>=0&&N[N.length-1]<=63400||(error&4)!=(error&8)) && (!decmin||(error&1)!=(error&2))) Test(0x1);
if((!ssl||(error&16)!=(error&32)) && (N[0]>=-31700&&N[N.length-1]<=31700||(error&4)!=(error&8)) && (!decmin||(error&1)!=(error&2))) Test(0x2);
if(len<=63400) {
   Test(0x3); if(type&2) Test2(0x10,UN.length-1);
   var unl = UN.length;
   for(var d=0;d<=15;d++) {
      if(d<=4 ? dec[d]<nl/50||dec[d]<dec[decmax]/5 : dec2[d]<nl/50||dec2[d]<dec[decmax]/5/*||!decmin&&d>=5&&d<=12*/) continue;
      for(var m=0x400;m<=0xC00;m+=0x400) {
         for(var l=0x0000;l<=0x4000;l+=0x1000){
            if(neg<nl/3) Test(l|m|d); 
            if(neg>nl/5) Test(l|m|d|0x40); 
            if(type&1&&base) Test(l|m|d|0x40,base);
            }
         if(neg<nl/3&&neg>nl/100) for(var l=0x5000;l<=0x7000;l+=0x1000) Test(l|m|d); 
         }
      }
   if(type&2) Test2(0x10,unl); //! utexts
   }  
var T6 = new Date()-0;

//! --- 2,3,5 chars ---
for(var b=0x10;b<=0x30;b+=0x10) {
   //if(b==0x20 && (min>=-2e9/decpow && max<=2e9/decpow||(error&4)!=(error&8)) && UN.length && decmin<15) continue;
   if(b==0x30 && (min>=-1e14/decpow && max<=1e14/decpow||(error&4)!=(error&8)) && UN.length && decmin<15) continue;
   if(!decmin||(error&1)!=(error&2)||b==0x30) { Test(0x1|b); Test(0x2|b); }
   Test(0x03|b); if(type&2 && b==0x10) Test2(0x20,UN.length-1);
   var unl = UN.length;
   for(var d=0;d<=15;d++) {
      if(d>=9&&b==0x10 ? dec2[d]<nl/50||dec2[d]<dec[decmax]/5/*||!decmin&&d>=9&&d<=12*/ : dec[d]<nl/50||dec[d]<dec[decmax]/5) continue;
      for(var l=0x0000;l<=0x6000;l+=0x2000){
         for(var m=0x400;m<=0x1800;m+=0x400) {
            if(neg<nnl/3) Test(l|m|d|b); 
            if(neg>nnl/5) Test(l|m|d|b|0x40); 
            if(type&1&&base) Test(l|m|d|b|0x40,base);
            }
         if(~type&8) break;
         }
      }
   if(type&2) Test2(0x20,unl); //! utexts
   }
if(type&8) Test(0x1F); //! Single float
UN.sort(SortCmp);
var T7 = new Date()-0;

if(AA!=A){
   A = AA;
   var cnt = maxcount || 10; if(UN.length<cnt) cnt = UN.length;
   var ON = UN; UN = [];
   for(var i=0;(i<cnt||UN.length<cnt/2)&&i<ON.length;i++) Test(ON[i][0],null,ON[i][7]);
   UN.sort(SortCmp);
   for(;i<ON.length;i++) { var o = ON[i]; UN[UN.length] = [o[0],Math.round(o[1]*step),Math.round(o[2]*step),Math.round(o[3]*step),o[4],Math.round(o[5]*step),o[6],o[7]]; }
   }
var T8 = new Date()-0;
UN[UN.length] = [T2-T1,T3-T2,T4-T3,T5-T4,T6-T5,T7-T6,T8-T7];
return UN;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Sorts the texts strings array according to the counts
UTF8STORE.SortTexts = function(texts){
if(!texts||!texts.cnt||!texts.tmp) return false;
for(var i=0,N=[],len=texts.length;i<len;i++) N[i] = [i,texts[i],texts.cnt[i]];
for(var n in texts.tmp) N[texts.tmp[n]][3] = n;
N.sort(function(a,b){ return b[2]-a[2]; });  //! Sorts descending, from the biggest count
for(var i=0;i<len;i++){ var A = N[i]; texts[i] = A[1]; texts.cnt[i] = A[2]; texts.tmp[A[3]] = i; }
return true;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Returns all the texts in texts in one string, separated and escaped
UTF8STORE.GetTexts = function(texts,separator,escape){
if(!texts||!texts.length) return "";
if(!separator) separator = "\x7F";
var s = separator+texts.join(separator);
return escape==0 ? s : UTF8STORE.EscapeUN(s,escape||1);
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------