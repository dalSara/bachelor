/*-------------- CLIENT --------------*/
var client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: '59mi8sr8zemv',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: '3f3d80d1c57594b635592e67231ad92c8bdebffca1a647ae5bca719251fbf059'
})
/*-------------- END CLIENT --------------*/

var globalTargetDateIndex = null;
var globalAllDatesArray = null;

var prevBtn = document.getElementById("prevBtn");
var thisWeekBtn = document.getElementById("thisWeekBtn");
var nextBtn = document.getElementById("nextBtn");

var prevDate = document.getElementById("prevDate");
var thisDate = document.getElementById("thisDate");
var nextDate = document.getElementById("nextDate");

var EVENT_CONTENT_TYPE_ID = 'datesForShowDo';

function initDates(callbackAction){
    client.getEntries({
        content_type: EVENT_CONTENT_TYPE_ID,
        order: 'fields.date' //Sort by date in datesForShowDo
    }).then(function (entries) {

        globalAllDatesArray = entries.items;
        console.log('Entry Client: All dates (sorted):', globalAllDatesArray); //all dates

        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() +1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        today = year + '-' + month + '-' + day;

        globalTargetDateIndex = 0;

        for(var i = 0; i < globalAllDatesArray.length - 1; i++){

            if(globalAllDatesArray[i].fields.date <= today && globalAllDatesArray[i+1].fields.date >= today){
                globalTargetDateIndex = i+1;
                break;
            }
            //var thisWeeksEvents = dates.fields.link; //!!!! ENDRE var navn?
        }

        updateDateLabels();
        //callbackAction();
        //TODO enable pre/next buttons

        prevBtn.onclick = goPrevious;
        nextBtn.onclick = goNext;

    })

    function goNext(){
        if(globalTargetDateIndex < globalAllDatesArray.length - 1){
            globalTargetDateIndex ++;
            updateDateLabels();
            //callbackAction();
        }
    }


    function goPrevious(){
        if(globalTargetDateIndex > 0){
            globalTargetDateIndex --;
            updateDateLabels();
            //callbackAction();
        }
    }

    function getDateLabel(index){
        var date = globalAllDatesArray[index];

        formatted = date.fields.date;
        return formatted;
    }

    function updateDateLabels(){

        if(globalTargetDateIndex > 0 ){
            prevDate.innerHTML = getDateLabel(globalTargetDateIndex - 1);
        } else {
            prevDate.innerHTML = "";
        }

        if(globalTargetDateIndex < globalAllDatesArray.length - 1){
            nextDate.innerHTML = getDateLabel(globalTargetDateIndex + 1);
        } else {
            nextDate.innerHTML = "";
        }

        thisDate.innerHTML = getDateLabel(globalTargetDateIndex);
    }
}


