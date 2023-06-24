import { Player } from '@remotion/player'
import TestPreset from '../components/presets/TestPreset'
import useAudio from '../components/hooks/useAudio'
import { VIDEO_FRAMES_PER_SECOND } from '../components/model/VideoMetaAtom'
import GenerateFormInfo from '../components/GenerateFormInfo'
import { useRef, useState } from 'react'

type Theme = {
    display: string
    element: () => JSX.Element
}

type Themes = Record<string, Theme>

const themes: Themes = {
    "TEST": {
        display: "test",
        element: TestPreset
    },
    "family": {
        display: "ครอบครัว",
        element: () => <></>
    }
}

const BirthdayPage = () => {
    const { duration } = useAudio()

    const [theme, setTheme] = useState<Theme | undefined>(themes["TEST"])
    const Select = useRef<any>(null)

    const handleSelect = () => {
        if (!Select?.current?.value) return
        console.log(Select.current.value)
        setTheme(themes[Select.current.value])
    }

    console.log(theme)

    return (
        <div className="min-h-screen flex flex-col gap-x-4 items-center justify-around">
            <div>
                <h1>เลือกธีมของท่าน</h1>
                <select className="w-full border-2 border-black px-1" ref={Select} onChange={handleSelect} >
                    {
                        Object.keys(themes).map((themeId) => {
                            return (
                                <option key={themeId} value={themeId}>{themes[themeId].display}</option>
                            )
                        })
                    }
                </select>
            </div>
            {theme?.element && <div>
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
            </div>}
            <GenerateFormInfo />
        </div>
    )
}

export default BirthdayPage
