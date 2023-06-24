import { useAtom } from 'jotai'
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from 'remotion'
import {
  audioBufferAtom,
  audioDataURLAtom,
  nameAtom,
  promptAtom,
} from '../model/UserAtom'
import { PlaceholderName, PlaceholderPrompt } from './PlaceholderData'
import { FC, ReactElement, useMemo } from 'react'
import { VIDEO_FRAMES_PER_SECOND } from '../model/VideoMetaAtom'

export interface BasePreset {
  showName?: boolean
  showPrompt?: boolean
  backgroundImageURL?: string
  nameClassName?: string
  promptClassName?: string
}

const BasePreset: FC<{ children?: ReactElement } & BasePreset> = ({
  children,
  showName,
  showPrompt,
  backgroundImageURL,
  promptClassName,
  nameClassName,
}) => {
  const [name] = useAtom(nameAtom)
  const [prompt] = useAtom(promptAtom)

  const [audioURL] = useAtom(audioDataURLAtom)

  return (
    <AbsoluteFill className="bg-red-100">
      {backgroundImageURL && (
        <Img
          src={staticFile(backgroundImageURL)}
          className="z-0 w-full h-full"
        />
      )}
      <div className="absolute inset-0 z-10">
        {showName && (
          <h1 className={nameClassName}>{name ? name : PlaceholderName}</h1>
        )}
        {showPrompt && (
          <p className={promptClassName}>
            {prompt ? prompt : PlaceholderPrompt}
          </p>
        )}
        {children}
      </div>
      {audioURL && (
        <Sequence name="Audio" from={1.25 * VIDEO_FRAMES_PER_SECOND}>
          <Audio src={audioURL} />
        </Sequence>
      )}
    </AbsoluteFill>
  )
}

export default BasePreset
