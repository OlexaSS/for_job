"use strict";

var setDataTrackID = function setDataTrackID(t, e) {
  return t.setAttribute("data-trackid", e);
};

var startPage = document.querySelector(".js-start-page"),
    btnSetupNumberChar = document.querySelectorAll(".js-setup-girls"),
    mainSteps = document.querySelector(".js-mains-steps"),
    btnChangeStep = document.querySelectorAll(".js-step-button"),
    totalSteps = mainSteps.getAttribute("data-max-step"),
    currentPercent = document.querySelector(".js-percent"),
    currentProgress = document.querySelector(".js-current-progress"),
    valueStep = 100 / totalSteps,
    stepsForm = mainSteps.getAttribute("data-form-steps"),
    otherChars = document.querySelectorAll(".js-char-switch"),
    allButtons = document.querySelectorAll(".js-step-button, .js-submit-username, .js-submit-email, .js-submit-password"),
    dataTrackRoot = mainSteps.getAttribute("data-track-root"),
    firstStep = 1,
    indexChar = 2,
    indexPoly = 4;

    //fix bag
    if(document.body.clientWidth < 500){
      currentPercent.innerHTML = "0%";
    }



btnSetupNumberChar.forEach(function (t) {
  t.addEventListener("click", function (t) {
    var e = t.target.dataset.charStart,
        r = t.target.dataset.charName;
    mainSteps.setAttribute("data-char", e), mainSteps.classList.remove("hide"), startPage.classList.add("hide"), changeProgress(1), addNameCharToElements(r), createDataTrackIds(), addNumberStepDataTrack();
  });
}), btnChangeStep.forEach(function (t) {
  t.addEventListener("click", function (t) {
    var e = t.target.dataset.nextStep;
    changeStep(e), changeProgress(e), addNumberStepDataTrack();
  });
});

var changeStep = function changeStep(t) {
  mainSteps.setAttribute("data-current-step", t);
},
    changeProgress = function changeProgress(t) {
  switch (calcPercentPreForm(t), t) {
    case "js-form-user":
      calcPercentForm(stepsForm);
      break;

    case "js-form-email":
      calcPercentForm(stepsForm - 1);
      break;

    case "js-form-password":
      calcPercentForm(stepsForm - 2);
  }

  t || (currentPercent.innerHTML = "100%", currentProgress.style.width = "100%");
},
    calcPercentPreForm = function calcPercentPreForm(t) {
  currentPercent.innerHTML = Math.round(t * valueStep) + "%", currentProgress.style.width = Math.round(t * valueStep) + "%";
},
    calcPercentForm = function calcPercentForm(t) {
  currentPercent.innerHTML = Math.round((totalSteps - t) * valueStep) + "%", currentProgress.style.width = Math.round((totalSteps - t) * valueStep) + "%";
},
    addNameCharToElements = function addNameCharToElements(t) {
  allButtons.forEach(function (e) {
    setDataTrackID(e, t);
  }), otherChars.forEach(function (e) {
    setDataTrackID(e, t);
  });
},
    createDataTrackIds = function createDataTrackIds() {
  var t = dataTrackRoot + "LNK question " + firstStep + " ";
  allButtons.forEach(function (e) {
    var r = e.getAttribute("data-trackid"),
        a = e.getAttribute("data-name");
    e.className.match(/\bjs-submit-\b/) ? setDataTrackID(e, t + r + " " + a + " continue") : setDataTrackID(e, t + r + " " + a);
  }), otherChars.forEach(function (e) {
    var r = e.getAttribute("data-name"),
        a = e.getAttribute("data-trackid");
    setDataTrackID(e, t + a + " " + r + " image");
  });
},
    addNumberStepDataTrack = function addNumberStepDataTrack() {
  var t = mainSteps.getAttribute("data-current-step");
  allButtons.forEach(function (e) {
    var r = e.getAttribute("data-next-step"),
        a = e.getAttribute("data-trackid").split(" ");
    parseInt(t) === parseInt(r) - 1 || parseInt(t) === totalSteps - stepsForm - 1 && e.classList.contains("js-submit-username") ? a[indexChar] = t : "js-form-email" === t && e.classList.contains("js-submit-email") ? a[indexChar] = totalSteps - stepsForm : "js-form-password" === t && e.classList.contains("js-submit-password") && (a[indexChar] = totalSteps - 2), setDataTrackID(e, a.join(" "));
  }), otherChars.forEach(function (e) {
    changeValue(e, indexChar, t);
  });
};
//===================================================
//===================================================
otherChars.forEach(function (t) {
  t.addEventListener("click", function (t) {
    var e = t.target.dataset.number;
    mainSteps.setAttribute("data-char", e), allButtons.forEach(function (t) {
      changeValue(t, indexPoly, e);
    }), otherChars.forEach(function (t) {
      changeValue(t, indexPoly, e);
    });
  });
});
//====================================================
var changeValue = function changeValue(t, e, r) {
  var a = t.getAttribute("data-trackid").split(" ");
  a[e] = r, setDataTrackID(t, a.join(" "));
};
//============================================================