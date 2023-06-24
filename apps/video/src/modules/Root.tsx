import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import "../styles/style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={MyComposition}
        durationInFrames={240}
        fps={30}
        width={360}
        height={360}
      />
    </>
  );
};
