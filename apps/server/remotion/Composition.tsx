import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  random,
  staticFile,
} from 'remotion'
import { Gif } from '@remotion/gif'

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
      <BirthdaySprinkle seed={props.audioBuffer} />
      <Sequence name="Picture" from={props.pictureDelay}>
        {props.imageURL && (
          <Img src={staticFile(props.imageURL)} className="w-full h-full" />
        )}
      </Sequence>
      <Sequence name="Audio" from={props.voiceDelay}>
        <Audio src={props.audioBuffer} volume={1} />
      </Sequence>
    </AbsoluteFill>
  )
}

const BirthdaySprinkle = (props: { seed: string }) => {
  return (
    <>
      <Sequence from={20}>
        <AbsoluteFill>
          <div className="absolute bottom-0 left-0 z-10">
            <Gif
              src={staticFile(
                `/images/${Math.floor(random(props.seed) * 6)}.gif`
              )}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                left: 0,
                top: 0,
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </>
  )
}
