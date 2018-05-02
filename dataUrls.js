//this is where we store all the urls we're going to scrape
var urls = [
    {name:"Metformin",url:'https://www.patientslikeme.com/treatments/show/221'},
    {name:"Insulin Glargine", url: "https://www.patientslikeme.com/treatments/show/8306"},
    {name:"Gabapentin", url: "https://www.patientslikeme.com/treatments/show/279"},
    {name:"Glipizide", url: "https://www.patientslikeme.com/treatments/show/1456"},
    {name:"Glimepiride", url: "https://www.patientslikeme.com/treatments/show/1420"},
    {name:"Duloxetine", url: "https://www.patientslikeme.com/treatments/show/2421"}
    {name:"Pregabalin", url: "https://www.patientslikeme.com/treatments/show/2422"}
    {name:"Clonazepam", url: "https://www.patientslikeme.com/treatments/show/169"}
    {name:"Baclofen", url: "https://www.patientslikeme.com/treatments/show/13"}
    {name:"Levothyroxine", url: "https://www.patientslikeme.com/treatments/show/359"}
    {name:"Bupropion", url: "https://www.patientslikeme.com/treatments/show/1089"}
    {name:"Glatiramer", url: "https://www.patientslikeme.com/treatments/show/7278"}
    {name:"Lamotrigine", url: "https://www.patientslikeme.com/treatments/show/828"}
    {name:"Tramadol", url: "https://www.patientslikeme.com/treatments/show/192"}
    {name:"Setraline", url: "https://www.patientslikeme.com/treatments/show/256"}
    {name:"Venlafaxine", url: "https://www.patientslikeme.com/treatments/show/1091"}
    {name:"Alprazolam", url: "https://www.patientslikeme.com/treatments/show/503"}
    {name:"Fluoxetine", url: "https://www.patientslikeme.com/treatments/show/1090"}
    {name:"Prednisone", url: "https://www.patientslikeme.com/treatments/show/139"}
    {name:"Cabidoplalevodopa", url: "https://www.patientslikeme.com/treatments/show/1036"}
    {name:"Amitriptyline", url: "https://www.patientslikeme.com/treatments/show/164"}
    {name:"Hydrocodoneacetaminophen", url: "https://www.patientslikeme.com/treatments/show/1148"}
    {name:"Citalopram", url: "https://www.patientslikeme.com/treatments/show/390"}
    {name:"Hydrocloroquine", url: "https://www.patientslikeme.com/treatments/show/2255"}
    {name:"Topiramate", url: "https://www.patientslikeme.com/treatments/show/1778"}
    {name:"Escitalopram", url: "https://www.patientslikeme.com/treatments/show/878"}
    {name:"Zolpidem", url: "https://www.patientslikeme.com/treatments/show/1757"}
    {name:"Omeprazole", url: "https://www.patientslikeme.com/treatments/show/584"}
    {name:"Lorazepam", url: "https://www.patientslikeme.com/treatments/show/140"}
    {name:"Albuterol", url: "https://www.patientslikeme.com/treatments/show/153"}
    {name:"Quetiapine", url: "https://www.patientslikeme.com/treatments/show/1616"}
    {name:"Modafinil", url: "https://www.patientslikeme.com/treatments/show/876"}
    {name:"Tizanidine", url: "https://www.patientslikeme.com/treatments/show/389"}
    {name:"Interferon", url: "https://www.patientslikeme.com/treatments/show/2358"}
    {name:"Methotrexate", url: "https://www.patientslikeme.com/treatments/show/143"}
    {name:"Riluzole", url: "https://www.patientslikeme.com/treatments/show/11"}
    {name:"Amphetaminedextroamphetamine", url: "https://www.patientslikeme.com/treatments/show/4253"}
    {name:"Lisinopril", url: "https://www.patientslikeme.com/treatments/show/466"}
    {name:"Natalizumab", url: "https://www.patientslikeme.com/treatments/show/1022"}
    {name:"Interferon", url: "https://www.patientslikeme.com/treatments/show/1014"}
    {name:"Diazepam", url: "https://www.patientslikeme.com/treatments/show/181"}
    {name:"Ropinirole", url: "https://www.patientslikeme.com/treatments/show/972"}
    {name:"Apripiprazole", url: "https://www.patientslikeme.com/treatments/show/3304"}
    {name:"Pramipexole", url: "https://www.patientslikeme.com/treatments/show/308"}
    {name:"Levetiracetam", url: "https://www.patientslikeme.com/treatments/show/3700"}
    {name:"Lithium-carbonate", url: "https://www.patientslikeme.com/treatments/show/777"}
    {name:"Amantadine", url: "https://www.patientslikeme.com/treatments/show/727"}
    {name:"Mycophenolate", url: "https://www.patientslikeme.com/treatments/show/12134"}
    {name:"Divalproex", url: "https://www.patientslikeme.com/treatments/show/7430"}
    {name:"Paroxetine", url: "https://www.patientslikeme.com/treatments/show/198"}
    {name:"Tacrolimus", url: "https://www.patientslikeme.com/treatments/show/15744"}
    {name:"Oxycodone/acetaminophen", url: "https://www.patientslikeme.com/treatments/show/4344"}
    {name:"Carbamazepine", url: "https://www.patientslikeme.com/treatments/show/877"}
    {name:"Interferon", url: "https://www.patientslikeme.com/treatments/show/1017"}
    {name:"Sumatriptan", url: "https://www.patientslikeme.com/treatments/show/2467"}
    {name:"Escomeprazole", url: "https://www.patientslikeme.com/treatments/show/17508"}
    {name:"Methylphenidate", url: "https://www.patientslikeme.com/treatments/show/486"}
    {name:"Dalfampridine", url: "https://www.patientslikeme.com/treatments/show/1929"}
    {name:"Amlopidine", url: "https://www.patientslikeme.com/treatments/show/2517"}
    {name:"Buspirone", url: "https://www.patientslikeme.com/treatments/show/2219"}
    {name:"Montelukast", url: "https://www.patientslikeme.com/treatments/show/1821"}
    {name:"Naltrexone", url: "https://www.patientslikeme.com/treatments/show/4918"}
    {name:"Propoanolol", url: "https://www.patientslikeme.com/treatments/show/582"}
    {name:"Furosemide", url: "https://www.patientslikeme.com/treatments/show/880"}
    {name:"Hydrochlorothiazide", url: "https://www.patientslikeme.com/treatments/show/734"}
    {name:"Azathioprine", url: "https://www.patientslikeme.com/treatments/show/1822"}
    {name:"Morphine", url: "https://www.patientslikeme.com/treatments/show/782"}
    {name:"Nortriptyline", url: "https://www.patientslikeme.com/treatments/show/851"}
    {name:"Fluticasonesalmeterol", url: "https://www.patientslikeme.com/treatments/show/6914"}
    {name:"Oxybutynin", url: "https://www.patientslikeme.com/treatments/show/590"}
    {name:"Methylprednisolone", url: "https://www.patientslikeme.com/treatments/show/1025"}
    {name:"Oxycarbazepine", url: "https://www.patientslikeme.com/treatments/show/1777"}
    {name:"Carisoprodol", url: "https://www.patientslikeme.com/treatments/show/1107"}
    {name:"Fentanyl", url: "https://www.patientslikeme.com/treatments/show/1807"}
    {name:"Adalimumab", url: "https://www.patientslikeme.com/treatments/show/5420"}
    {name:"Carbidopaenta/caponelevodopa", url: "https://www.patientslikeme.com/treatments/show/7294"}
    {name:"Ondansetron", url: "https://www.patientslikeme.com/treatments/show/1088"}
    {name:"Desvenlafaxine", url: "https://www.patientslikeme.com/treatments/show/7448"}
    {name:"Warfarin", url: "https://www.patientslikeme.com/treatments/show/105"}
    {name:"Fluticasone", url: "https://www.patientslikeme.com/treatments/show/8346"}
    {name:"Rosuvastatin", url: "https://www.patientslikeme.com/treatments/show/3697"}
    {name:"Armodafnil", url: "https://www.patientslikeme.com/treatments/show/18862"}
    {name:"Methocabamol", url: "https://www.patientslikeme.com/treatments/show/1731"}
    {name:"Lasartan", url: "https://www.patientslikeme.com/treatments/show/4508"}
    {name:"Vitamin B12 Injection", url: "https://www.patientslikeme.com/treatments/show/303"}
    {name:"Efavirenzemtricitabinetenofovir", url: "https://www.patientslikeme.com/treatments/show/8787"}
    {name:"Lisdexamfetamine", url: "https://www.patientslikeme.com/treatments/show/4346"}
    {name:"Rizatriptan", url: "https://www.patientslikeme.com/treatments/show/5606"}
    {name:"Estradiol", url: "https://www.patientslikeme.com/treatments/show/1604"}
    {name:"Potassium-chloride", url: "https://www.patientslikeme.com/treatments/show/1544"}
    {name:"Prazosin", url: "https://www.patientslikeme.com/treatments/show/5063"}



    
]

//note the command below is necessary to indicate what is available to other files from this file
module.exports = urls;
