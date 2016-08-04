
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

    var headlineText = [
        "ויזואליזציית הצבעות בבחירות 2015 לעומת המצב הסוציו-אקונומי של יישובים בישראל",
        "Is there a relation in Israel between socio-aconomic state to voting?"
    ];
    var headline = document.getElementById("headline");
    headline.innerHTML = headlineText[languageNumber];
    headline.style.direction = direction;


    var hebrewParaText = [
        [
            "בויזואליזציה הבאה רצינו להראות את הקשר בין אופן ההצבעה של יישובים בישראל למצב הסוציו-אקונומי שלהם.",
            "היישובים מחולקים ל10 קבוצות ע\"פ המצב האקנומי שלהם מ1-10, ניתן לראות איזה יישובים באיזה קבוצה בטבלת היישובים המצורפת.<br>" +
            "הוויזואליזציה משלבת כמה תצוגות, ניתן לראות מה אפשר לעשות בכל שלב ע\"י ריחוף הלחצן מעל סימן השאלה בגרף."
        ],
        [
            "* You can see the data from the elections of cities sorted by socio-aconomic state",
            "* The data is from 2015 elections at Israel"
        ]
    ];
    var hebrewPara = document.getElementsByClassName("hebrew_pargh");
    hebrewPara[0].innerHTML = hebrewParaText[languageNumber][0];
    hebrewPara[0].style.direction = direction;
    hebrewPara[1].innerHTML = hebrewParaText[languageNumber][1];
    hebrewPara[1].style.direction = direction;


    var radioButtonsText = [
        ["סך הצבעות","אחוזי הצבעה"],
        [ "total votes","percentage"]
    ];
    var radioButtons = document.getElementsByClassName("radioButtonsText");
    radioButtons[0].innerHTML =radioButtonsText[languageNumber][0];
    radioButtons[0].style.direction = direction;
    radioButtons[1].innerHTML =radioButtonsText[languageNumber][1];
    radioButtons[1].style.direction = direction;

    var filterText = [ "הכנס שם עיר או מספר קלאסטר" , "enter city name or cluster number"];
    var filter = document.getElementById("filter");
    filter.value = "";
    filter.placeholder =filterText[languageNumber];
    filter.style.direction = direction;


    var info_para = document.getElementById("info_para");
    info_para.style.direction = direction;
    info_para.style.textAlign = textAlign;

    var info_para_header_text = [ "כותרת" , "Headline"];
    var info_para_header = document.getElementById("info_para_header");
    info_para_header.innerHTML = info_para_header_text[language];
    info_para_header.style.textAlign = "center";

    var info_para_body_text = [
        "זה הפרויקט שלנו בלה בלה בלה\<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>" +
        "עוד טקסט \<br\>"

        ,

        "this is our project bla bla bla.\<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "text and more text \<br\>" +
        "another line of bla bli blu"
    ];
    var info_para_body = document.getElementById("info_para_body");
    info_para_body.innerHTML = info_para_body_text[language];

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