
// languageNumber
// 0 for hebrew
// 1 for english
var languages = ["Hebrew" , "English"];

function setHTMLtext(languageNumber) {

    console.log("setHTMLtext to " + languages[languageNumber]);

    var direction = "rtl"; // default
    if (languageNumber == 0) { //hebrew
        direction = "rtl";
    }else if (languageNumber == 1){ //english
        direction = "ltr";
    }

    var headlineText = [
        "האם בישראל יש קשר בין המצב הכלכלי להצבעה בקלפי?",
        "Is there a relation in Israel between socio-aconomic state to what people vote?"
    ];
    var headline = document.getElementById("headline");
    headline.innerHTML = headlineText[languageNumber];
    headline.style.direction = direction;


    var hebrewParaText = [
        ["* לפניכם נתוני ההצבעה של יישובים ממוינים לפי מצב סוציו-אקונומי","* הנתונים מבחירות 2015"],
        [ "* You can see the data from the elections of cities sorted by socio-aconomic state","* The data is from 2015 elections at Israel" ]
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

    var filterText = [ "פילטר" , "filter"];
    var filter = document.getElementById("filter");
    filter.placeholder =filterText[languageNumber];
    filter.style.direction = direction;

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