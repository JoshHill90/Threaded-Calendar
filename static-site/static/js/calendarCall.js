
let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, '0');
let year = dateObj.getFullYear();
let formattedDate = dateObj.toISOString().split('T')[0];
let todayIs = ""
const site = "http://127.0.0.1:8000/";
const calURL = site + "api/v1/calendar/";
let mvSet = [];
let wvSet = [];

const toggleCheck = document.getElementById('bauble_check');
var d1 = 0
var d2 = 1
var d3 = 2
let setMonth = ''
const getDate = document.getElementById('getDate')
let currentMonth = ''
let currentYear = ''

let event_list = ''
/// need to make event list and append 

// ------------ onload functions ----------------//

// default load cal gen request
window.addEventListener('load', () => {
	getTodaysDate();
	setSelectYears();
});

// Select year set up
function setSelectYears(){
	const yearDiv = document.getElementById('year')
	for (i = 1900; i < 3000; ++ i) {
		const selYear = document.createElement('option')
		if (String(year) ==i) {
			selYear.selected = true
		}

		selYear.value = i;
		selYear.innerHTML = i;
		yearDiv.appendChild(selYear)

	}
}

// ------------ onload functions ----------------//

function getDateSubmit() {
	const getYear = document.getElementById('year').value;
	const getMonth = document.getElementById('month').value;
	getGivenDate(getYear, getMonth)

}



