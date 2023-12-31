import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  Video,
  random,
  staticFile,
} from 'remotion'
import { Gif } from '@remotion/gif'
import { shuffleAndPickOne } from '../libs/stuff'

export const BaseComposition = (props: {
  audioBuffer: string
  children: React.ReactNode
  pictureDelay?: number
  voiceDelay?: number
  imageURL?: string
  randomSeed: string
  hideOverlay?: boolean
}) => {
  return (
    <AbsoluteFill className="items-center justify-center bg-black">
      {props.children}
      <Sequence name="Picture" from={props.pictureDelay}>
        {props.imageURL && (
          <Img src={staticFile(props.imageURL)} className="w-full h-full" />
        )}
      </Sequence>
      <Sequence name="Audio" from={props.voiceDelay}>
        <Audio src={props.audioBuffer} volume={1} />
      </Sequence>
      {/* Weird Stuff */}
      {!props.hideOverlay && <BirthdaySprinkle seed={props.randomSeed} />}
    </AbsoluteFill>
  )
}

export const RandomNoise = (props: {
  seed: string
  durationLength: number
  prefix: string
  audios: string[]
}) => {
  const randomFrom = new Array(50).fill(true).map((_, i) => {
    return +(random(`random-x-${i}`) * props.durationLength * 100).toFixed(0)
  })
  return (
    <>
      {randomFrom.map((_, i) => (
        <Sequence from={_}>
          <Audio src={staticFile(`/presets/${props.prefix}/effect/.mp3`)} />
        </Sequence>
      ))}
    </>
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
                zIndex: 10,
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </>
  )
}

export const SimpleBase = (props: {
  prefix: string
  videos: any
  audios: any
  randomSeed: string
}) => (
  <>
    <Sequence from={20}>
      <Video
        muted
        src={staticFile(
          `/presets/${props.prefix}/video/${shuffleAndPickOne(
            props.videos,
            props.randomSeed + '-video'
          )}`
        )}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          zIndex: 5,
        }}
      />
    </Sequence>
    <Audio
      src={staticFile(
        `/presets/${props.prefix}/sound/${shuffleAndPickOne(
          props.audios,
          props.randomSeed + '-audio'
        )}`
      )}
      volume={0.2}
    />
  </>
)
