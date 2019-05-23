interface HTMLMediaElement extends HTMLElement {
  captureStream(): MediaStream
}

interface MediaRecorderEventMap {
  dataavailable: BlobEvent
  stop: Event
}

interface MediaRecorder extends EventTarget {
  addEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
}
