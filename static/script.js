// var socket = io.connect(
//   "http://" + window.location.hostname + ":" + location.port
// );

// var isTranscribing = false;

// document.getElementById("record").addEventListener("change", function () {
//   if (this.checked) {
//     // Start transcription
//     isTranscribing = true;
//     socket.emit("toggle_transcription", { action: "start" });
//   } else {
//     // Stop transcription
//     isTranscribing = false;
//     socket.emit("toggle_transcription", { action: "stop" });
//   }
// });

// socket.on("transcription_update", function (data) {
//   document.getElementById("captions").innerHTML = data.transcription;
// });

// var socket = io.connect(
//   "http://" + window.location.hostname + ":" + location.port
// );

// var isTranscribing = false;
// var transcriptionHistory = []; // Array to store transcription history

// document.getElementById("startButton").addEventListener("click", function () {
//   // Start transcription
//   isTranscribing = true;
//   socket.emit("toggle_transcription", { action: "start" });
// });

// document.getElementById("stopButton").addEventListener("click", function () {
//   // Stop transcription
//   isTranscribing = false;
//   socket.emit("toggle_transcription", { action: "stop" });
// });

// document.getElementById("refreshButton").addEventListener("click", function () {
//   // Refresh page or perform any other action
//   location.reload();
// });

// socket.on("transcription_update", function (data) {
//   var newText = data.transcription;
//   transcriptionHistory.push(newText);

//   // Concatenate all texts from history
//   var allText = transcriptionHistory.join(" ");

//   // Split the text into chunks of 10 words
//   var words = allText.split(" ");
//   var chunks = [];
//   while (words.length > 0) {
//     chunks.push(words.splice(0, 10).join(" "));
//   }

//   // Join the chunks with line breaks and display
//   document.getElementById("captions").innerHTML = chunks.join("<br>");
// });

var socket = io.connect(
  "http://" + window.location.hostname + ":" + location.port
);

var isTranscribing = false;
var transcriptionHistory = []; // Array to store transcription history

document.getElementById("startButton").addEventListener("click", function () {
  // Start transcription
  isTranscribing = true;
  socket.emit("toggle_transcription", { action: "start" });
});

document.getElementById("stopButton").addEventListener("click", function () {
  // Stop transcription
  isTranscribing = false;
  socket.emit("toggle_transcription", { action: "stop" });
});

document.getElementById("refreshButton").addEventListener("click", function () {
  // Refresh page or perform any other action
  location.reload();
});

socket.on("transcription_update", function (data) {
  var newText = data.transcription;
  transcriptionHistory.push(newText);

  // Concatenate all texts from history
  var allText = transcriptionHistory.join(" ");

  // Split the text into chunks of maximum 40 characters each
  var chunks = [];
  var line = "";
  var words = allText.split(" ");
  words.forEach(function(word) {
    if ((line + word).length > 40) { // Adjust the line length based on your layout
      chunks.push(line.trim());
      line = ""; // Start a new line
    }
    line += word + " ";
  });
  if (line !== "") {
    chunks.push(line.trim()); // Add the last line if it's not empty
  }

  // Join the chunks with line breaks and display
  document.getElementById("captions").innerHTML = chunks.join("<br>");
});
