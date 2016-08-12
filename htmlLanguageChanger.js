
// languageNumber
// 0 for hebrew
// 1 for english
var languages = ["Hebrew" , "English"];

function setHTMLtext(languageNumber) {

    // console.log("setHTMLtext to " + languages[languageNumber]);

    var direction = "rtl"; // default
    var textAlign = "right"; // default
    if (languageNumber == 0) { //hebrew
        direction = "rtl";
        textAlign = "right";
    }else if (languageNumber == 1){ //english
        direction = "ltr";
        textAlign = "left";
    }

    /*first headline*/
    var headlineText = [
        "דפוסי הצבעה ביחס למצב סוציו-אקונומי",
        "Voting patterns in relation to socio-economic state"
    ];
    var headline = document.getElementById("html_title");
    headline.innerHTML = headlineText[languageNumber];
    headline.style.direction = direction;

    /*second headline*/
    var classLeadText = [
            "ויזואליזציית הקשר בין אופן ההצבעה של יישובים בישראל למצב הסוציו-אקונומי שלהם",
            "Visualization of the connection between voting and socio-economic  state in Israel"
    ];
    var classLead = document.getElementsByClassName("lead");
    classLead[0].innerHTML = classLeadText[languageNumber];
    classLead[0].style.direction = direction;

    /*creators names*/
    var creators_text = [
        "יוצרים: גלעד עיני וודים חכם",
        "Creators: Gilad Eini & Vadim Khakham"
    ];
    var creators = document.getElementById("creators");
    creators.innerHTML = creators_text[languageNumber];
    creators.style.textAlign = "center";

    /*radio buttons of precent vs total number*/
    var radioButtonsText = [
        ["סך הצבעות","אחוזי הצבעה"],
        [ "total votes","percentage"]
    ];
    var radioButtons = document.getElementsByClassName("radioButtonsText");
    radioButtons[0].innerHTML =radioButtonsText[languageNumber][0];
    radioButtons[0].style.direction = direction;
    radioButtons[1].innerHTML =radioButtonsText[languageNumber][1];
    radioButtons[1].style.direction = direction;

    /*table filter*/
    var filterText = [ "הכנס שם עיר או מספר אשכול" , "enter city name or cluster number"];
    var filter = document.getElementById("filter");
    filter.value = "";
    filter.placeholder =filterText[languageNumber];
    filter.style.direction = direction;


    /*Resources paragraph*/
    var resources_para = document.getElementById("resourcesPara");
    resources_para.style.direction = direction;
    resources_para.style.textAlign = textAlign;

    /*header*/
    var resources_text = [ "מקורות" , "Resources"];
    var resources_header = document.getElementById("resourcesHeader");
    resources_header.innerHTML = resources_text[language];
    resources_header.style.textDecoration = "underline";

    /*line1*/
    var resourcesLine1_text = [ "הנתונים המופיעים בויזואליזציה הם " ,
                                "The Data that appears in the visualization is from the "];
    var resourcesLine1 = document.getElementById("resourcesLine1");
    resourcesLine1.innerHTML = resourcesLine1_text[language];

    var link1_text = [ "מבחירות 2015." , "election of 2015 in Israel." ];
    var link1 = document.getElementById("link1");
    link1.innerHTML = link1_text[language];

    /*line2*/
    var resourcesLine2_text = [ "אפיון יישובים " , "Characterization of settlements "];
    var resourcesLine2 = document.getElementById("resourcesLine2");
    resourcesLine2.innerHTML = resourcesLine2_text[language];

    var link2_text = [ "בישראל מ2008." , "in Israel from 2008." ];
    var link2 = document.getElementById("link2");
    link2.innerHTML = link2_text[language];

    /*line3*/
    var resourcesLine3_text = [ "מדד הימין שמאל (הצבע) בויזואליזציה מתייחס לימין-שמאל כלכלי של מפלגות." ,
                                "The Right-Left measurement relate to Economic Right-Left of the parties in Isreal."];
    var resourcesLine3 = document.getElementById("resourcesLine3");
    resourcesLine3.innerHTML = resourcesLine3_text[language];

    /*line4*/
    var resourcesLine4_text = [ "את נתוני המדד הסקנו " , "The Data for the Economic Right-Left we got from the "];
    var resourcesLine4 = document.getElementById("resourcesLine4");
    resourcesLine4.innerHTML = resourcesLine4_text[language];

    var link4_text = [ "מהכתבה הבאה מאתר כלכליסט." , "next article from Calcalist(Hebrew)" ];
    var link4 = document.getElementById("link4");
    link4.innerHTML = link4_text[language];

    /*line5*/
    var resourcesLine5_text = [ "הסבר נוסף על " , "Additional help on the "];
    var resourcesLine5 = document.getElementById("resourcesLine5");
    resourcesLine5.innerHTML = resourcesLine5_text[language];

    var link5_text = [ "התצוגות." , "views." ];
    var link5_href = [ "report/views/viewsHebrew.pdf" , "report/views/viewsEnglish.pdf" ];
    var link5 = document.getElementById("link5");
    link5.innerHTML = link5_text[language];
    link5.href = link5_href[language];
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