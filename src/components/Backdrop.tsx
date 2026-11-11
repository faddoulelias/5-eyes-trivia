/** Full-page confetti illustration that sits behind every screen. */
export default function Backdrop() {
  return (
    <svg
      className="backdrop"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* big soft shapes */}
      <circle className="drift a" cx="1330" cy="90" r="150" fill="#FFD23F" />
      <circle className="drift b" cx="70" cy="850" r="190" fill="#7CE38B" />
      <path className="drift c" d="M-40 260 q90 -80 170 -10 q70 60 10 150 q-70 90 -180 30 z" fill="#FF5D8F" />
      <path className="drift a" d="M1280 720 q110 -70 190 20 q60 80 -20 160 h-200 q-60 -100 30 -180 z" fill="#B48CFF" />

      {/* squiggles */}
      <g fill="none" strokeWidth="10" strokeLinecap="round">
        <path className="drift b" d="M880 70 q22 -28 44 0 t44 0 t44 0 t44 0" stroke="#FFFFFF" />
        <path className="drift c" d="M1080 800 q22 -28 44 0 t44 0 t44 0" stroke="#FF5D8F" />
        <path className="drift a" d="M250 110 q22 -28 44 0 t44 0 t44 0" stroke="#FFD23F" />
        <path className="drift b" d="M40 520 q-28 22 0 44 t0 44 t0 44" stroke="#FFFFFF" />
        <path className="drift c" d="M1400 380 q-28 22 0 44 t0 44 t0 44" stroke="#7CE38B" />
      </g>

      {/* confetti bits */}
      <g>
        <rect className="spin" x="520" y="60" width="30" height="30" rx="4" fill="#FF5D8F" />
        <rect className="spin slow" x="1180" y="300" width="26" height="26" rx="4" fill="#FFFFFF" />
        <rect className="spin" x="330" y="780" width="28" height="28" rx="4" fill="#FFD23F" />
        <rect className="spin slow" x="760" y="830" width="24" height="24" rx="4" fill="#B48CFF" />
        <polygon className="spin slow" points="180,380 214,440 146,440" fill="#FFD23F" />
        <polygon className="spin" points="1240,520 1270,572 1210,572" fill="#FFFFFF" />
        <polygon className="spin slow" points="660,150 684,192 636,192" fill="#7CE38B" />
        <polygon className="spin" points="560,700 584,742 536,742" fill="#FF5D8F" />
        <circle className="drift a" cx="420" cy="300" r="14" fill="#FFFFFF" />
        <circle className="drift b" cx="1050" cy="170" r="12" fill="#FF5D8F" />
        <circle className="drift c" cx="960" cy="640" r="16" fill="#FFD23F" />
        <circle className="drift a" cx="240" cy="640" r="11" fill="#B48CFF" />
        <circle className="drift b" cx="1380" cy="640" r="10" fill="#FFFFFF" />
        <circle className="drift c" cx="760" cy="40" r="10" fill="#7CE38B" />
      </g>

      {/* plus signs and rings */}
      <g fill="none" stroke="#12263A" strokeWidth="7" strokeLinecap="round">
        <path className="spin slow" d="M1110 440 v36 M1092 458 h36" />
        <path className="spin" d="M120 200 v36 M102 218 h36" />
        <path className="spin slow" d="M860 760 v30 M845 775 h30" />
        <circle className="drift b" cx="1350" cy="260" r="18" />
        <circle className="drift a" cx="1200" cy="660" r="14" />
        <circle className="drift c" cx="70" cy="430" r="12" />
      </g>
    </svg>
  );
}
