chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "autoRefreshAlarm") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
        console.log("Tab reloaded at", new Date().toLocaleTimeString());
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    chrome.alarms.create("autoRefreshAlarm", { periodInMinutes: request.minutes });
    console.log(`Started refreshing every ${request.minutes} minutes.`);
  } else if (request.action === "stop") {
    chrome.alarms.clear("autoRefreshAlarm");
    console.log("Stopped refreshing.");
  }
});