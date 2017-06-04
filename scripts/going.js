//var contentful = require('contentful');
var contentful = require('contentful-management');
var dataDelivery = require('./dataDelivery');

//module.exports = function(){
function addAttendees(){
    //contentful management id the module that have contact with contentful.
    //this is the conection to the module
    var client = contentful.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: 'b60f393ec836a43747cb5a238cdc49e379361c7d7a0a96012191fb3745e2532b'
    })

    var buttons = document.getElementsByClassName('JSregisterBtn');

    for(var i = 0; i < buttons.length; i++){
        const id = buttons[i].id; //Get id on JSregisterBtn's

        buttons[i].addEventListener('click', function(){

            var input = document.getElementById(id+'Input'); //Get id on input fields
            const name = input.value; //Get name in input fields

            if(name == true || name != ''){ //If input field is
                newAttendees(id, name);
            }
        });
    }

    function newAttendees(eventId, getName){

        client.getSpace('59mi8sr8zemv') //Events
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
}

exports.addAttendees = addAttendees;
