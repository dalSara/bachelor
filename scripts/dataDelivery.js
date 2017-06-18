var contentful = require('contentful');
var contentfulManagement = require('contentful-management');
var jqueryFunctions = require('./jqueryFunctions');
var going = require('./going');

function dataDelivery(){
    /*-------------- CLIENT --------------*/
    var client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'w82bwcfhqvdz',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '88644a72be7ec2324d56aa3db0f3c7e31dd79de67c4a2ece0ded6db95f648fdd'
    })
    /*-------------- END CLIENT --------------*/

    var EVENT_CONTENT_TYPE_ID = 'datesForShowDo';

    var selectedDate;
    var globalTargetDateIndex;
    var allDates;

    var thisShowDoEvents;

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
        jqueryFunctions.smoothScrollDown();
        jqueryFunctions.goingBtn();
        jqueryFunctions.scrollToTop();
        /*end jQuery functions*/

        going.addAttendees();
    })
    /*-------------- END GET ENTRIES --------------*/

    /*-------------- GET INDEX OF THE DATE --------------*/
    function getDateIndex(index){
        var dateIndex = allDates[index]; //[index+1]
        var date = dateIndex.fields.date;

        //Display date correctly in navigation
        var day = date.substring(8, 10);
        var month = date.substring(5, 7);
        var year = date.substring(2, 4);

        var dateFormat = day + '.' + month + '.' + year;

        return dateFormat;
    }
    /*-------------- END GET INDEX OF THE  DATE --------------*/

    /*-------------- ADD DATE TO NAVIGATION --------------*/
    function updateDateLabels(){
        if(globalTargetDateIndex > 0){
            prevDate.innerHTML = getDateIndex(globalTargetDateIndex - 1);
        } else {
            prevDate.innerHTML = "--";
        }

        if(globalTargetDateIndex < allDates.length - 1){
            nextDate.innerHTML = getDateIndex(globalTargetDateIndex + 1);
        } else {
            nextDate.innerHTML = "TBA";
        }
        thisDate.innerHTML = getDateIndex(globalTargetDateIndex);
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
            jqueryFunctions.smoothScrollDown(); //Onclick from calendar to list
            jqueryFunctions.goingBtn();
            jqueryFunctions.scrollToTop();
            /*end jQuery functions*/
            going.addAttendees();
        }else{
            alert('No more Show & Dos are added.');
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
            jqueryFunctions.smoothScrollDown(); //Onclick from calendar to list
            jqueryFunctions.goingBtn();
            jqueryFunctions.scrollToTop();
            /*end jQuery functions*/
            going.addAttendees();
        }else{
            alert('No more Show & Dos to display from the past.');
            return globalTargetDateIndex; //To stop adding index
        }
    }

    /*-------------- SORTING EVENTS BY SIZE --------------*/
    function sortEvents(thisShowDoEvents) {
        var eventArray = [];
        for(var i = 0; i < thisShowDoEvents.length; i++){
            var oneEvent = thisShowDoEvents[i];

            eventArray.push(oneEvent);
        }
        eventArray.sort(function (a, b){
            var sizeA = a.fields.size;
            var sizeB = b.fields.size;

            if(sizeA < sizeB){
                return -1;
            }
            if(sizeA > sizeB){
                return 1;
            }
            return 0;
        });
        return eventArray; //Sorted array
    }
    /*-------------- END SORTING EVENTS BY SIZE --------------*/

    function getEventArray(thisShowDoEvents){
        if(thisShowDoEvents != null || thisShowDoEvents == true){ //if event exists in date
            var eventArray = sortEvents(thisShowDoEvents);
            console.log('Sortert LARGE -> SMALL ', eventArray);
        }
        calendar.innerHTML = renderEventsCal(eventArray); //Add events to calendar
        list.innerHTML = renderEventsList(eventArray); //Add events to list
    }

    /*-------------- ADD ID: CALENDAR AND LIST --------------*/
    function addId(){ //Add ID to events, calendar and list
        var cal = document.getElementsByClassName("JScal");
        var eventList = document.getElementsByClassName("JSeventList");

        for (i = 0, length = eventList.length; i < length; i++) { //eventList or cal.lenght
            cal[i].href= "#JSeventID_" + (i + 1); //Add link to calendar
            eventList[i].id= "JSeventID_" + (i + 1); //Add id to list
        }
    }
    /*-------------- END ADD ID CALENDAR AND LIST --------------*/


    /*-------------- GET ALL EVENTS: CALENDAR --------------*/
    function renderEventsCal(events){
        return events.map(renderSingleEventCal).join('\n');
    }
    /*-------------- END GET ALL EVENTS: CALENDAR --------------*/

    /*-------------- PUT ELEMENTS TOGETHER: CALENDAR --------------*/
    function renderSingleEventCal(event){
        //if event exists in date
        if(event.fields != null || event.fields == true){

            //if time exists in time
            if(event.fields.time != null || event.fields.time == true){
                var time = event.fields.time;
                var startTime = time.substring(time.length - 5);
            }
        }

        if(startTime == "13:00" && event.fields.size == "Large"){
            return '<a class="JSscroll JScal JSlargeTrackCal">' +

                '<div class="eventInfoCal">' +
                renderEventInfoCal(event) +
                '</div>' +
                '</a>';
        }else if(startTime == "13:00" && event.fields.size == "Medium"){
            return '<a class="JSscroll JScal JSmediumTrackCal-13">' +

                '<div class="eventInfoCal">' +
                renderEventInfoCal(event) +
                '</div>' +
                '</a>';
        }else if(startTime == "13:00" && event.fields.size == "Small"){
            return '<a class="JSscroll JScal JSsmallTrackCal-13">' +

                '<div class="eventInfoCal">' +
                renderEventInfoCal(event) +
                '</div>' +
                '</a>';
        }else if(startTime == "14:00" && event.fields.size == "Medium"){
            return '<a class="JSscroll JScal JSmediumTrackCal-14">' +

                '<div class="eventInfoCal">' +
                renderEventInfoCal(event) +
                '</div>' +
                '</a>';
        }else if(startTime == "14:00" && event.fields.size == "Small"){
            return '<a class="JSscroll JScal JSsmallTrackCal-14">' +

                '<div class="eventInfoCal">' +
                renderEventInfoCal(event) +
                '</div>' +
                '</a>';
        }else if(startTime == "15:00" && event.fields.size == "Small"){
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
        var date = event.fields.time;
        var startTime = date.substring(date.length - 5);

        /*----if fields is null or undefined----*/
        var location = event.fields.location;
        if(location == null || location == 'undefined'){
            location = 'TBA'; //If location is missing.
        }else{
            location = location;
        }
        /*----end if fields is null or undefined----*/

        return  '<h4 class="JSeventTitleCal">' + event.fields.title + '</h4>' +
            '<div class="JSlocationWrapperCal"><i class="JSicon-room-filled-cal"></i>' +
            '<p class="JSlocationCal">' + location + '</p></div>';
    }
    /*-------------- END GET DATA FROM ONE EVENT: CALENDAR --------------*/

    /*-------------- GET ALL EVENTS: LIST --------------*/
    function renderEventsList(events){
        return events.map(renderSingleEventList).join('\n');
    }
    /*-------------- END GET ALL EVENTS: LIST --------------*/

    /*-------------- PUT ELEMENTS TOGETHER: LIST --------------*/
    function renderSingleEventList(event){
        //if event exists in date
        if(event != null || event == true){

            //if time exists in time
            if(event.time != null || event.time == true){
                var time = event.fields.time;
                var startTime = time.substring(time.length - 5);
                var startTime = time.substring(time.length - 5);
            }
        }

        return '<div class="JSeventList">' +
            '<div class="JSeventImage">' +
            renderImage(event.fields.image) +
            '</div>' +

            '<div class="JSeventInfoList">' +
            renderEventInfoList(event) +
            '</div>' +
            '</div>';
    }
    /*-------------- END PUT ELEMENTS TOGETHER: LIST --------------*/

    /*-------------- GET DATA FROM ONE EVENT: LIST --------------*/
    function renderEventInfoList(event){
        var sysID = event.sys.id; //Events sys.id from Contentful

        var date = event.fields.time;
        var startTime = date.substring(date.length - 5);

        /*----if fields is null or undefined----*/
        var endTime = event.fields.endTime;
        if(endTime == null || endTime == 'undefined'){
            endTime = 'Unspecified'; //If endTime is missing.
        }else{
            endTime = endTime;
        }

        var location = event.fields.location;
        if(location == null || location == 'undefined'){
            location = 'TBA'; //If location is missing.
        }else{
            location = location;
        }

        var numberOfParticipants = event.fields.numberOfParticipants;
        if(numberOfParticipants == null || numberOfParticipants == 'undefined'){
            numberOfParticipants = 'Unlimited'; //If numberOfParticipants is missing.
        }else{
            numberOfParticipants = numberOfParticipants;
        }

        var peopleGoing = event.fields.peopleAttending;
        if(peopleGoing == null || peopleGoing == 'undefined'){
            peopleGoing = ''; //If peopleGoing is missing.
            var countPeopleGoing = peopleGoing.length; //List = 0
        }else if(peopleGoing != null || peopleGoing != ''){
            countPeopleGoing = peopleGoing.length; //Count peopleGoing

            for(var i = 0; i < peopleGoing.length; i++){
                if(peopleGoing[i] == "" || peopleGoing[i] == 'undefined' || peopleGoing[i] == null){
                    countPeopleGoing = peopleGoing.length - 1; //If string is empty remove 1.
                }
            }
            peopleGoing = peopleGoing.filter(Boolean).join('<br>'); //Filter empty string from array and display peopleGoing.
        }

        var anythingElse = event.fields.anythingElse;
        if(anythingElse == null || anythingElse == 'undefined'){
            anythingElse = ''; //If anythingElse is missing.
        }else{
            anythingElse = anythingElse;
        }
        /*----end if fields is null or undefined----*/

        return  '<div class="JSleftListInfo">' +
            '<div class="JStitleEditWrapper">' +
            '<h3 class="JSeventTitleList">' + event.fields.title + '</h3><a href="../html/editTrack.html'+ '?id=' + sysID +'" class="JSiconEdit"></a>' +
            '</div>' +
            '<h4 class="JSeventHost">HOST</h4><p>' + event.fields.host + '</p>' +
            '<h4>WHAT TO EXPECT</h4><p>' + event.fields.whatToExpect + '</p>' +
            '<h4>PREREQUISITES</h4><p>' + event.fields.prerequisites + '</p>' +
            '<h4>BEST SUITED FOR</h4><p>' + event.fields.whoShouldJoin + '</p>' +
            '<h4>OTHER INFORMATION</h4><p>' + anythingElse + '</p>' +
            '</div>' +

            '<div class="JSrightListInfo">' +
            '<i class="JSicon-clock"></i><p class="JSstartTimeList">' + startTime + ' - ' + endTime + '</p>' +
            '<div class="JSlocationWrapperList">' +
            '<i class="JSicon-room"></i><p class="JSlocationList">' + location + '</p>' +
            '</div>' +
            '<div class="JSnumberOfPWrapperList"><h4>NUMBER OF PARTICIPANTS</h4><p>' + numberOfParticipants + '</p></div>' +

            /*-------------- GOING BTN --------------*/
            '<div class="JSgoingBtnWrapper">' +
                '<button type="button" class="JSgoing JSgoingBtn">Going?</button>' +
                '<div class="JSgoingDropdownContent JShidden">' +
                    'Name: <input type="text" placeholder="Firstname Lastname" id="' + sysID + 'Input" class="JSnameInput" name="name">' +
                    '<div tabindex="0" role="button" id="'+ sysID +'" class="JSregisterBtn" type="submit">Register</div>' +
                '</div>' +
            '</div>' +
            /*-------------- END GOING BTN --------------*/

            '<div class="JSgoingWrapperList">' +
            '<h4>' + countPeopleGoing + ' PEOPLE GOING</h4><p>' + peopleGoing + '</p>' +
            '</div>' +
            '</div>';
    }
    /*-------------- END GET DATA FROM ONE EVENT: LIST --------------*/

    /*-------------- GET IMAGE: LIST --------------*/
    function renderImage(image){
        if(image && image.fields.file){
            return '<img src="' + image.fields.file.url + '"/>';
        }
    }
    /*-------------- END GET IMAGE: LIST --------------*/
};

exports.dataDelivery = dataDelivery;
