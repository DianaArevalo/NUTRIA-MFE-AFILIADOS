/**
 * Contrato minimo del Remote, sin logica de negocio de Afiliados.
 *
 * Se expone desde HU-07 unicamente porque Module Federation no emite el
 * archivo `remoteEntry.js` cuando el mapa `exposes` esta vacio: webpack
 * descarta el chunk del contenedor por no tener codigo.
 *
 * En HU-08 se agregara aqui el expose real del dominio de Afiliados.
 */

export const REMOTE_NAME = "nutria_mfe_afiliados";

export type RemoteInfo = {
  name: string;
  version: string;
  /** Contrato de exposes pendiente de HU-08. */
  availableExposes: string[];
};

export function getRemoteInfo(version: string): RemoteInfo {
  return {
    name: REMOTE_NAME,
    version,
    availableExposes: [],
  };
}

export default getRemoteInfo;
