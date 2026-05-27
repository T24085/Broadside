import Image from "next/image";
import { ExternalLink, Gamepad2, MessageCircleMore, Play, Youtube } from "lucide-react";
import { HeroShowcase } from "@/components/hero-showcase";
import { SectionHeading } from "@/components/section-heading";
import { ScrollStory } from "@/components/scroll-story";
import {
  artistRoles,
  classChoices,
  contactNames,
  featureCards,
  longFormVideos,
  navLinks,
  shortsVideos,
  teamRoles
} from "@/lib/site-data";

const scrollChapters = [
  { id: "hero", label: "Opening", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "classes", label: "Classes", href: "#classes" },
  { id: "gameplay", label: "Gameplay", href: "#gameplay" },
  { id: "progress", label: "Progress", href: "#progress" },
  { id: "join", label: "Join", href: "#join" },
  { id: "media", label: "Media", href: "#media" },
  { id: "contact", label: "Contact", href: "#contact" }
];

function MediaCard({
  title,
  copy,
  src,
  className = ""
}: {
  title: string;
  copy: string;
  src: string;
  className?: string;
}) {
  return (
    <article className={`media-card hud-frame ${className}`}>
      <div className="media-card__image-wrap">
        <Image src={src} alt={title} fill sizes="(max-width: 900px) 100vw, 20vw" className="media-card__image" />
      </div>
      <div className="media-card__copy">
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function YouTubeCard({
  id,
  title,
  thumb,
  short = false,
  autoplay = false
}: {
  id: string;
  title: string;
  thumb: string;
  short?: boolean;
  autoplay?: boolean;
}) {
  const shouldEmbed = short || autoplay;
  const embedParams = new URLSearchParams({
    autoplay: "1",
    controls: short ? "0" : "1",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    modestbranding: "1",
    mute: "1",
    playsinline: "1",
    rel: "0"
  });

  if (short) {
    embedParams.set("loop", "1");
    embedParams.set("playlist", id);
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?${embedParams.toString()}`;

  const media = shouldEmbed ? (
    <iframe
      className="youtube-card__embed"
      src={embedUrl}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  ) : (
    <>
      <Image src={thumb} alt={title} fill sizes="(max-width: 900px) 100vw, 33vw" className="youtube-card__thumb" />
      <span className="youtube-card__play">
        <Play size={16} />
      </span>
    </>
  );

  const content = (
    <>
      <div className="youtube-card__media">{media}</div>
      <div className="youtube-card__meta">
        <span>{short ? "Short" : "Video"}</span>
        <h3>{title}</h3>
      </div>
    </>
  );

  if (shouldEmbed) {
    return <article className={`youtube-card hud-frame ${short ? "is-short" : ""}`}>{content}</article>;
  }

  return (
    <a
      className={`youtube-card hud-frame ${short ? "is-short" : ""}`}
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  );
}

export default function Page() {
  return (
    <main className="page-shell" id="home">
      <div className="page-shell__backdrop" />
      <ScrollStory chapters={scrollChapters} />

      <header className="topbar" data-reveal="topbar" data-scroll-chapter="hero">
        <div className="topbar__brand-lockup">
          <a className="topbar__brand" href="#home" aria-label="Broadside home">
            <span>Broadside</span>
            <span className="topbar__slashes">//</span>
          </a>
          <span className="topbar__eyebrow">Community-built sci-fi action FPS-Z</span>
        </div>

        <nav className="topbar__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="topbar__utility">
          <a className="button button--secondary topbar__cta" href="#progress">
            <Play size={14} />
            Watch Alpha
          </a>

          <a href="https://discord.com/invite/9nqr4Cmjxj" target="_blank" rel="noreferrer" aria-label="Join Discord">
            <MessageCircleMore size={18} />
          </a>
          <a href="https://www.youtube.com/@CodenameBroadside" target="_blank" rel="noreferrer" aria-label="YouTube channel">
            <Youtube size={18} />
          </a>
          <a href="#contact" aria-label="Jump to contact">
            <ExternalLink size={18} />
          </a>
        </div>
      </header>

      <section className="hero-section" data-reveal="hero" data-scroll-chapter="hero">
        <div className="hero-section__copy" data-reveal="hero-copy">
          <h1>
            BROADSIDE
            <span className="hero-section__slash">//</span>
          </h1>
          <span className="hero-section__subtitle">Community-built sci-fi action FPS-Z</span>
          <p className="hero-section__lede">
            The 90s shooter spirit meets modern movement.
            <br />
            Indoor combat. Open terrain. Vehicles. Base building.
          </p>
          <div className="hero-section__actions">
            <a className="button button--primary" href="#progress">
              <Play size={16} />
              Watch Progress
            </a>
            <a className="button button--secondary" href="https://discord.com/invite/9nqr4Cmjxj" target="_blank" rel="noreferrer">
              <Gamepad2 size={16} />
              Join the Team
            </a>
          </div>
          <div className="hero-section__metrics" aria-label="Project highlights">
            <div>
              <span>15+</span>
              <p>core contributors</p>
            </div>
            <div>
              <span>UE 5.4</span>
              <p>production stack</p>
            </div>
            <div>
              <span>Volunteer</span>
              <p>community project</p>
            </div>
          </div>
        </div>

        <HeroShowcase />
      </section>

      <section className="section section--about" id="about" data-reveal="about" data-scroll-chapter="about">
        <div className="about-grid hud-frame">
          <div className="about-grid__copy">
            <SectionHeading title="The Project" kicker="About" />
            <p>
              Friends, Space Romans, countrymen: Broadside is a volunteer-built sci-fi FPS-Z almost a year into development. The team is
              combining the best parts of 90s shooters with modern movement, vehicles, base building, and long sightlines for a single
              action-packed arena experience.
            </p>
            <p>
              The project is being built in Unreal Engine 5.4 by a core team of designers, programmers, audio engineers, mappers,
              technical artists, dev-ops, and VFX specialists. The missing piece is art: concept work, 3D assets, textures, and UI.
            </p>
            <div className="roles-strip roles-strip--about">
              <span>Volunteer project</span>
              <span>Git-based workflow</span>
              <span>Built in UE 5.4</span>
              <span>Profit shared with members</span>
            </div>
          </div>

          <MediaCard
            title="Volunteer-built world"
            copy="The visual direction prioritizes tactile sci-fi surfaces, readable silhouettes, and production art that can move directly into the game."
            src="/media/concept-art.png"
            className="about-grid__card"
          />
        </div>
      </section>

      <section className="section section--classes" id="classes" data-reveal="classes" data-scroll-chapter="classes">
        <SectionHeading title="Choose Your Build" kicker="Classes" />
        <div className="class-grid">
          <div className="class-grid__art hud-frame">
            <img
              src="/media/class-selection.png"
              alt="Broadside class selection concept art showing Light, Medium, and Heavy suits"
              className="class-grid__image"
            />
          </div>

          <div className="class-grid__choices">
            {classChoices.map((choice) => (
              <article
                key={choice.title}
                className={`class-choice hud-frame ${choice.selected ? "is-selected" : ""} class-choice--${choice.accent}`}
              >
                <div className="class-choice__top">
                  <span>{choice.title}</span>
                  {choice.selected ? <strong>Selected</strong> : null}
                </div>
                <h3>{choice.subtitle}</h3>
                <p>{choice.copy}</p>
              </article>
            ))}

            <a className="button button--primary class-grid__cta" href="https://discord.com/invite/9nqr4Cmjxj" target="_blank" rel="noreferrer">
              <Gamepad2 size={16} />
              Join the Team
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="gameplay" data-reveal="gameplay" data-scroll-chapter="gameplay">
        <SectionHeading title="Core Experience" kicker="Gameplay" />
        <div className="feature-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card hud-frame">
              <div className="feature-card__image">
                <Image src={card.src} alt={card.title} fill sizes="(max-width: 900px) 100vw, 20vw" className="feature-card__img" />
              </div>
              <div className="feature-card__body">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="progress" data-reveal="progress" data-scroll-chapter="progress">
        <SectionHeading title="Early Alpha Footage" kicker="Progress" action="More media" href="#media" />
        <div className="video-grid">
          {longFormVideos.map((video) => (
            <YouTubeCard key={video.id} id={video.id} title={video.title} thumb={video.thumb} autoplay />
          ))}
        </div>
      </section>

      <section className="section section--split" id="join" data-reveal="join" data-scroll-chapter="join">
        <div className="artists-panel hud-frame">
          <div className="artists-panel__copy">
            <SectionHeading title="We Need Artists" kicker="Join" />
            <p>
              Bring the world of Broadside to life. We&apos;re looking for passionate creators to help shape the future of the sci-fi FPS-Z.
            </p>
            <div className="role-list" aria-label="Needed roles">
              {artistRoles.map((role) => (
                <article key={role.title} className="role-card">
                  <div className="role-card__thumb">
                    <Image src={role.src} alt={role.title} fill sizes="120px" className="role-card__image" />
                  </div>
                  <div className="role-card__body">
                    <h3>{role.title}</h3>
                    <p>{role.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="artists-panel__note">
            <div className="stat-block">
              <span>Built in</span>
              <strong>Unreal Engine 5.4</strong>
              <small>by a volunteer team</small>
            </div>
            <div className="roles-strip">
              {teamRoles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="banner-panel hud-frame">
          <Image src="/media/bottom-banner.png" alt="Broadside production banner" fill sizes="(max-width: 900px) 100vw, 40vw" className="banner-panel__image" />
          <div className="banner-panel__overlay">
            <h3>Built by gamers. For gamers.</h3>
            <p>
              We are a community of dedicated gamers, developers, artists, and volunteers working to redefine the genre.
            </p>
          </div>
        </aside>
      </section>

      <section className="section" id="media" data-reveal="media" data-scroll-chapter="media">
        <SectionHeading title="YouTube Shorts" kicker="Media" action="Open channel" href="https://www.youtube.com/@CodenameBroadside/shorts" />
        <div className="shorts-grid">
          {shortsVideos.map((video) => (
            <YouTubeCard key={video.id} id={video.id} title={video.title} thumb={video.thumb} short />
          ))}
        </div>
      </section>

      <section className="section" id="contact" data-reveal="contact" data-scroll-chapter="contact">
        <div className="contact-band hud-frame">
          <div className="contact-band__copy">
            <h2>Join us on Discord</h2>
            <p>Send a message to the team or jump into the community and follow the development thread.</p>
          </div>
          <div className="contact-band__actions">
            <a className="button button--primary" href="https://discord.com/invite/9nqr4Cmjxj" target="_blank" rel="noreferrer">
              <MessageCircleMore size={16} />
              Discord
            </a>
            <a className="button button--secondary" href="https://www.youtube.com/@CodenameBroadside" target="_blank" rel="noreferrer">
              <Youtube size={16} />
              YouTube
            </a>
          </div>
        </div>

        <div className="contact-grid">
          {contactNames.map((name) => (
            <div key={name} className="contact-card hud-frame">
              <span>Discord</span>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>Broadside //</span>
        <p>Community-built. Passion driven.</p>
        <small>(c) 2026 Broadside Project.</small>
      </footer>
    </main>
  );
}
