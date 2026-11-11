interface MascotProps {
  size?: number;
  /** 'cheer' raises the arms and opens the mouth wider. */
  mood?: 'happy' | 'cheer';
}

/** Shouty, the round yellow mascot. */
export default function Mascot({ size = 40, mood = 'happy' }: MascotProps) {
  const cheer = mood === 'cheer';
  const ink = '#12263A';
  return (
    <svg
      className="mascot"
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <g stroke={ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* arms */}
        <path d={cheer ? 'M24 62 L6 34' : 'M24 70 L8 84'} fill="none" />
        <path d={cheer ? 'M96 62 L114 34' : 'M96 70 L112 84'} fill="none" />
        {/* legs */}
        <path d="M48 100 v12 h-10 M72 100 v12 h10" fill="none" />
        {/* body */}
        <circle cx="60" cy="62" r="42" fill="#FFD23F" />
        {/* mouth */}
        <path
          d={cheer ? 'M40 66 q20 34 40 0 z' : 'M42 70 q18 22 36 0 z'}
          fill={ink}
        />
        <path d={cheer ? 'M51 84 q9 -8 18 0' : 'M53 82 q7 -6 14 0'} fill="#FF5D8F" stroke="none" />
      </g>
      {/* eyes */}
      <ellipse cx="46" cy="50" rx="6" ry="8" fill={ink} />
      <ellipse cx="74" cy="50" rx="6" ry="8" fill={ink} />
      <circle cx="48" cy="47" r="2.2" fill="#FFFFFF" />
      <circle cx="76" cy="47" r="2.2" fill="#FFFFFF" />
      {/* cheeks */}
      <circle cx="33" cy="66" r="6" fill="#FF5D8F" opacity="0.7" />
      <circle cx="87" cy="66" r="6" fill="#FF5D8F" opacity="0.7" />
    </svg>
  );
}
