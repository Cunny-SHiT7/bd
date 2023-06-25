import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const RenderInformationPage = () => {
  const params = useParams<{ renderId: string }>()
  const data = useQuery({
    queryKey: ['render', params.renderId],
    queryFn: async () =>
      await axios.get(`http://localhost:4000/getRender/${params.renderId}`),
    refetchInterval: 1000,
  })

  if (data.isLoading) return <div>Loading...</div>

  // Loading progress
  if (!data.data?.data.url)
    return (
      <>
        {!data.data?.data.isError ? (
          <>
            <div>
              <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmE2MTNsNHM2MG51bDE0aGIzMHZ5dzdhbmtram9oMTJmYjZ0ZjV4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif" />
              กำลังทำวิดีโอให้ไอ่ควาย
              <p>{data.data?.data.process * 100}%</p>
            </div>
          </>
        ) : (
          <>
            <div>มีบางอย่างผิดพลาด</div>
          </>
        )}
      </>
    )

  return (
    <div>
      <h1>นี่คือวิดีโอของคุณคับ</h1>
      <video src={data.data?.data.url} controls>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default RenderInformationPage
