let isRecording = false

chrome.browserAction.onClicked.addListener(tab => {
  if (typeof tab.id !== 'number') return


  if (isRecording) {
    chrome.browserAction.setTitle({
      tabId: tab.id,
      title: '録画する'
    })

    chrome.tabs.sendMessage(tab.id, {
      command: 'stop'
    })

    isRecording = false
  } else {
    chrome.browserAction.setTitle({
      tabId: tab.id,
      title: '保存する'
    })

    chrome.tabs.sendMessage(tab.id, {
      command: 'start'
    })

    isRecording = true
  }
})

chrome.runtime.onMessage.addListener((options) => {
  chrome.downloads.download(options)
})
