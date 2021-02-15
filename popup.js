document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const intervalInput = document.getElementById('interval');
  const statusText = document.getElementById('statusText');

  // Load state
  chrome.storage.local.get(['isRunning', 'interval'], (result) => {
    if (result.isRunning) {
      statusText.innerText = 'Status: Running';
      statusText.style.color = '#10b981';
      if (result.interval) intervalInput.value = result.interval;
    }
  });

  startBtn.addEventListener('click', () => {
    const minutes = parseInt(intervalInput.value);
    if (minutes > 0) {
      chrome.runtime.sendMessage({ action: 'start', minutes: minutes });
      statusText.innerText = 'Status: Running';
      statusText.style.color = '#10b981';
      chrome.storage.local.set({ isRunning: true, interval: minutes });
    }
  });

  stopBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' });
    statusText.innerText = 'Status: Inactive';
    statusText.style.color = '#666';
    chrome.storage.local.set({ isRunning: false });
  });
});