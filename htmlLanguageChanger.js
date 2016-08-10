
// languageNumber
// 0 for hebrew
// 1 for english
var languages = ["Hebrew" , "English"];

function setHTMLtext(languageNumber) {

    console.log("setHTMLtext to " + languages[languageNumber]);

    var direction = "rtl"; // default
    var textAlign = "right"; // default
    if (languageNumber == 0) { //hebrew
        direction = "rtl";
        textAlign = "right";
    }else if (languageNumber == 1){ //english
        direction = "ltr";
        textAlign = "left";
    }

    /*var headlineText = [
        "ויזואליזציית הצבעות בבחירות 2015 לעומת המצב הסוציו-אקונומי של יישובים בישראל",
        "Is there a relation in Israel between socio-aconomic state to voting?"
    ];
    var headline = document.getElementById("headline");
    headline.innerHTML = headlineText[languageNumber];
    headline.style.direction = direction;*/
var headlineText = [
        "דפוסי הצבעה ביחס למצב סוציו-אקונומי",
        "Voting patterns in relation to socio-economic state"
    ];
    var headline = document.getElementById("html_title");
    headline.innerHTML = headlineText[languageNumber];
    headline.style.direction = direction;


    var classLeadText = [
            "ויזואליזציית הקשר בין אופן ההצבעה של יישובים בישראל למצב הסוציו-אקונומי שלהם",
            "Visualization of the connection between voting and socio-economic  state in Israel"
    ];
    var classLead = document.getElementsByClassName("lead");
    classLead[0].innerHTML = classLeadText[languageNumber];
    classLead[0].style.direction = direction;

    var creators_text = [
        "יוצרים: גלעד עיני וודים חכם",
        "Creators: Gilad Eini & Vadim khakham"
    ];
    var creators = document.getElementById("creators");
    creators.innerHTML = creators_text[languageNumber];

    if(language==0){
        creators.style.textAlign = "left";
    }else if(language==1) {
        creators.style.textAlign = "right";
    }


    var radioButtonsText = [
        ["סך הצבעות","אחוזי הצבעה"],
        [ "total votes","percentage"]
    ];
    var radioButtons = document.getElementsByClassName("radioButtonsText");
    radioButtons[0].innerHTML =radioButtonsText[languageNumber][0];
    radioButtons[0].style.direction = direction;
    radioButtons[1].innerHTML =radioButtonsText[languageNumber][1];
    radioButtons[1].style.direction = direction;

    var filterText = [ "הכנס שם עיר או מספר אשכול" , "enter city name or cluster number"];
    var filter = document.getElementById("filter");
    filter.value = "";
    filter.placeholder =filterText[languageNumber];
    filter.style.direction = direction;

/*
    var info_para = document.getElementById("info_para");
    info_para.style.direction = direction;
    info_para.style.textAlign = textAlign;*/

    var resources_text = [ "מקורות" , "Resources"];
    var resources_header = document.getElementById("resourcesHeader");
    resources_header.innerHTML = resources_text[language];
    resources_header.style.direction = direction;
    resources_header.style.textDecoration = "underline";




    var resourcesLine1_text = [ "הנתונים המופיעים בויזואליזציה הם " ,
                                "The Data that appears in the visualization is from the "];
    var resourcesLine1 = document.getElementById("resourcesLine1");
    resourcesLine1.innerHTML = resourcesLine1_text[language];
    resourcesLine1.style.direction = direction;

    /*var link1_text = [ "מבחירות 2015" , "election of 2015 in Israel" ];
    var link1 = document.getElementById("link1");
    link1.innerHTML = link1_text[language];
    link1.href = "http://votes20.gov.il/";
    link1.style.direction = direction;*/





    var resourcesLine2_text = [ "אפיון יישובים " , "characterization of settlements "];
    var resourcesLine2 = document.getElementById("resourcesLine2");
    resourcesLine2.innerHTML = resourcesLine2_text[language];
    resourcesLine2.style.direction = direction;

    /*var link2_text = [ "בישראל מ2008." , "in Israel from 2008." ];
    var link2 = document.getElementById("link2");
    link2.innerHTML = link2_text[language];
    link2.href = "http://cbs.gov.il/publications13/1530/pdf/tab01_01.pdf";
    link2.style.direction = direction;*/



    var resourcesLine3_text = [ "מדד הימין שמאל (הצבע) בויזואליזציה מתייחס לימין-שמאל כלכלי של מפלגות." ,
                                "The Right-Left measurement relate to Economic Right-Left of the parties in Isreal."];
    var resourcesLine3 = document.getElementById("resourcesLine3");
    resourcesLine3.innerHTML = resourcesLine3_text[language];
    resourcesLine3.style.direction = direction;

    var resourcesLine4_text = [ "את נתוני המדד הסקנו " ,
                                "The Data for the Economic Right-Left we got from the "];
    var resourcesLine4 = document.getElementById("resourcesLine4");
    resourcesLine4.innerHTML = resourcesLine4_text[language];
    resourcesLine4.style.direction = direction;

    /*var link4_text = [ "מהכתבה הבאה מאתר כלכליסט." , "next article from Calcalist(Hebrew)" ];
    var link4 = document.getElementById("link4");
    link4.innerHTML = link4_text[language];
    link4.href =  "http://www.calcalist.co.il/local/articles/0,7340,L-3652455,00.html"
    link4.style.direction = direction;*/

}

var languagePartiesHeadersDictionary = [[]];
languagePartiesHeadersDictionary["merets"] = ["מרץ", "Meretz"];
languagePartiesHeadersDictionary["reshima"] = ["הרשימה המשותפת", "Arab List"];
languagePartiesHeadersDictionary["avoda"] = ["המחנה הציוני", "Zionist Union"];
languagePartiesHeadersDictionary["yahadut"] = ["יהדות התורה", "Torah Judaism"];
languagePartiesHeadersDictionary["yahad"] = ["יחד", "Yahad"];
languagePartiesHeadersDictionary["shas"] = ['ש"ס', "Shas"];
languagePartiesHeadersDictionary["atid"] = ["יש עתיד", "Yesh Atid"];
languagePartiesHeadersDictionary["beytenu"] = ["ישראל ביתנו", "Israel Beiteinu"];
languagePartiesHeadersDictionary["benet"] = ["הבית היהודי", "Jewish Home"];
languagePartiesHeadersDictionary["kulanu"] = ["כולנו", "Kulanu"];
languagePartiesHeadersDictionary["likud"] = ["הליכוד", "Likud"];
languagePartiesHeadersDictionary["yarok"] = ["עלה ירוק", "Ale Yarok"];