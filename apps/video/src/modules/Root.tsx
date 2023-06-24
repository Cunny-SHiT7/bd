import { Composition, continueRender, delayRender } from "remotion";
import { useCallback, useEffect, useState } from "react";
import { audioBufferToDataUrl } from "@remotion/media-utils";
import "../styles/style.css";
import { FamilyPreset } from "../presets/Family";

export const RemotionRoot: React.FC = () => {
  const [audioBuffer, setAudioBuffer] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const response = await fetch("http://localhost:4000/random", {
      method: "POST",
      body: JSON.stringify({
        name: "Kitsada",
        gender: "MALE",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    // Parse base64 to ArrayBuffer
    const arrayBuffer = Uint8Array.from(atob(json.data.voice), (c) =>
      c.charCodeAt(0)
    );
    const audioBuffer = await new AudioContext().decodeAudioData(
      arrayBuffer.buffer
    );

    setDuration(audioBuffer.duration);

    // Load from remotion
    setAudioBuffer(audioBufferToDataUrl(audioBuffer));

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {duration && (
        <Composition
          id="MyComposition"
          component={FamilyPreset}
          // eslint-disable-next-line radix
          durationInFrames={parseInt((duration * 30).toFixed(0)) + 90}
          fps={30}
          width={360}
          height={360}
          defaultProps={{
            audioBuffer: audioBuffer as string,
          }}
        />
      )}
    </>
  );
};
