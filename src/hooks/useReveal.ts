import { useEffect } from 'react'

/**
 * Revela los elementos `.reveal` al entrar en pantalla.
 * Si el usuario pidió menos movimiento, o el navegador no soporta
 * IntersectionObserver, todo queda visible de entrada.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    nodes.forEach((n) => {
      if (!n.classList.contains('is-in')) io.observe(n)
    })
    return () => io.disconnect()
    // Los elementos `.reveal` viven en secciones que se montan una sola vez,
    // así que basta con observarlos después del primer render.
  }, [])
}
