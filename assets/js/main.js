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
let dataRef = firebase.database(); 

let train = '';
let destination = '';
let frequency = '';
let nextArrival = '';
let tMinutesTillTrain = '';
let nextTrain = '';
let nextArrivalDisp = '';

//still need to get inputs to clear after hitting submit 

$('.btn-primary').on('click', function(event) {
  event.preventDefault();

  train = $('#inputTrain').val().trim(); 
  destination = $('#inputDestination').val().trim();
  frequency = $('#inputFrequency').val().trim(); 
  nextArrival = $('#inputTime').val().trim(); 

  let nextArrivalConverted = moment(nextArrival, "HH:mm").subtract(1, "years");
  console.log(nextArrivalConverted);
  let currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  let diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  let tRemainder = diffTime % frequency;
  console.log(tRemainder);
  tMinutesTillTrain = frequency - tRemainder; 
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  nextTrain = moment().add(tMinutesTillTrain, "minutes"); 
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  nextArrivalDisp = moment(nextTrain).format("HH:mm"); 

  dataRef.ref().push({
    train,
    destination,
    frequency, 
    nextArrivalDisp, 
    tMinutesTillTrain,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $('#inputTrain').val(''); 
  $('#inputDestination').val('');
  $('#inputFrequency').val('');
  $('#inputTime').val('');

});

dataRef.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());
  console.log(childSnapshot.val().train);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().nextArrivalDisp);
  console.log(childSnapshot.val().tMinutesTillTrain);

  // let nextArrivalConverted = moment(nextArrival, "HH:mm").subtract(1, "years");
  // console.log(nextArrivalConverted);
  // let currentTime = moment();
  // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // let diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);
  // let tRemainder = diffTime % frequency;
  // console.log(tRemainder);
  // tMinutesTillTrain = frequency - tRemainder; 
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // nextTrain = moment().add(tMinutesTillTrain, "minutes"); 
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  // let nextArrivalDisp = moment(nextTrain).format("HH:mm"); 

  $('.current-schedule').append("<tr class='each-row'> " + 
  "<td class='each-train'> " + childSnapshot.val().train + "</td>" +
  "<td class='each-destination'> " + childSnapshot.val().destination + "</td>" +
  "<td class='each-frequency'> " + childSnapshot.val().frequency + "</td>" +
  "<td class='each-arrival'> " + childSnapshot.val().nextArrivalDisp + "</td>" +
  "<td class='minutes-away'> " + childSnapshot.val().tMinutesTillTrain + "</td>" +
  "</tr>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);

});

