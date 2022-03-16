"use strict";

(function () {
  let resultarea;
  let inputfield;
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    inputfield = document.getElementById("number");
    resultarea = document.getElementById("resultarea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessagearea();
    resultarea.innerHTML = "";
    const number = inputfield.value;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ number }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(options);
      const data = await fetch("/getOne", options);
      const resultJson = await data.json();
      console.log(resultJson);
      updatePage(resultJson);
    } catch (error) {
      updateMessagearea(error.message, "error");
    }
  }

  function updatePage(result) {
    if (result) {
      if (result.message) {
        updateMessagearea(result.message, result.type);
      } else {
        updateCat(result);
      }
    } else {
      updateMessagearea("Not found", "error");
    }
  }
  function updateCat(cat) {
    resultarea.innerHTML = `
	<p><span class="legend">Number:</span> ${cat.number}</p>
	<p><span class="legend">Name:</span> ${cat.name}</p>
	<p><span class="legend">Birth year:</span> ${cat.yearOfBirth}</p>
	<p><span class="legend">Length:</span> ${cat.length}</p>
	<p><span class="legend">weight(kg):</span> ${cat.weightKg}</p>
	`;
  }
})();
