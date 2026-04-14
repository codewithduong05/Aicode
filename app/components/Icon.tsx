"use client";

import type { ReactNode } from "react";

// Reusable outline icon set for navigation, status, and action affordances.
interface IconProps {
  name: string;
  className?: string;
}

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<string, ReactNode> = {
  aigen: (
    <g transform="scale(1.846)">
      <path
        d="M10.5 4.66667L9.77083 3.0625L8.16667 2.33333L9.77083 1.60417L10.5 0L11.2292 1.60417L12.8333 2.33333L11.2292 3.0625L10.5 4.66667V4.66667M10.5 12.8333L9.77083 11.2292L8.16667 10.5L9.77083 9.77083L10.5 8.16667L11.2292 9.77083L12.8333 10.5L11.2292 11.2292L10.5 12.8333V12.8333M4.66667 11.0833L3.20833 7.875L0 6.41667L3.20833 4.95833L4.66667 1.75L6.125 4.95833L9.33333 6.41667L6.125 7.875L4.66667 11.0833V11.0833M4.66667 8.25417L5.25 7L6.50417 6.41667L5.25 5.83333L4.66667 4.57917L4.08333 5.83333L2.82917 6.41667L4.08333 7L4.66667 8.25417V8.25417M4.66667 6.41667V6.41667V6.41667V6.41667V6.41667V6.41667V6.41667V6.41667V6.41667V6.41667"
        fill="currentColor"
      />
    </g>
  ),
  menu: (
    <>
      <path {...common} d="M4 7h16" />
      <path {...common} d="M4 12h16" />
      <path {...common} d="M4 17h16" />
    </>
  ),
  cart: (
    <>
      <circle {...common} cx="9" cy="19" r="1.5" />
      <circle {...common} cx="17" cy="19" r="1.5" />
      <path {...common} d="M3.5 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20.5 8H7" />
    </>
  ),
  "arrow-left": (
    <>
      <path {...common} d="M19 12H5" />
      <path {...common} d="m11 6-6 6 6 6" />
    </>
  ),
  briefcase: (
    <>
      <rect {...common} x="4" y="7" width="16" height="11" rx="2" />
      <path {...common} d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path {...common} d="M4 11h16" />
    </>
  ),
  gamepad: (
    <>
      <path
        {...common}
        d="M7 10h10a3 3 0 0 1 2.9 3.8l-.8 2.6a2 2 0 0 1-3.1 1l-2-1.5a2 2 0 0 0-2.4 0l-2 1.5a2 2 0 0 1-3.1-1l-.8-2.6A3 3 0 0 1 7 10Z"
      />
      <path {...common} d="M9 13v3" />
      <path {...common} d="M7.5 14.5h3" />
      <circle {...common} cx="16.5" cy="13.5" r=".8" />
      <circle {...common} cx="18.5" cy="15.5" r=".8" />
    </>
  ),
  palette: (
    <>
      <path
        {...common}
        d="M12 4a8 8 0 1 0 0 16h1.2a1.8 1.8 0 0 0 0-3.6H12a2.4 2.4 0 0 1 0-4.8h1.2A4.8 4.8 0 0 0 18 6.8 2.8 2.8 0 0 0 15.2 4H12Z"
      />
      <circle {...common} cx="8.2" cy="10" r=".7" />
      <circle {...common} cx="10" cy="7.6" r=".7" />
      <circle {...common} cx="13.3" cy="7.4" r=".7" />
    </>
  ),
  laptop: (
    <>
      <rect {...common} x="6" y="6" width="12" height="9" rx="1.5" />
      <path {...common} d="M3.5 18h17" />
    </>
  ),
  cpu: (
    <>
      <rect {...common} x="7" y="7" width="10" height="10" rx="2" />
      <path {...common} d="M9 1.5V5" />
      <path {...common} d="M15 1.5V5" />
      <path {...common} d="M9 19v3.5" />
      <path {...common} d="M15 19v3.5" />
      <path {...common} d="M1.5 9H5" />
      <path {...common} d="M1.5 15H5" />
      <path {...common} d="M19 9h3.5" />
      <path {...common} d="M19 15h3.5" />
    </>
  ),
  gpu: (
    <>
      <rect {...common} x="4.5" y="6" width="15" height="12" rx="2" />
      <path {...common} d="M8 10h8" />
      <path {...common} d="M8 14h4" />
      <path {...common} d="M19.5 10.5h2" />
      <path {...common} d="M19.5 13.5h2" />
    </>
  ),
  display: (
    <>
      <rect {...common} x="4" y="5" width="16" height="11" rx="2" />
      <path {...common} d="M10 19h4" />
      <path {...common} d="M8 21h8" />
    </>
  ),
  storage: (
    <>
      <rect {...common} x="4" y="6" width="16" height="12" rx="2" />
      <path {...common} d="M8 10h8" />
      <path {...common} d="M8 14h5" />
    </>
  ),
  bag: (
    <>
      <path {...common} d="M6 9h12l1 10H5L6 9Z" />
      <path {...common} d="M9 9V7a3 3 0 0 1 6 0v2" />
    </>
  ),
  spark: (
    <>
      <path {...common} d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    </>
  ),
  payments: (
    <>
      <rect {...common} x="3.5" y="6" width="17" height="12" rx="2" />
      <path {...common} d="M3.5 10h17" />
      <path {...common} d="M7 14h4" />
    </>
  ),
  verified: (
    <>
      <path {...common} d="M12 4 6.5 6v4.5c0 4 2.2 6.4 5.5 8 3.3-1.6 5.5-4 5.5-8V6L12 4Z" />
      <path {...common} d="m9.5 12 1.7 1.7 3.6-3.8" />
    </>
  ),
  alert: (
    <>
      <circle {...common} cx="12" cy="12" r="8.5" />
      <path {...common} d="M12 8v5" />
      <circle {...common} cx="12" cy="16.5" r=".5" />
    </>
  ),
  shield: <path {...common} d="M12 4 6.5 6v4.5c0 4 2.2 6.4 5.5 8 3.3-1.6 5.5-4 5.5-8V6L12 4Z" />, 
  truck: (
    <>
      <path {...common} d="M4 8h10v6H4Z" />
      <path {...common} d="M14 10h2.5l2 2V14H14Z" />
      <circle {...common} cx="7.5" cy="16.5" r="1.5" />
      <circle {...common} cx="16.5" cy="16.5" r="1.5" />
    </>
  ),
  wallet: (
    <>
      <rect {...common} x="4" y="7" width="16" height="10" rx="2" />
      <path {...common} d="M15 12h4" />
      <circle {...common} cx="15" cy="12" r=".7" />
    </>
  ),
  star: <path {...common} d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.5L12 16.7 7.2 19l.9-5.5-3.9-3.8 5.4-.8L12 4Z" />,
  call: (
    <>
      <path
        {...common}
        d="M7 5h3l1.2 3.2-1.9 1.6a15 15 0 0 0 5 5l1.5-1.9L19 14v3a1.5 1.5 0 0 1-1.7 1.5A14.8 14.8 0 0 1 5.5 6.7 1.5 1.5 0 0 1 7 5Z"
      />
    </>
  ),
  support: (
    <>
      <path {...common} d="M6 12a6 6 0 1 1 12 0" />
      <path {...common} d="M6 12v3a2 2 0 0 0 2 2h1" />
      <path {...common} d="M18 12v3a2 2 0 0 1-2 2h-1" />
      <rect {...common} x="9" y="16" width="6" height="3" rx="1.5" />
    </>
  ),
  home: (
    <>
      <path {...common} d="m4 10 8-6 8 6" />
      <path {...common} d="M6.5 9.5V19h11V9.5" />
    </>
  ),
  grid: (
    <>
      <rect {...common} x="4.5" y="4.5" width="6" height="6" rx="1.2" />
      <rect {...common} x="13.5" y="4.5" width="6" height="6" rx="1.2" />
      <rect {...common} x="4.5" y="13.5" width="6" height="6" rx="1.2" />
      <rect {...common} x="13.5" y="13.5" width="6" height="6" rx="1.2" />
    </>
  ),
  compare: (
    <>
      <path {...common} d="M4 9h16" />
      <path {...common} d="M17 6l3 3-3 3" />
      <path {...common} d="M20 15H4" />
      <path {...common} d="M7 12l-3 3 3 3" />
    </>
  ),
  tag: (
    <>
      <path {...common} d="M11 4h6l3 3v6l-8 8-8-8 7-9Z" />
      <circle {...common} cx="16" cy="8" r="1" />
    </>
  ),
  user: (
    <>
      <circle {...common} cx="12" cy="8" r="3" />
      <path {...common} d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  chat: (
    <>
      <path {...common} d="M6 7.5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
      <path {...common} d="M8.5 12h7" />
      <path {...common} d="M8.5 9.5h5" />
    </>
  ),
  search: (
    <>
      <circle {...common} cx="11" cy="11" r="8" />
      <path {...common} d="m21 21-4.3-4.3" />
    </>
  ),
  tuning: (
    <>
      <path {...common} d="M3 5h4M11 5h10M17 12h4M3 12h10M11 19h10M3 19h4" />
      <circle {...common} cx="9" cy="5" r="2" />
      <circle {...common} cx="15" cy="12" r="2" />
      <circle {...common} cx="9" cy="19" r="2" />
    </>
  ),
  "chevron-right": <path {...common} d="m9 18 6-6-6-6" />,
  "chevron-down": <path {...common} d="m6 9 6 6 6-6" />,
  x: <path {...common} d="M18 6 6 18M6 6l12 12" />,
};

export default function Icon({ name, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  );
}
