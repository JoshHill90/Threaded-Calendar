
const newEventUrl = 'http://127.0.0.1:8000/api/v1/calendar/new-event/'
const deleteUrl = 'http://127.0.0.1:8000/api/v1/calendar/delete-event'
const updateUrl = 'http://127.0.0.1:8000/api/v1/calendar/update-event/'
const newEventForm = document.getElementById('NewEventForm'); 
const loginForm = document.getElementById('loginForm'); 
let sessionToken = ''
// auth var

const loginUrl = 'http://127.0.0.1:8000/auth/api/v1/login/'
const signupUrl = 'http://127.0.0.1:8000/auth/api/v1/signup/'
const NewUserForm = document.getElementById('NewUserForm'); 

const loginModal = document.getElementById('loginModal');
const loginModalInstance = new bootstrap.Modal(loginModal);

// Function to retrieve session token
function getSessionToken() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('sessionid=')) {
            return cookie.split('=')[1];
        }
    }
    return null;
}

window.document.addEventListener('DOMContentLoaded', () => {
    cookieCheck();
});

// Function to check session cookie and show appropriate modal
function cookieCheck() {
    // Check if session cookie exists and retrieve it
    const tokenVal = getSessionToken();
    if (tokenVal !== null) {
        sessionToken = tokenVal;
       
    } else {
        loginModalInstance.show();
    }
}

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



// auth api calls
NewUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
	let formEmail = document.getElementById("id_email");
	let formUsername = document.getElementById("id_username");
	let formPassword = document.getElementById("id_password");
	let formRepassword = document.getElementById("id_repassword");

	let inputData = {
		'email' : formEmail.value,
		'username':formUsername.value, 
		'password':formPassword.value,
	}
	const formData = JSON.stringify({'data':inputData})
	fetch(signupUrl, {
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

// login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

	let loginUsername = document.getElementById("id_username_login");
	let loginPassword = document.getElementById("id_password_login");


	let inputData = {
		'username':loginUsername.value, 
		'password':loginPassword.value,
	}
	const formData = JSON.stringify({'data':inputData})
	fetch(loginUrl, {
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