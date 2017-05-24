function addTrack (){

    //contentful management id the module that have contact with contentful.
    //this is the conection to the module
    var contentful = require('contentful-management')
    var client = contentful.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: ''

    });


    //Html-objekter

    var JSaddTitle;
    var JSaddHosts;
    var JSaddPrereq;
    var JSaddStartOne;
    var JSaddStartTwo;
    var JSaddStartThree;
    var JSaddHourOne;
    var JSaddHourTwo;
    var JSaddHourThree;
    var JSaddNrOfPart;
    var JSaddExpect;
    var JSaddJoin;
    var JSaddImage;
    var JSaddStockOne;
    var JSaddStockTwo;
    var JSaddStockThree;
    var JSaddElse;
    // var JSaddStatus;

    var addTrackBtn;

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

    var init = function (){


        JSaddTitle = document.getElementById("JSaddTitle");
        JSaddHosts = document.getElementById("JSaddHosts");
        JSaddPrereq = document.getElementById ("JSaddPrereq");
        JSaddStartOne = document.getElementById("JSaddStartOne");
        JSaddStartTwo = document.getElementById("JSaddStartTwo");
        JSaddStartThree = document.getElementById("JSaddStartThree");
        JSaddHourOne = document.getElementById("JSaddHourOne");
        JSaddHourTwo= document.getElementById("JSaddHourTwo");
        JSaddHourThree = document.getElementById("JSaddHourThree");
        JSaddNrOfPart = document.getElementById("JSaddNrOfPart");
        JSaddExpect = document.getElementById("JSaddExpect");
        JSaddJoin = document.getElementById("JSaddJoin");
        JSaddImage = document.getElementById("JSaddImage");
        JSaddStockOne = document.getElementById("JSaddStockOne");
        JSaddStockTwo = document.getElementById("JSaddStockTwo");
        JSaddStockThree = document.getElementById("JSaddStockThree");
        JSaddElse = document.getElementById("JSaddElse");
        //JSaddStatus = document.getElementById("JSaddStatus");
        addTrackBtn = document.getElementById("addTrackBtn");

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



    }(); /*--end init--*/


    //the function that creates a new event, and post it to contentful
    function createNewEvent (){
        alert("Your track has been added");
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

            }//end field
        }

        var newGoing = {
            fields: {
                title: {
                    'en-US': JSaddNewTitle
                },
                name: {
                    'en-US': ""
                }
            }
        }//end newGoing

  /*      client.getSpace('59mi8sr8zemv')
            .then((space) => {
            space.createEntry('peopleGoing', newGoing)
                .then( event => {

                var attendeesId = attendees.sys.id

                })
            //Gets the ID from the newly created event
            var newAttendeesId = {sys: {
                id: attendeesId,
                linkType: "Entry",
                type:"Link"
            }}

            })*/
        client.getSpace('59mi8sr8zemv')
            .then((space) => {
            space.createEntry('events', newTrack)
                .then( event => {

                var eventID = event.sys.id

                entry.fields.link["en-US"].push(newAttendeesId)


                //This function is gets the entry of 16 june
                space.getEntry('2Bxpz2RgA4AQImQOssey8w')
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

            })


        })//end getspace

    }//end create new event

}//end add track
exports.addTrack = addTrack
