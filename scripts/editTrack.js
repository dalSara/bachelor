var contentful = require('contentful');
var dataDelivery = require('./dataDelivery');
var contentfulManagement = require('contentful-management');

function editTrack(eventId){

    const client = contentfulManagement.createClient({
        accessToken: //add 'Content Management API' here,
        //  Space: '59mi8sr8zemv',
        resolveLinks: true
      //  content_type: 'application/vnd.contentful.management.v1+json'
    })

    //Html-objekter
    var arrowPrevious = document.getElementById("arrowPrevious");
    var thisWeekBtn = document.getElementById("thisWeekBtn");
    var arrowNext = document.getElementById("arrowNext");

    var thisStartTime;
    var thisSize;
    var eventEndTime;
    var eventId;
    var dateId;

    var imageOne = {sys: {
        id: '6P1ntk0JMcOaau8mgai0Ei',
        linkType: "Asset",
        type:"Link"
    }}

    var imageTwo = {sys: {
        id: '52c42Vor5e4O648YoE4oQU',
        linkType: "Asset",
        type:"Link"
    }}
    var imageThree = {sys: {
        id: '3JRkAH4vcQiI4m0CyMyC0e',
        linkType: "Asset",
        type:"Link"
    }}

    var JSeditTitle = document.getElementById("JSeditTitle");
    var JSeditHosts = document.getElementById("JSeditHosts");
    var JSeditPrereq = document.getElementById("JSeditPrereq");
    var JSaddStartOne = document.getElementById("JSaddStartOne");
    var JSaddStartTwo = document.getElementById("JSaddStartTwo");
    var JSaddStartthree = document.getElementById("JSaddStartthree");
    var JSaddHourOne = document.getElementById("JSaddHourOne");
    var JSaddHourthree = document.getElementById("JSaddHourthree");
    var JSeditNrOfPart = document.getElementById("JSeditNrOfPart");
    var JSeditExpect = document.getElementById("JSeditExpect");
    var JSeditJoin = document.getElementById("JSeditJoin");
    var JSeditElse = document.getElementById("JSeditElse");
    var editTrackBtn = document.getElementById("editTrackBtn");

    //------------ click funkctions --------//
    JSaddStockOne.onclick = chooseImageOne;
    JSaddStockTwo.onclick = chooseImageTwo;
    JSaddStockThree.onclick = chooseImageThree;
    editTrackBtn.onclick = createNewEvent;

    function getQueryVariable(id){ //Get eventId fro URL
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == id){
                return pair[1];
            }
        }
        return(false);
    }

    function getSelectedDate(specifiedDate) {
        selectedDate = new Date();
        if(specifiedDate) return specifiedDate//selectedDate = specifiedDate;

        //-------------- TODAYS DATE --------------//
        //ISO8601 formatted YYYY-MM-DD (to match Contentful):
        var year = selectedDate.getFullYear();
        var month = ('0' + (selectedDate.getMonth() +1)).slice(-2);
        var day = ('0' + selectedDate.getDate()).slice(-2);
        var selectedDate = year + '-' + month + '-' + day;
        //-------------- END TODAYS DATE --------------//

        return selectedDate;
    }

    // This API call will request a space with the specified ID
    client.getSpace('w82bwcfhqvdz')
        .then((space) => {

        eventId = getQueryVariable("id"); //Id from URL

        space.getEntry(eventId)

            .then((entry) => {

            document.getElementById('JSeditTitle').value = entry.fields.title['en-US'];
            document.getElementById('JSeditHosts').value = entry.fields.host['en-US'];
            document.getElementById('JSeditPrereq').value = entry.fields.prerequisites['en-US'];
            document.getElementById('JSeditNrOfPart').value = entry.fields.numberOfParticipants['en-US'];
            document.getElementById('JSeditExpect').value = entry.fields.whatToExpect['en-US'];
            document.getElementById('JSeditJoin').value = entry.fields.whoShouldJoin['en-US'];
            document.getElementById('JSeditElse').value = entry.fields.anythingElse['en-US'];

            /*-------------- SET TIME --------------*/
            var thisTime = entry.fields.time['en-US'];
            thisStartTime = thisTime.substring(thisTime.length - 5);
            var starttimeTxt = "The starttime you choosed was:";
            if(thisStartTime == '13:00'){
                document.getElementById("addedStart").innerHTML = starttimeTxt + " 13:00";
            }else if(thisStartTime == '14:00'){
                document.getElementById("addedStart").innerHTML = starttimeTxt + " 14:00";
            }else if(thisStartTime == '15:00'){
                document.getElementById("addedStart").innerHTML = starttimeTxt + " 15:00";
            }
            /*-------------- END SET TIME --------------*/

            /*-------------- SET SIZE --------------*/
            thisSize = entry.fields.size['en-US'];
            var hourTxt = "The lenght you choosed was:";
            if(thisSize == 'Large'){
                document.getElementById("addedHour").innerHTML = hourTxt + " 3 hours";
            }else if(thisSize == 'Medium'){
                document.getElementById("addedHour").innerHTML = hourTxt + " 2 hours";
            }else if(thisSize == 'Small'){
                document.getElementById("addedHour").innerHTML = hourTxt + " 1 hour";
            }
            /*-------------- END SET SIZE --------------*/

            eventEndTime = entry.fields.endTime['en-US']; //Get the endTime in Contentful.

        })//end entry
    })//end getSpace

    //---------- function to choose time----------//

    //--- gets todays date, and change so next date for Show & Do is in front//


    client.getSpace('w82bwcfhqvdz')
        .then((space) =>
              space.getEntries({
        content_type: 'datesForShowDo',
        order: 'fields.date', //Sort by date in datesForShowDo
        locale: 'en-US'
    })).then(function(entries){

        allDates = entries.items;

        selectedDate = getSelectedDate();
        //loop through dates in datesForShowDo
        for(var i = 0; i < allDates.length; i++){
            if(allDates[i].fields.date["en-US"] <= selectedDate && allDates[i+1].fields.date["en-US"] >= selectedDate){
                globalTargetDateIndex = i + 1;

                var oneDate = allDates[globalTargetDateIndex].fields.date["en-US"];

                thisShowDoEvents = allDates[i + 1].fields.link["en-US"]; //EVENTS TO DISPLAY .
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
                break;
            }
        }

        dateId = allDates[globalTargetDateIndex].sys.id;
        updateDateLabels();

        //--- both arrows and divs with dates can be used to change date

        arrowPrevious.onclick = goPrevious;
        JSdatePick1.onclick = goPrevious;
        JSdatePick3.onclick = goNext;
        arrowNext.onclick = goNext;


        function goNext(){
            if(globalTargetDateIndex < globalAllDatesArray.length - 1){
                globalTargetDateIndex ++;
                dateId = allDates[globalTargetDateIndex].sys.id;
                updateDateLabels();
                time(dateId);
            }
        }

        function goPrevious(){
            if(globalTargetDateIndex > 0){
                globalTargetDateIndex --;
                dateId = allDates[globalTargetDateIndex].sys.id;
                updateDateLabels();
                time(dateId);
            }
        }

        /*-------------- GET INDEX OF THE DATE --------------*/
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

    }).then(function(){time()});

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
        document.getElementById("JSaddStockTwo").classList.add('selectedTime');
        document.getElementById("JSaddStockOne").classList.remove('selectedTime');
        document.getElementById("JSaddStockThree").classList.remove('selectedTime');
    }

    function chooseImageThree (){
        document.getElementById("JSaddStockThree").classList.add('selectedTime');
        document.getElementById("JSaddStockTwo").classList.remove('selectedTime');
        document.getElementById("JSaddStockOne").classList.remove('selectedTime');
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
            if(matrix[row][i] == null && matrix[row+1][i] == null && matrix[row+2][i] == null){
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

    function time (thisShowDoEvents){
        client.getSpace('w82bwcfhqvdz')
            .then((space) => {
            space.getEntry(dateId,{
                resolveLinks: true,
                locale: 'en-US'
            })
                .then((entry) => {
                var allInDate = entry.fields.link['en-US'];
                var eventIdArry = [];

                for(var i = 0; i < allInDate.length; i++){
                    var eventForDate = allInDate[i].sys.id;
                    eventIdArry.push(eventForDate);

                }

                space.getEntries('events')
                    .then((entries) =>{

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
                                        if(matrix[row][i] == null && matrix[row+1][i] == null){
                                            matrix[row][i] = true
                                            matrix[row+1][i] = true
                                            break
                                        }
                                    }
                                } else if(size === "Large"){
                                    for(var i=0; i < n; i++){
                                        if(matrix[row][i] == null && matrix[row+1][i] == null && matrix[row+2][i] == null){
                                            matrix[row][i] = true
                                            matrix[row+1][i] = true
                                            matrix[row+2][i] = true
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
            })
        })
    }// end Time

    function createNewEvent (){
        //---Geting the value of the input fields in the html
        var choosenTime;
        var JSaddNewTitle = JSeditTitle.value;
        var JSaddNewHosts = JSeditHosts.value;
        var JSaddNewPrereq = JSeditPrereq.value;
        var JSaddNewNrOfPart = JSeditNrOfPart.value;
        var JSaddNewExpect = JSeditExpect.value;
        var JSaddNewJoin = JSeditJoin.value;
        var JSaddNewElse = JSeditElse.value;

        ///---------Function for selected time----------////
        if(JSaddStartOne.classList.contains('selectedTime') == true){
            choosenTime = selectedDate + 'T13:00';
        }else if(JSaddStartTwo.classList.contains('selectedTime') == true) {
            choosenTime = selectedDate + 'T14:00';
        }else if(JSaddStartThree.classList.contains('selectedTime') == true){
            choosenTime = selectedDate + 'T15:00';
            //If new time is´not chosen, send in existing time.
        }else if(thisStartTime == '13:00'){
            choosenTime = selectedDate + 'T13:00';
        }else if(thisStartTime == '14:00'){
            choosenTime = selectedDate + 'T14:00';
        }else if(thisStartTime == '15:00'){
            choosenTime = selectedDate + 'T15:00';
        }

        //----------- Function for selected size ---------///
        if(JSaddHourOne.classList.contains('selectedTime') == true){
            choosenTrack = 'Small';
        }else if(JSaddHourTwo.classList.contains('selectedTime') == true) {
            choosenTrack = 'Medium';
        }else if(JSaddHourThree.classList.contains('selectedTime') == true){
            choosenTrack = 'Large';
            //If new size is´not chosen, send in existing size.
        }else if(thisSize == 'Small'){
            choosenTrack = 'Small';
        }else if(thisSize == 'Medium'){
            choosenTrack = 'Medium';
        }else if(thisSize == 'Large'){
            choosenTrack = 'Large';
        }

        //------ function for selcting image
        if(JSaddStockOne.classList.contains('selectedTime') == true){
            choosenImage = imageOne;
        }else if(JSaddStockTwo.classList.contains('selectedTime') == true) {
            choosenImage = imageTwo;
        }else if(JSaddStockThree.classList.contains('selectedTime') == true){
            choosenImage = imageThree;
        }

        var startTime = choosenTime.substring(choosenTime.length - 5);

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

        var errorModal = document.getElementById('error');
        var publishModal = document.getElementById('publish');
        var closeModal = document.getElementById('closeError');

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
                }

            }//end field
        }//en newTrack


        //--------  Check that all required fields are filled before publishing, if not sets the modal -----//
        if (JSaddNewTitle == "" || JSaddNewPrereq == "" || JSaddNewPrereq == "" || JSaddNewExpect == "" || JSaddNewJoin == "" || choosenTime == null || choosenTrack == null || choosenImage == null){
            errorModal.style.display = 'block';
            errorModal.style.opacity = '1';
            errorModal.style.pointerEvents = 'auto';
            errorModal.style.zIndex = '99999';

            closeModal.onclick = function() {
                errorModal.style.display = 'none';
                errorModal.style.opacity = '0';
                errorModal.style.pointerEvents = 'none';
                errorModal.style.zIndex = '-1';
            };

        }else{
            publishTrack();

        }

        function publishTrack(){

            //-- Creates the new track in events, with ref to korrekt date
            client.getSpace('w82bwcfhqvdz')
                .then((space) => {

                dateId;

                eventId = getQueryVariable("id");

                space.getEntry('events', newTrack)
                    .then((event) => {

                    eventId.update();
                    var eventSysId = event.sys.id;

                    //This function is gets the entry of choosen date
                    space.getEntry(dateId)
                        .then((entry) => {

                        //Gets the ID from the newly created event

                        var newId = {sys: {
                            id: eventSysId,
                            linkType: "Entry",
                            type: "Link"
                        }}
                        //Creates a reference field in dates for show & do
                        entry.fields.link["en-US"].push(newId)

                        //update the event
                        entry.update();

                        //entry.publish()
                        event.publish()

                        entry.publish()

                    })

                })

                //publish event

                publishModal.style.display = 'block';
                publishModal.style.opacity = '1';
                publishModal.style.pointerEvents = 'auto';
                publishModal.style.zIndex = '99999';

            });

        };//end publish track


    };//end getspace
//end create new event
};//end EditTrack

exports.editTrack = editTrack;
