export function TulipIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <line x1="16" y1="28" x2="16" y2="18" stroke="#6B7C5A" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 23 Q12 21 12 17 Q14 20 16 23Z" fill="#7A9468"/>
      <path d="M13 19 C11 15 12 10 16 8 C20 10 21 15 19 19 Q18 21 16 22 Q14 21 13 19Z" fill="#E8A0C8" opacity="0.9"/>
      <path d="M10 18 C9 14 11 10 14 9 C13 12 12 16 13 19 Q11 19 10 18Z" fill="#D494BA" opacity="0.8"/>
      <path d="M22 18 C23 14 21 10 18 9 C19 12 20 16 19 19 Q21 19 22 18Z" fill="#D494BA" opacity="0.8"/>
    </svg>
  )
}

export function PeonyIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="3.5" ry="7.5"
          fill="#F5B8C8" opacity="0.65"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      {[22,67,112,157,202,247].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="2.8" ry="5.5"
          fill="#F9CDD8" opacity="0.85"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      <circle cx="16" cy="16" r="3" fill="#FFF0F3"/>
      <circle cx="16" cy="16" r="1.2" fill="#F5A0B8"/>
    </svg>
  )
}

export function RanunculusIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      {[0,40,80,120,160,200,240,280,320].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="3" ry="7"
          fill="#F5A07A" opacity="0.55"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      {[20,60,100,140,180,220,260,300,340].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="2.5" ry="5.5"
          fill="#F5B090" opacity="0.75"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      {[0,60,120,180,240,300].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="2" ry="4"
          fill="#F09060" opacity="0.9"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      <circle cx="16" cy="16" r="2.5" fill="#FFD4A0"/>
    </svg>
  )
}
