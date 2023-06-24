import React from 'react'
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from 'remotion'

export const BaseComposition = (props: {
  audioBuffer: string
  children: React.ReactNode
  pictureDelay?: number
  voiceDelay?: number
  imageURL?: string
}) => {
  return (
    <AbsoluteFill className="items-center justify-center bg-black">
      {props.children}
      <Sequence name="Picture" from={props.pictureDelay}>
        {props.imageURL && <Img
          src={staticFile(props.imageURL)}
          className="w-full h-full"
        />}
      </Sequence>
      <Sequence name="Audio" from={props.voiceDelay}>
        <Audio src={props.audioBuffer} />
      </Sequence>
    </AbsoluteFill>
  )
}
