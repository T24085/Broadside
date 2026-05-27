"use client";

import { useEffect, useMemo, useState } from "react";

type ScrollChapter = {
  id: string;
  label: string;
  href: string;
};

type ScrollStoryProps = {
  chapters: ScrollChapter[];
};

export function ScrollStory({ chapters }: ScrollStoryProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeId) ?? chapters[0],
    [activeId, chapters]
  );

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chapterTargets = chapters
      .map((chapter) => {
        const element = document.querySelector<HTMLElement>(chapter.href);
        return element ? { ...chapter, element } : null;
      })
      .filter((chapter): chapter is ScrollChapter & { element: HTMLElement } => chapter !== null);

    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else if (revealElements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -8% 0px"
        }
      );

      revealElements.forEach((element) => observer.observe(element));
    }

    const updateScrollState = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      doc.style.setProperty("--scroll-progress", progress.toFixed(4));

      if (chapterTargets.length === 0) {
        return;
      }

      const anchorLine = window.innerHeight * 0.38;
      let bestChapter = chapterTargets[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      chapterTargets.forEach((chapter) => {
        const rect = chapter.element.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const isVisible = rect.bottom > 120 && rect.top < window.innerHeight * 0.9;

        if (!isVisible) {
          return;
        }

        const distance = Math.abs(midpoint - anchorLine);
        if (distance < bestDistance) {
          bestChapter = chapter;
          bestDistance = distance;
        }
      });

      const nextId = bestChapter.id;
      doc.dataset.scrollStage = nextId;
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    let frame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  if (chapters.length === 0) {
    return null;
  }

  return (
    <aside className="scroll-story" aria-label="Scroll story progress">
      <div className="scroll-story__header">
        <span className="scroll-story__kicker">Scroll story</span>
        <strong className="scroll-story__active">{activeChapter?.label ?? chapters[0].label}</strong>
      </div>

      <nav className="scroll-story__chapters" aria-label="Chapter jump links">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            className={`scroll-story__chapter${chapter.id === activeId ? " is-active" : ""}`}
            href={chapter.href}
            aria-current={chapter.id === activeId ? "true" : undefined}
          >
            <span className="scroll-story__dot" />
            <span>{chapter.label}</span>
          </a>
        ))}
      </nav>

      <div className="scroll-story__bar" aria-hidden="true">
        <span className="scroll-story__fill" />
      </div>
    </aside>
  );
}
