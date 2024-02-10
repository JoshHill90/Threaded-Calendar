
const logintBtn = document.getElementById('logIn');
const loginForm = document.getElementById('loginForm'); 
const loginUrl = 'http://127.0.0.1:8000/auth/api/v1/login/'
const signupUrl = 'http://127.0.0.1:8000/auth/api/v1/signup/'
const logoutURL = 'http://127.0.0.1:8000/auth/api/v1/logout'
const logoutBtn = document.getElementById('logOut');
let sessionToken = ''
const loginModal = document.getElementById('loginModal');
const loginModalInstance = new bootstrap.Modal(loginModal);

// Function to retrieve session token
function getSessionToken() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
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
    let tokenVal = getSessionToken();
    if (tokenVal !== null) {
        sessionToken = tokenVal;
		logintBtn.hidden = true;
    } else {
		logoutBtn.hidden = true;
        loginModalInstance.show();
    }
}

//logOut
function logout() {
    // Extract the token value from the cookie
    const tokenValue = document.cookie.split('token=')[1].split(';')[0];

    fetch(logoutURL, {
        method: "POST",
        headers: {
            'Authorization': 'Token ' + tokenValue,
            'X-CSRFToken': tokenValue, // Use the token value as the CSRF token
            "Content-Type": "application/json"
        },
    })
	.then(jsonResp => {
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		document.location.reload();
		if (!jsonResp.ok) {
			throw new Error(`HTTP error! Status: please refresh and try again`);
		}

	})
	
};

// signup form
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
		return jsonResp.json();
		
	})
	.then(data => {
		document.cookie = `token=${data.token}`;
		document.location.reload();
	})
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
	.then(response => {
		if (!response.ok) {
			// Check status code here
			if (response.status === 404) {
				// Handle 404 Not Found error
				return alert('User information not found, please check your login info and try again');
			} else if (response.status === 401) {
				// Handle 401 Unauthorized error
				return alert('Error: Unauthorized');
			} else {
				// Handle other errors
				return alert('HTTP error! Status:', response.status);
			}

		} else {
			return response.json();
		}
	})
	.then(data => {
		document.cookie = `token=${data.token}`;
		document.location.reload();

		return data;
	})

});