// ------------ API Calls ----------------//
// api Get for a todays date, aslo the default selection when opening the page
function getTodaysDate() {
	fetch((calURL + year + "/" + month + "/"), {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then(response => response.json())
	.then(calData => {
		event_list = ''
		calendarGen(calData, month);
	});
} 
// api Get for a submited date
function getGivenDate(givenYear, givenMonth) {
	fetch((calURL + givenYear + "/" + givenMonth + "/"), {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then(response => response.json())
	.then(calData => {
		event_list = ''
		calendarGen(calData, givenMonth);
	});
} 
// api Get for a weekview
function getWVDate(givenYear, givenMonth) {
	fetch((calURL + givenYear + "/" + givenMonth + "/"), {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})

	.then(response => response.json())
	.then(calData => {
		wvSet = [];
		event_list = ''
		MounthWV(calData, givenMonth)

	});
} 

function getPreWVDate(givenYear, givenMonth) {
	fetch((calURL + givenYear + "/" + givenMonth + "/"), {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})

	.then(response => response.json())
	.then(calData => {
		wvSet = [];
		event_list = ''
		PreMounthWV(calData, givenMonth)

	});
} 

function dynamicEventModal(eventData){
	console.log(eventData);
	const titleLabel = document.getElementById('eventModalLabel');
	const dateLabel = document.getElementById('eventModalDate');
	const startLabel = document.getElementById('eventModalStart');
	const endLabel = document.getElementById('eventModalEnd');
	const typeLabel = document.getElementById('eventModalType');
	const detailSection = document.getElementById('eventModaldetails');
	const deleteBtn = document.getElementById('deleteEventBtn');
	const update = document.getElementById('updateEventBtn');
	let eventID = eventData.id;
	titleLabel.innerHTML = eventData.subject;
	dateLabel.innerHTML = eventData.date;
	if (eventData.start.split(":")[0] > 12 ){
		startLabel.innerHTML = `${((eventData.start.split(":")[0]) - 11)}:${eventData.start.split(":")[0]} PM`;
	} else {
		startLabel.innerHTML = `${parseInt(eventData.start.split(":")[0])}:${eventData.start.split(":")[0]} AM`;
	};
	
	if (eventData.event_type == "All Day Event") {
		endLabel.innerHTML = "-:-- All Day"
	} else {
		if (eventData.end.split(":")[0] > 12 ){
			endLabel.innerHTML = `${((eventData.end.split(":")[0]) - 12)}:${eventData.end.split(":")[0]} PM`;
		} else {
			endLabel.innerHTML = `${parseInt(eventData.end.split(":")[0])}:${eventData.end.split(":")[0]} AM`;
		};
	};
	deleteBtn.setAttribute("onclick", `deleteEvent(${eventID})`);
	update.setAttribute("onclick", `updateEvent(${eventID})`);
	
	typeLabel.innerHTML = eventData.event_type
	detailSection.innerHTML = eventData.details

}


// ------------ Month view Functions (mv) ----------------//
// mv calendar genrator, fills in the dates and highlights for the month view. 
function calendarGen(calData, monthin) {
    const year_set = calData.year;
	currentMonth = monthin;
	setMonth = calData.month1
	currentYear = calData.cal_date.slice(0, 4)
	event_list = calData.events
	//console.log(event_list)

    const calendarSet = calData.cal;
    mvSet = [];
	wvSet = [];

	const dateBannaer = document.getElementById('calDate')
	dateBannaer.innerHTML = currentYear + " " + setMonth.slice(0, 3);

    // Clear the text content of existing labels
    for (let i = 1; i <= 42; i++) {
        const dayDiv = document.getElementById("mv" + i);
        if (dayDiv) {
            dayDiv.textContent = '';
            dayDiv.classList.remove('mv-today');
            dayDiv.classList.add('mv-label');
        }
    }

    for (const weekKey in calendarSet) {
        const week = calendarSet[weekKey];
        for (const dayKey in week) {
            var dateTimeSt = week[dayKey].date;
            let datePart = dateTimeSt.split('T')[0];

            if (datePart === formattedDate) {
                todayIs = week[dayKey].day;
            }
            const day = week[dayKey];
            mvSet.push(day.day);
			wvSet.push(day.day);
			
        }
    }
	//console.log(wvSet)
	// loops over the month view set and places the days in the claendar lables.
	// it also will darken the days outsode of the month, to fill in the ends and highlight todays date
	mvSet.forEach((day, index) => {
		var dayDiv = document.getElementById("mv" + (index + 1));
		const dayInfo = document.createElement('p');
		let topDiv = dayDiv.parentElement
		topDiv.innerHTML = ''
		topDiv.append(dayDiv)
		//console.log(day)
		if ((day > 20) && ((index + 1) < 13)) {
			//console.log(day, (index + 1) + ' end of previous month');
			dayInfo.classList = "p-l";
			dayDiv.classList.add('mv-tail');
			dayDiv.classList.remove('mv-label');
		} else if ((day < 20) && ((index + 1) > mvSet.length - 14)) {
			//console.log(day, 'start of next month');
			dayInfo.classList = "p-l";
			dayDiv.classList.add('mv-tail');
			dayDiv.classList.remove('mv-label');
		} else {
			dayDiv.classList.remove('mv-tail');
			dayDiv.classList.add('mv-label');
			//console.log(day, (index + 1) + ' set');
			dayInfo.classList = "p-p";
			//checks for days with events within this month
			for (eventIndex = 0; eventIndex < event_list.length; ++ eventIndex){
				//console.log(events[eventIndex].date.split('-')[2], 'event day');
				
				if (day == event_list[eventIndex].date.split("-")[2]) {
					// create icon for event type 
					let iconText = document.createElement('button')
					iconText.classList.add('btn-cust-2', 'w-100')
					iconText.type = "button";
					iconText.setAttribute('data-bs-toggle', 'modal');
					iconText.setAttribute('data-bs-target', '#eventModal');
					iconText.setAttribute("onclick", `dynamicEventModal(${JSON.stringify(event_list[eventIndex])})`);
					let parentDiv2 = document.createElement('div');
					let iconSymb = ''
					
					//console.log(events[eventIndex].event_type)
					//checks event typs and appleis the corresponding icon 
					if (event_list[eventIndex].event_type == 'Meeting') {
						
						iconSymb = '<i class="fa-regular fa-handshake event_icon"></i>'
					} else if (event_list[eventIndex].event_type == 'All Day Event') {
	
						iconSymb = '<i class="fa-solid fa-calendar event_icon"></i>'
					} else if (event_list[eventIndex].event_type == 'Time Block') {
	
						iconSymb = '<i class="fa-regular fa-square-full event_icon"></i>'
					} else if (event_list[eventIndex].event_type == 'Busy/Away') {
						
						iconSymb = '<i class="fa-solid fa-square-full  event_icon"></i>'
					} else if (event_list[eventIndex].event_type == 'Timed Event') {
						
						iconSymb = '<i class="fa-regular fa-clock  event_icon"></i>'
					}

					// add classes to created elements 
					parentDiv2.classList.add('col-12', 'event_col')
					iconText.classList.add('p-l')
					
					// insert subject as text
					iconText.innerHTML = iconSymb + ' ' + event_list[eventIndex].subject
					//console.log(parentDiv, dayDiv)
						
					parentDiv2.appendChild(iconText)
					topDiv.appendChild(parentDiv2)
	
				}
			}
		}
		dayInfo.innerHTML = day;
		dayDiv.appendChild(dayInfo);
	
		if (day === todayIs && month == parseInt(monthin) && currentYear == year) {
			dayDiv.classList.add('mv-today');
			dayDiv.classList.remove('mv-label');
		}

	});
	sameMonthWV();

}


// Function to get the calendar for the last month
function lastMonth() {
	//console.log(currentMonth)
    if (currentMonth == "1" || currentMonth == "01") {
        var lastYear = parseInt(currentYear) - 1;
        var lastM = 12;
		//console.log(lastYear, lastM, 'last-year');
		getGivenDate(lastYear, lastM);
    } else {
		var lastMonthNum = parseInt(currentMonth) - 1;
		getGivenDate(currentYear, lastMonthNum);

	}

	document.getElementById('lastM').disabled = true;
	document.getElementById('nextM').disabled = true;
    setTimeout(() => {
        resetButtonState();
    }, 200);
}

// Function to get the calendar for the next month
function nextMonth() {
	//console.log(currentMonth)
    if (currentMonth === 12) {
        let nextYear = parseInt(currentYear) + 1;
        let nextM = 1;
		//console.log(nextYear, nextM, 'next-year');
		getGivenDate(nextYear, nextM);
    } else {
		let nextMonthNum = parseInt(currentMonth) + 1;
		getGivenDate(currentYear, nextMonthNum);
	}

	document.getElementById('lastM').disabled = true;
	document.getElementById('nextM').disabled = true;
	setTimeout(() => {
        resetButtonState();
    }, 200);
}

function resetButtonState() {
    document.getElementById('lastM').disabled = false;
	document.getElementById('nextM').disabled = false;
}



// ------------ Week view Functions (mv) ----------------//
// week view calendar genrator, fills in the dates and highlights for the week view. 

// next day action
function nextDay(){
	++ d1;
	++ d2;
	++ d3;
	let wvCurrenthSet = getMonthWVSet()
	if (wvCurrenthSet[d3] == 1) {
	
        let nextMonthNum = parseInt(currentMonth) + 1;
		//console.log('next_month', nextMonthNum)
		if (currentMonth === 12) {
			let nextYear = parseInt(currentYear) + 1;
			let nextM = 1;
			//console.log(nextYear, nextM, 'next-year');
			getWVDate(nextYear, nextM);
			d1 = 0;
			d2 = 1;
			d3 = 2;
		} else {
			getWVDate(currentYear, nextMonthNum);
			d1 = 0;
			d2 = 1;
			d3 = 2;
		}

    } else {
		sameMonthWV();
	}

}
// previus day action
function previousDay() {
	let wvYear = 0
	let wvCurrenthSet = getMonthWVSet();

	--d1;
	--d2;
	--d3;
    if (wvCurrenthSet[d2] == 1) {
        let lastMonthNum = parseInt(currentMonth) - 1;

        if (currentMonth == "1" || currentMonth === "01") {
            let wvYear = parseInt(currentYear) - 1;
            let lastM = 12;
            //console.log(wvYear, lastM, 'last-year');
			
			getPreWVDate(wvYear, lastM);

        } else {
			wvYear = parseInt(currentYear);
			getPreWVDate(wvYear, lastMonthNum);
        }
	
    } else {
		sameMonthWV();
    }
}


function sameMonthWV(){
	
	const yearLabel = document.getElementById('calYear')
	const day1Label = document.getElementById('w1l');
	const day2Label = document.getElementById('w2l');
	const day3Label = document.getElementById('w3l');
	let wvMonthSet = getMonthWVSet();
	weekViewEvents(wvMonthSet);
	yearLabel.innerHTML = currentYear
	day1Label.innerHTML = `${setMonth} ${wvMonthSet[d1]}`;
	day2Label.innerHTML = `${setMonth} ${wvMonthSet[d2]}`;
	day3Label.innerHTML = `${setMonth} ${wvMonthSet[d3]}`;
	
}

function MounthWV(calData, monthin){
	currentMonth = monthin;
	setMonth = calData.month1
	currentYear = calData.cal_date.slice(0, 4)
	event_list = calData.events
    const calendarSet = calData.cal;

	for (const weekKey in calendarSet) {
        const week = calendarSet[weekKey];
        for (const dayKey in week) {
            var dateTimeSt = week[dayKey].date;
            let datePart = dateTimeSt.split('T')[0];

            if (datePart === formattedDate) {
                todayIs = week[dayKey].day;
            }
            const day = week[dayKey];
			wvSet.push(day.day);
        }
    }
	let wvMonthSet = getMonthWVSet();
	weekViewEvents(wvMonthSet);

	const yearLabel = document.getElementById('calYear')
	const day1Label = document.getElementById('w1l');
	const day2Label = document.getElementById('w2l');
	const day3Label = document.getElementById('w3l');

	yearLabel.innerHTML = currentYear
	day1Label.innerHTML = `${setMonth} ${wvMonthSet[d1]}`;
	day2Label.innerHTML = `${setMonth} ${wvMonthSet[d2]}`;
	day3Label.innerHTML = `${setMonth} ${wvMonthSet[d3]}`;

}

function PreMounthWV(calData, monthin){
	console.log('last month')
	currentMonth = monthin;
	setMonth = calData.month1
	currentYear = calData.cal_date.slice(0, 4)
	event_list = calData.events
	console.log(event_list)
    const calendarSet = calData.cal;

	for (const weekKey in calendarSet) {
        const week = calendarSet[weekKey];
        for (const dayKey in week) {
            var dateTimeSt = week[dayKey].date;
            let datePart = dateTimeSt.split('T')[0];

            if (datePart === formattedDate) {
                todayIs = week[dayKey].day;
            }
            const day = week[dayKey];
			wvSet.push(day.day);
        }
    }

	let wvMonthSet = getMonthWVSet();
	var month_end = wvMonthSet.lastIndexOf(1);
	//console.log(wvMonthSet)
	//console.log(month_end)
	
	d1 = month_end - 3;
	d2 = month_end - 2;
	d3 = month_end - 1;
	//console.log(
		//wvSet[d1], 
		//wvSet[d2], 
		//wvSet[d3], )
	const yearLabel = document.getElementById('calYear')
	const day1Label = document.getElementById('w1l');
	const day2Label = document.getElementById('w2l');
	const day3Label = document.getElementById('w3l');
	weekViewEvents(wvMonthSet);
	yearLabel.innerHTML = currentYear
	day1Label.innerHTML = `${setMonth} ${wvMonthSet[d1]}`;
	day2Label.innerHTML = `${setMonth} ${wvMonthSet[d2]}`;
	day3Label.innerHTML = `${setMonth} ${wvMonthSet[d3]}`;

}

function getMonthWVSet() {
	var month_start = wvSet.indexOf(1);
	var wvMonthSet = wvSet.slice(month_start);
	return wvMonthSet;
}


function weekViewEvents(wvMonthSet){
		//console.log('wv event', event_list)
	
		const hourDivs = document.getElementsByClassName('day-wv-set')
		for (indexHour = 0; indexHour < hourDivs.length; ++ indexHour) {
			if (hourDivs[indexHour]) {
				let endTimeStr = hourDivs[indexHour].innerHTML.indexOf('M')
				let hourStr = hourDivs[indexHour].innerHTML.slice(0, (endTimeStr + 1))
				hourDivs[indexHour].innerHTML = hourStr
				
			}
		}

		for (listIndex = 0; listIndex < event_list.length; ++listIndex) {

			if (wvMonthSet[d1] == event_list[listIndex].date.split("-")[2]) {
				//console.log('checker space 1 ')
				let eventDiv = document.createElement('button');
				eventDiv.classList.add('btn-cust-2', 'w-100');
				eventDiv.type = "button";
				eventDiv.setAttribute('data-bs-toggle', 'modal');
				eventDiv.setAttribute('data-bs-target', '#eventModal');
				eventDiv.setAttribute("onclick", `dynamicEventModal(${JSON.stringify(event_list[listIndex])})`);
				let startH = event_list[listIndex].start.split(":")[0];
				//console.log(startH)
				let divStart1 = document.getElementById(`d1-h${parseInt(startH)}`);
				//console.log(divStart1)
				let iconEventSymb = ''
				if (event_list[listIndex].event_type == 'Meeting') {	
					iconEventSymb = '<i class="fa-regular fa-handshake event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'All Day Event') {
				
					iconEventSymb = '<i class="fa-solid fa-calendar event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Time Block') {
					iconEventSymb = '<i class="fa-regular fa-square-full event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Busy/Away') {
					iconEventSymb = '<i class="fa-solid fa-square-full  event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Timed Event') {
					iconEventSymb = '<i class="fa-regular fa-clock  event_icon"></i>'
				}
				
				eventDiv.innerHTML = `${iconEventSymb} ${event_list[listIndex].subject}`;
				divStart1.appendChild(eventDiv)

			} else if (wvMonthSet[d2] == event_list[listIndex].date.split("-")[2]) {
				//console.log('checker space 2 ')
				let eventDiv = document.createElement('button');
				eventDiv.classList.add('btn-cust-2', 'w-100');
				eventDiv.type = "button";
				eventDiv.setAttribute('data-bs-toggle', 'modal');
				eventDiv.setAttribute('data-bs-target', '#eventModal');
				eventDiv.setAttribute("onclick", `dynamicEventModal(${JSON.stringify(event_list[listIndex])})`);

				let startH = event_list[listIndex].start.split(":")[0];
				//console.log(startH)
				let divStart2 = document.getElementById(`d2-h${parseInt(startH)}`);
				//console.log(divStart2)
				if (event_list[listIndex].event_type == 'Meeting') {	
					iconEventSymb = '<i class="fa-regular fa-handshake event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'All Day Event') {
					iconEventSymb = '<i class="fa-solid fa-calendar event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Time Block') {
					iconEventSymb = '<i class="fa-regular fa-square-full event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Busy/Away') {
					iconEventSymb = '<i class="fa-solid fa-square-full  event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Timed Event') {
					iconEventSymb = '<i class="fa-regular fa-clock  event_icon"></i>'
				}
				
				eventDiv.innerHTML = `${iconEventSymb} ${event_list[listIndex].subject}`;
				divStart2.appendChild(eventDiv)

			} else if (wvMonthSet[d3] == event_list[listIndex].date.split("-")[2]) {
				//console.log('checker space 3')
				let eventDiv = document.createElement('button');
				eventDiv.classList.add('btn-cust-2', 'w-100');
				eventDiv.type = "button";
				eventDiv.setAttribute('data-bs-toggle', 'modal');
				eventDiv.setAttribute('data-bs-target', '#eventModal');
				eventDiv.setAttribute("onclick", `dynamicEventModal(${JSON.stringify(event_list[listIndex])})`);
				let startH = event_list[listIndex].start.split(":")[0];
				//console.log(startH)
				let divStart3 = document.getElementById(`d3-h${parseInt(startH)}`);
				//console.log(divStart3)
				if (event_list[listIndex].event_type == 'Meeting') {	
					iconEventSymb = '<i class="fa-regular fa-handshake event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'All Day Event') {
				
					iconEventSymb = '<i class="fa-solid fa-calendar event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Time Block') {
					iconEventSymb = '<i class="fa-regular fa-square-full event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Busy/Away') {
					iconEventSymb = '<i class="fa-solid fa-square-full  event_icon"></i>'
				} else if (event_list[listIndex].event_type == 'Timed Event') {
					iconEventSymb = '<i class="fa-regular fa-clock  event_icon"></i>'
				}
				
				eventDiv.innerHTML = `${iconEventSymb} ${event_list[listIndex].subject}`;
				divStart3.appendChild(eventDiv)

			} 

		}
	
}