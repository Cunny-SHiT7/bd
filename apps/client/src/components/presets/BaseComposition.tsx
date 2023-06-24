import { useAtom } from 'jotai'
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from 'remotion'
import {
  nameAtom,
  promptAtom,
} from '../model/UserAtom'
import { PlaceholderName, PlaceholderPrompt } from './Preset'
import { FC } from 'react'
import { VIDEO_FRAMES_PER_SECOND } from '../model/VideoMetaAtom'

export interface BasePreset {
  children?: React.ReactNode
  showName?: boolean
  showPrompt?: boolean
  backgroundImageURL?: string
  nameClassName?: string
  promptClassName?: string
  audioURL?: string
}

const BaseComposition: FC<BasePreset> = ({
  children,
  showName,
  showPrompt,
  backgroundImageURL,
  promptClassName,
  nameClassName,
  audioURL
}) => {
  const [name] = useAtom(nameAtom)
  const [prompt] = useAtom(promptAtom)

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

export default BaseComposition
