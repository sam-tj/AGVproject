var lastDirection = "...";
var timeVal = "";

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

var langChange = en_us;

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
  console.log(value);
  if (value > 0) {
    document.getElementById("powerSwitch").removeAttribute("disabled");
  } else {
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("powerSwitch").setAttribute("disabled", "");
    document.getElementById("emergencyStopTitle").setAttribute("disabled", "");
  }
}

function sendPowerData() {
  var state = document.getElementById("powerSwitch").checked;
  console.log(state);
  if (state == true) {
    document.getElementById("powerSwitch").checked = true;
    document.getElementById("currentDirection").innerHTML =
      langChange.currenttStateOfBot_moving;
    document.getElementById("emergencyStopTitle").removeAttribute("disabled");
  } else if (state == false) {
    document.getElementById("powerSwitch").checked = false;
    document.getElementById("currentDirection").innerHTML =
      langChange.currenttStateOfBot_not_moving;
    document.getElementById("emergencyStopTitle").setAttribute("disabled", "");
  }
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
