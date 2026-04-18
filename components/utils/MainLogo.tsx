
interface MainLogoProps {
    width?: number | string
    height?: number | string
    className?: string
}

export default function MainLogo({width=30, height = 30, className}: MainLogoProps = {}) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 200 200"
        role="img"
        className={className}
      >
        <title>HPP System Logo</title>
        <desc>
          Circular logo with upward trend and coin stack representing profit
        </desc>
        <circle cx="100" cy="100" r="88" fill="#006D77" />
        <circle cx="100" cy="100" r="78" fill="#005560" />
        <circle cx="100" cy="100" r="58" fill="#F8FAFC" opacity="0.08" />
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <polyline
          points="48,132 72,108 90,120 142,62"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="122,62 142,62 142,82"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          cx="100"
          cy="148"
          rx="28"
          ry="7"
          fill="#F8FAFC"
          opacity="0.18"
        />
        <ellipse
          cx="100"
          cy="142"
          rx="28"
          ry="7"
          fill="#F8FAFC"
          opacity="0.25"
        />
        <ellipse
          cx="100"
          cy="136"
          rx="28"
          ry="7"
          fill="#F8FAFC"
          opacity="0.35"
        />
      </svg>
    );
}