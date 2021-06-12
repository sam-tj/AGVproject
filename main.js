var lastDirection = "...";
var timeVal = "";
var timeValHours = 0;
var timeSelectedByUser = 0;
var userCommandTracker = "Time Stamp \tSchedule Selected \tCommand\n\n";

var en_us = {
  welcome: "Welcome",
  title: "Mover Dashboard",
  battery: "Battery Percentage 🔋",
  workTime: "Work Time",
  currentTime: "Current Time",
  powerLabel: "Power",
  powerStateOff: "Off",
  powerStateOn: "On",
  emergencyStop: "Emergency Stop",
  settingsModal: "Settings",
  updateSystemButton: "Update System",
  languageButton: "Languages",
  moreComing: "More coming soon...",
  doneSettingButton: "Done",
  doneLanguageButton: "Done",
  languageModal: "Language",
  currenttStateOfBot_moving: "Current State: Moving",
  currenttStateOfBot_not_moving: "Current State: Not Moving",
  currenttStateOfBot_emergency: "Current State: Emergency Stop",
  selectOption00: "Select...",
  selectOption01: "Morning by 8 am",
  selectOption02: "Afternoon by 12 pm",
  selectOption03: "Evening by 4 pm",
  selectOption04: "Night by 8 pm",
};
var de_de = {
  welcome: "Wilkommen",
  title: "Mover Dashboard",
  battery: "Batterieprozent 🔋",
  workTime: "Arbeit Zeit",
  currentTime: "Strom Zeit",
  powerLabel: "Strom",
  powerStateOff: "aus",
  powerStateOn: "an",
  emergencyStop: "Notaus-Knopf",
  settingsModal: "Einstellungen",
  updateSystemButton: "System aktualisieren",
  languageButton: "Sprachen",
  moreComing: "Mehr kommt bald...",
  doneSettingButton: "Fertig",
  doneLanguageButton: "Fertig",
  languageModal: "Sprache",
  currenttStateOfBot_moving: "Aktuellen Zustand: Moving",
  currenttStateOfBot_not_moving: "Aktuellen Zustand: Not Moving",
  currenttStateOfBot_emergency: "Aktuellen Zustand: Stop",
  selectOption00: "wählen...",
  selectOption01: "Morgens um 8 Uhr",
  selectOption02: "Nachmittag um 12 Uhr",
  selectOption03: "Abends um 16 Uhr",
  selectOption04: "Nacht um 20 Uhr",
};

var listening = false;
var langChange = en_us;

const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.onresult = function (event) {
  document
    .getElementById("voiceActivateTitle")
    .classList.toggle("slds-button_success");
  let result = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    result += event.results[i][0].transcript;
  }
  if (result.includes("turn on") || result.includes("power on")) {
    if (timeValHours >= 8 && timeValHours < 12) {
      timeSelectedByUser = 1;
      document.getElementById("select-01").value = 1;
    } else if (timeValHours >= 12 && timeValHours < 16) {
      timeSelectedByUser = 2;
      document.getElementById("select-01").value = 2;
    } else if (timeValHours >= 16 && timeValHours < 20) {
      timeSelectedByUser = 3;
      document.getElementById("select-01").value = 3;
    } else if (
      (timeValHours >= 20 && timeValHours < 24) ||
      (timeValHours >= 0 && timeValHours < 8)
    ) {
      timeSelectedByUser = 4;
      document.getElementById("select-01").value = 4;
    }

    document.getElementById("powerSwitch").removeAttribute("disabled");
    document.getElementById("powerSwitch").checked = true;
    sendPowerData();
  }
  if (result.includes("turn off") || result.includes("power off")) {
    document.getElementById("select-01").value = 0;
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("powerSwitch").setAttribute("disabled", "");
    sendPowerData();
  }
};
function voiceActivate() {
  //if (listening == true) {
  //   recognition.stop();
  // button.innerText = "Press to Activate Voice Command";
  // content.innerText = "";
  //} else {
  // button.innerText = "Press to Stop";
  recognition.start();
  document
    .getElementById("voiceActivateTitle")
    .classList.toggle("slds-button_success");
  // }
}

function sendMovementData(direction) {
  lastDirection = direction;
  if (direction == "stop") {
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("currentDirection").innerHTML =
      langChange.currenttStateOfBot_emergency;
    document.getElementById("emergencyStopTitle").setAttribute("disabled", "");
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == "stop") {
        document.getElementById("powerSwitch").checked = false;
      }
    }
  };
  xhttp.open("GET", "setDIR?Motionstate=" + direction, true);
  xhttp.send();
}

