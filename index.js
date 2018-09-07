// when first loading the page
window.addEventListener('load', () => {
  console.log('hi');
  // only show the counter if we have localstorage for it
  if (localStorage['tenclickchallenge']) {
    let userInfo = JSON.parse(localStorage['tenclickchallenge']);
    let { numClicks } = userInfo;
    updateTenClickDivs(numClicks);
  }
});

// every subsequent click
document.addEventListener('mousedown', event => {
  // check if there is a stored cache
  if (!localStorage['tenclickchallenge']) {
    localStorage['tenclickchallenge'] = JSON.stringify({
      numClicks: 0,
      currentDay: new Date().toLocaleDateString()
    });
  }

  let userInfo = JSON.parse(localStorage['tenclickchallenge']);
  let { numClicks, currentDay } = userInfo;

  let newNumClicks = parseInt(numClicks) + 1;
  let newDay = currentDay;

  // if it's a new day reset number of clicks
  if (new Date().toLocaleDateString() != currentDay) {
    newNumClicks = 1;
    newDay = new Date().toLocaleDateString();
  }

  // update div element
  updateTenClickDivs(newNumClicks);

  // save the updated value
  localStorage['tenclickchallenge'] = JSON.stringify({
    numClicks: newNumClicks,
    currentDay: newDay
  });
});

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
  document.getElementById('tenclicks').innerHTML = `${numClicks}`;
  const maxClicks = 68;
  const textColor = numClicks > maxClicks ? '#fff' : '#ccc';
  const backgroundColor = numClicks > maxClicks ? '#d84b37' : '#fff';

  document.getElementById('tenclicks').style.color = textColor;
  document.getElementById('tenclicks').style.background = backgroundColor;
  document.getElementById('tenclicks').style.border =
    numClicks > maxClicks
      ? `1px ${backgroundColor} solid`
      : `1px ${textColor} solid`;
}
