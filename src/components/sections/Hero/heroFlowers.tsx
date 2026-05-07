export function FlowerBlue() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g>
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="28" ry="55"
            fill="#6B8CFF" transform={`rotate(${angle} 100 100)`} opacity="0.9" />
        ))}
        <circle cx="100" cy="100" r="28" fill="#E8A0C8" />
      </g>
    </svg>
  )
}

export function FlowerCoral() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g>
        {[0,36,72,108,144,180,216,252,288,324].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="22" ry="48"
            fill="#F5A27A" transform={`rotate(${angle} 100 100)`} opacity="0.88" />
        ))}
        <circle cx="100" cy="100" r="24" fill="#FFD166" />
      </g>
    </svg>
  )
}

export function FlowerGreen() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M100 180 Q90 140 100 110" stroke="#5CB85C" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M100 150 Q70 130 75 110 Q90 125 100 150Z" fill="#5CB85C" />
      <g>
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse key={i} cx="100" cy="90" rx="20" ry="40"
            fill="#5CB85C" transform={`rotate(${angle} 100 90)`} opacity="0.9" />
        ))}
        <circle cx="100" cy="90" r="22" fill="#A8E063" />
      </g>
    </svg>
  )
}

export function FlowerPink() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g>
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="18" ry="42"
            fill="#F2A0B8" transform={`rotate(${angle} 100 100)`} opacity="0.9" />
        ))}
        <circle cx="100" cy="100" r="20" fill="#FFE4EA" />
      </g>
    </svg>
  )
}
