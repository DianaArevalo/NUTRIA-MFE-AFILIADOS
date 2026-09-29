# NUTRIA — nutria-mfe-afiliados

Microfrontend **Remote** del dominio **Afiliados** de NUTRIA.

Construido con **Next.js 15 (Pages Router) + TypeScript**, ejecuta de forma
independiente en `http://localhost:3001` y será consumido posteriormente por
`nutria-shell` (HOST / Orquestador) mediante Module Federation.

> **Estado actual (HU-06):** el Remote funciona de manera independiente.
> Todavía **no existe integración con `nutria-shell`** ni **módulo federado
> expuesto**. Module Federation se configurará en una HU posterior.

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
| Bundler           | Webpack (incluido en Next.js 15)     |

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

---

## 6. Estructura del proyecto

```
nutria-mfe-afiliados/
│
├── pages/
│   ├── _app.tsx          # App global (carga estilos)
│   ├── _document.tsx     # Documento HTML
│   └── index.tsx         # Página inicial del Remote
│
├── public/
│   └── favicon.ico
│
├── styles/
│   └── globals.css       # Estilos globales (CSS)
│
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.ts
├── .gitignore
└── README.md
```

Notas:

- `next.config.ts` usa configuración tipada de Next.js
  (`import type { NextConfig }`).
- El bundler es **Webpack**, que Next.js 15 ya incluye. No es necesario instalar
  `webpack` por separado.

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

**Todavía NO implementado:**

- [ ] Configuración de Module Federation (`NextFederationPlugin`).
- [ ] `exposes` / `remoteEntry`.
- [ ] `remotes` en el Host.
- [ ] Módulo federado expuesto.
- [ ] Conexión o consumo desde `nutria-shell`.
- [ ] Funcionalidades reales de Afiliados.
- [ ] Backend, APIs o autenticación.

---

## 8. Module Federation

En esta HU **no** se implementó Module Federation. Esa configuración corresponde
a una HU posterior.

El proyecto quedó preparado para configurar
[`@module-federation/nextjs-mf`](https://module-federation.io/) como Remote:

- **Pages Router** en lugar de App Router (requisito de la integración).
- `next.config.ts` en formato TypeScript.
- Webpack como bundler.

Concepto a implementar en la HU siguiente:

```
REMOTE (este proyecto)
   │
   ├── exposes
   │
   ▼
módulo de Afiliados
   │
   ▼
HOST  nutria-shell
```

---

## 9. Relación con nutria-shell

En esta HU **no existe integración con `nutria-shell`**. La conexión todavía no
existe:

```
nutria-shell
     │
     X
     │
nutria-mfe-afiliados
```

Por ahora ambos proyectos se ejecutan **de forma independiente**:

| Proyecto               | Rol                 | Puerto          |
| ---------------------- | ------------------- | --------------- |
| `nutria-shell`         | HOST / Orquestador  | (puerto propio) |
| `nutria-mfe-afiliados` | REMOTE              | 3001            |

La composición entre ambos se resolverá posteriormente mediante Module
Federation. La comunicación con backend (REST/HTTP) es un mecanismo diferente y
complementario, y no se implementa en esta etapa.

---

## 10. Dominio de Afiliados

El Remote estará relacionado con la **gestión de los afiliados de NUTRIA**.

Por ahora la información funcional es mínima y conceptual. **No** se definen
endpoints, APIs, tablas, servicios backend, modelos detallados, operaciones CRUD
ni lógica de negocio. Estos elementos se definirán en HUs posteriores.

---

## 11. Roadmap

| HU     | Contenido                                                  | Estado      |
| ------ | ---------------------------------------------------------- | ----------- |
| HU-06  | Inicializar el Remote de forma independiente              | Completada  |
| HU-07  | Configurar Module Federation                               | Pendiente   |
| HU-08  | Exponer el primer módulo                                   | Pendiente   |
| HU-09  | Configurar el Host                                         | Pendiente   |
| HU-10  | Consumir el módulo desde `nutria-shell`                    | Pendiente   |

Evolución posterior: funcionalidades reales de Afiliados, integración con
backend, Design System compartido, pruebas, calidad y CI/CD.
