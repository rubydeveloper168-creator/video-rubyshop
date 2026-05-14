import { jsx } from "react/jsx-runtime";
import Plyr from "plyr-react";
/* empty css                */
const VideoPlayer = ({ source }) => {
  const plyrOptions = {
    controls: ["play-large", "play", "progress", "current-time", "duration", "mute", "volume", "settings", "fullscreen"],
    settings: ["quality", "speed"],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    resetOnEnd: true,
    keyboard: { focused: true, global: true },
    displayDuration: true,
    tooltips: { controls: true, seek: true },
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      forward: "Forward {seektime}s",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      toggleMute: "Toggle Mute",
      toggleCaptions: "Toggle Captions",
      toggleFullscreen: "Toggle Fullscreen"
    }
  };
  const processedSource = (() => {
    var _a;
    const src = (_a = source.sources[0]) == null ? void 0 : _a.src;
    if (!src) return null;
    const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
    if (!isYouTube) return source;
    const getYouTubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    };
    const videoId = getYouTubeId(src);
    if (!videoId) return null;
    return {
      type: "video",
      sources: [
        {
          src: videoId,
          provider: "youtube"
        }
      ]
    };
  })();
  if (!processedSource) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx("p", { children: "No video available" }) });
  }
  return /* @__PURE__ */ jsx(Plyr, { options: plyrOptions, source: processedSource });
};
export {
  VideoPlayer as V
};
