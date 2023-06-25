import { Audio, Video, staticFile } from 'remotion'
import { BaseComposition } from '../modules/Composition'
import { shuffleAndPickOne } from '../libs/stuff'

export const FamilyPreset = (props: {
  voiceData: string
  voiceDuration: number
  randomSeed: string
}) => {
  const Videos = [
    'Birthday_Cake_with_candles.webm',
    'Bouncy_Cake.mp4',
    'Fuji_Firework_Show.webm',
    'HBD_Footage.mp4',
    'HBD_Footage1.mp4',
    'HBD_Footage2.webm',
    'HBD-Footage4.webm',
  ]
  const Audios = [
    'AuayPornWanKerd-Arisman.opus',
    'AuayPornWanKerd-Chairat_WongKietKachorn.opus',
    'AuayPornWanKerd-Tanin_Innthep.opus',
    'Happy_Birthday-Acoustic.opus',
    'Happy_Birthday-David_Lee.opus',
    'Happy_Birthday-E3.opus',
    'Happy_Birthday-Jazz_A.opus',
    'Happy_Birthday-MIDI.opus',
    'Happy_Birthday-Piano.opus',
    'Happy_Birthday-Regular.opus',
    'Happy_Birthday-TimmyDzi.opus',
    'Happy-Birthday-Ochrestra[CUT].opus',
  ]

  return (
    <BaseComposition
      audioBuffer={props.voiceData}
      voiceDelay={20}
      pictureDelay={20}
      randomSeed={props.randomSeed}
    >
      <Video
        src={staticFile(
          `/presets/family/video/${shuffleAndPickOne(
            Videos,
            props.randomSeed + '-video'
          )}`
        )}
        className="absolute w-full h-full"
      />
      <Audio
        src={staticFile(
          `/presets/family/sound/${shuffleAndPickOne(
            Audios,
            props.randomSeed + '-audio'
          )}`
        )}
        volume={0.4}
      />
    </BaseComposition>
  )
}
