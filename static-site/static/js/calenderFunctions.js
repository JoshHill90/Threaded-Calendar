
const newEventUrl = 'http://127.0.0.1:8000/api/v1/calendar/new-event/'
const deleteUrl = 'http://127.0.0.1:8000/api/v1/calendar/delete-event'
const updateUrl = 'http://127.0.0.1:8000/api/v1/calendar/update-event'
const newEventForm = document.getElementById('NewEventForm'); 
const updateEventForm = document.getElementById('updateEventForm')

// event CRUD api calls 

// Create new event
newEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
	let formTitle = document.getElementById("id_title");
	let formDate = document.getElementById("id_date");
	let formStart = document.getElementById("id_start");
	let formEnd = document.getElementById("id_end");
	let formDetails = document.getElementById("id_details");
	let formEventType = document.getElementById("id_event_type")

	let inputData = {
		'subject' : formTitle.value,
		'date':formDate.value, 
		'start':formStart.value,
		'end':formEnd.value,
		'event_type': formEventType.value,
		'details' :formDetails.value
	}
	const formData = JSON.stringify({'data':inputData})
	fetch(newEventUrl, {
		method: "POST",
		body: formData,
		headers: {
			'Authorization': 'Token ' + document.cookie.split('token=')[1],
			'X-CSRFToken': document.cookie.split('token=')[1],
			"Content-Type": "application/json"
		},
	})
	.then(jsonResp => {
		if (!jsonResp.ok) {
			throw new Error(`HTTP error! Status: please refresh and try again`);
		}
		// Refreshes the page after the event is created
		document.location.reload();
		
	});

});

// udpate event 
updateEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
	let formID = document.getElementById("id_id_update");
	let formTitle = document.getElementById("id_title_update");
	let formDate = document.getElementById("id_date_update");
	let formStart = document.getElementById("id_start_update");
	let formEnd = document.getElementById("id_end_update");
	let formDetails = document.getElementById("id_details_update");
	let formEventType = document.getElementById("id_event_type_update")

	let inputData = {
		'id' : formID.value,
		'subject' : formTitle.value,
		'date': formDate.value, 
		'start': formStart.value,
		'end': formEnd.value,
		'event_type': formEventType.value,
		'details' : formDetails.value
	}
	let upURLid = `${updateUrl}/${formID.value}/`
	const formData = JSON.stringify({'data':inputData})
	fetch(upURLid, {
		method: "PATCH",
		body: formData,
		headers: {
			'Authorization': 'Token ' + document.cookie.split('token=')[1],
			'X-CSRFToken': document.cookie.split('token=')[1],
			//'X-HTTP-Method-Override': 'PUT', 
			"Content-Type": "application/json"
		},
	})
	.then(jsonResp => {
		if (!jsonResp.ok) {
			throw new Error(`HTTP error! Status: please refresh and try again`);
		}
		// Refreshes the page after the event is created
		document.location.reload();
		
	});
});

// delete request, refreshes the page after the request is compeleted
async function deleteEvent(eventID) {
	let delURL = `${deleteUrl}/${eventID}/`

	fetch((delURL), {
		method: "DELETE",

		headers: {
			'Authorization': 'Token ' + document.cookie.split('token=')[1],
			'X-CSRFToken': document.cookie.split('token=')[1],
			"Content-Type": "application/json"
		},
	})
	.then(jsonResp => {
		if (!jsonResp.ok) {
			throw new Error(`HTTP error! Status: please refresh and try again`);
		}
		document.location.reload();
		
	});
}

// update modale values putter
function updateEvent(eventData){
	console.log(eventData)
	const titleUpdate = document.getElementById('id_title_update');
	const dateUpdate = document.getElementById('id_date_update');
	const startTimeUpdate = document.getElementById('id_start_update');
	const endTimeUpdate = document.getElementById('id_end_update');
	const eventTypeUpdate = document.getElementById('id_event_type_update');
	const detailsUpdate = document.getElementById('id_details_update');
	const idUpdate = document.getElementById('id_id_update');
	titleUpdate.value = eventData.subject
	dateUpdate.value = eventData.date
	startTimeUpdate.value = eventData.start
	endTimeUpdate.value = eventData.end
	eventTypeUpdate.value = eventData.event_type
	detailsUpdate.value = eventData.details
	idUpdate.value = eventData.id

}