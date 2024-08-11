let cur_rotation = 0;
const countDisplay = document.getElementById("countDisplay");

document.getElementById("button1").addEventListener("click", () => {
  cur_rotation -= 15;
  updateCountDisplay();
  injectScript(cur_rotation);
});

document.getElementById("button2").addEventListener("click", () => {
  cur_rotation += 15;
  updateCountDisplay();
  injectScript(cur_rotation);
});

function updateCountDisplay() {
  countDisplay.textContent = `Rotation: ${cur_rotation}`;
}

function injectScript(rotation) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (rotation) => {
        document.body.style.transform = `rotate(${rotation}deg)`;
      },
      args: [rotation],
    });
  });
}
