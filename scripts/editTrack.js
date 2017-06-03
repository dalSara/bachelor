var contentful = require('contentful');
var contentfulManagement = require('contentful-management');

//module.exports = function(){
function editTrack (){

    // contentful-management.js v3.x.x

    const client = contentfulManagement.createClient({
        accessToken: '',
        //  Space: '59mi8sr8zemv',
        resolveLinks: true
    })




    //Html-objekter (riktiga)

    //   var JSeditPrevDateOne;
    //    var JSeditPrevDateTwo;
    //  var JSeditThisDate;
    //  var JSeditNextDateOne;
    //    var JSeditNextDateTwo;

    var JSeditTitle;
    var JSeditHosts;
    var JSeditPrereq;
    //    var JSeditStartOne; //tidsformatet 2017-05-05T13:00
    //  var JSeditStartTwo;
    //    var JSeditStartthree;
    //  var JSeditHourOne;
    //  var JSeditHourTwo:
    //var JSeditHourthree;
    var JSeditNrOfPart;
    var JSeditExpect;
    var JSeditJoin;
    //    var JSeditImage;
    //    var JSeditStockOne;
    //    var JSeditStockTwo;
    //    var JSeditStockThree;
    var JSeditElse;
    // var JSeditStatus;


    var init = function (){



        JSeditTitle = document.getElementById("JSeditTitle");
        JSeditHosts = document.getElementById("JSeditHosts");
        JSeditPrereq = document.getElementById("JSeditPrereq");
        //  JSeditStartOne = document.getElementById("JSeditStartOne");
        //    JSeditStartTwo = document.getElementById("JSeditStartTwo");
        //      JSeditStartthree = document.getElementById("JSeditStartthree");
        //        JSeditHourOne = document.getElementById("JSeditHourOne");
        //      JSeditHourthree = document.getElementById("JSeditHourthree");
        JSeditNrOfPart = document.getElementById("JSeditNrOfPart");
        JSeditExpect = document.getElementById("JSeditExpect");
        JSeditJoin = document.getElementById("JSeditJoin");
        //      JSeditImage = document.getElementById("JSeditImage");
        //        JSeditStockOne = document.getElementById("JSeditStockOne");
        //      JSeditStockTwo = document.getElementById("JSeditStockTwo");
        //    JSeditStockThree = document.getElementById("JSeditStockThree");
        JSeditElse = document.getElementById("JSeditElse");
        //  JSeditStatus = document.getElementById("JSeditStatus");
        // JSeditTitle = document.getElementById("JSeditTitle");


        editEvent();


    }(); /*--end init--*/


    //the function that creates a new event, and post it to contentful
    function editEvent (){

        // This API call will request a space with the specified ID
        client.getSpace('59mi8sr8zemv')
            .then((space) => {

            var dateID = '3IYJydLps48CSGwyS4QKSw'

            //  Now that we have a space, we can get entries from that space
            space.getEntry(dateID) //Defining-tone-of-vice
            //   space.getEntries('datesForShowDo')
            //     .then((entries) => {
            //console.log(entry.items[4])
            //    })//end get entries




            //This function is finding the correct contenttype in contentful and add new data to that space

                .then((entry) => {

                console.log(entry.fields.time)



                    //document.getElementById('pandaEdit').setAttribute('value', JSON.stringify(entry.fields.title));
                    document.getElementById('JSeditTitle').setAttribute('value', (entry.fields.title['en-US']));

                    document.getElementById('JSeditHosts').setAttribute('value', (entry.fields.host['en-US']));
                    document.getElementById('JSeditPrereq').setAttribute('value', (entry.fields.prerequisites['en-US']));
                    //  document.getElementById('JSeditStartOne').setAttribute('value', (entry.fields.time['en-US']))
                    //document.getElementById('JSeditStartTwo').setAttribute('value', JSON.stringify(entry.fields.time['en-US']))
                    //document.getElementById('JSeditStartthree').setAttribute('value', JSON.stringify(entry.fields.time['en-US']))
                    //   document.getElementById('JSeditHourOne').setAttribute('value', JSON.stringify(entry.fields.size['en-US']))
                    //document.getElementById('JSeditHourTwo').setAttribute('value', JSON.stringify(entry.fields.size))
                    //document.getElementById('JSeditHourthree').setAttribute('value', JSON.stringify(entry.fields.size))
                    document.getElementById('JSeditNrOfPart').setAttribute('value', (entry.fields.numberOfParticipants['en-US']));
                    document.getElementById('JSeditExpect').setAttribute('value', (entry.fields.whatToExpect['en-US']));
                    document.getElementById('JSeditJoin').setAttribute('value', (entry.fields.whoShouldJoin['en-US']));
                    document.getElementById('JSeditElse').setAttribute('value', (entry.fields.anythingElse['en-US']));
                    //document.getElementById('JSeditStatus').setAttribute('value', JSON.stringify(entry.fields.JSeditStatus));



        })//end getSpace

    }//end EditEvent
    //getLink();

};//end EditTrack

exports.editTrack = editTrack;
