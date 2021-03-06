var contentful = require('contentful-management');
var dataDelivery = require('./dataDelivery');

function addAttendees(){
    //contentful management id the module that have contact with contentful.
    //this is the conection to the module
    var client = contentful.createClient({
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: ''
    })

    var buttons = document.getElementsByClassName('JSregisterBtn');

    for(var i = 0; i < buttons.length; i++){
        const id = buttons[i].id; //Get id on JSregisterBtn's

        buttons[i].addEventListener('click', function(){

            var input = document.getElementById(id+'Input'); //Get id on input fields
            const name = input.value; //Get name in input fields

            if(name == true || name.trim() != ''){ //If input field is true and have content.
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
