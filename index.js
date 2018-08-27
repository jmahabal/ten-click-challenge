document.addEventListener("mousedown", event => {
  // check if there is a stored cache
  if (!localStorage["tenclickchallenge"]) {
    localStorage["tenclickchallenge"] = JSON.stringify({
      numClicks: 0,
      currentDay: new Date().toLocaleDateString()
    });
  }

  let userInfo = JSON.parse(localStorage["tenclickchallenge"]);
  let { numClicks, currentDay } = userInfo;

  let newNumClicks = parseInt(numClicks) + 1;
  let newDay = currentDay;

  // if it has been more than 24h for currentDay reset number of clicks
  if (new Date().toLocaleDateString() != currentDay) {
    newNumClicks = 1;
    newDay = new Date().toLocaleDateString();
  }

  // update div element
  if (!document.getElementById("tenclicks")) {
    // if no element exists, create a new element
    let tenclicks = document.createElement("div");
    tenclicks.style.position = "fixed";
    tenclicks.style.top = "11px";
    tenclicks.style.lineHeight = "1";
    tenclicks.style.right = "11px";
    tenclicks.style.fontSize = "24px";
    tenclicks.style.fontFamily = "sans-serif";
    tenclicks.style.zIndex = "100000"; // greater than twitter as of aug 18 2018
    tenclicks.id = "tenclicks";
    document.body.appendChild(tenclicks);
  }
  document.getElementById("tenclicks").innerHTML = `${newNumClicks}`;

  // save the updated value
  localStorage["tenclickchallenge"] = JSON.stringify({
    numClicks: newNumClicks,
    currentDay: newDay
  });
});
