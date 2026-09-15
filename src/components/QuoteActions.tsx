import { useEffect, useMemo, useRef, useState } from 'react'
import { buildQuoteMessage, contactTakesMessage, quoteHref } from '../lib/quote'
import type { Builder } from '../hooks/usePackageBuilder'
import './QuoteActions.css'

interface QuoteLinkProps {
  builder: Builder
  className?: string
  children: React.ReactNode
}

/**
 * Enlace al canal de contacto con el mensaje ya escrito a partir de la
 * selección. Se recalcula en cada render del enlace, así que siempre sale
 * lo que hay elegido en ese momento.
 */
export function QuoteLink({ builder, className = 'btn btn--primary', children }: QuoteLinkProps) {
  const href = useMemo(() => quoteHref(buildQuoteMessage(builder)), [builder])

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

/** Copia el mismo mensaje, para quien prefiera pegarlo donde quiera. */
export function CopyQuoteButton({ builder }: { builder: Builder }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    const message = buildQuoteMessage(builder)
    let ok = false

    try {
      await navigator.clipboard.writeText(message)
      ok = true
    } catch {
      // Sin permiso de portapapeles (o sin https): se copia a la vieja usanza.
      const area = document.createElement('textarea')
      area.value = message
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      document.body.removeChild(area)
    }

    if (!ok) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2400)
  }

  return (
    <>
      <button type="button" className="btn btn--ghost quote-copy" onClick={copy}>
        {copied ? 'Mensaje copiado' : 'Copiar mensaje'}
      </button>
      {/* El aviso vive fuera del botón: dentro, el lector de pantalla
          reanunciaría el control entero en cada cambio. */}
      <span className="u-sr" role="status">
        {copied ? 'Mensaje copiado al portapapeles' : ''}
      </span>
    </>
  )
}

/** Vista previa del mensaje, para que nadie envíe algo que no ha visto. */
export function QuotePreview({ builder }: { builder: Builder }) {
  const message = useMemo(() => buildQuoteMessage(builder), [builder])
  const prefilled = contactTakesMessage()

  return (
    <details className="quote-preview">
      <summary>
        {prefilled
          ? 'Ver el mensaje que se va a enviar'
          : 'Ver el mensaje de tu selección'}
      </summary>
      <pre className="quote-preview__text">{message}</pre>
      {!prefilled && (
        <p className="quote-preview__note">
          El canal de contacto configurado no admite mensajes prellenados:
          copia el texto y pégalo al escribirles.
        </p>
      )}
    </details>
  )
}
