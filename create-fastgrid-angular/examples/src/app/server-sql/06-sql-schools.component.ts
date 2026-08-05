import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, FastGridOutputEvent } from "fastgrid-angular";

const img = "<img src='data:image/png;base64,R0lGODdhUAAOAOcAAAAAAHFxcXh4eH9/f4iIiJSUlKKioq6urri4uMTExM7OztXV1dzc3ODg4OTk5O7u7vLy8mlpaUokHwCB/J/URdgF/xYDBP6AgIHguNL4OjAtRCgRRyZ9YYbhmOGoeYhZU5ociCSHwYVbFkEUkLd0Cs0IjDhHY42joKPI/qRWNPHARRGSUHYRNyUZKYc2E2QSQwyW5ZYl6VFpagQGWyY4AuLhQE8jj7LxUAWSyJipTqLNZ5z0J8Po9Gw6Be2yABNUBXIbfXgQjFF9/rvibR3XDwjDo5AbbnS6FdutF4ITzincyAAAAJUd5xISEg8SEg8PDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgIBAUMEAAAAAAd7QPf8UHgJEugAEA3qBzDPd+8HfF/Ht/R+/QAwLTAoEB0aeA+B4IGgSCDkZShGC5IVhAtGkgNBBEC1UCiB5ZkriR+KIIeiuNQ4AqRJFd1EjTprFIAjqGQJBmgdkrDX692UG9xtNqrfZyBViwYCAiEQiAsCYDwN/sTh8CYLF2IAWDsngG/ZDC+VxsDaXRHT4fmoLMJqNH67WWziW96JtbR7nQ2oBAEKXVThaf4fB+NyeSaPkcm4/F+j1YI9DrMD7QAAAJUdvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAABQAA4AAAj+AAEIHAjgwQOCCBEaTMiw4MGGCh9CHLhwosAHCxJAsFgw40aLGDVyDPlxIkmOEA4UkAgx5UqUKlk2dCmTIU2IBh9AIBDAAYSKBHPu7PmzplCePoFSNDg0qVGmSIsidMCggQMFASIgcNCgKkGqVrFq5ep1INirWbd2bfC1Ktqxa9uGTUuW7UAGBQQMEBAhQoC9BBYQxKuXr1/Agu/m3dv3r4DAgxcbdgxZceHGiIM2MNC3c4QCC1g+2Oy5L2jRpEuf1sxZdWjWpT+/DgoBgWcDSi/Wvp274O7OuI3+7hs8oU7bwHsDGB7BQEmEzJ3PRE78OcHo1gdib/iAQPMDAXpmcvduALx4ht2/h3cwXv154+TNsze+YIBGCArsZ8eoH79++v3lJ5JC9d0n4H4FQuDfgEEtsMBHEDSggFEOQighhQ8KFOGE9GW43IUdWsihcaLVdFGJ3KGInookBmUiRzDGKOOMDAUEADs=' height='14'>";

