import { motion } from 'framer-motion'

const PETALS = [
  { angle: 0,   color: '#E8A0A0' },
  { angle: 60,  color: '#A0B8E8' },
  { angle: 120, color: '#E8D0A0' },
  { angle: 180, color: '#ECBFA0' },
  { angle: 240, color: '#C4A0E8' },
  { angle: 300, color: '#B0D4A0' },
]

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center select-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="relative w-24 h-24">
        {PETALS.map(({ angle, color }, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 15,
              height: 40,
              backgroundColor: color,
              left: 'calc(50% - 7.5px)',
              top: 'calc(50% - 40px)',
              transformOrigin: '50% 100%',
              opacity: 0.88,
            }}
            initial={{ scaleY: 0, rotate: angle }}
            animate={{ scaleY: 1, rotate: angle }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 26,
            height: 26,
            background: 'radial-gradient(circle at 38% 35%, #FFF8F0, #F0E0CC)',
            left: 'calc(50% - 13px)',
            top: 'calc(50% - 13px)',
            zIndex: 10,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.78, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.span
        className="font-brand font-bold tracking-[0.12em] text-text-primary mt-8"
        style={{ fontSize: '26px' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        STEM
      </motion.span>
    </motion.div>
  )
}
