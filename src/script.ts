class Recorder {
  private readonly chunks: Blob[]
  private readonly id: string
  private readonly recorder: MediaRecorder

  public constructor(id: string, player: HTMLVideoElement) {
    const stream = player.captureStream()
    const recorder = new MediaRecorder(stream)

    recorder.addEventListener('dataavailable', this.handleDataAvailable)
    recorder.addEventListener('stop', this.handleStop)

    this.chunks = []
    this.id = id
    this.recorder = recorder
  }

  public start(): void {
    this.recorder.start(500)
  }

  public stop(): void {
    this.recorder.stop()
  }

  private handleDataAvailable = (event: BlobEvent): void => {
    this.chunks.push(event.data)
  }

  private handleStop = (): void => {
    const blob = new Blob(this.chunks, {
      type: 'video/webm'
    })

    chrome.runtime.sendMessage({
      filename: `${this.id}-${Date.now()}.webm`,
      url: URL.createObjectURL(blob)
    })
  }
}

let recorder: Recorder | null = null

chrome.runtime.onMessage.addListener(
  ({ command }): void => {
    if (command === 'start') {
      const id = new URL(location.href).searchParams.get('v')

      if (!id) return

      const player = document.querySelector<HTMLVideoElement>('#player video, #player-theater-container video')

      if (!player) return

      recorder = new Recorder(id, player)

      recorder.start()
    } else if (command === 'stop' && recorder) {
      recorder.stop()

      recorder = null
    }
  }
)
