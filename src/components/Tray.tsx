import { useState } from "react";
import { COURSE_LABEL, COURSE_ORDER, PACKAGES } from "../data/packages";
import type { Builder } from "../hooks/usePackageBuilder";
import { Modal } from "./Modal";
import { CopyQuoteButton, QuoteLink, QuotePreview } from "./QuoteActions";
import "./Tray.css";

interface Props {
  builder: Builder;
}

/**
 * Bandeja de la propuesta: siempre visible en cuanto hay algo elegido.
 * Muestra el avance por tiempo y abre el resumen completo.
 * No calcula totales ni cargos: sólo refleja lo que el paquete incluye.
 */
export function Tray({ builder }: Props) {
  const [open, setOpen] = useState(false);
  const visible = builder.totalChosen > 0;

  return (
    <>
      <div className={`tray${visible ? " is-visible" : ""}`}>
        <div className="tray__inner u-wrap">
          <div className="tray__info">
            <p className="tray__summary">
              <strong>${builder.pkg.price}</strong>
              <span>
                {builder.totalChosen}/{builder.totalAllowance}
                <span className="tray__word"> elegidos</span>
              </span>
              {builder.totalExtra > 0 && (
                <span className="tray__extra">
                  +{builder.totalExtra}
                  <span className="tray__word"> extra</span>
                </span>
              )}
            </p>

            <div className="tray__meter">
              {COURSE_ORDER.map((course) => {
                const s = builder.status[course];
                return (
                  <span className="tray__course" key={course}>
                    <span className="tray__dots" aria-hidden="true">
                      {Array.from({ length: s.allowance }).map((_, i) => (
                        <i key={i} className={i < s.chosen ? "is-on" : ""} />
                      ))}
                      {Array.from({ length: s.extra }).map((_, i) => (
                        <i key={`x${i}`} className="is-extra" />
                      ))}
                    </span>
                    <span className="tray__course-label">
                      {COURSE_LABEL[course].many}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="btn btn--primary tray__open"
            onClick={() => setOpen(true)}
          >
            Ver mi mesa
            <span className="tray__count">{builder.totalChosen}</span>
          </button>
        </div>

        {/* Los lectores de pantalla siguen el avance sin abrir el panel */}
        <p className="u-sr" role="status" aria-live="polite">
          Paquete ${builder.pkg.price}. {builder.totalChosen} de{" "}
          {builder.totalAllowance} opciones elegidas
          {builder.totalExtra > 0
            ? `, ${builder.totalExtra} por encima de lo que incluye el paquete`
            : ""}
          .
        </p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="tray-title">
        <div className="sheet">
          <div className="sheet__top">
            <div>
              <p className="u-kicker">Tu propuesta</p>
              <h3 className="sheet__title" id="tray-title">
                La mesa que armaste
              </h3>
            </div>
            <button
              type="button"
              className="sheet__close"
              onClick={() => setOpen(false)}
              data-autofocus
              aria-label="Cerrar resumen"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="sheet__switch" role="radiogroup" aria-label="Paquete">
            {PACKAGES.map((pkg) => (
              <button
                type="button"
                key={pkg.id}
                role="radio"
                aria-checked={builder.packageId === pkg.id}
                className={`sheet__pkg${builder.packageId === pkg.id ? " is-active" : ""}`}
                onClick={() => builder.setPackage(pkg.id)}
              >
                ${pkg.price}
              </button>
            ))}
          </div>

          <ul className="sheet__courses">
            {COURSE_ORDER.map((course) => {
              const s = builder.status[course];
              return (
                <li className="sheet__course" key={course} data-course={course}>
                  <div className="sheet__course-head">
                    <h4 className="sheet__course-name">
                      {s.allowance === 1
                        ? COURSE_LABEL[course].one
                        : COURSE_LABEL[course].many}
                    </h4>
                    <span className="sheet__course-count">
                      {s.chosen}/{s.allowance}
                    </span>
                  </div>

                  {s.dishes.length === 0 ? (
                    <p className="sheet__empty">
                      Todavía sin elegir — te faltan {s.missing}.
                    </p>
                  ) : (
                    <ul className="sheet__dishes">
                      {s.dishes.map((dish, i) => {
                        const extra = i >= s.allowance;
                        return (
                          <li key={dish.id} className={extra ? "is-extra" : ""}>
                            <span className="sheet__dish-name">
                              {dish.name}
                            </span>
                            {extra && (
                              <span className="sheet__flag">
                                Fuera del paquete
                              </span>
                            )}
                            <button
                              type="button"
                              className="sheet__remove"
                              onClick={() => builder.remove(dish)}
                              aria-label={`Quitar ${dish.name}`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6l12 12M18 6 6 18"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.8"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {s.missing > 0 && s.dishes.length > 0 && (
                    <p className="sheet__missing">
                      Te falta {s.missing} para completar este tiempo.
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {builder.totalExtra > 0 && (
            <p className="sheet__warn">
              Marcaste {builder.totalExtra}{" "}
              {builder.totalExtra === 1 ? "opción" : "opciones"} por encima de
              lo que incluye el paquete ${builder.pkg.price}. Quedan señaladas
              como extra: el equipo de Tío Navaja te confirma cómo manejarlas al
              cotizar.
            </p>
          )}

          <QuotePreview builder={builder} />

          <div className="sheet__foot">
            <QuoteLink builder={builder}>Solicitar cotización</QuoteLink>
            <CopyQuoteButton builder={builder} />
            <button
              type="button"
              className="btn btn--ghost"
              onClick={builder.clear}
            >
              Empezar de nuevo
            </button>
          </div>

          <p className="sheet__note">
            Al solicitar la cotización se abre el mensaje ya escrito con esta
            selección. Es una propuesta para conversar, no un pedido confirmado.
          </p>
        </div>
      </Modal>
    </>
  );
}
