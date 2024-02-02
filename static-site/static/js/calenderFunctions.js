
const newEventUrl = 'http://127.0.0.1:8000/api/v1/calendar/new-event/'
const deleteUrl = 'http://127.0.0.1:8000/api/v1/calendar/delete-event'
const updateUrl = 'http://127.0.0.1:8000/api/v1/calendar/update-event/'
const newEventForm = document.getElementById('NewEventForm'); 
console.log
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
			"Content-Type": "application/json"
		},
	})
	.then(jsonResp => {
		if (!jsonResp.ok) {
			throw new Error(`HTTP error! Status: please refresh and try again`);
		}
		document.location.reload();
		
	});

});

async function deleteEvent(eventID) {
	let delURL = `${deleteUrl}/${eventID}/`

	fetch((delURL), {
		method: "DELETE",

		headers: {
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