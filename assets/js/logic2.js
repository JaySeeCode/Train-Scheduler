// Initialize Firebase
var config = {
	apiKey: "AIzaSyCtk5tEHRMXYhO1UGOTfwVMYXgC_EbKbkI",
	authDomain: "trainlog-caa3f.firebaseapp.com",
	databaseURL: "https://trainlog-caa3f.firebaseio.com",
	projectId: "trainlog-caa3f",
	storageBucket: "trainlog-caa3f.appspot.com",
	messagingSenderId: "342093448586"
};

firebase.initializeApp(config);

var database = firebase.database();


$('#submit-btn').on("click", function(){

	var name = $("#train-name").val().trim();
	var destination = $('#destination').val().trim();
	var time = $('#first-time').val().trim();
	var frequency = parseInt($('#frequency').val().trim());

	database.ref().push({
		name: name,
		destination: destination,
		time: time,
		frequency: frequency
	});

});



database.ref().on("child_added", function(childSnapshot){
	// console.log(childSnapshot.val());

	var obj = childSnapshot.val();

	var nextArrival = findNextArrival(obj);
	var minsTill = findMinsAway(obj);

	var $newRow = '<tr>' + 
				'<td>' + obj.name + '</td>' +
				'<td>' + obj.destination + '</td>' +
				'<td>' + obj.frequency + '</td>' +
				'<td>' + moment(nextArrival).format("hh:mm a") + '</td>' +
				'<td>' + minsTill + '</td>' +
				'</tr>';

	$('#table-body').append($newRow);


});

function findNextArrival(child){

	//gives us the current time
	var currentTime = moment(moment()).format('hh:mm');
	// console.log("CURRENT TIME: " + currentTime);

	var trainTimeConverted = moment(child.time, 'hh:mm').subtract(1, "years");
	// console.log(trainTimeConverted);

	var diffTime = moment().diff(moment(trainTimeConverted), 'minutes');
	// console.log("DIFFERENCE IN TIME: " + diffTime + " minutes");

	var tRemainder = diffTime % child.frequency;
	// console.log(tRemainder);

	var tMinutesTillTrain = child.frequency - tRemainder;
	// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"))

	return nextTrain;


};

function findMinsAway(child){

	//gives us the current time
	var currentTime = moment(moment()).format('hh:mm');
	// console.log("CURRENT TIME: " + currentTime);

	var trainTimeConverted = moment(child.time, 'hh:mm').subtract(1, "years");
	// console.log(trainTimeConverted);

	var diffTime = moment().diff(moment(trainTimeConverted), 'minutes');
	// console.log("DIFFERENCE IN TIME: " + diffTime + " minutes");

	var tRemainder = diffTime % child.frequency;
	// console.log(tRemainder);

	var tMinutesTillTrain = child.frequency - tRemainder;
	// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"))

	return tMinutesTillTrain;

};


// var now = moment();


// console.log("now - here");
// console.log(now);
// console.log(moment(convertedDate).format("MM/DD/YY, h:mm a"));
// console.log(moment(convertedDate).format("X"));


// var temp = "1230";
// console.log("here");
// var converted = moment(temp, "hh:mm").subtract(1, "years");
// console.log(moment(converted).format("h:mm a"));

