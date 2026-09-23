// Auto Refresh Plus -- background service worker.
//
// The tab to refresh is decided when you press Start and remembered in
// chrome.storage, NOT looked up when the alarm fires. Reading the active tab
// at fire time is what the first version did, and it reloaded whichever tab
// happened to be in front -- so switching away to do other work meant the
// extension refreshed the tab you had moved to and left the one you started on
// untouched, which is the exact opposite of running something in the background.
const ALARM = "autoRefreshAlarm";

async function stopRefreshing(reason) {
  await chrome.alarms.clear(ALARM);
  await chrome.storage.local.set({ isRunning: false, targetTabId: null, lastReason: reason || null });
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM) return;

  const { targetTabId } = await chrome.storage.local.get("targetTabId");
  if (typeof targetTabId !== "number") {
    await stopRefreshing("no target tab recorded");
    return;
  }

  try {
    // Throws if the tab was closed; reloading a stale id would target nothing,
    // or worse, an id the browser has since reused.
    await chrome.tabs.get(targetTabId);
    await chrome.tabs.reload(targetTabId);
  } catch {
    await stopRefreshing("target tab was closed");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    // Chrome clamps alarm periods; it will not fire faster than its own floor,
    // whatever is asked for here. The popup already refuses anything under 1.
    chrome.alarms.create(ALARM, { periodInMinutes: request.minutes });
    chrome.storage.local
      .set({ isRunning: true, interval: request.minutes, targetTabId: request.tabId, lastReason: null })
      .then(() => sendResponse({ ok: true }));
    return true;
  }

  if (request.action === "stop") {
    stopRefreshing(null).then(() => sendResponse({ ok: true }));
    return true;
  }
});

// If the tab being refreshed is closed, stop rather than keep an alarm alive
// that can no longer do anything.
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const { targetTabId } = await chrome.storage.local.get("targetTabId");
  if (tabId === targetTabId) await stopRefreshing("target tab was closed");
});
