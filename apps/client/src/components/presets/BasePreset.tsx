import { useAtom } from "jotai"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { nameAtom, promptAtom } from "../model/Atoms"
import { PlaceholderName, PlaceholderPrompt } from "./PlaceholderData"
import { FC, ReactElement } from "react"

export interface BasePreset {
    disableShowName?: boolean
    disableShowPrompt?: boolean
    backgroundImageURL?: string
}

const BasePreset: FC<{ children?: ReactElement } & BasePreset> = ({ children, disableShowName, disableShowPrompt, backgroundImageURL }) => {

    const [name] = useAtom(nameAtom)
    const [prompt] = useAtom(promptAtom)

    return (
        <AbsoluteFill className="bg-red-100">
            {
                backgroundImageURL && <Img src={staticFile(backgroundImageURL)} className="z-0 w-full h-full" />
            }
            <div className="absolute inset-0 z-10">
                {!disableShowName && <h1>
                    {name ? name : PlaceholderName}
                </h1>}
                {!disableShowPrompt && <p>
                    {prompt ? prompt : PlaceholderPrompt}
                </p>}
                {
                    children
                }
            </div>
        </AbsoluteFill>
    )
}

export default BasePreset