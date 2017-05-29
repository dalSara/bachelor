//var contentful = require('contentful');
var contentful = require('contentful-management');
//var dataDelivery = require('./dataDelivery');

//module.exports = function(){
function addAttendees(){
    //contentful management id the module that have contact with contentful.
    //this is the conection to the module
    var client = contentful.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: 'b60f393ec836a43747cb5a238cdc49e379361c7d7a0a96012191fb3745e2532b'

    });

    //var JSeventInfoList = document.getElementsByClassName("JSeventInfoList");
    var JSattendeesName = document.getElementById("JSattendeesName");
    var JSattendeesBtn = document.getElementById("JSattendeesBtn");


    function newAttendees(){

        var eventId = '3P7kGXEmWc28oY0UYmk2yE';
        var getName = JSattendeesName.value;

        client.getSpace('59mi8sr8zemv')
            .then((space) => space.getEntry(eventId))
            .then((entry) => {

            console.log(getName);
            console.log('event', entry.fields.peopleAttending);

            entry.fields.peopleAttending['en-US'].push(getName);

            return entry.update();
        })
            .then ((entry) => entry.publish())
            .catch(console.error)
    };

    JSattendeesBtn.onclick = newAttendees;

}

exports.addAttendees = addAttendees;
