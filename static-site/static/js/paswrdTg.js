const pswbtn = document.getElementById('seePswd')
pswbtn.addEventListener('click', (event) => {
	event.preventDefault()
	let eye = document.getElementById('eye')
	
	let temp = document.getElementById("id_password_login");
		
	if (temp.type === "password") {
		temp.type = "text";
		eye.classList.remove('fa-eye')
		eye.classList.add('fa-eye-slash')
	}
	else {
		temp.type = "password";
	}
})