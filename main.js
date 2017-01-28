/* 
* app		SimpleTimer
* by 		Samuel Fernandez 
* version	2.7 (2015-10-19)
* notes		small enhancements, able to play pre-defined mp3 file, optimize app by reduce global variables
* package	index.html, style.css, main.js
* version history
* 2.6 (2015-10-9): added: styling on progress bar, background image, sticky footer
* 2.5 (2015-10-8): show time remaining, added background image
* 2.0 (2015-10-7): added progress bar styling
* 1.1 (2015-10-6)
*/

// get handle of the 2 buttons
var btn1 = document.getElementById("btnStart");
var btn2 = document.getElementById("btnReset");
var runDisplay = document.getElementById("runDisplay");			// showing the actual timer
var inputDuration = document.getElementById("duration");		// get handle of the text box where target duration is inputted
var intervalHandle;												// main handle on the "timer" that runs every so often
var firstDate;													// firstDate = the Date/Time when the timer starts to tick...
var duration; 													// the target number of minute(s) for the "timer".. e.g. 1 minutes, 30, or whatever
/* for progress bar */
var myBar = document.getElementById("bar");
var myProgress = document.getElementById("progressStatus");

function runTimer() {
	var secondDate = new Date();
	var secElapsed = Math.floor((secondDate - firstDate) / 1000);
	var minElapsed = Math.floor((secondDate - firstDate) / 60000);
	var hourElapsed = Math.floor((secondDate - firstDate) / 1440000);
	
	var secSubtrahend = Math.floor(secElapsed / 60);
	var secDisplay = Math.round(((secElapsed / 60) - secSubtrahend) * 60);			//for display:
	 
	var minSubtrahend = Math.floor((hourElapsed / 24));
	var realMinutes = Math.round(((minElapsed / 60) - minSubtrahend) * 60);
	var realMinSubtrahend = Math.floor(realMinutes / 60);
	var minDisplay = Math.round(((realMinutes / 60) - realMinSubtrahend) * 60);		//for display:
	
	var hourDisplay = Math.floor(realMinutes / 60);									//for display:
		
	// get remaining hours
	var remainingHours = Math.floor((((duration*60) - secElapsed)/3600));
	
	// get the remaining minutes to display accordingly
	var realMinutesRemaining = Math.floor((duration - (secElapsed/60)));
	var x = (realMinutesRemaining/60);
	var remainingMinSub = Math.floor(x)*60;
	var remainingMinutes = (realMinutesRemaining - remainingMinSub);
	
	// get remaining Seconds
	var remainingSecSub = Math.floor(((duration*60) - secDisplay)/60);				//compute how many seconds left (within 60 sec timeframe, 60=0)
	var remainingSeconds = Math.round((((((duration*60) - secDisplay)/60) - remainingSecSub)*60));
	
	var hh;
	if (hourDisplay > 1) {
		hh = " hours ";
	} else {
		hh = " hour ";
	}

	var mm;
	if (minDisplay > 1) {
		mm = " minutes ";
	} else {
		mm = " minute ";
	}	

	var ss;
	if (secDisplay > 1) {
		ss = " seconds";
	} else {
		ss = " second";
	}	
//------------

	var hhh;
	if (remainingHours > 1) {
		hhh = " hours ";
	} else {
		hhh = " hour ";
	}

	var mmm;
	if (remainingMinutes > 1) {
		mmm = " minutes ";
	} else {
		mmm = " minute ";
	}	

	var sss;
	if (remainingSeconds > 1) {
		sss = " seconds";
	} else {
		sss = " second";
	}
	
	var mmmm;
	if (duration > 1) {
		mmmm = " minutes ";
	} else {
		mmmm = " minute ";
	}
	
	if (realMinutes == duration) {
		myBar.style.width = "100%";
		myProgress.innerHTML = "100%";
		    	
		runDisplay.innerHTML = duration + mmmm + "target reached!";
		runDisplay.setAttribute("class","finished");
		// show last time remaining
		document.getElementById("timeRemaining").innerHTML = "Time's up!";	// show that it's done
		document.title = "Time's up! - SimpleTimer by Sam";
		
		clearInterval(intervalHandle);
		
		inputDuration.disabled = false;
		document.getElementById("endTime").innerHTML = "End: " + secondDate.getFullYear() + "-" + (secondDate.getMonth() + 1) + "-" + secondDate.getDate() + " " + secondDate.toLocaleTimeString();		// display end/date time.. the time when the timer reached its target
		
		btn1.innerHTML = "Start";
		document.getElementById('doneBeep').play();
       	
		alert(duration + mm + "target reached!");
	} else {
    	document.title = "SimpleTimer by Sam";
		
		runDisplay.innerHTML = "elapsed: " + hourDisplay + hh + minDisplay + mm + secDisplay + ss;
		
		document.getElementById("timeRemaining").innerHTML = "remaining: " + 		
		remainingHours + hhh + 
		remainingMinutes  + mmm + 
		remainingSeconds + sss;

		/* progress bar showing time elapsed in % */
		var num = (secElapsed/(duration*60))*100;
		myBar.style.width = num +"%";
		
		/* to limit progress % to 2 decimal places */
		var n = num.toFixed(2);
		myProgress.innerHTML = n + "%";
	}
}

