import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import type { NextConfig } from "next";

// Nombre estable del Remote. Es el identificador con el que un Host lo consumirá.
const REMOTE_NAME = "nutria_mfe_afiliados";

// Ruta del artefacto de entrada de Module Federation, relativo a `.next`.
// El build de cliente lo emite en `.next/static/chunks/remoteEntry.js`, que
// Next.js sirve en /_next/static/chunks/remoteEntry.js. El de servidor lo emite
// en `.next/server/chunks/remoteEntry.js` (mas copias en `ssr/` y
// `static/ssr/`). Debe ser `static/chunks/...` porque una ruta plana como
// `remoteEntry.js` caeria en `.next/remoteEntry.js`, que Next no expone por HTTP.
const REMOTE_ENTRY = "static/chunks/remoteEntry.js";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Se conserva la configuración de Webpack de Next.js: solo se añade el plugin.
  // NEXT_PRIVATE_LOCAL_WEBPACK=true se define en los scripts de package.json
  // (cross-env) porque Next.js debe usar la copia local de `webpack` (devDependency)
  // en lugar de la que trae compilada, que no expone los internos que necesita MF.
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: REMOTE_NAME,
        filename: REMOTE_ENTRY,
        // Modulo real del dominio de Afiliados. Reemplaza al contrato tecnico
        // `./info` de HU-07, que existia solo para probe tecnico.
        exposes: {
          "./Afiliados": "./components/affiliates/AffiliatesModule.tsx",
        },
        // Este proyecto es solo un Remote: no declara `remotes` (no consume federados).
        // `shared` no se declara porque NextFederationPlugin ya comparte por defecto
        // react, react-dom, styled-jsx y los internos de Next.
        extraOptions: {
          debug: false,
        },
      })
    );

    return config;
  },
};

export default nextConfig;
