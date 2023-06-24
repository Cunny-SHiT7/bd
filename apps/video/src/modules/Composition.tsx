import React from "react";
import { AbsoluteFill, Audio, Img, Sequence } from "remotion";

export const BaseComposition = (props: {
  audioBuffer: string;
  children: React.ReactNode;
  pictureDelay?: number;
  anounceDelay?: number;
}) => {
  return (
    <AbsoluteFill className="items-center justify-center bg-black">
      {props.children}
      <Sequence name="Picture" from={props.pictureDelay}>
        <Img
          src="https://scontent.fbkk22-4.fna.fbcdn.net/v/t39.30808-6/292021365_3093036167629961_7562457281644003836_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGUPYjLoPBW1LMBOx8NSlmeEb-iMTUMPYwRv6IxNQw9jEzoJib2gZ0aCohEGfhhpPA-RMu8XvLzFXbgT6FYw0oo&_nc_ohc=_uBMEovuHlYAX-EeM13&_nc_ht=scontent.fbkk22-4.fna&oh=00_AfBOC4N3CZuKQDWldPKgqfQhE1drQgjGgA8hkxpVmoBpHA&oe=649BAC1E"
          className="w-full h-full"
        />
      </Sequence>
      <Sequence name="Audio" from={props.anounceDelay}>
        <Audio src={props.audioBuffer} />
      </Sequence>
    </AbsoluteFill>
  );
};
