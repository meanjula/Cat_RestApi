"use strict";

(function () {
  let numberField;
  let nameField;
  let yearOfBirthField;
  let lengthField;
  let weightKgField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    yearOfBirthField = document.getElementById("yearofbirth");
    lengthField = document.getElementById("length");
    weightKgField = document.getElementById("weightkg");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessagearea();

    const cat = {
      number: numberField.value,
      name: nameField.value,
      yearOfBirth: yearOfBirthField.value,
      length: lengthField.value,
      weightKg: weightKgField.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(cat), //pass the object
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/add", options);
      console.log(data);
      const resultJson = await data.json();
      if (resultJson.message) {
        updateMessagearea(resultJson.message, resultJson.type);
      }
    } catch (error) {
      updateMessagearea(error.message, "error");
    }
  }
})();
