// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBHF1sOJoy6LVFJvvYPDDW8239VpLp_bdE",
    authDomain: "train-time-90e3d.firebaseapp.com",
    databaseURL: "https://train-time-90e3d.firebaseio.com",
    projectId: "train-time-90e3d",
    storageBucket: "",
    messagingSenderId: "555293648276",
    appId: "1:555293648276:web:308a460bd7e2b5f6"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//
const dataRef = firebase.database(); 

let trainInput = '';
let destinationInput = '';
let frequencyInput = '';
let nextArrivalInput = '';


$('.btn-primary').on('click', function(event) {
  event.preventDefault();

  trainInput = $('#inputTrain').val().trim(); 
  destinationInput = $('#inputDestination').val().trim();
  frequencyInput = $('#inputFrequency').val().trim(); 
  nextArrivalInput = $('#inputTime').val().trim(); 

  dataRef.ref().push({
    trainInput,
    destinationInput,
    frequencyInput, 
    nextArrivalInput,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $('#inputTrain').val(''); 
  $('#inputDestination').val('');
  $('#inputFrequency').val('');
  $('#inputTime').val('');

});

dataRef.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());
  console.log(childSnapshot.val().trainInput);
  console.log(childSnapshot.val().destinationInput);
  console.log(childSnapshot.val().frequencyInput);
  console.log(childSnapshot.val().nextArrivalInput);

  let trainDisp = childSnapshot.val().trainInput;
  let destinationDisp = childSnapshot.val().destinationInput;
  let frequencyDisp = childSnapshot.val().frequencyInput;
  let nextArrival = childSnapshot.val().nextArrivalInput; 

  let nextArrivalConverted = moment(nextArrival, "HH:mm").subtract(1, "years");
  console.log(nextArrivalConverted);
  let currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  let diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  let tRemainder = diffTime % frequencyDisp;
  console.log(tRemainder);
  let tMinutesTillTrain = frequencyDisp - tRemainder; 
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  let nextTrain = moment().add(tMinutesTillTrain, "minutes"); 
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  let nextArrivalDisp = moment(nextTrain).format("HH:mm"); 
  

  $('.current-schedule').append("<tr class='each-row'> " + 
  "<td class='each-train'> " + trainDisp + "</td>" +
  "<td class='each-destination'> " + destinationDisp + "</td>" +
  "<td class='each-frequency'> " + frequencyDisp + "</td>" +
  "<td class='each-arrival'> " + nextArrivalDisp + "</td>" +
  "<td class='minutes-away'> " + tMinutesTillTrain + "</td>" +
  "</tr>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);

});

