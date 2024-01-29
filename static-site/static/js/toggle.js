const toggler = document.getElementById('bauble_check');
const mvcal = document.getElementById('mvCal');
const wvcal = document.getElementById('wvCal');
wvcal.style.transform = "translate(0px, -205vh)"
const wvControl = document.getElementsByClassName('weekBtn')
const mvControl = document.getElementsByClassName('monthBtn')
let mvControlArray = Array.from(mvControl);
let wvControlArray = Array.from(wvControl);

wvControlArray.forEach((div) => {
    div.hidden = true;
});

toggler.addEventListener('click', () => {
	console.log(toggler.checked)
  if (toggler.checked) {
	toggleWV()
  } else {
	
	toggleMV()
  }

});

async function toggleWV() {


	await new Promise((resolved) => {
		mvcal.style.transition = "transform 1s";
		mvcal.style.transform = "translate(-100vw, 0px)"
		setTimeout( () => {
			wvcal.style.transition = "transform 1s";
			wvcal.style.transform = "translate(0px, -90vh)"

			resolved();
		}, 1050);
	});
	wvControlArray.forEach((div) => {
		div.hidden = false;
	});

	mvControlArray.forEach((div) => {
		div.hidden = true;
	});
};

async function toggleMV() {

	await new Promise((resolved) => {
		wvcal.style.transition = "transform 1s";
		wvcal.style.transform = "translate(0px, -205vh)"
		setTimeout( () => {

			mvcal.style.transition = "transform 1s";
			mvcal.style.transform = "translate(0px, 0px)"
			resolved();
		}, 1050);
	});
	wvControlArray.forEach((div) => {
		div.hidden = true;
	});

	mvControlArray.forEach((div) => {
		div.hidden = false;
	});

};



