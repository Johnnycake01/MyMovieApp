import React, { useState, useCallback, useRef } from "react";
import { View} from "react-native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import YoutubePlayer from "react-native-youtube-iframe";
interface ITrailerProps {
  videoId: string;
}

function MovieTrailer(props: ITrailerProps) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View
      style={{
        height: 300,
        width: ScreenWidth
      }}
    >
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={props.videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
}

export default MovieTrailer;
