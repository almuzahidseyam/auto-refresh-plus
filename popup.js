document.addEventListener('DOMContentLoaded', async () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const intervalInput = document.getElementById('interval');
  const statusText = document.getElementById('statusText');

  const setStatus = (text, colour) => {
    statusText.innerText = text;
    statusText.style.color = colour;
  };

  const render = async () => {
    const { isRunning, interval, targetTabId, lastReason } =
      await chrome.storage.local.get(['isRunning', 'interval', 'targetTabId', 'lastReason']);
    if (interval) intervalInput.value = interval;

    if (!isRunning) {
      setStatus(lastReason ? `Status: Stopped — ${lastReason}` : 'Status: Inactive', '#666');
      return;
    }
    // Name the tab being refreshed, so it is never a guess which one it is.
    try {
      const tab = await chrome.tabs.get(targetTabId);
      const label = (tab.title || tab.url || '').slice(0, 34);
      setStatus(`Status: Running — ${label}`, '#10b981');
    } catch {
      setStatus('Status: Running', '#10b981');
    }
  };

  await render();

  startBtn.addEventListener('click', async () => {
    const minutes = Number(intervalInput.value);
    if (!Number.isFinite(minutes) || minutes <= 0) {
      setStatus('Status: Enter a positive interval', '#f85149');
      return;
    }
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    // The tab is chosen here, once, and the worker refreshes that one from now on.
    await chrome.runtime.sendMessage({ action: 'start', minutes, tabId: tab.id });
    await render();
  });

  stopBtn.addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ action: 'stop' });
    await render();
  });
});
