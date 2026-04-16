interface FloatingInputProps {
  label: string
  type?: string
  autoComplete?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  half?: boolean
}

export default function FloatingInput({
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  required,
  half,
}: FloatingInputProps) {
  return (
    <div className={`relative ${half ? 'flex-1' : 'w-full'}`}>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder=" "
        required={required}
        className="peer w-full bg-transparent border border-border/70 rounded-xl px-4 pt-5 pb-2.5 font-sans text-[13.5px] text-text-primary focus:outline-none focus:border-text-primary transition-colors"
      />
      <label className="absolute left-4 top-4 font-sans text-[12.5px] text-text-secondary/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13.5px] peer-focus:top-2 peer-focus:text-[10.5px] peer-focus:text-text-secondary peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10.5px] pointer-events-none">
        {label}{required && ' *'}
      </label>
    </div>
  )
}
