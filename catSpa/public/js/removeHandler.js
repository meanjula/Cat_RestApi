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

      const data = await fetch("/remove", options);
      const result = await data.json();
      console.log(result);
      if (result.message) {
        updateMessagearea(result.message, result.type);
      }
    } catch (error) {
      updateMessagearea(error.message, "error");
    }
  }
})();
