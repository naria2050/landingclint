'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react'
import useAxiosPublic from './hooks/useAxiosPublic'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const [video, setVideo] = useState(null)  // Set the initial state to null instead of undefined

  // Fetch video URL
  useEffect(() => {
    const axiosPublic = useAxiosPublic()

    const fetchVideo = async () => {
      try {
        const res = await axiosPublic.get('/video')  // Fetch video data from API
        setVideo(res.data[0].url)  // Set the video URL in state
      } catch (error) {
        console.error('Error fetching video:', error)
      }
    }

    fetchVideo()  // Fetch video URL when the component mounts
  }, [])

  // Extract the video ID only if video URL is available
  const YOUTUBE_VIDEO_ID = video ? video.split('v=')[1] : null

  useEffect(() => {
    if (!YOUTUBE_VIDEO_ID) return  // Don't run the script if video ID is not available

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: YOUTUBE_VIDEO_ID,  // Use the extracted video ID
        playerVars: {
          autoplay: 0,
          controls: 0,
          mute: 1,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onReady: (event) => {
            setIsPlaying(false)
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
          }
        }
      })
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [YOUTUBE_VIDEO_ID])  // Re-run this effect when the video ID changes

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={containerRef} className="relative bg-black rounded-lg shadow-xl overflow-hidden">
            <div className="relative aspect-video">
              <div id="youtube-player" className="w-full h-full"></div>

              {/* YouTube-style play button overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                    <Play size={40} className="text-white ml-2" />
                  </div>
                </div>
              )}

              {/* Simplified controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex justify-between items-center">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <Maximize2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
