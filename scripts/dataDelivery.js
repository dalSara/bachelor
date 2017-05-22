//var moment = require('moment'); treng ikkje??

//Eksempel fra: https://jsfiddle.net/contentful/kefaj4s8/
//NB: Klasser er foreløpig ikke i bruk!
//js-className



/*-------------- CLIENT --------------*/
var client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: '59mi8sr8zemv',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: '3f3d80d1c57594b635592e67231ad92c8bdebffca1a647ae5bca719251fbf059'
})
/*-------------- END CLIENT --------------*/
var globalTargetDateIndex = null;
var allDates = null;
var selectedDate = null;

var thisShowDoEvents = null;

var EVENT_CONTENT_TYPE_ID = 'datesForShowDo';

var prevDate = document.getElementById("prevDate");
var thisDate = document.getElementById("thisDate");
var nextDate = document.getElementById("nextDate");

var nextBtn = document.getElementById("nextBtn");
var thisWeekBtn = document.getElementById("thisWeekBtn");
var prevBtn = document.getElementById("prevBtn");

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

    getEventArray(thisShowDoEvents);
    updateDateLabels();
    addId(); //Add id to events (in calendar and list)

    //initSmoothScrolling();

    /*Display events*/
    nextBtn.onclick = nextShowDo;
    prevBtn.onclick = previousShowDo;

    /*-------------- SMOOTH SCROLL TO MORE INFO --------------*/
    $(function(){
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        $(window).scroll(function(event) {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('header').removeClass('nav-down').addClass('nav-up');
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up').addClass('nav-down');
                }
            }

            lastScrollTop = st;
        }

        $(".scroll").click(function(event) {
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html,body').animate({
                scrollTop: dest
            }, 800, 'swing');
        });
    });
    /*-------------- END SMOOTH SCROLL TO MORE INFO --------------*/

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
    }else{
        alert('No more Show & Dos to display from the past.');
        return globalTargetDateIndex--; //To stop adding index
    }
}

function sortEvents(thisShowDoEvents) {
    var eventArray = [];
    for(var i = 0; i < thisShowDoEvents.length; i++){
        var oneEvent = thisShowDoEvents[i].fields;
        eventArray.push(oneEvent);
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

function getEventArray(thisShowDoEvents){
    /*-------------- SORTING EVENTS BY SIZE --------------*/
    if(thisShowDoEvents != null || thisShowDoEvents == true){ //if event exists in date
        var eventArray = sortEvents(thisShowDoEvents);
        console.log('Sortert LARGE -> SMALL ', eventArray);
    }
    /*-------------- END SORTING EVENTS BY SIZE --------------*/
    calendar.innerHTML = renderEventsCal(eventArray);
    list.innerHTML = renderEventsList(eventArray);
}

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
        return '<a class="scroll cal largeTrackCal">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "13:00" && event.size == "Medium"){
        return '<a class="scroll cal mediumTrackCal-13">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "13:00" && event.size == "Small"){
        return '<a class="scroll cal smallTrackCal-13">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "14:00" && event.size == "Medium"){
        return '<a class="scroll cal mediumTrackCal-14">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "14:00" && event.size == "Small"){
        return '<a class="scroll cal smallTrackCal-14">' +

            '<div class="eventInfoCal">' +
            renderEventInfoCal(event) +
            '</div>' +
            '</a>';
    }else if(startTime == "15:00" && event.size == "Small"){
        return '<a class="scroll cal smallTrackCal-15">' +

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

    return  '<h4 class="eventTitleCal">' + event.title + '</h4>' +
        '<div class="locationWrapperCal"><i class="icon-room-filled-cal"></i>' +
        '<p class="locationCal">' + event.location + '</p></div>';
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

    return '<div class="eventList">' +
        '<div class="eventImage">' +
        renderImage(event.image) +
        '</div>' +

        '<div class="eventInfoList">' +
        renderEventInfoList(event) +
        '</div>' +
        '</div>';
}
/*-------------- END PUT ELEMENTS TOGETHER: LIST --------------*/

/*-------------- GOINGbtn --------------*/
function goingBtn(){
    document.getElementById('going').className += ' going-clicked ';
    document.getElementById('going').innerHTML = "You're going!";
    //document.getElementById('goingInput').slideToggle(500);//.className.remove = 'hidden';
    //document.getElementsById('goingDropdown').className.toggle('show');
    /*var className = ' ' + going.className + ' ';

    if ( ~className.indexOf(' active ') ) {
        this.className = className.replace(' active ', ' ');
    } else {
        this.className += ' active';
    }  */
}
/*-------------- END GOINGbtn --------------*/


function addId(){
    var cal = document.getElementsByClassName("cal");
    var eventList = document.getElementsByClassName("eventList");

    for (i = 0, length = eventList.length; i < length; i++) { //eventList or cal.lenght
        cal[i].href= "#eventID_" + (i + 1); //Add link to calendar
        eventList[i].id= "eventID_" + (i + 1); //Add id to list
    }
}

/*-------------- GET DATA FROM ONE EVENT: LIST --------------*/
function renderEventInfoList(event){
    var date = event.time;
    var startTime = date.substring(date.length - 5);

    /*if(event.this == 'undefined'){
        return '';
    }*/

    //var count = event.peopleGoing.split(' ').length;

    return  '<div class="leftListInfo">' +
        '<div class="titleEditWrapper">' +
        '<h3 class="eventTitleList">' + event.title + '</h3><i class="icon-edit"></i>' +
        '</div>' +
        '<h4 class="eventsHost">HOST</h4><p>' + event.host + '</p>' +
        '<h4>WHAT TO EXPECT</h4><p>' + event.whatToExpect + '</p>' +
        '<h4>PREREQUISITES</h4><p>' + event.prerequisites + '</p>' +
        '<h4>BEST SUITED FOR</h4><p>' + event.whoShouldJoin + '</p>' +
        '</div>' +

        '<div class="rightListInfo">' +
        '<div class="timeWrapperList">' +
        '<i class="icon-clock"></i><p class="startTimeList">' + startTime + ' - 15:45</p>' +
        '</div>' +
        '<div class="locationWrapperList">' +
        '<i class="icon-room"></i><p class="locationList">' + event.location + '</p>' +
        '</div>' +

        '<div  class="goingBtnWrapper">' +
            '<button onclick="goingBtn()" type="button" id="going" class="goingBtn">Going?</button>' +
            '<div id="goingDropdown" class="goingDropdownContent">' +
            '<div class="inputName">' +
                'Name: <input type="text" value="" id="name" name="name">' +
                '<div tabindex="0" role="button" id="registerBtn" type="submit">Register</div>' +
            '</div>' +
        '</div>' +
        '</div>' +

        '<div class="goingWrapperList">' +
        /*'<h4>' + count + ' ?PEOPLE GOING</h4>*/'<p>' + event.peopleGoing + '</p>' +
        '</div>' +
        '</div>';

}
/*-------------- END GET DATA FROM ONE EVENT: LIST --------------*/

/*-------------- GET IMAGE --------------*/
function renderImage(image){
    if(image && image.fields.file){
        return '<img src="' + image.fields.file.url + '"/>';
    /*}else if(image.fields.file == null || image.fields != true || image.fields.file == 'undefined'){
        return '<p>Image is missing</p>';*/
        //NEEDS ERROR MESSAGE
    }
}
/*-------------- END GET IMAGE --------------*/
