/**
 * Modulo real del dominio Afiliados.
 *
 * Es el componente expuesto por Module Federation como "./Afiliados" y el mismo
 * componente que usa `pages/index.tsx` para la pagina local del Remote, de modo
 * que la implementacion existe una sola vez.
 *
 * Los estilos viven en un CSS Module con valores de reserva para los tokens de
 * NUTRIA: el componente se ve igual dentro del Remote o consumido desde un Host.
 */

import styles from "./AffiliatesModule.module.css";

export const REMOTE_NAME = "nutria_mfe_afiliados";

export const MODULE_ID = "./Afiliados";

export type AffiliatesModuleProps = {
  /** Nombre del Remote que publica el modulo. */
  remoteName?: string;

  /** Title provided by the Host application. */
  title?: string;
};

export default function AffiliatesModule({
  remoteName = REMOTE_NAME,
  title = "Afiliados",
}: AffiliatesModuleProps) {
  return (
    <section className={styles.card} data-remote={remoteName} data-module={MODULE_ID}>
      <p className={styles.brand}>NUTRIA</p>

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.badge}>Modulo federado</p>

      <p className={styles.description}>
        Modulo federado del dominio Afiliados.
      </p>

      <dl className={styles.meta}>
        <div className={styles.metaRow}>
          <dt className={styles.metaKey}>Remote</dt>
          <dd className={styles.metaValue}>{remoteName}</dd>
        </div>
        <div className={styles.metaRow}>
          <dt className={styles.metaKey}>Modulo</dt>
          <dd className={styles.metaValue}>{MODULE_ID}</dd>
        </div>
      </dl>

      <p className={styles.status}>
        <span className={styles.statusDot} aria-hidden="true" />
        Modulo cargado correctamente desde el Remote de Afiliados.
      </p>

      <p className={styles.note}>
        Demostracion visual. Todavia no incluye logica de negocio de Afiliados.
      </p>
    </section>
  );
}
