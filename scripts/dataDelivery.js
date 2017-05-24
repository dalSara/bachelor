//Eksempel fra: https://jsfiddle.net/contentful/kefaj4s8/

/*-------------- CLIENT --------------*/
var client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: '59mi8sr8zemv',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: '3f3d80d1c57594b635592e67231ad92c8bdebffca1a647ae5bca719251fbf059'
})
/*-------------- END CLIENT --------------*/

var EVENT_CONTENT_TYPE_ID = 'datesForShowDo';

var selectedDate = null;
var globalTargetDateIndex = null;
var allDates = null;

var thisShowDoEvents = null;

/*-------------- DATE LABELS --------------*/
var prevDate = document.getElementById("prevDate");
var thisDate = document.getElementById("thisDate");
var nextDate = document.getElementById("nextDate");
/*-------------- END DATE LABELS --------------*/

/*-------------- DATE BUTTONS --------------*/
var nextBtn = document.getElementById("nextBtn");
var thisWeekBtn = document.getElementById("thisWeekBtn");
var prevBtn = document.getElementById("prevBtn");
/*-------------- END DATE BUTTONS --------------*/

var calendar = document.getElementById('calendar');
var list = document.getElementById('list');

function getSelectedDate(specifiedDate) {
    selectedDate = new Date();
    if(specifiedDate) selectedDate = specifiedDate;
    /*-------------- TODAYS DATE --------------*/
    //ISO8601 formatted YYYY-MM-DD (to match Contentful):
    var year = selectedDate.getFullYear();
    var month = ('0' + (selectedDate.getMonth() +1)).slice(-2);
    var day = ('0' + selectedDate.getDate()).slice(-2);
    var selectedDate = year + '-' + month + '-' + day;
    /*-------------- END TODAYS DATE --------------*/

    return selectedDate;
}

/*-------------- GET ENTRIES --------------*/
client.getEntries({
    content_type: EVENT_CONTENT_TYPE_ID,
    order: 'fields.date' //Sort by date in datesForShowDo
})
    .then(function (entries) {

    allDates = entries.items;
    console.log('Entry Client: All dates (sorted):', allDates); //all dates


    selectedDate = getSelectedDate();
    /*-------------- GET THIS DATE --------------*/
    //loop through dates in datesForShowDo
    for(var i = 0; i < allDates.length; i++){
        //var dates = allDates[i];
        //var oneDate = dates.fields.date;

        if(allDates[i].fields.date <= selectedDate && allDates[i+1].fields.date >= selectedDate){
            globalTargetDateIndex = i + 1;

            var oneDate = allDates[globalTargetDateIndex].fields.date;
            console.log('Later than selectedDate', oneDate);

            thisShowDoEvents = allDates[i + 1].fields.link; //EVENTS TO DISPLAY
            break;
        }
    }
    /*-------------- END GET THIS DATE --------------*/

    getEventArray(thisShowDoEvents); //Display events
    updateDateLabels(); //Add date labels
    addId(); //Add id to events (in calendar and list)

    nextBtn.onclick = nextShowDo; //Display next events
    prevBtn.onclick = previousShowDo; //Display previous events

    /*jQuery functions*/
    $.smoothScrollDown(); //Onclick from calendar to list
    $.goingBtn();
})
/*-------------- END GET ENTRIES --------------*/

/*-------------- GET INDEX OF THE DATE --------------*/
function getDateIndex(index){
    var dateIndex = allDates[index + 1]; //[index+1]
    var date = dateIndex.fields.date;

    return date;
    console.log(date);
}
/*-------------- END GET INDEX OF THE  DATE --------------*/

/*-------------- ADD DATE TO NAVIGATION --------------*/
function updateDateLabels(){
    if(globalTargetDateIndex > 0){
        prevDate.innerHTML = getDateIndex(globalTargetDateIndex - 2);
    } else {
        prevDate.innerHTML = "";
    }

    if(globalTargetDateIndex < allDates.length - 1){
        nextDate.innerHTML = getDateIndex(globalTargetDateIndex);
    } else {
        nextDate.innerHTML = "TBA";
    }

    thisDate.innerHTML = getDateIndex(globalTargetDateIndex - 1);
}
/*-------------- END ADD DATE TO NAVIGATION --------------*/

