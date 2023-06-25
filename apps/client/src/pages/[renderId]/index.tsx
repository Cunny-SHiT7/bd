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
  if (!data.data?.data.url)
    return (
      <>
        {!data.data?.data.isError ? (
          <>
            <div>
              กำลังทำวิดีโอให้ แปปนึง
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
