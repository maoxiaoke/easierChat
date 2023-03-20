import { useLottie, useLottieInteractivity } from "lottie-react";
import activity from "../../lottie/activity.json";

const style = {
  height: "20px",
};

const Lottie = () => {
  const lottieObj = useLottie({
    animationData: activity,
  }, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "cursor",
    actions: [
      {
        position: { x: [0, 1], y: [0, 1] },
        type: "play",
        frames: [0, 30],
      },
      {
        position: { x: -1, y: -1 },
        type: "stop",
        frames: [0],
      },
    ],
  });

  return Animation;
}

export default Lottie;