function nextShowDo(){
    if(globalTargetDateIndex < allDates.length -1){
        var showDoIndex = globalTargetDateIndex++;
        updateDateLabels();

        var nextShowDoDate = allDates[showDoIndex + 1].fields;
        var nextShowDoEvents = nextShowDoDate.link;

        console.log('NEXT DATE', nextShowDoDate);
        console.log('NEXT DATES EVENTS', nextShowDoEvents);

        getEventArray(nextShowDoEvents); //DISPLAY NEXT WEEK
        addId();//Add id to events (in calendar and list)

        /*jQuery functions*/
        $.smoothScrollDown(); //Onclick from calendar to list
        $.goingBtn();
    }else{
        alert('No more Show & Dos are added.'); //NEEDS A BETTER ERROR MESSAGE
        return globalTargetDateIndex--; //To stop adding index
    }
}

function previousShowDo(){
    if(globalTargetDateIndex > 0){
        var showDoIndex = globalTargetDateIndex--;
        updateDateLabels();

        var previousShowDoDate = allDates[showDoIndex - 1].fields;
        var previousShowDoEvents = previousShowDoDate.link;

        console.log('NEXT DATE', previousShowDoDate);
        console.log('NEXT DATES EVENTS', previousShowDoEvents);

        getEventArray(previousShowDoEvents); //DISPLAY NEXT WEEK
        addId();//Add id to events (in calendar and list)

        /*jQuery functions*/
        $.smoothScrollDown(); //Onclick from calendar to list
        $.goingBtn();
    }else{
        alert('No more Show & Dos to display from the past.');
        return globalTargetDateIndex--; //To stop adding index
    }
}

/*-------------- SORTING EVENTS BY SIZE --------------*/
function sortEvents(thisShowDoEvents) {
    var eventArray = [];
    for(var i = 0; i < thisShowDoEvents.length; i++){
        var oneEvent = thisShowDoEvents[i].fields;
        eventArray.push(oneEvent);
        //console.log(thisShowDoEvents[i]); // WITH ID
    }
    eventArray.sort(function (a, b){
        var sizeA = a.size;
        var sizeB = b.size;

        if(sizeA < sizeB){
            return -1;
        }
        if(sizeA > sizeB){
            return 1;
        }
        return 0;
    });
    return eventArray;
}
/*-------------- END SORTING EVENTS BY SIZE --------------*/

function getEventArray(thisShowDoEvents){
    if(thisShowDoEvents != null || thisShowDoEvents == true){ //if event exists in date
        var eventArray = sortEvents(thisShowDoEvents);
        console.log('Sortert LARGE -> SMALL ', eventArray);
    }
    calendar.innerHTML = renderEventsCal(eventArray);
    list.innerHTML = renderEventsList(eventArray);
}

/*-------------- ADD ID: CALENDAR AND LIST --------------*/
function addId(){ //Add ID to events, calendar and list
    var cal = document.getElementsByClassName("JScal");
    var eventList = document.getElementsByClassName("JSeventList");

    for (i = 0, length = eventList.length; i < length; i++) { //eventList or cal.lenght
        cal[i].href= "#eventID_" + (i + 1); //Add link to calendar
        eventList[i].id= "eventID_" + (i + 1); //Add id to list
    }
}
/*-------------- END ADD ID CALENDAR AND LIST --------------*/


/*-------------- GET ALL EVENTS TO CALENDAR --------------*/
function renderEventsCal(events){
    return events.map(renderSingleEventCal).join('\n');
}
/*-------------- END GET ALL EVENTS CALENDAR --------------*/

