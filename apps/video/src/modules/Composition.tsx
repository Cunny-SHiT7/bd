import React from 'react'
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from 'remotion'
import { Gif } from '@remotion/gif'
import { random } from 'remotion'

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
      <BirthdaySprinkle />
      <Sequence name="Picture" from={props.pictureDelay}>
        {props.imageURL && (
          <Img src={staticFile(props.imageURL)} className="w-full h-full" />
        )}
      </Sequence>
      <Sequence name="Audio" from={props.voiceDelay}>
        <Audio src={props.audioBuffer} />
      </Sequence>
    </AbsoluteFill>
  )
}

const BirthdaySprinkle = () => {
  return (
    <>
      <Sequence from={20}>
        <AbsoluteFill>
          <div className="absolute left-0 z-10">
            <Gif src={staticFile('/images/1.gif')} width={200} />
          </div>
          <div className="absolute top-0 right-0 z-10">
            <Gif src={staticFile('/images/2.gif')} width={200} />
          </div>
          <div className="absolute bottom-0 left-0 z-10">
            <Gif src={staticFile('/images/3.gif')} width={200} />
          </div>
          <div className="absolute bottom-0 right-0 z-10">
            <Gif src={staticFile('/images/4.gif')} width={200} />
          </div>
        </AbsoluteFill>
      </Sequence>
    </>
  )
}
