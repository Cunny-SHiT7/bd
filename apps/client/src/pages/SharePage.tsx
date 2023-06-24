import { useLocation, useParams } from "react-router"
import BirthdayPlayer from "../components/BirthdayPlayer"
import useAudio from "../components/hooks/useAudio"
import { themes } from "../components/presets/Preset"
import { nameAtom, promptAtom, voiceAtom } from "../components/model/UserAtom"
import { useAtom } from "jotai"
import { useMutation, useQuery } from "react-query"
import { getVideoFn } from "../functions/getMessage"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getStatusFn } from "../functions/getStatus"

const SharePage = () => {

    // VDO URL State
    const [videoURL, setVideoURL] = useState('')
    // Fetch status target
    const [renderId, setRenderId] = useState('')

    const { theme: themeKey, name } = useParams<{
        theme: string,
        name: string
    }>()

    const [searchParams] = useSearchParams()

    const gender = useMemo(() => {
        return searchParams.get("gender") ?? "MALE"
    }, [searchParams]) as "MALE" | "FEMALE"

    const theme = useMemo(() => {
        return themes.find(theme => theme.key === themeKey)
    }, [themeKey])

    /**
     * FETCH FOR VIDEO STATUS UPDATE USING REACT QUERY HERE
     */

    const handleFetch = useMutation('prompt', getVideoFn, {
        onSuccess: data => {
            setRenderId(data.id)
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

    return (
        <div className="w-full min-h-screen flex flex-col gap-y-4 px-8 items-center justify-center">
            <h1 className="text-3xl">
                มีคนกำลังส่งให้กับคุณ{name}
            </h1>
            {
                renderId && <h1>Your video is rendering please do not exit this page</h1>
            }
            {/* <button
                onClick={handleCopyLink} className="border-2 rounded-md ">
                ก็อบปี้ลิ้งค์เพื่อส่งต่อให้คนที่คุณรัก
            </button> */}
        </div>
    )
}

export default SharePage