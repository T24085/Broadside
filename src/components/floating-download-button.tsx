import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

export function FloatingDownloadButton() {
  return (
    <Link className="floating-download-button" href="/download" aria-label="Go to download page">
      <span className="floating-download-button__glow" aria-hidden="true" />
      <span className="floating-download-button__icon" aria-hidden="true">
        <Download size={16} />
      </span>
      <span className="floating-download-button__text">
        <span className="floating-download-button__eyebrow">Build access</span>
        <strong>Download</strong>
        <small>Coming soon</small>
      </span>
      <span className="floating-download-button__arrow" aria-hidden="true">
        <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}
