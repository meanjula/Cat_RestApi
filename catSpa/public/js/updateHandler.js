"use strict";

(function () {
  let numberField;
  let nameField;
  let yearOfBirthField;
  let lengthField;
  let weightKgField;
  let searchState = true;
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    yearOfBirthField = document.getElementById("yearofbirth");
    lengthField = document.getElementById("length");
    weightKgField = document.getElementById("weightkg");

    updateFields();

    document.getElementById("submit").addEventListener("click", send);

    numberField.addEventListener("focus", clearAll);
  } //end of init

  function clearAll() {
    if (searchState) {
      clearFieldValues();
      clearMessagearea();
    }
  }

  function updateFields() {
    if (searchState) {
      numberField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      yearOfBirthField.setAttribute("readonly", true);
      lengthField.setAttribute("readonly", true);
      weightKgField.setAttribute("readonly", true);
    } else {
      numberField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      yearOfBirthField.removeAttribute("readonly");
      lengthField.removeAttribute("readonly");
      weightKgField.removeAttribute("readonly");
    }
  } //updateFields loppu

  function updatecatValues(cat) {
    numberField.value = cat.number;
    nameField.value = cat.name;
    yearOfBirthField.value = cat.yearOfBirth;
    lengthField.value = cat.length;
    weightKgField.value = cat.weightKg;
    searchState = false;
    updateFields();
  } //end of updatecatValues

  function clearFieldValues() {
    numberField.value = "";
    nameField.value = "";
    yearOfBirthField.value = "";
    lengthField.value = "";
    weightKgField.value = "";
    searchState = true;
    updateFields();
  } //end of clearFieldValues

  async function send() {
    try {
      if (searchState) {
        //get cat
        clearMessagearea();
        const number = numberField.value;
        const options = {
          method: "POST",
          body: JSON.stringify({ number }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data = await fetch("/getOne", options);
        const getResult = await data.json();

        if (getResult) {
          if (getResult.message) {
            updateMessagearea(getResult.message, getResult.type);
          } else {
            updatecatValues(getResult);
          }
        } else {
          updateMessagearea("Not found", "error");
        }
      } else {
        const cat = {
          number: +numberField.value,
          name: nameField.value,
          yearOfBirth: +yearOfBirthField.value,
          length: +lengthField.value,
          weightKg: +weightKgField.value,
        };
        const options = {
          method: "POST",
          body: JSON.stringify(cat),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const data = await fetch("/update", options);
        const resultJson = await data.json();

        if (resultJson.message) {
          updateMessagearea(resultJson.message, resultJson.type);
        }
        searchState = true;
        updateFields();
      }
    } catch (error) {
      updateMessagearea(error.message, "error");
    }
  } //end of send
})();
