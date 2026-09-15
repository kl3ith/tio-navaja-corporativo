import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import './Modal.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

interface Props {
  open: boolean
  onClose: () => void
  /** Id del elemento que titula el diálogo (para aria-labelledby). */
  labelledBy: string
  children: ReactNode
}

/**
 * Diálogo modal accesible: rol dialog, foco atrapado mientras está abierto,
 * Escape para cerrar, clic fuera para cerrar, foco devuelto al control que
 * lo abrió y scroll del fondo bloqueado.
 */
export function Modal({ open, onClose, labelledBy, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    openerRef.current = document.activeElement as HTMLElement | null

    // Bloquea el scroll del fondo sin provocar salto por la barra de scroll.
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    const panel = panelRef.current
    // focus() devuelve undefined, así que un `??` encadenado movería el foco
    // siempre al panel y anularía el data-autofocus.
    const first = panel?.querySelector<HTMLElement>('[data-autofocus]')
    if (first) first.focus()
    else panel?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panel) return

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (!items.length) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      openerRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={panelRef}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  )
}
