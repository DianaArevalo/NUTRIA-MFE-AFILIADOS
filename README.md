# NUTRIA — nutria-mfe-afiliados

Microfrontend **Remote** del dominio **Afiliados** de NUTRIA.

Construido con **Next.js 15 (Pages Router) + TypeScript**, ejecuta de forma
independiente en `http://localhost:3001` y será consumido posteriormente por
`nutria-shell` (HOST / Orquestador) mediante Module Federation.

> **Estado actual (HU-08):** el Remote es un contenedor de Module Federation
> funcional que ya expone el **primer módulo real del dominio de Afiliados** como
> `./Afiliados`. Genera y sirve `remoteEntry.js` y está listo para ser consumido por
> un Host. Todavía **no existe integración con `nutria-shell`** ni **lógica de
> negocio de Afiliados**: el módulo es una demostración visual con estilos propios.

---

## Tabla de contenidos

1. [Qué es nutria-mfe-afiliados](#1-qué-es-nutria-mfe-afiliados)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Instalación](#3-instalación)
4. [Ejecución](#4-ejecución)
5. [Comandos disponibles](#5-comandos-disponibles)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Estado actual del proyecto](#7-estado-actual-del-proyecto)
8. [Module Federation](#8-module-federation)
9. [Relación con nutria-shell](#9-relación-con-nutria-shell)
10. [Dominio de Afiliados](#10-dominio-de-afiliados)
11. [Roadmap](#11-roadmap)

---

## 1. Qué es nutria-mfe-afiliados

- Es un **microfrontend frontend independiente**.
- Pertenece al dominio **Afiliados** de NUTRIA.
- Funciona como **Remote** dentro de la arquitectura de Microfrontends de NUTRIA.
- Contiene la interfaz y las funcionalidades del dominio de Afiliados.
- Será consumido posteriormente por **`nutria-shell`**, que actúa como
  **HOST / Orquestador**.

Este repositorio es **totalmente independiente de `nutria-shell`**:

- tiene su propio repositorio, código, `package.json`, desarrollo y build;
- **no copia código** de `nutria-shell`;
- **no depende** de ninguna carpeta local de `nutria-shell`;
- **no es un monorepo**.

```
                    NUTRIA
                       │
                       ▼
               nutria-shell
              HOST / ORQUESTADOR
                       │
              Module Federation
                       │
                       ▼
          nutria-mfe-afiliados
                  REMOTE
```

---

## 2. Stack tecnológico

| Tecnología        | Versión / Detalle                    |
| ----------------- | ------------------------------------ |
| Next.js           | 15.5.26                              |
| React             | 19.1.0                               |
| TypeScript        | ^5                                   |
| Gestor de paquetes| pnpm                                 |
| Estilos           | CSS puro (CSS Modules y `globals.css`) |
| Bundler           | Webpack 5.105.0 (local, ver §8)      |
| Module Federation | `@module-federation/nextjs-mf` 8.8.76 |

Consideraciones importantes:

- Se utiliza **Pages Router** (`pages/`), **no App Router** (`app/`), porque la
  integración de Module Federation para Next.js requiere Pages Router.
- **No** se utiliza Tailwind CSS, styled-components, CSS-in-JS ni Multi-Zones.
- No hay autenticación, backend ni lógica real de afiliados.

---

## 3. Instalación

Requiere Node.js y pnpm instalados.

```bash
pnpm install
```

---

## 4. Ejecución

```bash
pnpm dev
```

El Remote queda disponible en:

```
http://localhost:3001
```

El puerto **3001** está configurado en el script `dev` para no colisionar con
`nutria-shell`, que utiliza su propio puerto.

Para ejecutar la build de producción:

```bash
pnpm build
pnpm start
```

---

## 5. Comandos disponibles

| Comando           | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `pnpm install`    | Instala las dependencias                           |
| `pnpm dev`        | Servidor de desarrollo en `http://localhost:3001`  |
| `pnpm build`      | Build de producción                                |
| `pnpm start`      | Sirve la build de producción en el puerto 3001      |
| `pnpm typecheck`  | Verificación de tipos con `tsc --noEmit`           |

Los scripts `dev`, `build` y `start` usan `cross-env` para fijar
`NEXT_PRIVATE_LOCAL_WEBPACK=true` (ver §8).

---

## 6. Estructura del proyecto

```
nutria-mfe-afiliados/
│
├── components/
│   └── affiliates/
│       ├── AffiliatesModule.tsx         # Módulo federado de Afiliados (expose "./Afiliados")
│       └── AffiliatesModule.module.css  # Estilos del módulo (CSS Module)
│
├── pages/
│   ├── _app.tsx          # App global (carga estilos)
│   ├── _document.tsx     # Documento HTML
│   └── index.tsx         # Página local del Remote (reutiliza AffiliatesModule)
│
├── public/
│   └── favicon.ico
│
├── styles/
│   └── globals.css       # Estilos globales (CSS) y tokens de NUTRIA
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml   # Ajustes de pnpm (buildscripts + override), NO es monorepo
├── tsconfig.json
├── next.config.ts        # Configuración de Next.js + NextFederationPlugin
├── .gitignore
└── README.md
```

Notas:

- `next.config.ts` usa configuración tipada de Next.js
  (`import type { NextConfig }`).
- `pnpm-workspace.yaml` **no declara `packages`**: no es un monorepo. Solo fija
  `allowBuilds` (bloquea el `postinstall` de terceros) y un `override` de
  `enhanced-resolve` necesario por compatibilidad (ver §8).
- `webpack` se instala como `devDependency` porque Module Federation necesita los
  internos de Webpack, que la copia compilada de Next.js no expone.
- **El módulo federado tiene una sola implementación**: `AffiliatesModule.tsx` es a
  la vez lo que se expone por Module Federation y lo que renderiza `pages/index.tsx`
  en el puerto 3001. `pages/index.tsx` no mantiene una segunda versión de la vista.
- Los estilos del módulo viven en un **CSS Module**, no en `styles/globals.css`, con
  valores de reserva (`var(--nutria-*, fallback)`) para que el componente se vea
  igual dentro del Remote o consumido desde un Host que no defina los tokens de
  NUTRIA.

---

## 7. Estado actual del proyecto

**Implementado en HU-06:**

- [x] Proyecto Next.js 15 inicializado con **Pages Router**.
- [x] TypeScript configurado.
- [x] pnpm como gestor de paquetes.
- [x] Estilos CSS propios.
- [x] Puerto 3001 configurado.
- [x] Página inicial mínima que identifica **NUTRIA / Afiliados / REMOTE**.
- [x] Verificación de tipos y build de producción exitosos.

**Implementado en HU-07:**

- [x] `@module-federation/nextjs-mf` instalado y configurado.
- [x] `NextFederationPlugin` registrado en `next.config.ts`.
- [x] Contenedor federado con nombre **`nutria_mfe_afiliados`**.
- [x] `remoteEntry.js` generado en build y servido correctamente.
- [x] `exposes` limitado a `./info` (contrato mínimo, **sin lógica de negocio**).
- [x] `shared` por defecto (react, react-dom, styled-jsx e internos de Next).
- [x] Build, typecheck, `dev` y `start` verificados.

**Implementado en HU-08:**

- [x] Componente reutilizable `AffiliatesModule.tsx` creado en
  `components/affiliates/`.
- [x] Estilos del módulo en `AffiliatesModule.module.css` (CSS Module con
      valores de reserva para los tokens de NUTRIA).
- [x] Expose técnico `./info` **reemplazado** por el módulo real `./Afiliados`.
- [x] `exposes` apunta al componente real
      (`./Afiliados` → `./components/affiliates/AffiliatesModule.tsx`).
- [x] `federation/remote-info.ts` **eliminado** (ya no es necesario).
- [x] `pages/index.tsx` reutiliza el mismo componente federado, sin duplicar vista.
- [x] Clases que quedaron obsoletas en `styles/globals.css` retiradas.
- [x] El Remote sigue funcionando de forma independiente en el puerto `3001`.
- [x] Generación de `remoteEntry.js` verificada en build con el nuevo expose.

**Todavía NO implementado:**

- [ ] `remotes` en el Host.
- [ ] Conexión o consumo desde `nutria-shell`.
- [ ] Lógica de negocio y funcionalidades reales de Afiliados.
- [ ] Backend, APIs o autenticación.

---

## 8. Module Federation

El proyecto está configurado como **Remote** (contenedor federado) con
[`@module-federation/nextjs-mf`](https://module-federation.io/):

```
REMOTE  nutria-mfe-afiliados  (http://localhost:3001)
   │
   ├── remoteEntry.js  →  punto de entrada del contenedor
   │
   ├── exposes
   │      └── ./Afiliados  →  components/affiliates/AffiliatesModule.tsx
   │
   ├── shared (por defecto)
   │      react, react-dom, styled-jsx e internos de Next
   │
   └── remotes: {}     →  este proyecto NO consume federados
   ▼
HOST  nutria-shell  (HU-09 / HU-10)
```

### Configuración

`next.config.ts` registra el plugin sobre la configuración de Webpack que Next.js
ya construye, sin reemplazarla:

```ts
new NextFederationPlugin({
  name: "nutria_mfe_afiliados",
  filename: "static/chunks/remoteEntry.js",
  exposes: { "./Afiliados": "./components/affiliates/AffiliatesModule.tsx" },
  extraOptions: { debug: false },
});
```

Decisiones relevantes:

- **`name: "nutria_mfe_afiliados"`** es el identificador estable con el que un
  Host consumirá este Remote.
- **`filename: "static/chunks/remoteEntry.js"`** coloca la entry dentro de
  `static/`, que Next.js sirve como estático con hash estable. La alternativa
  `remoteEntry.js` a secas emitiría en `.next/remoteEntry.js`, una ruta que Next
  **no** expone por HTTP.
- **`exposes` contiene únicamente `./Afiliados`**, el módulo real del dominio
  (HU-08). Antes exponía `./info`, un contrato técnico mínimo (`name`, `version`)
  que existía solo porque **MF necesita al menos un expose para emitir el chunk del
  contenedor**: con un mapa `exposes` vacío webpack lo descarta por estar vacío y
  **no** se genera `remoteEntry.js`. Ese contrato se eliminó en HU-08 al sustituirlo
  por el módulo real.
- **El módulo se expone como `default` export.** `AffiliatesModule.tsx` declara
  `export default function AffiliatesModule(...)`, por lo que un Host lo consume
  con `dynamic(() => import("nutria_mfe_afiliados/Afiliados"))` sin necesidad de
  mapear nombres ni acotar el import.
- **`shared` no se declara**: `NextFederationPlugin` ya comparte por defecto react,
  react-dom, styled-jsx y los internos de Next.
- **`remotes` no se declara**: este proyecto es solo un Remote.

### Contrato del módulo expuesto

`components/affiliates/AffiliatesModule.tsx` exporta:

| Export                     | Tipo / Valor                                       | Descripción                                     |
| -------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `default`                  | `AffiliatesModule` (componente React)              | Componente a renderizar                         |
| `REMOTE_NAME`              | `"nutria_mfe_afiliados"`                           | Nombre del Remote que publica el módulo         |
| `MODULE_ID`                | `"./Afiliados"`                                    | Identificador del módulo federado                |
| `AffiliatesModuleProps`    | `{ remoteName?: string }`                          | Prop única para identificar el Remote            |

El Host lo consumirá en HU-10. El módulo expone un punto de extensión
(`remoteName`) para que el Host pueda identificar el origen al renderizarlo, y
publica `data-remote` / `data-module` en el DOM con el mismo fin.

### Estilos del módulo

El módulo **no depende de clases globales**. `AffiliatesModule.module.css` declara
sus propios custom properties con valores de reserva:

```css
--afiliados-primary: var(--nutria-primary, #2f6b3f);
```

Así el componente hereda los tokens de NUTRIA cuando están disponibles (por
ejemplo dentro del propio Remote) y mantiene una apariencia correcta cuando es
consumido desde un Host que no los define. Al ser un **CSS Module**, sus clases se
scopearán por hash y no colisionarán con los estilos del Host.

### Artefactos generados

`pnpm build` produce cuatro copias de la entry:

| Artefacto                                  | Ámbito                |
| ------------------------------------------ | --------------------- |
| `.next/static/chunks/remoteEntry.js`       | cliente (se sirve)    |
| `.next/server/chunks/remoteEntry.js`       | servidor (SSR)        |
| `.next/ssr/remoteEntry.js`                 | copia para `ssr`      |
| `.next/static/ssr/remoteEntry.js`          | copia estática        |

Junto a ellos se emiten `mf-manifest.json`, `mf-stats.json` y
`federated-stats.json` en `.next/static/chunks/`.

El contenedor se registra en el navegador como variable global
`window.nutria_mfe_afiliados`, que expone los métodos `get` / `init`.

### Verificación

```bash
pnpm build
pnpm start
```

```bash
curl http://localhost:3001/                                    # 200
curl http://localhost:3001/_next/static/chunks/remoteEntry.js   # 200
```

URL que usará el Host:

```
http://localhost:3001/_next/static/chunks/remoteEntry.js
```

### Requisitos de build

Module Federation necesita la **copia local de Webpack**, porque usa internos que
la copia compilada de Next.js no expone. Por eso los scripts fijan:

```bash
NEXT_PRIVATE_LOCAL_WEBPACK=true
```

mediante `cross-env`, y `webpack` figura como `devDependency`.

**Pin de compatibilidad.** Webpack y `enhanced-resolve` están fijados a versiones
concretas por un problema real con Next.js 15.5.26:

- `webpack@5.105.0` es la última versión que expone `RuntimeTemplate.renderConst`,
  requerido por el `experiments.asyncStartup` que activa el plugin.
- Webpack ≥ 5.110 requiere `enhanced-resolve@^5.25`, y desde `enhanced-resolve`
  5.21 el campo `resolveContext.stack` dejó de ser un `Set` para convertirse en
  una lista enlazada sin método `delete`. El plugin interno
  `OptionalPeerDependencyResolverPlugin` de Next 15.5.26 llama
  `resolveContext.stack?.delete(...)` y falla con
  `TypeError: _resolveContext_stack.delete is not a function`.
- El `override` a `enhanced-resolve@5.20.1` (última versión con `stack` basado en
  `Set`, y dentro del rango `^5.19.0` que declara Webpack 5.105.0) resuelve el
  conflicto **sin degradar Next.js ni cambiar de arquitectura**.

> `@module-federation/nextjs-mf` advierte que el soporte de Next.js será
> deprecado. La configuración se mantiene porque es el paquete requerido para esta
> integración.

---

## 9. Relación con nutria-shell

En esta HU **sigue sin existir integración activa con `nutria-shell`**: este
proyecto no lo modifica ni lo invoca. Lo que cambia es que el Remote **ya expone
su módulo real y está preparado para ser consumido**:

```
nutria-shell
      │
      X   ← la conexión se hará en HU-10
      │
nutria-mfe-afiliados   (contenedor federado listo)
```

Ambos proyectos se ejecutan **de forma independiente**:

| Proyecto               | Rol                 | Puerto          |
| ---------------------- | ------------------- | --------------- |
| `nutria-shell`         | HOST / Orquestador  | (puerto propio) |
| `nutria-mfe-afiliados` | REMOTE              | 3001            |

La composición entre ambos se resolverá en HU-10 mediante Module Federation. La
comunicación con backend (REST/HTTP) es un mecanismo diferente y complementario, y
no se implementa en esta etapa.

---

## 10. Dominio de Afiliados

El Remote estará relacionado con la **gestión de los afiliados de NUTRIA**.

El módulo expuesto como `./Afiliados` es la base visual del dominio: una tarjeta
que identifica NUTRIA, el nombre del módulo y el Remote que lo publica. Es una
**demostración visual** que valida la exposición federada de extremo a extremo.

Por ahora la información funcional es mínima y conceptual. **No** se definen
endpoints, APIs, tablas, servicios backend, modelos detallados, operaciones CRUD
ni lógica de negocio. Estos elementos se definirán en HUs posteriores.

---

## 11. Roadmap

| HU     | Contenido                                                  | Estado      |
| ------ | ---------------------------------------------------------- | ----------- |
| HU-06  | Inicializar el Remote de forma independiente              | Completada  |
| HU-07  | Configurar Module Federation                               | Completada  |
| HU-08  | Exponer el primer módulo                                   | Completada  |
| HU-09  | Configurar el Host                                         | Pendiente   |
| HU-10  | Consumir el módulo desde `nutria-shell`                    | Pendiente   |

Evolución posterior: funcionalidades reales de Afiliados, integración con
backend, Design System compartido, pruebas, calidad y CI/CD.
