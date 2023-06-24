import { Player } from "@remotion/player"
import { FC } from "react"
import { VIDEO_FRAMES_PER_SECOND } from "./model/VideoMetaAtom"
import { Theme } from "./presets/Preset"

interface Props {
    duration: number,
    theme: Theme,
}

const BirthdayPlayer: FC<Props> = ({ duration, theme }) => {

    console.log('player')

    return (
        <Player
            controls={duration ? true : false}
            component={theme?.element}
            durationInFrames={Math.floor(
                (duration ?? 1) * VIDEO_FRAMES_PER_SECOND
            )}
            compositionHeight={360}
            compositionWidth={360}
            fps={VIDEO_FRAMES_PER_SECOND}
        />
    )
}

export default BirthdayPlayer