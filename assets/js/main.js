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
let minutesAway = '';
// let firstTime = '';

$('.btn-primary').on('click', function(event) {
  event.preventDefault();

  train = $('#inputTrain').val().trim(); 
  destination = $('#inputDestination').val().trim();
  frequency = $('#inputFrequency').val().trim(); 
  nextArrival = $('#inputTime').val().trim(); 
  minutesAway = $('#inputFrequency').val().trim();

  dataRef.ref().push({
    train,
    destination,
    frequency, 
    nextArrival, 
    minutesAway,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

dataRef.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());
  console.log(childSnapshot.val().train);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().nextArrival);
  console.log(childSnapshot.val().minutesAway);

  $('.current-schedule').append("<tr class='each-row'> " + 
  "<td class='each-train'> " + childSnapshot.val().train + "</td>" +
  "<td class='each-destination'> " + childSnapshot.val().destination + "</td>" +
  "<td class='each-frequency'> " + childSnapshot.val().frequency + "</td>" +
  "<td class='each-arrival'> " + childSnapshot.val().nextArrival + "</td>" +
  "<td class='minutes-away'> " + childSnapshot.val().minutesAway + "</td>" +
  "</tr>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);

});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  $('.each-train').text(snapshot.val().train);
  $('.each-destination').text(snapshot.val().destination);
  $('.each-frequency').text(snapshot.val().frequency);
  $('.each-arrival').text(snapshot.val().nextArrival);
  $('.minutes-away').text(snapshot.val().minutesAway);
});