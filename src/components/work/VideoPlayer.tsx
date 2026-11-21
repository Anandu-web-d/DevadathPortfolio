import React, { useState, useEffect, useRef } from 'react'
import type { Project } from '../../data/projects'

interface VideoPlayerProps {
  project: Project
  onClose: () => void
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ project }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showEmbed, setShowEmbed] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Autoplay video on open
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsPlaying(true)
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay with sound often blocked by browser policy; fallback to muted
        video.muted = true
        setIsMuted(true)
        video.play().catch(() => {
          setIsPlaying(false)
        })
      })
    }
  }, [project.id, project.mediaSource])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      setCurrentTime(video.currentTime)
      if (video.duration) {
        setDuration(video.duration)
      }
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (video && video.duration) {
      setDuration(video.duration)
    }
  }

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video || !duration) return
    const pct = Number(e.target.value)
    const targetTime = (pct / 100) * duration
    video.currentTime = targetTime
    setCurrentTime(targetTime)
  }

  const handleFullscreen = () => {
    if (!playerRef.current) return
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  // Extract Instagram ID for iframe embed if requested
  const getEmbedUrl = (url: string) => {
    const match = url.match(/\/(reel|p)\/([^/?#&]+)/)
    if (match) {
      return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`
    }
    return ''
  }

  const embedUrl = getEmbedUrl(project.externalProjectLink)

  return (
    <div className="editorial-video-player" ref={playerRef}>
      {/* Player Screen Area */}
      <div className="player-screen">
        {showEmbed && embedUrl ? (
          <div className="player-iframe-wrapper">
            <iframe
              src={embedUrl}
              title={`Instagram embed for ${project.title}`}
              className="player-iframe"
              allowTransparency={true}
              allowFullScreen={true}
            />
          </div>
        ) : (
          <div className="player-visual-canvas" onClick={togglePlay}>
            {project.mediaSource ? (
              <video
                ref={videoRef}
                src={project.mediaSource}
                poster={project.thumbnail}
                className="player-actual-video"
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <img
                src={project.thumbnail}
                alt={project.title}
                className={`player-poster ${isPlaying ? 'is-playing' : ''}`}
              />
            )}

            {/* Big Play Overlay Button (visible when paused) */}
            {!isPlaying && (
              <button
                type="button"
                className="player-big-play-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay()
                }}
                aria-label="Play video"
              >
                <span className="big-play-icon">▶</span>
              </button>
            )}

            {/* Sound waveform badge when playing */}
            {isPlaying && (
              <div className="player-eq-visualizer" aria-hidden="true">
                <span className="eq-bar bar-1"></span>
                <span className="eq-bar bar-2"></span>
                <span className="eq-bar bar-3"></span>
                <span className="eq-bar bar-4"></span>
                <span className="eq-bar bar-5"></span>
              </div>
            )}

            {/* Official Source Attribution Notice */}
            <div className="player-attribution-pill" onClick={(e) => e.stopPropagation()}>
              <span className="pill-dot"></span>
              <span>CINEMATIC EDIT // DEEPINTALES</span>
            </div>
          </div>
        )}
      </div>

      {/* Scrubber Timeline */}
      <div className="player-timeline-bar">
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progressPercent) ? 0 : progressPercent}
          onChange={handleScrub}
          className="timeline-slider"
          aria-label="Video timeline progress"
        />
        <div
          className="timeline-fill"
          style={{ width: `${isNaN(progressPercent) ? 0 : progressPercent}%` }}
        ></div>
      </div>

      {/* Control Buttons Bar */}
      <div className="player-controls-bar">
        <div className="controls-left">
          <button
            type="button"
            className="ctrl-btn play-toggle"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>

          <button
            type="button"
            className="ctrl-btn mute-toggle"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇 MUTED' : '🔊 AUDIO'}
          </button>

          <span className="player-time-display">
            {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : (project.duration || '0:45')}
          </span>
        </div>

        <div className="controls-right">
          {embedUrl && (
            <button
              type="button"
              className="ctrl-btn embed-toggle"
              onClick={() => setShowEmbed(!showEmbed)}
            >
              {showEmbed ? 'HD VIDEO PLAYER' : 'INSTAGRAM EMBED'}
            </button>
          )}

          <a
            href={project.externalProjectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ctrl-btn external-link"
          >
            INSTAGRAM ↗
          </a>

          <button
            type="button"
            className="ctrl-btn fs-toggle"
            onClick={handleFullscreen}
            aria-label="Toggle Fullscreen"
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
