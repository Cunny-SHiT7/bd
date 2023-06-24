import { useAtom } from "jotai"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { nameAtom, promptAtom } from "../model/Atoms"
import { PlaceholderName, PlaceholderPrompt } from "./PlaceholderData"
import { FC, ReactElement } from "react"

export interface BasePreset {
    showName?: boolean
    showPrompt?: boolean
    backgroundImageURL?: string
    nameClassName?: string,
    promptClassName?: string
}

const BasePreset: FC<{ children?: ReactElement } & BasePreset> = ({ children, showName, showPrompt, backgroundImageURL, promptClassName, nameClassName }) => {

    const [name] = useAtom(nameAtom)
    const [prompt] = useAtom(promptAtom)

    return (
        <AbsoluteFill className="bg-red-100">
            {
                backgroundImageURL && <Img src={staticFile(backgroundImageURL)} className="z-0 w-full h-full" />
            }
            <div className="absolute inset-0 z-10">
                {showName && <h1 className={nameClassName}>
                    {name ? name : PlaceholderName}
                </h1>}
                {showPrompt && <p className={promptClassName}>
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