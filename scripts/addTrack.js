//var contentful = require('contentful');
var contentfulManagement = require('contentful-management');

function addTrack (){
    //module.exports = function(){
    //contentful management id the module that have contact with contentful.
    //this is the conection to the module

    var client = contentfulManagement.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        resolveLinks: true,
        accessToken: ''

    });

    var arrowPrevious = document.getElementById("arrowPrevious");
    var thisWeekBtn = document.getElementById("thisWeekBtn");
    var arrowNext = document.getElementById("arrowNext");

    //var prevBtn = document.getElementById("prevBtn");
    var thisWeekBtn = document.getElementById("thisWeekBtn");
    //var nextBtn = document.getElementById("nextBtn");

    var prevDate = document.getElementById("prevDate");
    var thisDate = document.getElementById("thisDate");
    var nextDate = document.getElementById("nextDate");


    // var choosenTime = '2017-06-02T13:00:31Z';
    var choosenTrack;
    var choosenImage;

    //var startOne = '2017-06-02T13:00:31Z';

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

    JSaddStartOne.onclick = timeOne;
    JSaddStartTwo.onclick = timeTwo;
    JSaddStartThree.onclick = timeThree;
    JSaddHourOne.onclick = smallTrack;
    JSaddHourTwo.onclick = mediumTrack;
    JSaddHourThree.onclick = largeTrack;
    JSaddStockOne.onclick = chooseImageOne;
    JSaddStockTwo.onclick = chooseImageTwo;
    JSaddStockThree.onclick = chooseImageThree;
    addTrackBtn.onclick = createNewEvent;

    //Unlimited if no value on nrOfPart
    initDates();





    function initDates(){

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
        var thisShowDoEvents = null;


        client.getSpace('59mi8sr8zemv')
            .then((space) =>
                  space.getEntries({
            content_type: 'datesForShowDo',
            order: 'fields.date', //Sort by date in datesForShowDo
            locale: 'en-US'
            //includes: '10'
        }).then(function(entries){
            console.log('bajs', entries.items)
            allDates = entries.items;

            console.log('BajsBajs:', allDates); //all dates

            selectedDate = getSelectedDate();

            //loop through dates in datesForShowDo
            for(var i = 0; i < allDates.length; i++){
                if(allDates[i].fields.date["en-US"] <= selectedDate && allDates[i+1].fields.date["en-US"] >= selectedDate){
                    globalTargetDateIndex = i + 1;

                    var oneDate = allDates[globalTargetDateIndex].fields.date["en-US"];
                    console.log('Later than selectedDate', oneDate);

                    thisShowDoEvents = allDates[i + 1].fields.link; //EVENTS TO DISPLAY
                    break;
                }
            }

            // console.log(fields.date)
            // globalAllDatesArray = fields.date["en-US"];
            globalAllDatesArray = entries.items;
            console.log('global (sorted):', globalAllDatesArray); //all dates

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
                //var thisWeeksEvents = dates.fields.link; //!!!! ENDRE var navn?
            }

            updateDateLabels();
            //callbackAction();
            //TODO enable pre/next buttons

            arrowPrevious.onclick = goPrevious;
            arrowNext.onclick = goNext;



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

            formatted = date.fields.date["en-US"];
            return formatted;
        }

        /*-------------- GET INDEX OF THE DATE --------------*/
        function getDateIndex(index){
            var dateIndex = allDates[index + 1]; //[index+1]
            var date = dateIndex.fields.date["en-US"];

            //Display date correctly in navigation
            var day = date.substring(date.length - 2);
            var month = date.substring(5, 7);
            var year = date.substring(2, 4);

            var dateFormat = day + '.' + month + '.' + year;

            return dateFormat;
        }

        /*-------------- END GET INDEX OF THE  DATE --------------*/

        function updateDateLabels(){

            if(globalTargetDateIndex > 0 ){
                JSdatePick1.innerHTML = getDateLabel(globalTargetDateIndex - 1);
            } else {
                JSdatePick1.innerHTML = "--";
            }

            if(globalTargetDateIndex < globalAllDatesArray.length - 1){
                JSdatePick3.innerHTML = getDateLabel(globalTargetDateIndex + 1);
            } else {
                JSdatePick3.innerHTML = "TBA";
            }

            JSdatePick2.innerHTML = getDateLabel(globalTargetDateIndex);
        }

             }))
    };//end initdates





    //temporary code for the usertest

    function timeOne (){
        choosenTime = startOne
        document.getElementById("JSaddStartOne").classList.add('selectedTime');
        document.getElementById("JSaddStartTwo").classList.remove('selectedTime');
        document.getElementById("JSaddStartThree").classList.remove('selectedTime');
        return choosenTime
    }


    function timeTwo (){
        var choosenTime = '2017-06-02T14:00'
        document.getElementById("JSaddStartTwo").classList.add('selectedTime');
        document.getElementById("JSaddStartOne").classList.remove('selectedTime');
        document.getElementById("JSaddStartThree").classList.remove('selectedTime');
        return choosenTime
    }

    function timeThree (){
        var choosenTime = '2017-06-02T15:00'
        document.getElementById("JSaddStartThree").classList.add('selectedTime');
        document.getElementById("JSaddStartOne").classList.remove('selectedTime');
        document.getElementById("JSaddStartTwo").classList.remove('selectedTime');
        return choosenTime
    }

    function smallTrack (){
        var choosenTrack = "Small"
        document.getElementById("JSaddHourOne").classList.add('selectedTime');
        document.getElementById("JSaddHourTwo").classList.remove('selectedTime');
        document.getElementById("JSaddHourThree").classList.remove('selectedTime');
        return choosenTrack
    }

    function mediumTrack (){
        var choosenTrack = "Medium"
        document.getElementById("JSaddHourTwo").classList.add('selectedTime');
        document.getElementById("JSaddHourOne").classList.remove('selectedTime');
        document.getElementById("JSaddHourThree").classList.remove('selectedTime');
        return choosenTrack
    }
    function largeTrack (){
        var choosenTrack = "Large"
        document.getElementById("JSaddHourThree").classList.add('selectedTime');
        document.getElementById("JSaddHourOne").classList.remove('selectedTime');
        document.getElementById("JSaddHourTwo").classList.remove('selectedTime');
        return choosenImage

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

    //the function that creates a new event, and post it to contentful
    function createNewEvent (){
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
        var JSaddStatus


        var choosenTime = "2017-06-02T13:00";
        var choosenTrack = "Small";
        var dateId = '2Bxpz2RgA4AQImQOssey8w';


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
        }


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
