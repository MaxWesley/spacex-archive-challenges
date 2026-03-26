import { Box, type BoxProps } from "@chakra-ui/react";

export function RocketIllustration(props: BoxProps) {
  return (
    <Box {...props}>
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <circle cx="140" cy="140" r="130" fill="currentColor" opacity="0.04" />
        <circle cx="140" cy="140" r="90" fill="currentColor" opacity="0.04" />

        <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="220" cy="50" r="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="40" cy="160" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="240" cy="130" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="80" cy="230" r="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="200" cy="220" r="1" fill="currentColor" opacity="0.25" />
        <circle cx="100" cy="40" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="180" cy="30" r="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="250" cy="200" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="30" cy="100" r="1.5" fill="currentColor" opacity="0.15" />

        <g transform="translate(105, 55)">
          <path
            d="M35 0 C35 0 50 30 50 80 L50 130 L20 130 L20 80 C20 30 35 0 35 0Z"
            fill="currentColor"
            opacity="0.15"
          />

          <path
            d="M35 5 C35 5 48 33 48 80 L48 125 L22 125 L22 80 C22 33 35 5 35 5Z"
            fill="currentColor"
            opacity="0.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />

          <ellipse
            cx="35"
            cy="40"
            rx="8"
            ry="10"
            fill="currentColor"
            opacity="0.08"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          <rect x="25" y="90" width="20" height="3" rx="1" fill="currentColor" opacity="0.2" />
          <rect x="25" y="97" width="20" height="3" rx="1" fill="currentColor" opacity="0.15" />

          <path
            d="M20 110 L10 135 L22 125Z"
            fill="currentColor"
            opacity="0.12"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          <path
            d="M50 110 L60 135 L48 125Z"
            fill="currentColor"
            opacity="0.12"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.2"
          />

          <path d="M28 125 Q35 155 42 125" fill="currentColor" opacity="0.08" />
          <path d="M30 125 Q35 148 40 125" fill="currentColor" opacity="0.06" />

          <circle cx="35" cy="132" r="2" fill="currentColor" opacity="0.15" />
          <circle cx="32" cy="140" r="1.5" fill="currentColor" opacity="0.1" />
          <circle cx="38" cy="143" r="1" fill="currentColor" opacity="0.08" />
          <circle cx="35" cy="150" r="2.5" fill="currentColor" opacity="0.06" />
          <circle cx="33" cy="158" r="1.5" fill="currentColor" opacity="0.04" />
          <circle cx="37" cy="162" r="2" fill="currentColor" opacity="0.03" />
        </g>

        <ellipse cx="140" cy="240" rx="50" ry="6" fill="currentColor" opacity="0.06" />
      </svg>
    </Box>
  );
}
