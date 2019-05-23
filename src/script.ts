class Recorder {
  readonly chunks: Blob[]
  readonly id: string
  readonly recorder: MediaRecorder

  constructor(id: string, player: HTMLVideoElement) {
    const stream = player.captureStream()
    const recorder = new MediaRecorder(stream)

    recorder.addEventListener('dataavailable', this.handleDataAvailable)
    recorder.addEventListener('stop', this.handleStop)

    this.chunks = []
    this.id = id
    this.recorder = recorder
  }

  handleDataAvailable = (event: BlobEvent) => {
    this.chunks.push(event.data)
  }

  handleStop = () => {
    const blob = new Blob(this.chunks, {
      type: 'video/webm'
    })

    chrome.runtime.sendMessage({
      filename: `${this.id}-${Date.now()}.webm`,
      url: URL.createObjectURL(blob)
    })
  }

  start() {
    this.recorder.start(500)
  }

  stop() {
    this.recorder.stop()
  }
}

let recorder: Recorder | null = null

chrome.runtime.onMessage.addListener(({ command }) => {
  if (command === 'start') {
    const id = new URL(location.href).searchParams.get('v')

    if (!id) return

    const player = document.querySelector<HTMLVideoElement>('#player video')

    if (!player) return

    recorder = new Recorder(id, player)

    recorder.start()
  } else if (command === 'stop' && recorder) {
    recorder.stop()
    
    recorder = null
  }
})
