// when first loading the page
window.addEventListener('load', () => {
  checkIfCacheExistsAndCreateIfNot(0);
});

// every subsequent click
document.addEventListener('mousedown', event => {
  checkIfCacheExistsAndCreateIfNot(1);
});

function checkIfCacheExistsAndCreateIfNot(n = 0) {
  // check if there is a stored cache, and add if not
  if (!localStorage['tenclickchallenge']) {
    localStorage['tenclickchallenge'] = JSON.stringify({
      numClicks: 0,
      currentDay: new Date().toLocaleDateString()
    });
  }

  let userInfo = JSON.parse(localStorage['tenclickchallenge']);
  let { numClicks, currentDay } = userInfo;

  let newNumClicks = parseInt(numClicks) + n;
  let newDay = currentDay;

  // if it's a new day reset number of clicks
  if (new Date().toLocaleDateString() != currentDay) {
    newNumClicks = n;
    newDay = new Date().toLocaleDateString();
  }

  // update div element
  updateTenClickDivs(newNumClicks);

  // save the updated value
  localStorage['tenclickchallenge'] = JSON.stringify({
    numClicks: newNumClicks,
    currentDay: newDay
  });
}

function updateTenClickDivs(numClicks) {
  if (!document.getElementById('tenclicks')) {
    // if no element exists, create a new element
    let tenclicks = document.createElement('div');
    tenclicks.style.position = 'fixed';
    tenclicks.style.top = '8px';
    tenclicks.style.lineHeight = '1';
    tenclicks.style.right = '8px';
    tenclicks.style.padding = '2px';
    tenclicks.style.borderRadius = '2px';
    tenclicks.style.fontWeight = '300';
    tenclicks.style.fontSize = '24px';
    tenclicks.style.fontFamily = 'sans-serif';
    tenclicks.style.zIndex = '100000'; // greater than twitter as of aug 18 2018
    tenclicks.id = 'tenclicks';
    document.body.appendChild(tenclicks);
  }

  const maxClicks = 10;
  const textColor = numClicks > maxClicks ? '#fff' : '#ccc';
  const backgroundColor = numClicks > maxClicks ? '#d84b37' : '#fff';

  let tenclicks = document.getElementById('tenclicks');
  tenclicks.innerHTML = `${numClicks}`;
  tenclicks.style.color = textColor;
  tenclicks.style.background = backgroundColor;
  tenclicks.style.border =
    numClicks > maxClicks
      ? `1px ${backgroundColor} solid`
      : `1px ${textColor} solid`;
}