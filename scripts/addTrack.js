//var contentful = require('contentful');
var contentfulManagement = require('contentful-management');

function addTrack (){

    var client = contentfulManagement.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '',
        resolveLinks: true
        //space: '59mi8sr8zemv'

    });
    //--------------Navigation btn ------------------------//
    var arrowPrevious = document.getElementById("arrowPrevious");
    var thisWeekBtn = document.getElementById("thisWeekBtn");
    var arrowNext = document.getElementById("arrowNext");

    var choosenTrack;
    var choosenImage;

    var eventEndTime = null;
    // var thisShowDoEvents = null;
    var oneDate;


    //-------- temporary img var -----//
    var imageOne = {sys: {
        id: '4KahBhVQTCykgOYsKS66Ws',
        linkType: "Asset",
        type:"Link"
    }}

    var imageTwo = {sys: {
        id: '2dmGUtiw7uwugWQcsiGcUk',
        linkType: "Asset",
        type:"Link"
    }}
    var imageThree = {sys: {
        id: '5u6CWGgkmcwiIUEIsiQMGE',
        linkType: "Asset",
        type:"Link"
    }}

    //----- HTML - Objects for the form -----------------//
    var JSdatePick1 = document.getElementById("JSdatePick1");
    var JSdatePick2 = document.getElementById("JSdatePick2");
    var JSdatePick3 = document.getElementById("JSdatePick3");
    var JSaddTitle = document.getElementById("JSaddTitle");
    var JSaddHosts = document.getElementById("JSaddHosts");
    var JSaddPrereq = document.getElementById ("JSaddPrereq");
    var JSaddStartOne = document.getElementById("JSaddStartOne");
    var JSaddStartTwo = document.getElementById("JSaddStartTwo");
    var JSaddStartThree = document.getElementById("JSaddStartThree");
    var JSaddHourOne = document.getElementById("JSaddHourOne");
    var JSaddHourTwo= document.getElementById("JSaddHourTwo");
    var JSaddHourThree = document.getElementById("JSaddHourThree");
    var JSaddNrOfPart = document.getElementById("JSaddNrOfPart");
    var JSaddExpect = document.getElementById("JSaddExpect");
    var JSaddJoin = document.getElementById("JSaddJoin");
    var JSaddImage = document.getElementById("JSaddImage");
    var JSaddStockOne = document.getElementById("JSaddStockOne");
    var JSaddStockTwo = document.getElementById("JSaddStockTwo");
    var JSaddStockThree = document.getElementById("JSaddStockThree");
    var JSaddElse = document.getElementById("JSaddElse");
    //var JSaddStatus = document.getElementById("JSaddStatus"); //belongs to a function that is not in use at the time
    var addTrackBtn = document.getElementById("addTrackBtn");



    //------------ click funkctions --------//
    JSaddStockOne.onclick = chooseImageOne;
    JSaddStockTwo.onclick = chooseImageTwo;
    JSaddStockThree.onclick = chooseImageThree;
    addTrackBtn.onclick = createNewEvent;

    time();



    //---------- function to choose time----------//

    //--- gets todays date, and change so next date for Show & Do is in front//
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


    var globalTargetDateIndex = null;
    var globalAllDatesArray = null;
    var selectedDate = null;
    var allDates = null;
    var thisShowDoEvents;
    var dateId;


    client.getSpace('59mi8sr8zemv')
        .then((space) =>
              space.getEntries({
        content_type: 'datesForShowDo',
        order: 'fields.date', //Sort by date in datesForShowDo
        locale: 'en-US'
    })).then(function(entries, dateId){
        console.log('bajs', entries.items)
        allDates = entries.items;

        //console.log('BajsBajs:', allDates); //all dates
        //console.log('BajsBajsSkit:', entries.sys); //all dates

        selectedDate = getSelectedDate();
        //loop through dates in datesForShowDo
        for(var i = 0; i < allDates.length; i++){
            if(allDates[i].fields.date["en-US"] <= selectedDate && allDates[i+1].fields.date["en-US"] >= selectedDate){
                globalTargetDateIndex = i + 1;

                var oneDate = allDates[globalTargetDateIndex].fields.date["en-US"];
                console.log('Later than selectedDate', oneDate);

                thisShowDoEvents = allDates[i + 1].fields.link["en-US"]; //EVENTS TO DISPLAY .
                console.log('thisShowDoEvents', thisShowDoEvents);
                break;
            }
        }

        globalAllDatesArray = entries.items;

        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() +1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        today = year + '-' + month + '-' + day;

        globalTargetDateIndex = 0;

        for(var i = 0; i < globalAllDatesArray.length - 1; i++){

            if(globalAllDatesArray[i].fields.date["en-US"] <= today && globalAllDatesArray[i+1].fields.date["en-US"] >= today){
                globalTargetDateIndex = i+1;
                dateId = allDates[globalTargetDateIndex].sys.id;
                break;
            }

        }
        console.log('dateId', dateId);
        updateDateLabels();

        arrowPrevious.onclick = goPrevious;
        arrowNext.onclick = goNext;

        function goNext(){
            if(globalTargetDateIndex < globalAllDatesArray.length - 1){
                globalTargetDateIndex ++;
                updateDateLabels();
            }
        }

        function goPrevious(){
            if(globalTargetDateIndex > 0){
                globalTargetDateIndex --;
                updateDateLabels();

            }
        }

        /*-------------- GET INDEX OF THE DATE --------------*/
        // totaly stolen from Natalie =)
        function getDateIndex(index){
            var dateIndex = allDates[index]; //[index+1]
            var date = dateIndex.fields.date["en-US"];

            //Display date correctly in navigation
            var day = date.substring(8, 10);
            var month = date.substring(5, 7);
            var year = date.substring(2, 4);

            var dateFormat = day + '.' + month + '.' + year;

            return dateFormat;
        }

        /*-------------- END GET INDEX OF THE  DATE --------------*/

        function updateDateLabels(){

            if(globalTargetDateIndex > 0 ){
                JSdatePick1.innerHTML = getDateIndex(globalTargetDateIndex - 1);
            } else {
                JSdatePick1.innerHTML = "--";
            }

            if(globalTargetDateIndex < globalAllDatesArray.length - 1){
                JSdatePick3.innerHTML = getDateIndex(globalTargetDateIndex + 1);
            } else {
                JSdatePick3.innerHTML = "TBA";
            }

            JSdatePick2.innerHTML = getDateIndex(globalTargetDateIndex);
        }

    });


    console.log('dateId', dateId);

    // };//end chooseDates


    function addListenerToSizeBtn (){
        JSaddHourOne.onclick = smallTrack;
        JSaddHourTwo.onclick = mediumTrack;
        JSaddHourThree.onclick = largeTrack;
    }

    function timeOne (matrix){
        document.getElementById("JSaddStartOne").classList.add('selectedTime');
        document.getElementById("JSaddStartTwo").classList.remove('selectedTime');
        document.getElementById("JSaddStartThree").classList.remove('selectedTime');
        addListenerToSizeBtn();

        if(hasTwoElementsByColumn(matrix, 0)){
            JSaddHourTwo.style.display ='inline-block'
        }else{
            JSaddHourTwo.style.display ='none'
        }


        if(hasThreeElementsByColumn(matrix, 0)){
            JSaddHourThree.style.display ='inline-block'
        }else{
            JSaddHourThree.style.display ='none'
        }

    }

    function timeTwo (matrix){
        document.getElementById("JSaddStartTwo").classList.add('selectedTime');
        document.getElementById("JSaddStartOne").classList.remove('selectedTime');
        document.getElementById("JSaddStartThree").classList.remove('selectedTime');

        addListenerToSizeBtn();

        if(hasTwoElementsByColumn(matrix, 1)){
            JSaddHourTwo.style.display ='inline-block'
        }else{
            JSaddHourTwo.style.display ='none'
        }

        JSaddHourThree.style.display ='none'
    }

    function timeThree (matrix){
        document.getElementById("JSaddStartThree").classList.add('selectedTime');
        document.getElementById("JSaddStartOne").classList.remove('selectedTime');
        document.getElementById("JSaddStartTwo").classList.remove('selectedTime');

        addListenerToSizeBtn();
        JSaddHourTwo.style.display ='none'
        JSaddHourThree.style.display ='none'
    }


    function smallTrack (){
        document.getElementById("JSaddHourOne").classList.add('selectedTime');
        document.getElementById("JSaddHourTwo").classList.remove('selectedTime');
        document.getElementById("JSaddHourThree").classList.remove('selectedTime');
    }

    function mediumTrack (){
        document.getElementById("JSaddHourTwo").classList.add('selectedTime');
        document.getElementById("JSaddHourOne").classList.remove('selectedTime');
        document.getElementById("JSaddHourThree").classList.remove('selectedTime');

    }

    function largeTrack (){
        document.getElementById("JSaddHourThree").classList.add('selectedTime');
        document.getElementById("JSaddHourOne").classList.remove('selectedTime');
        document.getElementById("JSaddHourTwo").classList.remove('selectedTime');

    }

    function chooseImageOne (){
        var choosenImage = imageOne
        document.getElementById("JSaddStockOne").classList.add('selectedTime');
        document.getElementById("JSaddStockTwo").classList.remove('selectedTime');
        document.getElementById("JSaddStockThree").classList.remove('selectedTime');
        return choosenImage
    }

    function chooseImageTwo (){
        var choosenImage = imageTwo
        document.getElementById("JSaddStockTwo").classList.add('selectedTime');
        document.getElementById("JSaddStockOne").classList.remove('selectedTime');
        document.getElementById("JSaddStockThree").classList.remove('selectedTime');
        return choosenImage
    }

    function chooseImageThree (){
        var choosenImage = imageThree
        document.getElementById("JSaddStockThree").classList.add('selectedTime');
        document.getElementById("JSaddStockTwo").classList.remove('selectedTime');
        document.getElementById("JSaddStockOne").classList.remove('selectedTime');
        return choosenImage
    }


    function hasTwoElementsByColumn(matrix, row){
        var n = matrix[row].length
        for(var i=0; i < n; i++){
            if(matrix[row][i] == null && matrix[row+1][i] == null){
                return true
            }
        }
        return false
    }

    function hasThreeElementsByColumn(matrix, row){
        var n = matrix[row].length
        for(var i=0; i < n; i++){
            if(matrix[row][i] == null && matrix[row+1][i] == null && matrix[row+1][i] == null){
                return true
            }
        }
        return false
    }


    function hasElementOnRow(matrix, row){
        var n = matrix[row].length
        for(var i=0; i < n; i++){
            if(matrix[row][i] == null){
                return true
            }
        }
        return false
    }

    function hasElement(matrix){
        var n = matrix.length
        for(var i=0; i < n; i++){
            if(hasElementOnRow(matrix, i)){
                return true
            }
        }
        return false
    }



    //var dateId = '2Bxpz2RgA4AQImQOssey8w';


    function time (thisShowDoEvents){
        client.getSpace('59mi8sr8zemv')
            .then((space) => {
            space.getEntry(dateId,{
                //order: 'fields.date', //Sort by date in datesForShowDo
                resolveLinks: true,
                locale: 'en-US'
            })
                .then((entry) => {
                var allInDate = entry.fields.link['en-US'];
                // var eventForDate = allInDate[i].sys.id;
                var eventIdArry = [];


                for(var i = 0; i < allInDate.length; i++){
                    var eventForDate = allInDate[i].sys.id;
                    eventIdArry.push(eventForDate);

                }
                // console.log('array', eventIdArry)

                space.getEntries('events')
                    .then((entries) =>{

                    var nrOfSmall; //fields.size['en-US']
                    var nrOfMedium; //fields.size['en-US']
                    var nrOfLarge; //fields.size['en-US']
                    var nrOfOne;    //fields.time['en-US']
                    var nrOfTwo;     //fields.time['en-US']
                    var nrOfThree;   //fields.time['en-US']
                    //var allEventForDate = entries.items
                    var eventDateId = entries.items

                    for(var i = 0; i < eventDateId.length; i++){
                        var allEventForDate = eventDateId[i].sys.id;
                    }

                    var n = 5
                    var matrix = new Array(3);
                    for (var i = 0; i < matrix.length; i++) {
                        matrix[i] = new Array(n);
                    }


                    for(id of eventIdArry){
                        for(event of entries.items){
                            if(id === event.sys.id){
                                var size = event.fields.size['en-US']
                                var time = event.fields.time['en-US'].split("T")[1]

                                var row = -1
                                if(time === "13:00") row = 0;
                                if(time === "14:00") row = 1;
                                if(time === "15:00") row = 2;

                                if(size === "Small"){
                                    for(var i=0; i < n; i++){
                                        if(matrix[row][i] == null){
                                            matrix[row][i] = true
                                            break
                                        }
                                    }

                                } else if(size === "Medium"){
                                    for(var i=0; i < n; i++){
                                        if(matrix[row][i] == null && matrix[row][i+1] == null){
                                            matrix[row][i] = true
                                            matrix[row][i +1] == true
                                            break
                                        }
                                    }
                                } else if(size === "Large"){
                                    for(var i=0; i < n; i++){
                                        if(matrix[row][i] == null && matrix[row][i+1] == null && matrix[row][i+2] == null){
                                            matrix[row][i] = true
                                            matrix[row][i +1] == true
                                            matrix[row][i +2] == true
                                            break
                                        }
                                    }

                                }
                            }
                        }
                    }


                    //matrix is filled now

                    if(! hasElement(matrix)){

                        JSaddStartOne.style.display = 'none'
                        JSaddStartTwo.style.display = 'none'
                        JSaddStartThree.style.display = 'none'
                        JSaddHourOne.style.display = 'none'
                        JSaddHourTwo.style.display = 'none'
                        JSaddHourThree.style.display = 'none'


                    } else {

                        JSaddHourOne.style.display = 'inline-block'

                        JSaddStartOne.addEventListener('click', function(){
                            timeOne(matrix);
                        });
                        JSaddStartTwo.addEventListener('click', function(){
                            timeTwo(matrix);
                        });
                        JSaddStartThree.addEventListener('click', function(){
                            timeThree(matrix);
                        });


                        if (hasElementOnRow(matrix, 0) )
                            JSaddStartOne.style.display = 'inline-block'
                        else
                            JSaddStartOne.style.display = 'none'

                        if (hasElementOnRow(matrix, 1) )
                            JSaddStartTwo.style.display = 'inline-block'
                        else
                            JSaddStartTwo.style.display = 'none'

                        if (hasElementOnRow(matrix, 2) )
                            JSaddStartThree.style.display = 'inline-block'
                        else
                            JSaddStartThree.style.display = 'none'

                    }
                })

                console.log('time1', eventForDate)
                console.log('time2', globalTargetDateIndex)
                //console.log('Natalies liste', thisShowDoEvents)
            })
        })
    }

    //the function that creates a new event, and post it to contentful
    function createNewEvent (){

        //---Geting the value of the input fields in the html
        var choosenTime;
        var JSaddNewTitle = JSaddTitle.value;
        var JSaddNewHosts = JSaddHosts.value;
        var JSaddNewPrereq = JSaddPrereq.value;
        //var JSaddNewStartOne = JSaddStartOne.value;
        //var JSaddNewStartTwo = JSaddStartTwo.value;
        //var JSaddNewStartthree = JSaddStartthree.value;
        //var JSaddNewHourOne = JSaddHourOne.value;
        //var JSaddNewHourTwo = JSaddHourTwo.value;
        //var JSaddNewHourthree = JSaddHourthree.value;
        var JSaddNewNrOfPart = JSaddNrOfPart.value;
        var JSaddNewExpect = JSaddExpect.value;
        var JSaddNewJoin = JSaddJoin.value;
        // var JSaddNewImage = JSaddImage.value;
        //  var JSaddNewStockOne = JSaddStockOne.value;
        //var JSaddNewStockTwo = JSaddStockTwo.value;
        //var JSaddNewStockThree = JSaddStockThree.value;
        var JSaddNewElse = JSaddElse.value;

        ///---------Function for selected time----------////
        if(JSaddStartOne.classList.contains('selectedTime') == true){
            choosenTime = selectedDate + '13:00';
        }else if(JSaddStartTwo.classList.contains('selectedTime') == true) {
            choosenTime = '2017-06-02T14:00';
        }else if(JSaddStartThree.classList.contains('selectedTime') == true){
            choosenTime = '2017-06-02T15:00';
        }

        //----------- Function for selected size ---------///
        if(JSaddHourOne.classList.contains('selectedTime') == true){
            choosenTrack = 'Small';
        }else if(JSaddHourTwo.classList.contains('selectedTime') == true) {
            choosenTrack = 'Medium';
        }else if(JSaddHourThree.classList.contains('selectedTime') == true){
            choosenTrack = 'Large';
        }


        var startTime = choosenTime.substring(choosenTime.length - 5);
        console.log('StartTime', startTime);
        console.log('ChoosenTrack', choosenTrack);
        //var eventEndTime;

        /*If choosenTime is 13:00*/
        if(startTime == '13:00' && choosenTrack == 'Large'){
            eventEndTime = '15:45';
        }else if(startTime == '13:00' && choosenTrack == 'Medium'){
            eventEndTime = '14:45';
        }else if(startTime == '13:00' && choosenTrack == 'Small'){
            eventEndTime = '13:45';

            /*If choosenTime is 14:00*/
        }else if(startTime == '14:00' && choosenTrack == 'Medium'){
            eventEndTime = '15:45';
        }else if(startTime == '14:00' && choosenTrack == 'Small'){
            eventEndTime = '14:45';

            /*If choosenTime is 15:00*/
        }else if(startTime == '15:00' && choosenTrack == 'Small'){
            eventEndTime = '15:45';
        }



        // var dateId = '2Bxpz2RgA4AQImQOssey8w';

        //----- JSON that gets sent to Contentful

        var newTrack = {
            fields: {
                title: {
                    'en-US': JSaddNewTitle
                },
                host: {
                    'en-US': JSaddNewHosts
                },
                prerequisites: {
                    'en-US': JSaddNewPrereq

                },
                time: {
                    'en-US': choosenTime
                },
                size: {
                    'en-US': choosenTrack
                },

                endTime: {
                    'en-US': eventEndTime
                },

                numberOfParticipants: {
                    'en-US': JSaddNewNrOfPart
                },
                location: {
                    'en-US': "TBA"
                },
                whatToExpect: {
                    'en-US': JSaddNewExpect

                },
                whoShouldJoin: {
                    'en-US': JSaddNewJoin

                },
                image: {
                    'en-US': imageTwo
                },
                anythingElse: {
                    'en-US': JSaddNewElse
                },
                peopleAttending: {
                    'en-US': [""]
                },

            }//end field
        }//en newTrack

        //-- Creates the new track in events, with ref to korrekt date
        client.getSpace('59mi8sr8zemv')
            .then((space) => {
            space.createEntry('events', newTrack)
                .then( event => {

                var eventID = event.sys.id

                //This function is gets the entry of 16 june
                space.getEntry(dateId)
                    .then((entry) => {

                    //Gets the ID from the newly created event
                    var newId = {sys: {
                        id: eventID,
                        linkType: "Entry",
                        type:"Link"
                    }}

                    //Creates a reference field in dates for show & do
                    entry.fields.link["en-US"].push(newId)
                    //update the event
                    return entry.update()
                })
                //publish event
                space.getEntry(eventID)
                    .then ((entry) => entry.publish())
                space.getEntry(dateId)
                    .then ((entry) => entry.publish())
            })

        })//end getspace

    }//end create new event

}//end add track

exports.addTrack = addTrack;