btn1.onclick = function () {
	duration = document.getElementById("duration").value;
	if (duration != "") {						//only do this if the text input box is not empty
		if (!isNaN(duration)) {
            
			if (btn1.innerHTML == "Start") {
				document.getElementById("timerDisplay").setAttribute("class","showTimer");	// show by displaying this div using CSS
				firstDate = new Date();								// remember the current date/time when the timer starts
				
				document.getElementById("startTime").innerHTML = "Start: " + firstDate.getFullYear() + "-" + (firstDate.getMonth() + 1) + "-" + firstDate.getDate() + " " + firstDate.toLocaleTimeString();								// display the start date/time
								
				document.getElementById("endTime").innerHTML = "&nbsp;";				// put an empty space
								
				myBar.style.width = "0%";	// reset the progress bar
				
				intervalHandle = setInterval(runTimer, 100);		// run the "timer" every 10th of a second (as 1000 = 1 second)
				btn1.innerHTML = "Stop";							// change the caption of the button from "Start" to "Stop"
				inputDuration.disabled = true;						// while running disable the text box so users can't input anymore
				runDisplay.setAttribute("class","normal");			// the "timer"  display shows default styling/appearance while running and haven't reached the target duration
				
			} else {
				document.getElementById("timerDisplay").setAttribute("class","hideTimer"); 	// hide this div using CSS
				
				runDisplay.innerHTML = "&nbsp;";	// put an empty space
				clearInterval(intervalHandle);
				
				myBar.style.width = "0%";
				myProgress.innerHTML = "&nbsp;";
				
				btn1.innerHTML = "Start";
				inputDuration.disabled = false;
			}
		}
	}
	return false;
};

btn2.onclick = function () {
   if (btn1.innerHTML == "Stop") {
		firstDate = new Date();
		document.getElementById("startTime").innerHTML = "Start: " + firstDate.getFullYear() + "-" + (firstDate.getMonth() + 1) + "-" + firstDate.getDate() + " " + firstDate.toLocaleTimeString();
		
		clearInterval(intervalHandle);
		intervalHandle = setInterval(runTimer, 100);
		
		myBar.style.width = "0%";
		
		runDisplay.setAttribute("class","normal");
		
   }
   return false;
};

/* 
// Create the HTML for the message
var msg = '<div class=\"header\"><a id=\"closethanksnote\" href="#">close X</a></div>';
msg += '<div><h3>Credit & Thanks</h3>';
msg += 'God, my parents, my wife, my kids. The discoverer, inventor, developer of the ff: electricity, electronics, the transistor, microprocessor, the computer & its operating system, ';
msg += 'the Internet, world wide web, the web browser, HTML, CSS, and the JavaScript programming language.</div>';

var elNote = document.createElement('div');       // Create a new element
elNote.setAttribute('id', 'thanksnote');          // Add an id of note
elNote.innerHTML = msg;                           // Add the message
document.body.appendChild(elNote);                // Add it to the page

function dismissNote() {                          // Declare function
  document.body.removeChild(elNote);              // Remove the note
}

var elClose = document.getElementById('closethanksnote');   // Get the close button
elClose.addEventListener('click', dismissNote, false);// Click close-clear note


// Create the HTML for terms of use message
var msg2 = '<div class=\"header\"><a id=\"closetermsnote\" href="#">close X</a></div>';
msg2 += '<div><h3>Terms of Use</h3>';
msg2 += 'Use this small tool as it is. No guarantee for whatsoever';
msg2 += '</div>';

var elNote2 = document.createElement('div');       // Create a new element
elNote2.setAttribute('id', 'termsnote');                // Add an id of note
elNote2.innerHTML = msg2;                           // Add the message
document.body.appendChild(elNote2);                // Add it to the page

function dismissNote2() {                          // Declare function
  document.body.removeChild(elNote2);              // Remove the note
}

var elClose2 = document.getElementById('closetermsnote');   // Get the close button
elClose2.addEventListener('click', dismissNote2, false);// Click close-clear note  */