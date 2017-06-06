function publishTrack(){
            //-- Creates the new track in events, with ref to korrekt date
            client.getSpace('59mi8sr8zemv')
                .then((space) => {
                space.createEntry('events', newTrack)
                    .then( event => {

                    eventID = event.sys.id;

                   (entry) => entry.publish()
                    //This function is gets the entry of choosen date
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
                        space.getEntry(eventID)
                        .then ((eventID) => entry.publish())

                    })
                      space.getEntry(dateId)
                        .then ((entry) => entry.publish());

                })

                publishModal.style.display = 'block';
                publishModal.style.opacity = '1';
                publishModal.style.pointerEvents = 'auto';
                publishModal.style.zIndex = '99999';

            })

        }//end publish track
