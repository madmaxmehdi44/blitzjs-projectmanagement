import { useEffect, useLayoutEffect, useState } from "react"
import plyr from "plyr"
import "plyr-react/plyr.css"
// import { useParam, useQuery } from "blitz"
// import getService from "app/services/queries/getService"

function PlyrComponent(props) {
  const [stusVideo, setStusVideo] = useState(Number)

  // const serviceId = useParam("serviceId", "number")
  // alert(serviceId)
  // let idid = 1
  // if (serviceId) {
  //   idid = serviceId
  //   idid
  // } else {
  //   idid
  // }

  const { video_url } = props
  // const userRole = useCurrentUser()?.role

  const options = {
    controls: [
      "rewind",
      "play",
      "fast-forward",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    // i18n: {
    //     restart: "Restart",
    //     rewind: "Rewind {seektime}s",
    //     play: "Play",
    //     pause: "Pause",
    //     fastForward: "Forward {seektime}s",
    //     seek: "Seek",
    //     seekLabel: "{currentTime} of {duration}",
    //     played: "Played",
    //     buffered: "Buffered",
    //     currentTime: "Current time",
    //     duration: "Duration",
    //     volume: "Volume",
    //     mute: "Mute",
    //     unmute: "Unmute",
    //     enableCaptions: "Enable captions",
    //     disableCaptions: "Disable captions",
    //     download: "Download",
    //     enterFullscreen: "Enter fullscreen",
    //     exitFullscreen: "Exit fullscreen",
    //     frameTitle: "Player for {title}",
    //     captions: "Captions",
    //     settings: "Settings",
    //     menuBack: "Go back to previous menu",
    //     speed: "Speed",
    //     normal: "Normal",
    //     quality: "Quality",
    //     loop: "Loop"
    // }
  }

  const sources: Plyr.SourceInfo = {
    type: "video",
    sources: [
      {
        // src: "https://res.cloudinary.com/do72wvhie/video/upload/v1649631526/SEO_Tieserhigh_d888e4ab74.mp4",
        src: `${video_url}`,
        type: "video/mp4",
        size: 720,
      },
      {
        src: `${video_url}`,
        type: "video/webm",
        size: 1080,
      },
    ],
    tracks: [
      {
        kind: "captions",
        label: "English",
        srcLang: "en",
        src: "https://media.nagwa.com/412180825716/en/subtitle_en.vtt",
        default: true,
      },
      {
        kind: "captions",
        label: "French",
        srcLang: "fr",
        src: "https://media.nagwa.com/412180825716/en/subtitle_en.vtt",
      },
    ],
  }
  useLayoutEffect(() => {
    const player = new plyr(".js-plyr", options)
    setStusVideo(player.currentTime)

    player.source = sources
    player.currentTime = stusVideo
    return function cleanup() {
      player.destroy()
    }
  }, [stusVideo])

  return (
    <>
      <video className="js-plyr plyr" />
    </>
  )
}

export default PlyrComponent
