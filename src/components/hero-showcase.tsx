import { longFormVideos } from "@/lib/site-data";

const alphaVideo = longFormVideos[0];

export function HeroShowcase() {
  const embedParams = new URLSearchParams({
    autoplay: "1",
    controls: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    loop: "1",
    modestbranding: "1",
    mute: "1",
    playsinline: "1",
    playlist: alphaVideo.id,
    rel: "0"
  });

  return (
    <div className="hero-showcase" aria-hidden="true">
      <iframe
        className="hero-showcase__video"
        src={`https://www.youtube-nocookie.com/embed/${alphaVideo.id}?${embedParams.toString()}`}
        title={alphaVideo.title}
        loading="eager"
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />

      <div className="hero-showcase__scrim" />

      <div className="hero-showcase__badge">
        <span>Alpha testing footage</span>
        <strong>{alphaVideo.title}</strong>
      </div>
    </div>
  );
}
