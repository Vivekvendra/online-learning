export const LoginIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 540 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[480px] drop-shadow-xl select-none"
      >
        {/* Background floating small pixel blocks */}
        <rect x="220" y="320" width="12" height="12" rx="2" fill="#00D2D3" opacity="0.85" />
        <rect x="240" y="335" width="14" height="14" rx="2" fill="#6355EC" opacity="0.75" />
        <rect x="205" y="345" width="10" height="10" rx="2" fill="#7C3AED" opacity="0.6" />
        <rect x="230" y="358" width="12" height="12" rx="2" fill="#38BDF8" opacity="0.9" />
        <rect x="250" y="375" width="15" height="15" rx="3" fill="#6355EC" opacity="0.8" />
        <rect x="275" y="360" width="12" height="12" rx="2" fill="#00D2D3" opacity="0.7" />
        <rect x="295" y="378" width="14" height="14" rx="2" fill="#818CF8" opacity="0.6" />

        {/* Cable connecting student laptop to desk calendar & keyboard */}
        <path
          d="M 230 260 C 235 300, 260 300, 275 295 C 290 290, 310 325, 335 315"
          stroke="#475569"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="230" cy="260" r="4" fill="#334155" />
        <circle cx="335" cy="315" r="4" fill="#334155" />

        {/* --- STUDENT ON STOOL (Left) --- */}
        {/* Stool legs and base */}
        <ellipse cx="230" cy="285" rx="16" ry="6" fill="#94A3B8" />
        <path d="M 230 250 L 230 285" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        <path d="M 230 285 L 216 308" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <path d="M 230 285 L 244 308" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="230" cy="250" rx="20" ry="7" fill="#38BDF8" />

        {/* Student legs */}
        <path d="M 226 230 L 222 265 L 222 288" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 236 230 L 232 265 L 232 288" stroke="#0F172A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        {/* Shoes */}
        <ellipse cx="222" cy="290" rx="8" ry="4" fill="#E2E8F0" />
        <ellipse cx="232" cy="290" rx="8" ry="4" fill="#E2E8F0" />

        {/* Student Body (Blue shirt) */}
        <path d="M 220 185 Q 212 215 220 235 Q 238 238 242 225 Q 244 195 235 185 Z" fill="#2563EB" />
        
        {/* Head and Hair */}
        <circle cx="232" cy="172" r="9" fill="#FBCFE8" />
        <path d="M 223 170 C 223 162, 240 160, 242 168 C 240 173, 230 175, 223 170 Z" fill="#1E293B" />

        {/* Arms & Small Laptop on Lap */}
        <path d="M 228 195 L 220 216 L 228 222" stroke="#FBCFE8" strokeWidth="4" strokeLinecap="round" />
        <path d="M 232 195 L 238 216 L 230 222" stroke="#FBCFE8" strokeWidth="4" strokeLinecap="round" />
        {/* Mini Laptop */}
        <polygon points="215,220 235,215 240,225 220,230" fill="#38BDF8" />
        <polygon points="215,220 218,206 238,202 235,215" fill="#E0F2FE" />

        {/* Speech / message bubble */}
        <g transform="translate(205, 268)">
          <rect width="22" height="16" rx="5" fill="#6355EC" />
          <circle cx="6" cy="8" r="1.5" fill="#FFFFFF" />
          <circle cx="11" cy="8" r="1.5" fill="#FFFFFF" />
          <circle cx="16" cy="8" r="1.5" fill="#FFFFFF" />
        </g>

        {/* --- DESK CALENDAR (Right upright) --- */}
        {/* Calendar Body */}
        <g transform="translate(320, 160)">
          {/* Main calendar board */}
          <rect x="30" y="30" width="140" height="150" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="3" />
          {/* Calendar top header bar */}
          <rect x="30" y="30" width="140" height="28" rx="12" fill="#38BDF8" />
          <rect x="30" y="44" width="140" height="14" fill="#38BDF8" />

          {/* Calendar spiral rings */}
          {[42, 56, 70, 84, 98, 112, 126, 140, 154].map((x, i) => (
            <g key={i}>
              <ellipse cx={x} cy="28" rx="4" ry="7" fill="#64748B" />
              <ellipse cx={x} cy="28" rx="2" ry="5" fill="#E2E8F0" />
            </g>
          ))}

          {/* Calendar Day cells grid */}
          {[70, 95, 120, 145].map((y, rowIdx) => (
            <g key={rowIdx}>
              {[45, 68, 91, 114, 137].map((x, colIdx) => (
                <rect
                  key={colIdx}
                  x={x}
                  y={y}
                  width="16"
                  height="16"
                  rx="3"
                  fill={(rowIdx === 1 && colIdx === 2) ? "#FEE2E2" : (colIdx % 2 === 0 ? "#E0F2FE" : "#F1F5F9")}
                />
              ))}
            </g>
          ))}

          {/* Circled marked date with red pen circle */}
          <ellipse cx="99" cy="103" rx="12" ry="11" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeDasharray="60" />

          {/* Notification bubble '5' on top right */}
          <g transform="translate(142, 14)">
            <circle cx="12" cy="12" r="14" fill="#00D2D3" />
            <circle cx="12" cy="12" r="12" fill="#00D2D3" />
            <text x="12" y="17" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              5
            </text>
          </g>
        </g>

        {/* --- ISOMETRIC KEYBOARD / LAPTOP BASE ON DESK (Front) --- */}
        <g transform="translate(290, 275)">
          {/* Base shadow */}
          <polygon points="40,90 180,25 220,55 80,120" fill="#CBD5E1" opacity="0.6" />
          
          {/* Laptop Base chassis */}
          <polygon points="35,75 160,18 205,45 80,102" fill="#E2E8F0" />
          <polygon points="35,75 35,84 80,111 80,102" fill="#94A3B8" />
          <polygon points="80,102 80,111 205,54 205,45" fill="#64748B" />

          {/* Keyboard inset surface */}
          <polygon points="55,68 152,24 185,45 88,89" fill="#1E293B" />

          {/* Keyboard keys rows */}
          <polygon points="62,64 148,25 152,28 66,67" fill="#334155" />
          <polygon points="68,69 154,30 158,33 72,72" fill="#334155" />
          <polygon points="74,74 160,35 164,38 78,77" fill="#334155" />
          <polygon points="80,79 166,40 170,43 84,82" fill="#334155" />
          {/* Spacebar & trackpad */}
          <polygon points="88,84 140,60 144,63 92,87" fill="#475569" />
        </g>
      </svg>
    </div>
  );
};
