"use client";

import type { ReactNode } from "react";
import type { ArtKey } from "@/data/products";

type Props = { art: ArtKey; className?: string };

const Defs = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#334155" />
      <stop offset="45%" stopColor="#111827" />
      <stop offset="100%" stopColor="#0b1220" />
    </linearGradient>
    <linearGradient id={`screen-${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#2b7fff" stopOpacity="0.95" />
      <stop offset="55%" stopColor="#1560e0" stopOpacity="0.75" />
      <stop offset="100%" stopColor="#0b1220" stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id={`edge-${id}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
    </linearGradient>
  </defs>
);

export default function ProductArt({ art, className = "" }: Props) {
  const id = art;
  const body = `url(#body-${id})`;
  const screen = `url(#screen-${id})`;
  const edge = `url(#edge-${id})`;

  const shapes: Record<ArtKey, ReactNode> = {
    phone: (
      <g>
        <rect x="62" y="16" width="76" height="148" rx="18" fill={body} stroke={edge} strokeWidth="1.6" />
        <rect x="68" y="22" width="64" height="136" rx="14" fill={screen} />
        <rect x="88" y="26" width="24" height="6" rx="3" fill="#020617" opacity="0.8" />
        <circle cx="100" cy="96" r="24" fill="#0b1220" opacity="0.35" />
        <path d="M84 108c8-22 24-30 32-42" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" opacity="0.6" fill="none" />
        <rect x="138" y="52" width="3" height="22" rx="1.5" fill="#475569" />
        <rect x="59" y="46" width="3" height="14" rx="1.5" fill="#475569" />
      </g>
    ),
    laptop: (
      <g>
        <rect x="40" y="34" width="120" height="80" rx="8" fill={body} stroke={edge} strokeWidth="1.5" />
        <rect x="47" y="41" width="106" height="66" rx="4" fill={screen} />
        <path d="M60 92c10-24 22-14 30-32s20-8 30-20" stroke="#bfdbfe" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.65" />
        <path d="M26 122h148l8 14c1.6 2.8-.4 6-3.6 6H21.6c-3.2 0-5.2-3.2-3.6-6z" fill={body} stroke={edge} strokeWidth="1.4" />
        <rect x="84" y="126" width="32" height="4" rx="2" fill="#0b1220" />
      </g>
    ),
    headphone: (
      <g>
        <path d="M46 108V88a54 54 0 0 1 108 0v20" stroke={edge} strokeWidth="10" strokeLinecap="round" fill="none" />
        <rect x="28" y="98" width="34" height="58" rx="16" fill={body} stroke={edge} strokeWidth="1.4" />
        <rect x="138" y="98" width="34" height="58" rx="16" fill={body} stroke={edge} strokeWidth="1.4" />
        <rect x="36" y="108" width="18" height="38" rx="9" fill={screen} opacity="0.85" />
        <rect x="146" y="108" width="18" height="38" rx="9" fill={screen} opacity="0.85" />
      </g>
    ),
    watch: (
      <g>
        <rect x="80" y="16" width="40" height="46" rx="14" fill="#1e293b" stroke={edge} strokeWidth="1.2" />
        <rect x="80" y="118" width="40" height="46" rx="14" fill="#1e293b" stroke={edge} strokeWidth="1.2" />
        <rect x="62" y="52" width="76" height="80" rx="22" fill={body} stroke={edge} strokeWidth="1.6" />
        <rect x="69" y="59" width="62" height="66" rx="17" fill={screen} />
        <path d="M100 76v18l12 8" stroke="#e0f2fe" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        <rect x="137" y="76" width="4" height="14" rx="2" fill="#64748b" />
      </g>
    ),
    tablet: (
      <g>
        <rect x="46" y="24" width="108" height="134" rx="14" fill={body} stroke={edge} strokeWidth="1.6" />
        <rect x="54" y="32" width="92" height="118" rx="8" fill={screen} />
        <circle cx="100" cy="28" r="2" fill="#94a3b8" />
        <path d="M70 118c14-30 24-16 32-40s18-12 28-26" stroke="#bfdbfe" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>
    ),
    console: (
      <g>
        <path d="M52 66h96c14 0 24 12 26 26l8 34c3 13-9 22-19 15l-20-14H57l-20 14c-10 7-22-2-19-15l8-34c2-14 12-26 26-26z" fill={body} stroke={edge} strokeWidth="1.5" />
        <rect x="58" y="92" width="8" height="24" rx="3" fill="#e2e8f0" opacity="0.85" />
        <rect x="50" y="100" width="24" height="8" rx="3" fill="#e2e8f0" opacity="0.85" />
        <circle cx="138" cy="94" r="5.4" fill="#2b7fff" />
        <circle cx="152" cy="106" r="5.4" fill="#38bdf8" />
        <circle cx="124" cy="106" r="5.4" fill="#818cf8" />
        <circle cx="138" cy="118" r="5.4" fill="#a5b4fc" />
        <rect x="86" y="96" width="28" height="14" rx="7" fill={screen} />
      </g>
    ),
    camera: (
      <g>
        <rect x="30" y="56" width="140" height="86" rx="16" fill={body} stroke={edge} strokeWidth="1.5" />
        <path d="M74 56l10-14h32l10 14z" fill="#1e293b" stroke={edge} strokeWidth="1.2" />
        <circle cx="100" cy="100" r="34" fill="#0b1220" stroke={edge} strokeWidth="2" />
        <circle cx="100" cy="100" r="24" fill={screen} />
        <circle cx="92" cy="92" r="7" fill="#e0f2fe" opacity="0.7" />
        <rect x="140" y="68" width="16" height="8" rx="3" fill="#38bdf8" opacity="0.8" />
      </g>
    ),
    speaker: (
      <g>
        <rect x="40" y="58" width="120" height="80" rx="40" fill={body} stroke={edge} strokeWidth="1.6" />
        <circle cx="76" cy="98" r="22" fill="#0b1220" stroke={edge} strokeWidth="1.4" />
        <circle cx="76" cy="98" r="10" fill={screen} />
        <circle cx="128" cy="98" r="16" fill="#0b1220" stroke={edge} strokeWidth="1.2" />
        <circle cx="128" cy="98" r="6" fill="#38bdf8" opacity="0.8" />
        <rect x="94" y="126" width="24" height="4" rx="2" fill="#38bdf8" opacity="0.5" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 200 180" className={className} role="img" aria-hidden="true">
      <Defs id={id} />
      {shapes[art]}
    </svg>
  );
}
