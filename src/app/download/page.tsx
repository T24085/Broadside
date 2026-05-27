import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Play, Youtube } from "lucide-react";
import { ScrollStory } from "@/components/scroll-story";
import { longFormVideos, shortsVideos } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Broadside // Download coming soon",
  description:
    "Broadside is not out yet. Visit the coming soon download page to watch alpha footage, development updates, and shorts.",
  openGraph: {
    title: "Broadside // Download coming soon",
    description:
      "Broadside is not out yet. Watch alpha footage, development updates, and shorts while the team builds toward release."
  },
  twitter: {
    title: "Broadside // Download coming soon",
    description:
      "Broadside is not out yet. Watch alpha footage, development updates, and shorts while the team builds toward release."
  }
};

const scrollChapters = [
  { id: "download", label: "Coming soon", href: "#download" },
  { id: "featured-videos", label: "Videos", href: "#featured-videos" },
  { id: "shorts", label: "Shorts", href: "#shorts" }
];

function VideoTile({
  id,
  title,
  thumb
}: {
  id: string;
  title: string;
  thumb: string;
}) {
  return (
    <a className="download-video hud-frame" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">
      <div className="download-video__media">
        <Image src={thumb} alt={title} fill sizes="(max-width: 900px) 100vw, 25vw" className="download-video__thumb" />
        <span className="download-video__play">
          <Play size={16} />
        </span>
      </div>
      <div className="download-video__copy">
        <span>YouTube</span>
        <h3>{title}</h3>
      </div>
    </a>
  );
}

export default function DownloadPage() {
  return (
    <main className="page-shell page-shell--download">
      <div className="page-shell__backdrop" />
      <ScrollStory chapters={scrollChapters} />

      <header className="download-hero hud-frame" id="download" data-reveal="download" data-scroll-chapter="download">
        <div className="download-hero__copy">
          <a className="download-hero__back" href="/">
            <ArrowLeft size={16} />
            Back home
          </a>
          <span className="download-hero__eyebrow">Download</span>
          <h1>Game coming soon.</h1>
          <p>
            Broadside is still in active development. The full download will appear here when the team is ready to ship a build.
            Until then, follow the latest progress videos and development shorts below.
          </p>
          <div className="download-hero__status">
            <div>
              <CalendarDays size={16} />
              <span>Release window TBD</span>
            </div>
            <div>
              <Youtube size={16} />
              <span>Watch development updates</span>
            </div>
          </div>
        </div>

        <div className="download-hero__panel">
          <div className="download-hero__panel-card">
            <span>Download status</span>
            <strong>Coming soon</strong>
            <p>No installer is available yet. Use the channels below to track progress and get the release announcement first.</p>
          </div>
        </div>
      </header>

      <section className="section" id="featured-videos" data-reveal="featured-videos" data-scroll-chapter="featured-videos">
        <div className="section-heading">
          <div className="section-heading__text">
            <span className="section-heading__kicker">Featured videos</span>
            <h2>Alpha footage</h2>
          </div>
          <a className="section-heading__action" href="https://www.youtube.com/@CodenameBroadside" target="_blank" rel="noreferrer">
            Open channel
          </a>
        </div>
        <div className="download-video-grid">
          {longFormVideos.slice(0, 4).map((video) => (
            <VideoTile key={video.id} {...video} />
          ))}
        </div>
      </section>

      <section className="section" id="shorts" data-reveal="shorts" data-scroll-chapter="shorts">
        <div className="section-heading">
          <div className="section-heading__text">
            <span className="section-heading__kicker">Shorts</span>
            <h2>Quick updates</h2>
          </div>
          <a className="section-heading__action" href="https://www.youtube.com/@CodenameBroadside/shorts" target="_blank" rel="noreferrer">
            Browse shorts
          </a>
        </div>
        <div className="download-shorts-grid">
          {shortsVideos.map((video) => (
            <VideoTile key={video.id} {...video} />
          ))}
        </div>
      </section>
    </main>
  );
}
