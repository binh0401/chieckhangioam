import React, { useRef, useState } from 'react'
import axios from 'axios'
const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const recorderChunksRef = useRef([]) 
  const [audioURL, setAudioURL] = useState('')


  const startRecording = async () => {

    //return a Promise resolve to a Media Stream object
    const stream = await navigator.mediaDevices.getUserMedia({audio: true})

    const mediaRecorder = new MediaRecorder(stream)
    recorderChunksRef.current = []
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (event) => {
      if(event.data.size > 0){
        recorderChunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(recorderChunksRef.current, {
        type: 'audio/webm'
      })
      const url = URL.createObjectURL(blob)
      setAudioURL(url)
    }

    mediaRecorder.start()
    setIsRecording(true)

  }

  const stopRecording = () => {
    setIsRecording(false)
    mediaRecorderRef.current.stop()
  }

  const sendAudioToServer = async () => {
    const formData = new FormData()
    const audioBlob = new Blob(recorderChunksRef.current, {
      type: 'audio/webm'
    })
    formData.append('file', audioBlob, 'audio.webm')

    try {
      const response = await axios.post('http://localhost:3000', formData)

      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop recording" :"Start recording"}
        </button>
      </div>

      {
        audioURL ? (
          <div>
            <audio src={audioURL} controls></audio>
            <button onClick={sendAudioToServer}>Send to server</button>
          </div>
        ) : null
      }   
    </>
  )
}

export default VoiceRecorder
