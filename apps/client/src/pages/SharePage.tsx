import { useLocation, useParams } from "react-router"
import BirthdayPlayer from "../components/BirthdayPlayer"
import useAudio from "../components/hooks/useAudio"
import { themes } from "../components/presets/Preset"
import { nameAtom, promptAtom, voiceAtom } from "../components/model/UserAtom"
import { useAtom } from "jotai"
import { useMutation } from "react-query"
import { getVideoFn } from "../functions/getMessage"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

const SharePage = () => {

    // VDO URL State
    const [videoURL, setVideoURL] = useState('')
    // Fetch status target

    const { theme: themeKey, name } = useParams<{
        theme: string,
        name: string
    }>()

    const [searchParams] = useSearchParams()
    const location = useLocation()

    const gender = useMemo(() => {
        return searchParams.get("gender") ?? "MALE"
    }, [searchParams]) as "MALE" | "FEMALE"

    const theme = useMemo(() => {
        return themes.find(theme => theme.key === themeKey)
    }, [themeKey])

    const handleFetch = useMutation('prompt', getVideoFn, {
        onSuccess: data => {
            setVideoURL(data.url)
        },
        onError: error => {
            console.error(error)
        },
    })

    useEffect(() => {
        if (!name || !theme?.key) return


        handleFetch.mutateAsync({
            name,
            gender,
            theme: theme?.key
        })
    }, [name, gender])


    // const handleCopyLink = () => {
    //     navigator.clipboard.writeText(location.pathname)
    //     alert("ก็อบแล้วจ้า")
    // }

    return (
        <div className="w-full min-h-screen flex flex-col gap-y-4 px-8 items-center justify-center">
            <h1 className="text-3xl">
                มีคนกำลังส่งให้กับคุณ{name}
            </h1>
            {
                videoURL && <video src={videoURL} />
            }
            {/* <button
                onClick={handleCopyLink} className="border-2 rounded-md ">
                ก็อบปี้ลิ้งค์เพื่อส่งต่อให้คนที่คุณรัก
            </button> */}
        </div>
    )
}

export default SharePage