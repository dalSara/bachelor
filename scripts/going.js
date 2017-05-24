function addAttendees (){
    //contentful management id the module that have contact with contentful.
    //this is the conection to the module
    var contentful = require('contentful-management')
    var client = contentful.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: ''

    });

    var JSattendeesName = document.getElementById("JSattendeesName");
    var JSattendeesBtn = document.getElementById("JSattendeesBtn");
    var JSattendeesList = document.getElementsByClassName("JSattendeesList");

    JSattendeesBtn.onclick = newAttendees;


    function newAttendees (){

        var eventId = '4xoBQdHnBmUEQWOgmi2CmK';
        var addAttendees = JSattendeesName.value;

        client.getSpace('59mi8sr8zemv')
            .then((space) =>
                  space.getEntry(eventId)
                  .then((entry) => {
            console.log(addAttendees)
            console.log('event', entry.fields.peopleAttending)

            entry.fields.peopleAttending['en-US'].push(addAttendees)

            return entry.update()
        })

                  .then ((entry) => entry.publish())

                 )};
}
exports.addAttendees = addAttendees
