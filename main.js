var lastDirection = "...";
var lastSpeed = 0;
function sendMovementData(direction) {
  console.log("sendMovementData " + direction);
  lastDirection = direction;
  if (direction == "stop") {
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("currentDirection").innerHTML =
      "Current State: Emergency Stop";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("currentDirection").innerHTML =
        "Current State " + this.responseText;
      if (this.responseText == "stop") {
        document.getElementById("powerSwitch").checked = false;
      }
    }
  };
  xhttp.open("GET", "setDIR?Motionstate=" + direction, true);
  xhttp.send();
}
function sendPowerData() {
  //console.log(
  //"sendPowerData " + document.getElementById("powerSwitch").checked
  //);

  var state = document.getElementById("powerSwitch").checked;
  if (state == true) {
    document.getElementById("currentDirection").innerHTML =
      "Current State: Moving";
  } else if (state == false) {
    document.getElementById("currentDirection").innerHTML =
      "Current State: Not Moving";
  }
  console.log(state);
  if (state == true) {
    document.getElementById("powerSwitch").checked = true;
    document.getElementById("currentDirection").innerHTML =
      "Current State: Moving";
  } else if (state == false) {
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("currentDirection").innerHTML =
      "Current State: Not Moving";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(
        "sendPowerData " + document.getElementById("powerSwitch").checked
      );
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
function sendSpeedData(speed) {
  console.log("sendSpeedData " + speed);
  lastSpeed = speed;
  document.getElementById("currentDirection").innerHTML =
    "Current State " + lastDirection + " at speed " + lastSpeed;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("currentDirection").innerHTML =
      //   "Going " + this.responseText;
      console.log("sendSpeedData " + speed);
    }
  };
  xhttp.open("GET", "setSpeed?Speedstate=" + speed, true);
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
var timeVal = "";
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time").innerHTML = h + ":" + m;
  timeVal = h + ":" + m + ":" + s;
  t = setTimeout(function () {
    startTime();
  }, 500);
}
startTime();

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
  emergencyStop: "Stop",
  settingsModal: "Einstellungen",
  updateSystemButton: "System aktualisieren",
  languageButton: "Sprachen",
  moreComing: "Mehr kommt bald...",
  doneSettingButton: "Fertig",
  doneLanguageButton: "Fertig",
  languageModal: "Sprache",
};
function changeLanguage(lang) {
  if (lang == "en") {
    var langChange = en_us;
  } else if (lang == "de") {
    var langChange = de_de;
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
  document.getElementById("emergencyStopTitle").innerHTML =
    langChange.emergencyStop;
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
  var modalLanguage = document.getElementById("modalLanguage");
  modalLanguage.style.display = "none";
}
