import { useAtom } from 'jotai'
import BasePreset from './BaseComposition'
import { audioDataURLAtom } from '../model/UserAtom'

const TestPreset = () => {

  const [audioURL] = useAtom(audioDataURLAtom)

  return (
    <BasePreset backgroundImageURL="testImage.jpg" audioURL={audioURL} >
    </BasePreset>
  )
}

export default TestPreset
