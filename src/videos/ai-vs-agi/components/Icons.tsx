import React from "react";

export interface IconProps {
  size?: number;
  color?: string;
}

const baseProps = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const ChatSparkIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M12 8v4" />
    <path d="M10 10h4" />
  </svg>
);

export const ImageSparkIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="M21 15l-4.5-4.5L9 18" />
    <path d="M16 7l1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill={color} stroke="none" />
  </svg>
);

export const CodeBracketsIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <polyline points="8 6 2 12 8 18" />
    <polyline points="16 6 22 12 16 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

export const PatternEyeIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M4 4h3M4 4v3M20 4h-3M20 4v3M4 20h3M4 20v-3M20 20h-3M20 20v-3" strokeWidth={1.5} />
  </svg>
);

export const DecisionBranchIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.5 11.2L15.5 7.2" />
    <path d="M8.5 12.8L15.5 16.8" />
  </svg>
);

export const LanguageWaveIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M4 5h9" />
    <path d="M8.5 3v2" />
    <path d="M5.5 5c.6 3.2 2.4 5.8 5.5 7.5" />
    <path d="M11.5 5c-.7 3.5-2.9 6.3-6.5 8" />
    <path d="M14 19l3.2-8.5L20.5 19" />
    <path d="M15.2 16h4" />
  </svg>
);

export const ChessKnightIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M6 20h12" />
    <path d="M7 17h10l-1-3c2-2.5 2.5-6.5 0-9l-3-2-2 2-3 1.5v3l2.5-.5L9 14l-2 3z" />
    <circle cx="12.5" cy="7.5" r="0.8" fill={color} stroke="none" />
  </svg>
);

export const ShieldSpamIcon: React.FC<IconProps> = ({ size = 32, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
    <path d="M9.5 9.5l5 5" />
    <path d="M14.5 9.5l-5 5" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 20, color = "#94A3B8" }) => (
  <svg {...baseProps(size, color)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const CatIcon: React.FC<IconProps> = ({ size = 28, color = "#34D399" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M5 10V4l4 3h6l4-3v6c0 4.5-3.2 8-7 8s-7-3.5-7-8z" />
    <circle cx="9.5" cy="11.5" r="0.8" fill={color} stroke="none" />
    <circle cx="14.5" cy="11.5" r="0.8" fill={color} stroke="none" />
    <path d="M10.5 14.5c.8.6 2.2.6 3 0" />
  </svg>
);

export const DogIcon: React.FC<IconProps> = ({ size = 28, color = "#34D399" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M7 7L4 12l2 2" />
    <path d="M17 7l3 5-2 2" />
    <path d="M7 7c1.5-1.5 8.5-1.5 10 0v6c0 3.2-2.2 5.5-5 5.5S7 16.2 7 13V7z" />
    <circle cx="10" cy="11" r="0.8" fill={color} stroke="none" />
    <circle cx="14" cy="11" r="0.8" fill={color} stroke="none" />
    <path d="M11 14h2l-1 1.3L11 14z" fill={color} />
  </svg>
);

export const BrainNetworkIcon: React.FC<IconProps> = ({ size = 48, color = "#A78BFA" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M9.5 4.5a3.5 3.5 0 0 0-3.3 4.6A3.2 3.2 0 0 0 5 14.6a3.3 3.3 0 0 0 4.5 4.2" />
    <path d="M14.5 4.5a3.5 3.5 0 0 1 3.3 4.6A3.2 3.2 0 0 1 19 14.6a3.3 3.3 0 0 1-4.5 4.2" />
    <line x1="12" y1="4.5" x2="12" y2="19.5" />
    <circle cx="12" cy="9" r="1.4" fill={color} stroke="none" />
    <circle cx="12" cy="15" r="1.4" fill={color} stroke="none" />
    <path d="M8 9.5h4M12 14.5h4" />
  </svg>
);

export const LearnBookIcon: React.FC<IconProps> = ({ size = 28, color = "#A78BFA" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h7M9 11h5" />
  </svg>
);

export const UnderstandBulbIcon: React.FC<IconProps> = ({ size = 28, color = "#A78BFA" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.7.5 1.2 1.3 1.4 2.1h4.2c.2-.8.7-1.6 1.4-2.1A6 6 0 0 0 12 3z" />
  </svg>
);

export const ReasoningGearIcon: React.FC<IconProps> = ({ size = 28, color = "#A78BFA" }) => (
  <svg {...baseProps(size, color)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" />
  </svg>
);

export const TransferArrowsIcon: React.FC<IconProps> = ({ size = 28, color = "#A78BFA" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M7 7h11l-3-3" />
    <path d="M18 7l-3 3" />
    <path d="M17 17H6l3 3" />
    <path d="M6 17l3-3" />
  </svg>
);

export const NavigationIcon: React.FC<IconProps> = ({ size = 24, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

export const PlayStarIcon: React.FC<IconProps> = ({ size = 24, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <polygon points="10 9 15 12 10 15 10 9" fill={color} stroke="none" />
  </svg>
);

export const MicWaveIcon: React.FC<IconProps> = ({ size = 24, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <line x1="12" y1="18" x2="12" y2="21" />
  </svg>
);

export const CommentIcon: React.FC<IconProps> = ({ size = 28, color = "#22D3EE" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="13" y2="13" />
  </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ size = 28, color = "#FBBF24" }) => (
  <svg {...baseProps(size, color)}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 28, color = "#A78BFA" }) => (
  <svg {...baseProps(size, color)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
    <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
  </svg>
);