const srcLayout = {

      Script: { 

         //. Shows dialog (in message) to rate the school after click to Rate button
         RateSchool: function(G : TGrid,row : TRow){
            var A = "<table cellspacing=0 cellpadding=0 style='margin-bottom:10px;'>";
            A += "<tr><td align=center colspan=12>Please rate and review the school</td></tr>";
            A += "<tr><td align=center colspan=12 style='color:green;'><b>"+G.GetString(row,G.Cols['CName'])+"</b></td></tr>";
            A += "<tr><td colspan=12><hr></td><tr>";
            A += "<tr>";
            A += "<td><input type=radio class=stars name=stars></td><td><i style='color:6969AA;'>No star</i></td>"
            for(var i=1;i<=5;i++) A += "<td>&nbsp;&nbsp;&nbsp;<input type=radio class=stars name=stars></td><td><div style='width:"+(i*16)+"px;overflow:hidden;'>"+img+"</div></td>";
            A += "</tr>";
            A += "<tr><td colspan=12><br></td><tr>";
            A += "<tr><td colspan=12><textarea id=review rows=4 style='width:100%;'></textarea></td><tr>";
            A += "<tr><td colspan=12><hr></td><tr>";
            A +="</table>";
            G.ShowMessage(A,"Confirm",G.Script.Rate.bind(null,G,row));  
            },

         //. Called after click Ok in RateSchool message, sends the new rating to server
         Rate: function (G:TGrid,row:TRow,button:string): boolean|void {
            if(button!="Ok") return;
            var I = FGrid.GetDocument().querySelectorAll<HTMLInputElement>(".stars");
            for(var i=0;i<I.length;i++) if(I[i].checked) break;
            if(i==I.length){ alert("Please select number of stars"); return true; }
            var review = FGrid.GetDocument().getElementById("review") as HTMLTextAreaElement|null; if(!review) return;
            var D:{ Url:string; Method:string; Debug:number; Param:{ id:string|number; Text:string; Stars?:number; }; } 
                = { Url:"http://localhost:8000/SQLSchools.js?func=setreview", Method:"Form", Debug:1, Param:{ id:row.id, Text:review.value } };
            for(var i=0;i<I.length;i++) if(I[i].checked){ D.Param.Stars = i+1; break; }
            FGrid.AjaxCall(D,"",function(data:any,error:any){
               if(data){
                  var par = G.GetLastChild(row,4) as (TRow & { Children?:number })|null;
                  if(!par) return;
                  if(!par.Children){ //. Loaded already or empty
                     var r = G.Add({ D:"Review" },par) as TRow|null;
                     if(!r) return;
                     G.SetValue(r,G.Cols['CName'],(new Date()).getTime());
                     G.SetValue(r,G.Cols['CCountry'],D.Param.Text);
                     G.SetValue(r,G.Cols['CRating'],D.Param.Stars);
                     }
                  else {
                     par.Children++;
                     G.SetValue(par,G.Cols['CRating'],G.GetValue(par,G.Cols['CRating'],1)+(D.Param.Stars||0));
                     G.Recalculate();
                     }
                  if(data.IO&&data.IO.Message) G.ShowMessage(data.IO.Message,data.IO.Result<0 ? "Error" : "Ok");
                  G.Paint();
                  }
               });
            }
         },
      Cfg: { 
         id:'Schools',
         IndexList:2,       //. All the List attributes use index as the key
         ExpandDigits:-1,   //. The expand buttons in tree show only +, not number of children
         RowHeight:25,      //. Every row will 25 pixels high
         MarkCellsFlags:27, //. Marks editable cells by light green, but does not mark not editable cells
         },
      Actions: { OnClickAddRowEnd:"Grid.Component.addSchool()" }, //. Grid button AddRowEnd calls custom function to add whole school with all child rows
      DefCells: { //. Only cells (not rows / columns) can calculate attributes by Formula. These default cells are assigned according to row / column DA attribute
         MainCCounty: { RightIconsFormula:"Grid.GetList(Row,Col) ? 'List' : ''", ButtonFormula:"Grid.GetList(Row,Col) ? 'List' : ''", NoEditFormula:"Grid.GetList(Row,Col) ? 0 : 1" }, //. Does not show the list for Canada
         MainCRating: { ExportValueFormula:"Grid.GetValue(Row,Col)-1" },
         Link: { LinkFormula:"Value" }
         },
      LeftCols: [
         {  id:'CPanel', D:"Panel", LeftIcons:"DeleteRow" },             //. Delete button in rows
         {  id:'CName', Type:'String', MinWidth:220, Rel:1, NoGroup:1, Names:1 }
         ],
      Cols: [
         {  id:'CCountry', Type:'String', ClearCells:'CState,CCounty', RightIcons:"List", Button:"List", Block:1, Width:115, List: { 0:"Canada", 1:"United States" } },
         { 
            id:'CState', Type:'String', ListRelated:'CCountry', ClearCells:'CCounty', RightIcons:"List", Button:"List", Block:1, Width:105, 
            List: { 
               0:';Alberta;British Columbia;Manitoba;New Brunswick;Newfoundland and Labrador;Nova Scotia;Nunavut Territory;Northwest Territories;Ontario;Prince Edward Island;Quebec;Saskatchewan;Yukon Territory',
               1:';Alabama;Alaska;Arkansas;Arizona;California;Colorado;Connecticut;Delaware;District Of Columbia;Florida;Georgia;Hawaii;Idaho;Illinois;Indiana;Iowa;Kansas;Kentucky;Louisiana;Maine;Maryland;Massachusetts;Michigan;Minnesota;Mississippi;Missouri;Montana;Nebraska;Nevada;New Hampshire;New Jersey;New Mexico;New York;North Carolina;North Dakota;Ohio;Oklahoma;Oregon;Pennsylvainia;Rhode Island;South Carolina;South Dakota;Tennessee;Texas;Utah;Vermont;Virginia;Washington;West Virginia;Wisconsin;Wyoming'
               }
            },
         { id:'CCounty', DA:"CCounty", Type:'String', ListRelated:'CCountry,CState', RightIcons:"List", Button:"List", Block:1, Width:105,
            List: {
               1: {
                  0:';Autauga;Baldwin;Barbour;Bibb;Blount;Bullock;Butler;Calhoun;Chambers;Cherokee;Chilton;Choctaw;Clarke;Clay;Cleburne;Coffee;Colbert;Conecuh;Coosa;Covington;Crenshaw;Cullman;Dale;Dallas;Dekalb;Elmore;Escambia;Etowah;Fayette;Franklin;Geneva;Greene;Hale;Henry;Houston;Jackson;Jefferson;Lamar;Lauderdale;Lawrence;Lee;Limestone;Lowndes;Macon;Madison;Marengo;Marion;Marshall;Mobile;Monroe;Montgomery;Morgan;Perry;Pickens;Pike;Randolph;Russell;Shelby;St Clair;Sumter;Talladega;Tallapoosa;Tuscaloosa;Walker;Washington;Wilcox;Winston',
                  1:';Aleutians East;Aleutians West;Anchorage;Bethel;Bristol Bay;Denali;Dillingham;Fairbanks North Star;Haines;Juneau;Kenai Peninsula;Ketchikan Gateway;Kodiak Island;Lake and Peninsula;Matanuska-Susitna;Nome;North Slope;Northwest Arctic;Prince of Wales-Outer Ketchikan;Sitka;Skagway-Yakutat-Angoon;Southeast Fairbanks;Valdez-Cordova;Wade Hampton;Wrangel-Petersburg;Yakutat;Yukon-Koyukuk',
                  2:';Arkansas;Ashley;Baxter;Benton;Boone;Bradley;Calhoun;Carroll;Chicot;Clark;Clay;Cleburne;Cleveland;Columbia;Conway;Craighead;Crawford;Crittenden;Cross;Dallas;Desha;Drew;Faulkner;Franklin;Fulton;Garland;Grant;Greene;Hempstead;Hot Spring;Howard;Independence;Izard;Jackson;Jefferson;Johnson;Lafayette;Lawrence;Lee;Lincoln;Little River;Logan;Lonoke;Madison;Marion;Miller;Mississippi;Monroe;Montgomery;Nevada;Newton;Ouachita;Perry;Phillips;Pike;Poinsett;Polk;Pope;Prairie;Pulaski;Randolph;Saint Francis;Saline;Scott;Searcy;Sebastian;Sevier;Sharp;Stone;Union;Van Buren;Washington;White;Woodruff;Yell',
                  3:';Apache;Cochise;Coconino;Gila;Graham;Greenlee;La Paz;Maricopa;Mohave;Navajo;Pima;Pinal;Santa Cruz;Yavapai;Yuma',
                  4:';Alameda;Alpine;Amador;Butte;Calaveras;Colusa;Contra Costa;Del Norte;El Dorado;Fresno;Glenn;Humboldt;Imperial;Inyo;Kern;Kings;Lake;Lassen;Los Angeles;Madera;Marin;Mariposa;Mendocino;Merced;Modoc;Mono;Monterey;Napa;Nevada;Orange;Placer;Plumas;Riverside;Sacramento;San Benito;San Bernardino;San Diego;San Francisco;San Joaquin;San Luis Obispo;San Mateo;Santa Barbara;Santa Clara;Santa Cruz;Shasta;Sierra;Siskiyou;Solano;Sonoma;Stanislaus;Sutter;Tehama;Trinity;Tulare;Tuolumne;Ventura;Yolo;Yuba',
                  5:';Adams;Alamosa;Arapahoe;Archuleta;Baca;Bent;Boulder;Broomfield;Chaffee;Cheyenne;Clear Creek;Conejos;Costilla;Crowley;Custer;Delta;Denver;Dolores;Douglas;Eagle;El Paso;Elbert;Fremont;Garfield;Gilpin;Grand;Gunnison;Hinsdale;Huerfano;Jackson;Jefferson;Kiowa;Kit Carson;La Plata;Lake;Larimer;Las Animas;Lincoln;Logan;Mesa;Mineral;Moffat;Montezuma;Montrose;Morgan;Otero;Ouray;Park;Phillips;Pitkin;Prowers;Pueblo;Rio Blanco;Rio Grande;Routt;Saguache;San Juan;San Miguel;Sedgwick;Summit;Teller;Washington;Weld;Yuma',
                  6:';Fairfield;Hartford;Litchfield;Middlesex;New Haven;New London;Tolland;Windham',
                  7:';Kent;New Castle;Sussex',
                  8:';Washington',
                  9:';Alachua;Baker;Bay;Bradford;Brevard;Broward;Calhoun;Charlotte;Citrus;Clay;Collier;Columbia;De Soto;Dixie;Duval;Escambia;Flagler;Franklin;Gadsden;Gilchrist;Glades;Gulf;Hamilton;Hardee;Hendry;Hernando;Highlands;Hillsborough;Holmes;Indian River;Jackson;Jefferson;Lafayette;Lake;Lee;Leon;Levy;Liberty;Madison;Manatee;Marion;Martin;Miami-Dade;Monroe;Nassau;Okaloosa;Okeechobee;Orange;Osceola;Palm Beach;Pasco;Pinellas;Polk;Putnam;Santa Rosa;Sarasota;Seminole;St. Johns;St. Lucie;Sumter;Suwannee;Taylor;Union;Volusia;Wakulla;Walton;Washington',
                  10:';Appling;Atkinson;Bacon;Baker;Baldwin;Banks;Barrow;Bartow;Ben Hill;Berrien;Bibb;Bleckley;Brantley;Brooks;Bryan;Bullock;Burke;Butts;Calhoun;Camden;Candler;Carroll;Catoosa;Charlton;Chatahoochee;Chatham;Chattooga;Cherokee;Clarke;Clay;Clayton;Clinch;Cobb;Coffee;Colquitt;Columbia;Cook;Coweta;Crawford;Crisp;Dade;Dawson;De Kalb;Decatur;Dodge;Dooly;Dougherty;Douglas;Early;Echols;Effingham;Elbert;Emanuel;Evans;Fannin;Fayette;Floyd;Forsyth;Franklin;Fulton;Gilmer;Glascock;Glynn;Gordon;Grady;Greene;Gwinnett;Habersham;Hall;Hancock;Haralson;Harris;Hart;Heard;Henry;Houston;Irwin;Jackson;Jasper;Jeff Davis;Jefferson;Jenkins;Johnson;Jones;Lamar;Lanier;Laurens;Lee;Liberty;Lincoln;Long;Lowndes;Lumpkin;Macon;Madison;Marion;Mcduffie;Mcintosh;Meriwether;Miller;Mitchell;Monroe;Montgomery;Morgan;Murray;Muscogee;Newton;Oconee;Oglethorpe;Paulding;Peach;Pickens;Pierce;Pike;Polk;Pulaski;Putnam;Quitman;Rabun;Randolph;Richmond;Rockdale;Schley;Screven;Seminole;Spalding;Stephens;Stewart;Sumter;Talbot;Taliaferro;Tattnall;Taylor;Telfair;Terrell;Thomas;Tift;Toombs;Towns;Treutlen;Troup;Turner;Twiggs;Union;Upson;Walker;Walton;Ware;Warren;Washington;Wayne;Webster;Wheeler;White;Whitfield;Wilcox;Wilkes;Wilkinson;Worth',
                  11:';Hawaii;Honolulu;Kalawao;Kauai;Maui',
                  12:';Ada;Adams;Bannock;Bear Lake;Benewah;Bingham;Blaine;Boise;Bonner;Bonneville;Boundary;Butte;Camas;Canyon;Caribou;Cassia;Clark;Clearwater;Custer;Elmore;Franklin;Fremont;Gem;Gooding;Idaho;Jefferson;Jerome;Kootenai;Latah;Lemhi;Lewis;Lincoln;Madison;Minidoka;Nez Perce;Oneida;Owyhee;Payette;Power;Shoshone;Teton;Twin Falls;Valley;Washington',
                  13:';Adams;Alexander;Bond;Boone;Brown;Bureau;Calhoun;Carroll;Cass;Champaign;Christian;Clark;Clay;Clinton;Coles;Cook;Crawford;Cumberland;De Kalb;De Witt;Douglas;Du Page;Edgar;Edwards;Effingham;Fayette;Ford;Franklin;Fulton;Gallatin;Greene;Grundy;Hamilton;Hancock;Hardin;Henderson;Henry;Iroquois;Jackson;Jasper;Jefferson;Jersey;Jo Daviess;Johnson;Kane;Kankakee;Kendall;Knox;La Salle;Lake;Lawrence;Lee;Livingston;Logan;Macon;Macoupin;Madison;Marion;Marshall;Mason;Massac;Mc Donough;Mc Henry;Mc Lean;Menard;Mercer;Monroe;Montgomery;Morgan;Moultrie;Ogle;Peoria;Perry;Piatt;Pike;Pope;Pulaski;Putnam;Randolph;Richland;Rock Island;Saline;Sangamon;Schuyler;Scott;Shelby;St Clair;Stark;Stephenson;Tazewell;Union;Vermilion;Wabash;Warren;Washington;Wayne;White;Whiteside;Will;Williamson;Winnebago;Woodford',
                  14:';Adams;Allen;Bartholomew;Benton;Blackford;Boone;Brown;Carroll;Cass;Clark;Clay;Clinton;Crawford;Daviess;De Kalb;Dearborn;Decatur;Delaware;Dubois;Elkhart;Fayette;Floyd;Fountain;Franklin;Fulton;Gibson;Grant;Greene;Hamilton;Hancock;Harrison;Hendricks;Henry;Howard;Huntington;Jackson;Jasper;Jay;Jefferson;Jennings;Johnson;Knox;Kosciusko;La Porte;Lagrange;Lake;Lawrence;Madison;Marion;Marshall;Martin;Miami;Monroe;Montgomery;Morgan;Newton;Noble;Ohio;Orange;Owen;Parke;Perry;Pike;Porter;Posey;Pulaski;Putnam;Randolph;Ripley;Rush;Scott;Shelby;Spencer;St Joseph;Starke;Steuben;Sullivan;Switzerland;Tippecanoe;Tipton;Union;Vanderburgh;Vermillion;Vigo;Wabash;Warren;Warrick;Washington;Wayne;Wells;White;Whitley',
                  15:';Adair;Adams;Allamakee;Appanoose;Audubon;Benton;Blackhawk;Boone;Bremer;Buchanan;Buena Vista;Butler;Calhoun;Carroll;Cass;Cedar;Cerro Gordo;Cherokee;Chickasaw;Clarke;Clay;Clayton;Clinton;Crawford;Dallas;Davis;Decatur;Delaware;Des Monies;Dickinson;Dubuque;Emmet;Fayette;Floyd;Franklin;Fremont;Greene;Grundy;Guthrie;Hamilton;Hancock;Hardin;Harrison;Henry;Howard;Humboldt;Ida;Iowa;Jackson;Jasper;Jefferson;Johnson;Jones;Keokuk;Kossuth;Lee;Linn;Louisa;Lucas;Lyon;Madison;Mahaska;Marion;Marshall;Mills;Mitchell;Monona;Monroe;Montgomery;Muscatine;O&apos;brien;Osceola;Page;Palo Alto;Plymouth;Pocahontas;Polk;Pottawattamie;Poweshiek;Ringgold;Sac;Scott;Shelby;Sioux;Story;Tama;Taylor;Union;Van Buren;Wapello;Warren;Washington;Wayne;Webster;Winnebago;Winneshiek;Woodbury;Worth;Wright',
                  16:';Allen;Anderson;Atchison;Barber;Barton;Bourbon;Brown;Butler;Chase;Chautauqua;Cherokee;Cheyenne;Clark;Clay;Cloud;Coffey;Comanche;Cowley;Crawford;Decatur;Dickinson;Doniphan;Douglas;Edwards;Elk;Ellis;Ellsworth;Finney;Ford;Franklin;Geary;Gove;Graham;Grant;Gray;Greeley;Greenwood;Hamilton;Harper;Harvey;Haskell;Hodgeman;Jackson;Jefferson;Jewell;Johnson;Kearny;Kingman;Kiowa;Labette;Lane;Leavenworth;Lincoln;Linn;Logan;Lyon;Marion;Marshall;Mcpherson;Meade;Miami;Mitchell;Montgomery;Morris;Morton;Nemaha;Neosho;Ness;Norton;Osage;Osborne;Ottawa;Pawnee;Phillips;Pottawatomie;Pratt;Rawlins;Reno;Republic;Rice;Riley;Rooks;Rush;Russell;Saline;Scott;Sedgwick;Seward;Shawnee;Sheridan;Sherman;Smith;Stafford;Stanton;Stevens;Sumner;Thomas;Trego;Wabaunsee;Wallace;Washington;Wichita;Wilson;Woodson;Wyandotte',
                  17:';Adair;Allen;Anderson;Ballard;Barren;Bath;Bell;Boone;Bourbon;Boyd;Boyle;Bracken;Breathitt;Breckinridge;Bullit;Butler;Caldwell;Calloway;Campbell;Carlisle;Carroll;Carter;Casey;Christian;Clark;Clay;Clinton;Crittenden;Cumberland;Daviess;Edmonson;Elliot;Estill;Fayette;Fleming;Floyd;Franklin;Fulton;Gallatin;Garrard;Grant;Graves;Grayson;Green;Greenup;Hancock;Hardin;Harlan;Harrison;Hart;Henderson;Henry;Hickman;Hopkins;Jackson;Jefferson;Jessamine;Johnson;Kenton;Knott;Knox;Larue;Laurel;Lawrence;Lee;Leslie;Letcher;Lewis;Lincoln;Livingston;Logan;Lyon;Madison;Magoffin;Marion;Marshall;Martin;Mason;Mccracken;Mccreary;Mclean;Meade;Menifee;Mercer;Metcalfe;Monroe;Montgomery;Morgan;Muhlenberg;Nelson;Nicholas;Ohio;Oldham;Owen;Owsley;Pendleton;Perry;Pike;Powell;Pulaski;Robertson;Rockcastle;Rowan;Russell;Scott;Shelby;Simpson;Spencer;Taylor;Todd;Trigg;Trimble;Union;Warren;Washington;Wayne;Webster;Whitley;Wolfe;Woodford',
                  18:';Acadia;Allen;Ascension;Assumption;Avoyelles;Beauregard;Bienville;Bossier;Caddo;Calcasieu;Caldwell;Cameron;Catahoula;Claiborne;Concordia;De Soto;East Baton Rouge;East Carroll;East Feliciana;Evangeline;Franklin;Grant;Iberia;Iberville;Jackson;Jefferson;Jefferson Davis;La Salle;Lafayette;Lafourche;Lincoln;Livingston;Madison;Morehouse;Natchitoches;Orleans;Ouachita;Plaquemines;Point Coupee;Rapides;Red River;Richland;Sabine;St. Bernard;St. Charles;St. Helena;St. James;St. John The Baptist;St. Landry;St. Martin;St. Mary;St. Tammany;Tangipahoa;Tensas;Terrebonne;Union;Vermilion;Vernon;Washington;Webster;West Baton Rouge;West Carroll;West Feliciana;Winn',
                  19:';Androscoggin;Aroostook;Cumberland;Franklin;Hancock;Kennebec;Knox;Lincoln;Oxford;Penobscot;Piscataquis;Sagadhoc;Somerset;Waldo;Washington;York',
                  20:';Allegeny;Anne Arundel;Baltimore;Baltimore City;Calvert;Caroline;Carroll;Cecil;Charles;Dorchester;Frederick;Garrett;Harford;Howard;Kent;Montgomery;Prince George&apos;s;Queen Anne&apos;s;Somerset;St. Mary&apos;s;Talbot;Washington;Wicomico;Worcester',
                  21:';Barnstable;Berkshire;Bristol;Dukes;Essex;Franklin;Hampden;Hampshire;Middlesex;Nantucket;Norfolk;Plymouth;Suffolk;Worcester',
                  22:';Alcona;Alger;Allegan;Alpena;Antrim;Arenac;Baraga;Barry;Bay;Benzie;Berrien;Branch;Calhoun;Cass;Charlevoix;Cheboygan;Chippewa;Clare;Clinton;Crawford;Delta;Dickinson;Eaton;Emmet;Genesee;Gladwin;Gogebic;Grand Traverse;Gratiot;Hillsdale;Houghton;Huron;Ingham;Ionia;Iosco;Iron;Isabella;Jackson;Kalamazoo;Kalkaska;Kent;Keweenaw;Lake;Lapeer;Leelanau;Lenawee;Livingston;Luce;Mackinac;Macomb;Manistee;Marquette;Mason;Mecosta;Menominee;Midland;Missaukee;Monroe;Montcalm;Montmorency;Muskegon;Newaygo;Oakland;Oceana;Ogemaw;Ontonagon;Osceola;Oscoda;Otsego;Ottawa;Presque Isle;Roscommon;Saginaw;Sanilac;Schoolcraft;Shiawassee;St. Clair;St. Joseph;Tuscola;Van Buren;Washtenaw;Wayne;Wexford',
                  23:';Aitkin;Anoka;Becker;Beltrami;Benton;Big Stone;Blue Earth;Brown;Carlton;Carver;Cass;Chippewa;Chisago;Clay;Clearwater;Cook;Cottonwood;Crow Wing;Dakota;Dodge;Douglas;Faribault;Fillmore;Freeborn;Goodhue;Grant;Hennepin;Houston;Hubbard;Isanti;Itasca;Jackson;Kanabec;Kandiyohi;Kittson;Koochiching;Lac Qui Parle;Lake;Lake Of The Woods;Le Sueur;Lincoln;Lyon;Mahnomen;Marshall;Martin;Mcleod;Meeker;Mille Lacs;Morrison;Mower;Murray;Nicollet;Nobles;Norman;Olmsted;Otter Tail;Pennington;Pine;Pipestone;Polk;Pope;Ramsey;Red Lake;Redwood;Renville;Rice;Rock;Roseau;Scott;Sherburne;Sibley;St. Louis;Stearns;Steele;Stevens;Swift;Todd;Traverse;Wabasha;Wadena;Waseca;Washington;Watonwan;Wilkin;Winona;Wright;Yellow Medicine',
                  24:';Adams;Alcorn;Amite;Attala;Benton;Bolivar;Calhoun;Carroll;Chickasaw;Choctaw;Claiborne;Clarke;Clay;Coahoma;Copiah;Covington;De Soto;Forrest;Franklin;George;Greene;Grenada;Hancock;Harrison;Hinds;Holmes;Humphreys;Issaquena;Itawamba;Jackson;Jasper;Jefferson;Jefferson Davis;Jones;Kemper;Lafayette;Lamar;Lauderdale;Lawrence;Leake;Lee;Leflore;Lincoln;Lowndes;Madison;Marion;Marshall;Monroe;Montgomery;Neshoba;Newton;Noxubee;Oktibbeha;Panola;Pearl River;Perry;Pike;Pontotoc;Prentiss;Quitman;Rankin;Scott;Sharkey;Simpson;Smith;Stone;Sunflower;Tallahatchie;Tate;Tippah;Tishomingo;Tunica;Union;Walthall;Warren;Washington;Wayne;Webster;Wilkinson;Winston;Yalobusha;Yazoo',
                  25:';Adair;Andrew;Atchison;Audrain;Barry;Barton;Bates;Benton;Bollinger;Boone;Buchanan;Butler;Caldwell;Callaway;Camden;Cape Girardeau;Carroll;Carter;Cass;Cedar;Chariton;Christian;Clark;Clay;Clinton;Cole;Cooper;Crawford;Dade;Dallas;Daviess;Dekalb;Dent;Douglas;Dunklin;Franklin;Gasconade;Gentry;Greene;Grundy;Harrison;Henry;Hickory;Holt;Howard;Howell;Iron;Jackson;Jasper;Jefferson;Johnson;Knox;Laclede;Lafayette;Lawrence;Lewis;Lincoln;Linn;Livingston;Macon;Madison;Maries;Marion;Mcdonald;Mercer;Miller;Mississippi;Moniteau;Monroe;Montgomery;Morgan;New Madrid;Newton;Nodaway;Oregon;Osage;Ozark;Pemiscot;Perry;Pettis;Phelps;Pike;Platte;Polk;Pulaski;Putnam;Ralls;Randolph;Ray;Reynolds;Ripley;Saline;Schuyler;Scotland;Scott;Shannon;Shelby;St. Charles;St. Clair;St. Francois;St. Louis;St. Louis City;Ste. Genevieve;Stoddard;Stone;Sullivan;Taney;Texas;Vernon;Warren;Washington;Wayne;Webster;Worth;Wright',
                  26:';Anaconda - Deer Lodge;Beaverhead;Big Horn;Blaine;Broadwater;Carbon;Carter;Cascade;Chouteau;Custer;Daniels;Dawson;Fallon;Fergus;Flathead;Gallatin;Garfield;Glacier;Golden Valley;Granite;Hill;Jefferson;Judith Basin;Lake;Lewis And Clark;Liberty;Lincoln;Madison;Mccone;Meagher;Mineral;Missoula;Musselshell;Park;Petroleum;Phillips;Pondera;Powder River;Powell;Prairie;Ravalli;Richland;Roosevelt;Rosebud;Sanders;Sheridan;Silver Bow;Stillwater;Sweet Grass;Teton;Toole;Treasure;Valley;Wheatland;Wibaux;Yellowstone;Yellowstone National Park',
                  27:';Adams;Antelope;Arthur;Banner;Blaine;Boone;Box Butte;Boyd;Brown;Buffalo;Burt;Butler;Cass;Cedar;Chase;Cherry;Cheyenne;Clay;Colfax;Cuming;Custer;Dakota;Dawes;Dawson;Deuel;Dixon;Dodge;Douglas;Dundy;Fillmore;Franklin;Frontier;Furnas;Gage;Garden;Garfield;Gosper;Grant;Greeley;Hall;Hamilton;Harlan;Hayes;Hitchcock;Holt;Hooker;Howard;Jefferson;Johnson;Kearney;Keith;Keya Paha;Kimball;Knox;Lancaster;Lincoln;Logan;Loup;Madison;Mcpherson;Merrick;Morrill;Nance;Nemaha;Nuckolls;Otoe;Pawnee;Perkins;Phelps;Pierce;Platte;Polk;Red Willow;Richarson;Rock;Saline;Sarpy;Saunders;Scotts Bluff;Seward;Sheridan;Sherman;Sioux;Stanton;Thayer;Thomas;Thurston;Valley;Washington;Wayne;Webster;Wheeler;York',
                  28:';Carson City;Churchill;Clark;Douglas;Elko;Esmeralda;Eureka;Humboldt;Lander;Lincoln;Lyon;Mineral;Nye;Pershing;Storey;Washoe;White Pine',
                  29:';Belknap;Carroll;Cheshire;Coos;Grafton;Hillsborough;Merrimack;Rockingham;Strafford;Sullivan',
                  30:';Atlantic;Bergen;Burlington;Camden;Cape May;Cumberland;Essex;Gloucester;Hudson;Hunterdon;Mercer;Middlesex;Monmouth;Morris;Ocean;Passaic;Salem;Somerset;Sussex;Union;Warren',
                  31:';Bernalillo;Catron;Chaves;Cibola;Colfax;Curry;Debaca;Dona Ana;Eddy;Grant;Guadalupe;Harding;Hidalgo;Lea;Lincoln;Los Alamos;Luna;Mckinley;Mora;Otero;Quay;Rio Arriba;Roosevelt;San Juan;San Miguel;Sandoval;Santa Fe;Sierra;Socorro;Taos;Torrance;Union;Valencia',
                  32:';Albany;Allegany;Bronx;Broome;Cattaraugus;Cayuga;Chautauqua;Chemung;Chenango;Clinton;Columbia;Cortland;Delaware;Dutchess;Erie;Essex;Franklin;Fulton;Genesee;Greene;Hamilton;Herkimer;Jefferson;Kings;Lewis;Livingston;Madison;Monroe;Montgomery;Nassau;New York;Niagara;Oneida;Onondaga;Ontario;Orange;Orleans;Oswego;Otsego;Putnam;Queens;Rensselaer;Richmond;Rockland;Saratoga;Schenectady;Schoharie;Schuyler;Seneca;St. Lawrence;Steuben;Suffolk;Sullivan;Tioga;Tompkins;Ulster;Warren;Washington;Wayne;Westchester;Wyoming;Yates',
                  33:';Alamance;Alexander;Allegany;Anson;Ashe;Avery;Beaufort;Bertie;Bladen;Brunswick;Buncombe;Burke;Cabarrus;Caldwell;Camden;Carteret;Caswell;Catawba;Chatam;Cherokee;Chowan;Clay;Cleveland;Columbus;Craven;Cumberland;Currituck;Dare;Dave;Davidson;Duplin;Durham;Edgecombe;Forsyth;Franklin;Gaston;Gates;Graham;Granville;Greene;Guilford;Halifax;Harnett;Haywood;Henderson;Hertford;Hoke;Hyde;Iredell;Jackson;Johnson;Jones;Lee;Lenoir;Lincoln;Macon;Madison;Martin;Mcdowell;Mecklenburg;Mitchell;Montgomery;Moore;Nash;New Hanover;Northampton;Onslow;Orange;Pamlico;Pasquotank;Pender;Perquimans;Person;Pitt;Polk;Randolph;Richmond;Robeson;Rockingham;Rowan;Rutherford;Sampson;Scotland;Stanly;Stokes;Surry;Swain;Transylvania;Tyrrell;Union;Vance;Wake;Warren;Washington;Watauga;Wayne;Wilkes;Wilson;Yadkin;Yancey',
                  34:';Adams;Barnes;Benson;Billings;Bottineau;Bowman;Burke;Burleigh;Cass;Cavalier;Dickey;Divide;Dunn;Eddy;Emmons;Foster;Golden Valley;Grand Forks;Grant;Griggs;Hettinger;Kidder;La Moure;Logan;Mchenry;Mcintosh;Mckenzie;Mclean;Mercer;Morton;Mountrail;Nelson;Oliver;Pembina;Pierce;Ramsey;Ransom;Renville;Richland;Rolette;Sargent;Sheridan;Sioux;Slope;Stark;Steele;Stutsman;Towner;Traill;Walsh;Ward;Wells;Williams',
                  35:';Adams;Allen;Ashland;Ashtabula;Athens;Auglaize;Belmont;Brown;Butler;Carroll;Champaign;Clark;Clermont;Clinton;Columbiana;Coshocton;Crawford;Cuyahoga;Darke;Defiance;Delaware;Erie;Fairfield;Fayette;Franklin;Fulton;Gallia;Geauga;Greene;Guernsey;Hamilton;Hancock;Hardin;Harrison;Henry;Highland;Hocking;Holmes;Huron;Jackson;Jefferson;Knox;Lake;Lawrence;Licking;Logan;Lorain;Lucas;Madison;Mahoning;Marion;Medina;Meigs;Mercer;Miami;Monroe;Montgomery;Morgan;Morrow;Muskingum;Noble;Ottawa;Paulding;Perry;Pickaway;Pike;Portage;Preble;Putnam;Richland;Ross;Sandusky;Scioto;Seneca;Shelby;Stark;Summit;Trumbull;Tuscarawas;Union;Van Wert;Vinton;Warren;Washington;Wayne;Williams;Wood;Wyandot',
                  36:';Adair;Alfalfa;Atoka;Beaver;Beckham;Blaine;Bryan;Caddo;Canadian;Carter....;Cherokee;Choctaw;Cimarron;Cleveland;Coal;Commanche;Cotton;Craig;Creek;Custer......;Delaware;Dewey;Ellis;Garfield;Garvin;Grady;Grant;Greer;Harmon;Harper......;Haskell;Hughes;Jackson;Jefferson;Johnston;Kay;Kingfisher;Kiowa;Latimer;Le Flore......;Lincoln;Logan;Love;Major;Marshall;Mayes;Mcclain;Mccurtain;Mcintosh;Murray......;Muskogee;Noble;Nowata;Okfuskee;Oklahoma;Okmulgee;Osage;Ottawa;Pawnee;Payne....;Pittsburg;Pontotoc;Pottawatomie;Pushmataha;Roger Mills;Rogers;Seminole;Sequoyah;Stephens;Texas........;Tillman;Tulsa;Wagoner;Washington;Washita;Woods;Woodward',
                  37:';Baker;Benton;Clackamas;Clatsop;Columbia;Coos;Crook;Curry;Deschutes;Douglas;Gilliam;Grant;Harney;Hood River;Jackson;Jefferson;Josephine;Klamath;Lake;Lane;Lincoln;Linn;Malheur;Marion;Morrow;Multnomah;Polk;Sherman;Tillamook;Umatilla;Union;Wallowa;Wasco;Washington;Wheeler;Yamhill',
                  38:';Adams;Allegheny;Armstrong;Beaver;Bedford;Berks;Blair;Bradford;Bucks;Butler;Cambria;Cameron;Carbon;Centre;Chester;Clarion;Clearfield;Clinton;Columbia;Crawford;Cumberland;Dauphin;Delaware;Elk;Erie;Fayette;Forest;Franklin;Fulton;Greene;Huntingdon;Indiana;Jefferson;Juniata;Lackawanna;Lancaster;Lawrence;Lebanon;Lehigh;Luzerne;Lycoming;Mckean;Mercer;Mifflin;Monroe;Montgomery;Montour;Northampton;Northumberland;Perry;Philadelphia;Pike;Potter;Schuylkill;Snyder;Somerset;Sullivan;Susquehanna;Tioga;Union;Venango;Warren;Washington;Wayne;Westmoreland;Wyoming;York',
                  39:';Bristol;Kent;Newport;Providence;Washington',
                  40:';Abbeville;Aiken;Allendale;Anderson;Bamberg;Barnwell;Beaufort;Berkeley;Calhoun;Charleston;Cherokee;Chester;Chesterfield;Clarendon;Colleton;Darlington;Dillon;Dorchester;Edgefield;Fairfield;Florence;Georgetown;Greenville;Greenwood;Hampton;Horry;Jasper;Kershaw;Lancaster;Laurens;Lee;Lexington;Marion;Marlboro;Mccormick;Newberry;Oconee;Orangeburg;Pickens;Richland;Saluda;Spartanburg;Sumter;Union;Williamsburg;York',
                  41:';Aurora;Beadle;Bennett;Bon Homme;Brookings;Brown;Brule;Buffalo;Butte;Campbell;Charles Mix;Clark;Clay;Codington;Corson;Custer;Davison;Day;Deuel;Dewey;Douglas;Edmunds;Fall River;Faulk;Grant;Gregory;Haakon;Hamlin;Hand;Hanson;Harding;Hughes;Hutchinson;Hyde;Jackson;Jerauld;Jones;Kingsbury;Lake;Lawrence;Lincoln;Lyman;Marshall;Mccook;Mcpherson;Meade;Mellette;Miner;Minnehaha;Moody;Pennington;Perkins;Potter;Roberts;Sanborn;Shannon;Spink;Stanley;Sully;Todd;Tripp;Turner;Union;Walworth;Yankton;Ziebach',
                  42:';Anderson;Bedford;Benton;Bledsoe;Blount;Bradley;Campbell;Cannon;Carroll;Carter;Cheatham;Chester;Claiborne;Clay;Cocke;Coffee;Crockett;Cumberland;Davidson;De Kalb;Decatur;Dickson;Dyer;Fayette;Fentress;Franklin;Gibson;Giles;Granger;Greene;Grundy;Hamblen;Hamilton;Hancock;Hardeman;Hardin;Hawkins;Haywood;Henderson;Henry;Hickman;Houston;Humphreys;Jackson;Jefferson;Johnson;Knox;Lake;Lauderdale;Lawrence;Lewis;Lincoln;Loudon;Macon;Madison;Marion;Marshall;Maury;Mcminn;Mcnairy;Meigs;Monroe;Montgomery;Moore;Morgan;Obion;Overton;Perry;Pickett;Polk;Putnam;Rhea;Roane;Robertson;Rutherford;Scott;Sequatchie;Sevier;Shelby;Smith;Stewart;Sullivan;Sumner;Tipton;Trousdale;Unicoi;Union;Van Buren;Warren;Washington;Wayne;Weakley;White;Williamson;Wilson',
                  43:';Anderson;Andrews;Angelina;Archer;Arkansas;Armstrong;Atascosa;Austin;Bailey;Bandera;Bastrop;Baylor;Bee;Bell;Bexar;Blanco;Bordon;Bosque;Bowie;Brazoria;Brazos;Brewster;Briscoe;Brooks;Brown;Burleson;Burnet;Caldwell;Calhoun;Callahan;Cameron;Camp;Carson;Cass;Castro;Chambers;Cherokee;Childress;Clay;Cochran;Coke;Coleman;Collin;Collingsworth;Colorado;Comal;Comanche;Concho;Cooke;Coryell;Cottle;Crane;Crockett;Crosby;Culberson;Dallam;Dallas;Dawson;De Witt;Deaf Smith;Delta;Denton;Dickens;Dimmit;Donley;Duval;Eastland;Ector;Edwards;El Paso;Ellis;Erath;Falls;Fannin;Fayette;Fisher;Floyd;Foard;Fort Bend;Franklin;Freestone;Frio;Gaines;Galveston;Garza;Gillespie;Glasscock;Goliad;Gonzales;Gray;Grayson;Gregg;Grimes;Guadalupe;Hale;Hall;Hamilton;Hansford;Hardemane;Hardin;Harris;Harrison;Hartley;Haskell;Hays;Hemphill;Henderson;Hidalgo;Hill;Hockley;Hood;Hopkins;Houston;Howard;Hudspeth;Hunt;Hutchinson;Iron;Jack;Jackson;Jasper;Jeff Davis;Jefferson;Jim Hogg;Jim Wells;Johnson;Jones;Karnes;Kaufman;Kendall;Kenedy;Kent;Kerr;Kimble;King;Kinney;Kleberg;Knox;LaSalle;Lamar;Lamb;Lampasas;Lavaca;Lee;Leon;Liberty;Limestone;Lipscomb;Live Oak;Llano;Loving;Lubbock;Lynn;Madison;Marion;Martin;Mason;Matagorda;Maverick;McCulloch;McLennan;McMullen;Medina;Menard;Midland;Milam;Mills;Mitchell;Montague;Montgomery;Moore;Morris;Motley;Nacogdoches;Navarro;Newton;Nolan;Nueces;Ochiltree;Oldham;Orange;Palo Pinto;Panola;Parker;Pamer;Pecos;Polk;Potter;Presidio;Rains;Randall;Reagan;Real;Red River;Reeves;Refugio;Roberts;Robertson;Rockwall;Runnels;Rusk;Sabine;San Augustine;San Jacinto;San Patricio;San Saba;Schleicher;Scurry;Shackelford;Shelby;Sherman;Smith;Somervell;Starr;Stephens;Sterling;Stonewall;Sutton;Swisher;Tarrant;Taylor;Terrell;Terry;Throckmorton;Titus;Tom Green;Travis;Trinity;Tyler;Upshur;Upton;Uvalde;Val Verde;Van Zandt;Victoria;Walker;Waller;Ward;Washington;Webb;Wharton;Wheeler;Wichita;Wilbarger;Willacy;Williamson;Wilson;Winkler;Wise;Wood;Yoakum;Young;Zapata;Zavala',
                  44:';Beaver;Box Elder;Cache;Carbon;Daggett;Davis;Duchesne;Emery;Garfield;Grand;Iron;Juab;Kane;Millard;Morgan;Piute;Rich;Salt Lake;San Juan;Sanpete;Sevier;Summit;Tooele;Uintah;Utah;Wasatch;Washington;Wayne;Weber',
                  45:';Addison;Bennington;Caledonia;Chittenden;Essex;Franklin;Grand Isle;Lamoille;Orange;Orleans;Rutland;Washington;Windham;Windsor',
                  46:';Accomack;Albemarle;Alexandria;Alleghany;Amelia;Amherst;Appomattox;Arlington;Augusta;Bath;Bedford;Bedford;Bland;Botetourt;Bristol;Brunswick;Buchanan;Buckingham;Buena Vista;Campbell;Caroline;Carroll;Charles City;Charlotte;Charlottesville;Chesapeake;Chesterfield;Clarke;Colonial Heights;Covington;Craig;Culpeper;Cumberland;Danville;Dickenson;Dinwiddie;Emporia;Essex;Fairfax;Fairfax;Falls Church;Fauquier;Floyd;Fluvanna;Franklin;Franklin;Frederick;Fredericksburg;Galax;Giles;Gloucester;Goochland;Grayson;Greene;Greensville;Halifax;Hampton;Hanover;Harrisonburg;Henrico;Henry;Highland;Hopewell;Isle of Wight;James City;King and Queen;King George;King William;Lancaster;Lee;Lexington;Loudoun;Louisa;Lunenburg;Lynchburg;Madison;Manassas;Manassas Park;Martinsville;Mathews;Mecklenburg;Middlesex;Montgomery;Nelson;New Kent;Newport News;Norfolk;Northampton;Northumberland;Norton;Nottoway;Orange;Page;Patrick;Petersburg;Pittsylvania;Poquoson;Portsmouth;Powhatan;Prince Edward;Prince George;Prince William;Pulaski;Radford;Rappahannock;Richmond;Richmond;Roanoke;Roanoke;Rockbridge;Rockingham;Russell;Salem;Scott;Shenandoah;Smyth;Southampton;Spotsylvania;Stafford;Staunton;Suffolk;Surry;Sussex;Tazewell;Virginia Beach;Warren;Washington;Waynesboro;Westmoreland;Williamsburg;Winchester;Wise;Wythe;York',
                  47:';Adams;Asotin;Benton;Chelan;Clallam;Clark;Columbia;Cowlitz;Douglas;Ferry;Franklin;Garfield;Grant;Grays Harbor;Island;Jefferson;King;Kitsap;Kittitas;Klickitat;Lewis;Lincoln;Mason;Okanogan;Pacific;Pend Oreille;Pierce;San Juan;Skagit;Skamania;Snohomish;Spokane;Stevens;Thurston;Wahkiakum;Walla Walla;Whatcom;Whitman;Yakima',
                  48:';Barbour;Berkeley;Boone;Braxton;Brooke;Cabell;Calhoun;Clay;Doddridge;Fayette;Gilmer;Grant;Greenbrier;Hampshire;Hancock;Hardy;Harrison;Jackson;Jefferson;Kanawha;Lewis;Lincoln;Logan;Marion;Marshall;Mason;Mcdowell;Mercer;Mineral;Mingo;Monongalia;Monroe;Morgan;Nicholas;Ohio;Pendleton;Pleasants;Pocahontas;Preston;Putnam;Raleigh;Randolph;Ritchie;Roane;Summers;Taylor;Tucker;Tyler;Upshur;Wayne;Webster;Wetzel;Wirt;Wood;Wyoming',
                  49:';Adams;Ashland;Barron;Bayfield;Brown;Buffalo;Burnett;Calumet;Chippewa;Clark;Columbia;Crawford;Dane;Dodge;Door;Douglas;Dunn;Eau Claire;Florence;Fond Du Lac;Forest;Grant;Green;Green Lake;Iowa;Iron;Jackson;Jefferson;Juneau;Kenosha;Kewaunee;La Crosse;Lafayette;Langlade;Lincoln;Manitowoc;Marathon;Marinette;Marquette;Menominee;Milwaukee;Monroe;Oconto;Oneida;Outagamie;Ozaukee;Pepin;Pierce;Polk;Portage;Price;Racine;Richland;Rock;Rusk;Sauk;Sawyer;Shawano;Sheboygan;St. Croix;Taylor;Trempealeau;Vernon;Vilas;Walworth;Washburn;Washington;Waukesha;Waupaca;Waushara;Winnebago;Wood',
                  50:';Albany;Big Horn;Campbell;Carson;Converse;Crook;Fremont;Goshen;Hot Springs;Johnson;Laramie;Lincoln;Natrona;Niobrara;Park;Platte;Sheridan;Sublette;Sweetwater;Teton;Unita;Washakie;Weston'
                  } 
               }
            },
         { id:'CTown', Type:'String', Block:1, Width:85 },
         { id:'CLevel', Type:'String', Block:1, Width:85, List:'|Elementary|Middle|High', RightIcons:"List", Button:"List" },
         { id:'CType', Type:'String', Block:1, Width:60, List:'|Public|Charter|Private', RightIcons:"List", Button:"List" },
         { id:'CGrade1', Type:'String', Block:1, Width:85, List:'|ungraded|PK|K|1|2|3|4|5|6|7|8|9|10|11|12', RightIcons:"List", Button:"List" },
         { id:'CGrade2', Type:'String', Block:1, Width:85, List:'|ungraded|PK|K|1|2|3|4|5|6|7|8|9|10|11|12', RightIcons:"List", Button:"List" },
         { id:'CEnrollment', Type:'Number', Block:1, Width:80 },
         { id:'CStudents', Type:'Number', Block:1, Width:125 }
         ],
      RightCols: [
         { id:'CRating', DA:"CRating", Type:'Html', Block:1, Width:90, NoEdit:1, 
            List: ['<span style="color:#888;font-style:italic;">Not rated yet</span>',
                   '<div style="width:0px;overflow:hidden;">'+img+'</div>',
                   '<div style="width:16px;overflow:hidden;">'+img+'</div>',
                   '<div style="width:32px;overflow:hidden;">'+img+'</div>',
                   '<div style="width:48px;overflow:hidden;">'+img+'</div>',
                   '<div style="width:64px;overflow:hidden;">'+img+'</div>',
                   '<div style="width:80px;overflow:hidden;">'+img+'</div>']
            },
         { id:'CButton', Type:"String", NoFilterBy:1,  },
         { id:'CUser', Type:'String', Width:80 },
         { id:'id', NoEdit:1, NoGroup:1, Formula:"Row.id" }
         ],
      LeftCols_Cfg: { MinWidth:170 },
      Cols_Cfg: { MinWidth:170 },
      RightCols_Cfg: { MinWidth:50 },
      DefRows:{
         Row: { Height:19, V: { CCountry:0, CState:0, CCounty:0, CLevel:0, CType:0, CGrade1:0, CGrade2:0 } }, //. Default for all rows
         Main: { DA:"Main", NoSort:1, CD:'', Collapsed:1, F: { CRating:'return Grid.GetValue(Grid.GetLastChild(Row,4),Grid.Cols.CRating)' }, //. Root row with the school definition
            A: { CButton: { TextColor:"white", CellBorder:"ButtonHigh", Value:"rate", Button:"Rate", OnClick:"Grid.Script.RateSchool(Grid,Row)" } }
            },
         Data: { L:1, NoFilterRow:1, CD:1, NoDelete:1, CS: { CCountry:18 }, A: { CCountry: { Button:"", RightIcons:"" }, CUser: { NoEdit:1 } } }, //. Base for every child row and group row
         Address: { D:'Data', V: { CName:'Address' } },
         Phone: { D:'Data', V: { CName:'Phone' } },
         Link: { D:'Data', V: { CName:'Link for more information' }, A: { CCountry:"Link" } },
         Map: { D:'Data', V: { CName:'Show map' }, A: { CCountry:"Link" } },
         Reviews: { //. Default row for the parent row with reviews
            D:'Data', Collapsed:1,
            V: { CName:'Parent reviews' }, F: { CCountry:'Row.Children||count()', CRating:"return Math.round(Row.Children?Value/Row.Children:sum()/(count()||1))" }, 
            A: { CCountry: { List:'|The school has not been reviewed yet|The school was reviewed once|The school was reviewed twice', NoListValue:'The school was reviewed *Value times' } }
            },
         Review: { D:'Data', L:0, NoEdit:1, Wrap:5, A: { CName: { Type:'Date', Format:'MM/dd/yyyy' } } }, //. One review row on the third level in tree
         Group: { D:'Data', Group:1, Collapsed:1, F: { CRating:"var a = count(); return '<b>'+a+'</b> school'+(a>1?'s':'')" }, A: { CRating:{ List:"" } } } //. Row created by grouping
         },
      Head: [
         {  D:"Header", id:"Header", SortIcons:2, LevelsPart:"Body", CS: { CRating:2 },
            V: { CName:'School name', CCountry:'Country', CState:'State', CCounty:'County', CTown:'Town', CLevel:'Level', CType:'Type', CGrade1:'From grade', CGrade2:'To grade',
                 CEnrollment:'Enrollment', CStudents:'Students / teacher', CUser:'User', CRating: 'Rating', id:'id (debug)' },
            },
         { D:'Filter', id:'Filter', 
            A: { CRating: { List:'|Not rated|No star|One star|Two stars|Three stars|Four stars|Five stars', RightIcons:"List", Button:"List", Range:1, LeftIcons:"", FilterRaw:1  }, 
                 CButton: { CellBorder:"", Value:"" } }
            }
         ],
      Body: { CD:'Main', Tree:"CName" },
      Top: [ { id:"Data", Cells:"Settings,Save,Reload,Print,Pdf,Export,Copy,ExpandRows,CollapseRows,AddRowEnd,Undo,Redo" }, "Layout",
         { id:"Group", D:"Group", Cells:[
            { D:"Group" },
            { id:"GroupList", D:"GroupList", Width:220, 
               List: { 
                  "":"none", "CState,CCounty":"State -> County", "CState,CCounty,CTown":"State -> County -> Town", "CCountry,CState,CCounty,CTown":"Country -> State -> County -> Town", 
                  CLevel:"Level", "CLevel,CState,CCounty":"Level -> State -> County", CType:"Type", CRating:"Rating"
                  } 
               },
            ] },
         ],
      Media: {
         Mobile: { 
            Top: [{ id:"Group", Cells: [{ id:"GroupList", Width:160 }] }]
            }
         }

      };