function onSelectorChange(value) {
  timeSelectedByUser = value;
  console.log(value);
  if (value > 0) {
    document.getElementById("powerSwitch").removeAttribute("disabled");
  } else {
    document.getElementById("currentDirection").innerHTML =
      langChange.currenttStateOfBot_not_moving;
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("powerSwitch").setAttribute("disabled", "");
    // document.getElementById("emergencyStopTitle").setAttribute("disabled", "");
  }
}

function sendPowerData() {
  var state = document.getElementById("powerSwitch").checked;
  if (state == true) {
    document.getElementById("powerSwitch").checked = true;
    document.getElementById("currentDirection").innerHTML =
      langChange.currenttStateOfBot_moving;
    // document.getElementById("emergencyStopTitle").removeAttribute("disabled");
    userCommandTracker +=
      timeVal +
      " \t" +
      document.getElementById("select-01").options[timeSelectedByUser].text +
      " \t" +
      document.getElementById("checkbox-toggle-16").innerText +
      "\n";
  } else if (state == false) {
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("currentDirection").innerHTML =
      langChange.currenttStateOfBot_not_moving;
    // document.getElementById("emergencyStopTitle").setAttribute("disabled", "");
    userCommandTracker +=
      timeVal +
      " \t" +
      document.getElementById("select-01").options[timeSelectedByUser].text +
      " \t" +
      document.getElementById("checkbox-toggle-16").innerText +
      "\n";
  }

  console.log(userCommandTracker);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == "true") {
        document.getElementById("powerSwitch").checked = true;
      } else if (this.responseText == "false") {
        document.getElementById("powerSwitch").checked = false;
      }
    }
  };
  xhttp.open("GET", "setPower?Powerstate=" + state, true);
  xhttp.send();
}

function showModal() {
  var x = document.getElementById("modal");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showLanguageModal() {
  var x = document.getElementById("modalLanguage");
  var modal = document.getElementById("modal");
  if (x.style.display === "none") {
    x.style.display = "block";
    modal.style.display = "none";
  } else {
    x.style.display = "none";
  }
}

function saveDataToFile() {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(userCommandTracker)
  );
  element.setAttribute("download", "yourData.txt");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
// setInterval(function () {
//   // Call a function repetatively with 2 Second interval
//   getData();
// }, 2000); //2000mSeconds update rate

// function getData() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("ADCValue").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", "readADC", true);
//   xhttp.send();
// }

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time").innerHTML = h + ":" + m;
  timeValHours = h;
  timeVal = h + ":" + m + ":" + s;
  t = setTimeout(function () {
    startTime();
  }, 500);
}
startTime();

function changeLanguage(lang) {
  if (lang == "en") {
    langChange = en_us;
  } else if (lang == "de") {
    langChange = de_de;
  }
  //console.log(lang);
  document.getElementById("mainTitle").innerHTML = langChange.title;
  document.getElementById("batteryTitle").innerHTML = langChange.battery;
  document.getElementById("currentTimeTitle").innerHTML =
    langChange.currentTime;
  document.getElementById("workTimeTitle").innerHTML = langChange.workTime;
  document.getElementById("powerTitle").innerHTML = langChange.powerLabel;
  document.getElementById("powerStateOnTitle").innerHTML =
    langChange.powerStateOn;
  document.getElementById("powerStateOffTitle").innerHTML =
    langChange.powerStateOff;
  // document.getElementById("emergencyStopTitle").innerHTML =
  // langChange.emergencyStop;
  document.getElementById("modal-heading-01").innerHTML =
    langChange.settingsModal;
  document.getElementById("updateSystemButtonTitle").innerHTML =
    langChange.updateSystemButton;
  document.getElementById("languageButtonTitle").innerHTML =
    langChange.languageButton;
  document.getElementById("moreComingSoonTitle").innerHTML =
    langChange.moreComing;
  document.getElementById("doneSettingsTitle").innerHTML =
    langChange.doneSettingButton;
  document.getElementById("modal-heading-02").innerHTML =
    langChange.languageModal;
  document.getElementById("doneLanguageTitle").innerHTML =
    langChange.doneLanguageButton;
  document.getElementById("select-01-op-00").innerHTML =
    langChange.selectOption00;
  document.getElementById("select-01-op-01").innerHTML =
    langChange.selectOption01;
  document.getElementById("select-01-op-02").innerHTML =
    langChange.selectOption02;
  document.getElementById("select-01-op-03").innerHTML =
    langChange.selectOption03;
  document.getElementById("select-01-op-04").innerHTML =
    langChange.selectOption04;

  document.getElementById("modalLanguage").style.display = "none";
}
