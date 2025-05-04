import React, { useState } from 'react'

const VoiceRecorder = () => {
  const [isRecording, useIsRecording] = useState(false)

  const startRecording = async () => {
    
    const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    
  }

  const stopRecording = () => {

  }




  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop recording" :"Start recording"}
      </button>
    </div>
  )
}

export default VoiceRecorder
