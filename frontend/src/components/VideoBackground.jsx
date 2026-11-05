function VideoBackground({ children }) {
  return (
    <div className="video-background">
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/videos/taskflow-background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="video-overlay"></div>

      <div className="video-content">
        {children}
      </div>
    </div>
  );
}

export default VideoBackground;