const src = [
   srcLayout,
   { Url: "http://localhost:8000/SQLSchools.js?func=get", Method: "post", Param: {} },
   {
      Cfg: { SaveUrl: { Url: "http://localhost:8000/SQLSchools.js?func=set", Method: "Post", Param: {} }, PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf" },
      DefRows: { Reviews: { ChildrenUrl: { Url: "http://localhost:8000/SQLSchools.js?func=getratings", Method: "Post" } } }
   }
];

@Component({
   selector:"app-example-server-sql-06-sql-schools",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./06-sql-schools.component.html",
   styleUrl:"./06-sql-schools.component.css",
   host:{ class:"Tutorial" }
   })
export class ServerSql_06SqlSchoolsComponent {
   readonly src = src;
   name = "";
   password = "";
   editMode = false;

   @ViewChild("gridRef") gridRef!:FastGridComponent;

   getGrid() : TGrid|null { return this.gridRef?.grid||null; }

   reload(type:number) : void {
      const grid = this.getGrid();
      if(!this.name&&type!==1) { alert("Please enter your name !"); return; }
      const user = this.name.replace("$","_");
      if(type===2&&!confirm(`Do you want to add new user '${user}' ${this.password ? "with" : "without"} password?`)) return;
      const sourceGrid = (grid as any)?.Sources?.[1];
      const saveSource = (grid as any)?.Sources?.[2];
      if(!grid||!sourceGrid||!saveSource) return;
      sourceGrid.Param = { ...sourceGrid.Param, User:type===1 ? "" : user, Pass:type===1 ? "" : this.password, New:type===2 ? "1" : "0" };
      saveSource.Cfg.SaveUrl.Param = { ...saveSource.Cfg.SaveUrl.Param, User:type===1 ? "" : user, Pass:type===1 ? "" : this.password };
      this.editMode = type!==1;
      grid.Reload();
      }

   addSchool() : void {
      const grid = this.getGrid(); let max = 0;
      grid?.IterAll("Body",function(r:any){ const num = r.id.split("$")[1]-0; if(max<num) max = num; });
      const id = (grid as any)?.Sources?.[1]?.Param?.["User"]+"$"+(max+1)+"$";
      const rows = grid?.Add([{id:id+1},{D:"Address",id:id+2},{D:"Phone",id:id+3},{D:"Link",id:id+4},{D:"Map",id:id+5},{D:"Reviews",id:id+6}],null,null,1) as TRow[]|null;
      if(rows?.length) { grid?.ScrollIntoView(rows[0],grid.FCol||undefined); grid?.Paint(); }
      }

   onTag(event:FastGridOutputEvent<"tag">) : void { event.grid.Component = this; } //. To permit calling addSchool from OnClickAddRowEnd action handler

   readonly onLoadError: TFGrid["OnLoadError"] = () => {
      return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
      };

   expandAll() : void { this.getGrid()?.ActionCollapseAllRows(0,-1); this.getGrid()?.Paint(); }
   collapseAll() : void { this.getGrid()?.ActionCollapseAllRows(0,0); this.getGrid()?.Paint(); }
   chooseColumns() : void { this.getGrid()?.ShowDialog(null as any,null as any,"Layout"); }
   }