/*-------------- PUT ELEMENTS TOGETHER: CALENDAR --------------*/
function renderSingleEventCal(event){
    //if event exists in date
    if(event != null || event == true){

        //if time exists in time
        if(event.time != null || event.time == true){
            var time = event.time;
            var startTime = time.substring(time.length - 5);
        }
    }

    if(startTime == "13:00" && event.size == "Large"){
        return '<a class="JSscroll JScal JSlargeTrackCal">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "13:00" && event.size == "Medium"){
        return '<a class="JSscroll JScal JSmediumTrackCal-13">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "13:00" && event.size == "Small"){
        return '<a class="JSscroll JScal JSsmallTrackCal-13">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "14:00" && event.size == "Medium"){
        return '<a class="JSscroll JScal JSmediumTrackCal-14">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "14:00" && event.size == "Small"){
        return '<a class="JSscroll JScal JSsmallTrackCal-14">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "15:00" && event.size == "Small"){
        return '<a class="JSscroll JScal JSsmallTrackCal-15">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }
}
/*-------------- END PUT ELEMENTS TOGETHER: CALENDAR --------------*/

/*-------------- GET DATA FROM ONE EVENT: CALENDAR --------------*/
function renderEventInfoCal(event){
    var date = event.time;
    var startTime = date.substring(date.length - 5);

    return  '<h4 class="JSeventTitleCal">' + event.title + '</h4>' +
        '<div class="JSlocationWrapperCal"><i class="JSicon-room-filled-cal"></i>' +
        '<p class="JSlocationCal">' + event.location + '</p></div>';
}
/*-------------- END GET DATA FROM ONE EVENT: CALENDAR --------------*/

/*-------------- GET ALL EVENTS TO LIST --------------*/
function renderEventsList(events){
    return events.map(renderSingleEventList).join('\n');
}
/*-------------- END GET ALL EVENTS LIST --------------*/

/*-------------- PUT ELEMENTS TOGETHER: LIST --------------*/
function renderSingleEventList(event){
    //if event exists in date
    if(event != null || event == true){
        //console.log(':::::::::', event); //one date

        //if time exists in time
        if(event.time != null || event.time == true){
            var time = event.time;
            var startTime = time.substring(time.length - 5);
        }
    }

    return '<div class="JSeventList">' +
        '<div class="JSeventImage">' +
        renderImage(event.image) +
        '</div>' +

        '<div class="JSeventInfoList">' +
        renderEventInfoList(event) +
        '</div>' +
        '</div>';
}
/*-------------- END PUT ELEMENTS TOGETHER: LIST --------------*/

/*-------------- GET DATA FROM ONE EVENT: LIST --------------*/
function renderEventInfoList(event){
    var date = event.time;
    var startTime = date.substring(date.length - 5);

    /*if(event.this == 'undefined'){
        return '';
    }*/

    //var count = event.peopleGoing.split(' ').length;

    return  '<div class="JSleftListInfo">' +
        '<div class="JStitleEditWrapper">' +
        '<h3 class="JSeventTitleList">' + event.title + '</h3><i class="JSicon-edit"></i>' +
        '</div>' +
        '<h4 class="JSeventHost">HOST</h4><p>' + event.host + '</p>' +
        '<h4>WHAT TO EXPECT</h4><p>' + event.whatToExpect + '</p>' +
        '<h4>PREREQUISITES</h4><p>' + event.prerequisites + '</p>' +
        '<h4>BEST SUITED FOR</h4><p>' + event.whoShouldJoin + '</p>' +
        '<h4>OTHER INFORMATION</h4><p>' + event.anythingElse + '</p>' +
        '</div>' +

        '<div class="JSrightListInfo">' +
        //'<div class="JStimeWrapperList">' +
        '<i class="JSicon-clock"></i><p class="JSstartTimeList">' + startTime + ' - 15:45</p>' +
        //'</div>' +
        '<div class="JSlocationWrapperList">' +
        '<i class="JSicon-room"></i><p class="JSlocationList">' + event.location + '</p>' +
        '</div>' +
        '<div class="JSnumberOfPWrapperList"><h4>NUMBER OF PARTICIPANTS</h4><p>' + event.numberOfParticipants + '</p></div>' +

        /*-------------- GOING BTN --------------*/
        '<div class="JSgoingBtnWrapper">' +
        '<button type="button" class="JSgoing JSgoingBtn"></button>' +
        '<div class="JSgoingDropdownContent JShidden">' +
        //'<div id="JSnameInputWrapper">' +
        'Name: <input type="text" class="JSnameInput" name="name">' +
        '<div tabindex="0" role="button" class="JSregisterBtn" type="submit">Register</div>' +
        //'</div>' +
        '</div>' +
        '</div>' +
        /*-------------- END GOING BTN --------------*/

        '<div class="JSgoingWrapperList">' +
        /*'<h4>' + count + ' ?PEOPLE GOING</h4>*/'<p>' + event.peopleGoing + '</p>' +
        '</div>' +
        '</div>';

}
/*-------------- END GET DATA FROM ONE EVENT: LIST --------------*/

/*-------------- GET IMAGE: LIST --------------*/
function renderImage(image){
    if(image && image.fields.file){
        return '<img src="' + image.fields.file.url + '"/>';
        /*}else if(image.fields.file == null || image.fields != true || image.fields.file == 'undefined'){
        return '<p>Image is missing</p>';*/
        //NEEDS ERROR MESSAGE
    }
}
/*-------------- END GET IMAGE: LIST --------------*/
