export function FlowerIcon({ slug, color, className = 'w-5 h-5 flex-shrink-0' }: {
  slug: string
  color: string
  className?: string
}) {
  const stem = color + '99'
  switch (slug) {
    case 'roses': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="3" ry="6" fill={color} opacity="0.7" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[30,90,150,210,270,330].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="2" ry="4.5" fill={color} opacity="0.9" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2.5" fill={color}/>
      </svg>
    )
    case 'tulips': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        <line x1="10" y1="18" x2="10" y2="12" stroke={stem} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 12 C6 9 7 5 10 4 C13 5 14 9 13 12 Q12 13.5 10 14 Q8 13.5 7 12Z" fill={color}/>
        <path d="M5 11 C4 8 5.5 5 8 5 C7 7 7 10 7 12 Q5.5 12 5 11Z" fill={color} opacity="0.75"/>
        <path d="M15 11 C16 8 14.5 5 12 5 C13 7 13 10 13 12 Q14.5 12 15 11Z" fill={color} opacity="0.75"/>
      </svg>
    )
    case 'peonies': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="2.5" ry="6" fill={color} opacity="0.6" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[22,67,112,157,202,247].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="2" ry="4.5" fill={color} opacity="0.85" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2" fill="white" opacity="0.6"/>
      </svg>
    )
    case 'wildflowers': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        <line x1="10" y1="18" x2="10" y2="11" stroke={stem} strokeWidth="1.5" strokeLinecap="round"/>
        {[0,40,80,120,160,200,240,280,320].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="1.5" ry="5" fill={color} opacity="0.75" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2.2" fill="#F5D060"/>
      </svg>
    )
    case 'eustoma': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        <line x1="10" y1="18" x2="10" y2="13" stroke={stem} strokeWidth="1.5" strokeLinecap="round"/>
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="2.5" ry="6" fill={color} opacity="0.65" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[30,90,150,210,270,330].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="1.8" ry="4" fill={color} opacity="0.85" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2" fill={color}/>
      </svg>
    )
    case 'chrysanthemum': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        {[0,24,48,72,96,120,144,168,192,216,240,264,288,312,336].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="1.2" ry="5.5" fill={color} opacity="0.7" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[12,36,60,84,108,132,156,180,204,228,252,276,300,324,348].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="1" ry="4" fill={color} opacity="0.85" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="1.8" fill={color}/>
      </svg>
    )
    case 'ranunculus': return (
      <svg viewBox="0 0 20 20" fill="none" className={className}>
        {[0,40,80,120,160,200,240,280,320].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="2" ry="4.5" fill={color} opacity="0.55" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[20,60,100,140,180,220,260,300,340].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="1.5" ry="3.5" fill={color} opacity="0.75" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="1.2" ry="2.5" fill={color} opacity="0.9" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="1.5" fill="#FFD4A0"/>
      </svg>
    )
    default: return <span className={className} style={{ backgroundColor: color, borderRadius: '50%' }}/>
  }
}
