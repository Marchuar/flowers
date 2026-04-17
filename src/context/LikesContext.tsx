import { createContext, useContext, useState, type ReactNode } from 'react'

interface LikesContextValue {
  likedIds: Set<number>
  toggleLike: (productId: number) => void
  isLiked: (productId: number) => boolean
  likedCount: number
}

const LikesContext = createContext<LikesContextValue | null>(null)

export function LikesProvider({ children }: { children: ReactNode }) {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  function toggleLike(productId: number) {
    setLikedIds(prev => {
      const next = new Set(prev)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }

  return (
    <LikesContext.Provider value={{
      likedIds,
      toggleLike,
      isLiked: (id) => likedIds.has(id),
      likedCount: likedIds.size,
    }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes() {
  const ctx = useContext(LikesContext)
  if (!ctx) throw new Error('useLikes must be used within LikesProvider')
  return ctx
}