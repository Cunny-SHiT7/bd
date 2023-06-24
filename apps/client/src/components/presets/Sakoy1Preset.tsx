import BasePreset from './BaseComposition'
import { useAtom } from "jotai"
import { audioDataURLAtom } from "../model/UserAtom"
import { Sequence, Video, staticFile } from 'remotion'

const Sakoy1Preset = () => {

    const [audioURL] = useAtom(audioDataURLAtom)

    console.log('sakoy1')

    return (
        <BasePreset audioURL={audioURL}>
            <Video className="absolute inset-0 w-full h-full" volume={0.1} src={"/presets/sakoy/video/Funeral1.webm"} />
        </BasePreset>
    )
}
export default Sakoy1Preset