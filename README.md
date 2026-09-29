# NUTRIA — nutria-mfe-afiliados

`nutria-mfe-afiliados` es el **primer Microfrontend REMOTE de NUTRIA**.

Corresponde al dominio de **Afiliados** y funciona como **Remote** dentro de la
arquitectura de Microfrontends de NUTRIA, que será consumido posteriormente por
`nutria-shell` (HOST / Orquestador).

> **Resumen:** `nutria-mfe-afiliados` es el primer Remote independiente de NUTRIA y
> será conectado posteriormente al Host `nutria-shell` mediante Module Federation.

---

## Tabla de contenidos

1. [Nombre](#1-nombre)
2. [Propósito del repositorio](#2-propósito-del-repositorio)
3. [Arquitectura](#3-arquitectura)
4. [Repositorios independientes](#4-repositorios-independientes)
5. [Module Federation](#5-module-federation)
6. [Estado actual](#6-estado-actual)
7. [Objetivo de la primera etapa](#7-objetivo-de-la-primera-etapa)
8. [Dominio de Afiliados](#8-dominio-de-afiliados)
9. [Tecnologías](#9-tecnologías)
10. [Diseño visual](#10-diseño-visual)
11. [Relación con el backend](#11-relación-con-el-backend)
12. [Roadmap del repositorio](#12-roadmap-del-repositorio)
13. [Próximo paso](#13-próximo-paso)
14. [Comandos](#14-comandos)

---

## 1. Nombre

**NUTRIA — nutria-mfe-afiliados**

Este repositorio corresponde al Microfrontend de **AFILIADOS** y funciona como
**REMOTE** dentro de la arquitectura de Microfrontends de NUTRIA.

---

## 2. Propósito del repositorio

`nutria-mfe-afiliados` es una **aplicación frontend independiente** que representa
el dominio de **Afiliados** dentro de NUTRIA.

Su responsabilidad será contener la interfaz y las funcionalidades relacionadas con
el dominio:

- **Afiliados**

Este proyecto será consumido posteriormente por:

- `nutria-shell` — que actúa como **HOST / ORQUESTADOR**

### Estado

- [x] Documentación del propósito y alcance del repositorio
- [ ] Implementación del esqueleto del Remote
- [ ] Módulo de Afiliados
- [ ] Integración con `nutria-shell`

---

## 3. Arquitectura

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

### nutria-shell

- Es el **HOST** y orquestador de NUTRIA.
- Es la aplicación principal desde la cual se integran los diferentes Microfrontends.

### nutria-mfe-afiliados

- Es el **REMOTE**.
- Es una aplicación independiente que posteriormente expondrá módulos para que el
  HOST pueda consumirlos.

---

## 4. Repositorios independientes

NUTRIA utiliza **repositorios independientes** para sus aplicaciones.

```
Git Repositories
│
├── nutria-shell
│   └── HOST / Orquestador
│
├── nutria-mfe-afiliados
│   └── REMOTE
│
└── nutria-design-system
    └── recursos compartidos
```

Aclaraciones importantes:

- `nutria-mfe-afiliados` tiene **su propio repositorio**.
- Tiene **su propio código**.
- Tiene **su propio `package.json`**.
- Tiene **su propio proceso de desarrollo**.
- Tiene **su propio build**.
- **No copia código** desde `nutria-shell`.
- **No depende** de una carpeta local de `nutria-shell`.

> Este repositorio **no es un monorepo**. No contiene `nutria-shell` ni otros
> Microfrontends.

---

## 5. Module Federation

Module Federation es el mecanismo que permite la composición entre aplicaciones
frontend de NUTRIA.

```
REMOTE
   │
   ├── exposes
   │
   ▼
módulo de Afiliados
   │
   │
   ▼
HOST
nutria-shell
```

### Remote

Aplicación que expone módulos para que otras aplicaciones puedan consumirlos.

### exposes

Configuración que indicará **posteriormente** qué módulos pone a disposición este
Remote.

### Host

Aplicación que consume módulos expuestos por los Remotes.

### remotes

Configuración utilizada **posteriormente** por el Host para declarar las
aplicaciones remotas que consume.

### remoteEntry

Punto de entrada utilizado por Module Federation para descubrir/cargar los módulos
expuestos por el Remote.

> **Nota:** esta sección describe el **concepto**. Los nombres concretos de archivos,
> URLs y configuraciones de Module Federation **no están implementados todavía** y
> se documentarán cuando se implementen.

---

## 6. Estado actual

Este repositorio está en una **etapa inicial**.

**Estado: REMOTE todavía NO implementado.**

Actualmente:

- el repositorio está siendo preparado
- todavía no existe la aplicación funcional
- todavía no existe el módulo expuesto
- todavía no existe conexión con `nutria-shell`

```
nutria-shell
     │
     X
     │
nutria-mfe-afiliados
```

La conexión todavía no existe.

---

## 7. Objetivo de la primera etapa

El primer objetivo de este repositorio será crear el **esqueleto inicial** del
Remote.

Pasos posteriores:

1. Inicializar la aplicación.
2. Configurar la tecnología frontend.
3. Crear la estructura del Microfrontend.
4. Crear el módulo inicial de Afiliados.
5. Configurar Module Federation.
6. Exponer el módulo.
7. Ejecutar y validar el Remote de manera independiente.
8. Posteriormente conectarlo con `nutria-shell`.

---

## 8. Dominio de Afiliados

El Microfrontend de Afiliados estará relacionado con la **gestión de los afiliados
de NUTRIA**.

La información funcional se mantiene a nivel **conceptual** en esta etapa.

Todavía **NO** se define:

- endpoints
- APIs
- tablas
- servicios backend
- lógica de negocio
- modelos detallados
- operaciones CRUD

Estos elementos se definirán posteriormente cuando corresponda.

---

## 9. Tecnologías

**Tecnologías previstas** para este Remote (aún **NO instaladas ni configuradas**):

- React
- TypeScript
- pnpm
- CSS
- Webpack
- Module Federation

> No se utilizan Tailwind, styled-components, CSS-in-JS ni Multi-Zones.

---

## 10. Diseño visual

Existe una referencia visual de NUTRIA:

- `NUTRIA_concepto_visual.html`

El Remote deberá mantener **coherencia visual** con `nutria-shell`.

Se tomara como referencia posteriormente:

- colores
- tipografía
- espaciado
- tarjetas
- botones
- formularios
- jerarquía visual

Los estilos serán **CSS**.

### nutria-design-system (planificado)

Posteriormente se incorporará `nutria-design-system` como **repositorio
independiente** para compartir estilos y componentes entre:

- `nutria-shell`
- `nutria-mfe-afiliados`

> **Importante:** `nutria-design-system` **todavía NO existe**. No es una
> dependencia instalada en este momento.

---

## 11. Relación con el backend

Este repositorio pertenece a la **capa frontend**.

La comunicación con backend será **independiente** de Module Federation.

**Comunicación con datos (conceptual):**

```
nutria-mfe-afiliados
        │
        │ HTTP / REST
        ▼
      Backend
        │
        ▼
   Microservicios
```

**Composición entre aplicaciones frontend:**

```
nutria-shell
        │
        │ Module Federation
        ▼
nutria-mfe-afiliados
```

Explicación:

- **Module Federation** resuelve la **composición entre aplicaciones frontend**.
- **REST/HTTP** resolverá posteriormente la **comunicación con backend**.
- Son **mecanismos diferentes y complementarios**.

> No se implementan ni documentan APIs concretas todavía.

---

## 12. Roadmap del repositorio

> Ninguna de estas etapas está completada todavía.

### Etapa 1 — Esqueleto

- [ ] Inicializar aplicación.
- [ ] Configurar estructura base.
- [ ] Configurar TypeScript.
- [ ] Configurar pnpm.
- [ ] Preparar estilos CSS.

### Etapa 2 — Módulo Afiliados

- [ ] Crear interfaz inicial de Afiliados.
- [ ] Crear componentes del dominio.
- [ ] Preparar módulo que será expuesto.

### Etapa 3 — Module Federation

- [ ] Configurar el Remote.
- [ ] Definir `exposes`.
- [ ] Generar/configurar el punto de entrada correspondiente.
- [ ] Validar que el Remote pueda exponer su módulo.

### Etapa 4 — Integración

- [ ] Conectar con `nutria-shell`.
- [ ] Registrar el Remote en el Host.
- [ ] Consumir el módulo expuesto.
- [ ] Validar Host → Remote.

### Etapa 5 — Evolución

Funcionalidades que posteriormente se podrán incorporar:

- [ ] funcionalidades reales de Afiliados
- [ ] integración con backend
- [ ] Design System compartido
- [ ] pruebas
- [ ] calidad y CI/CD

---

## 13. Próximo paso

El siguiente paso inmediato será:

**HU-06 — Initialize the Affiliates Remote**

Es decir: crear el **esqueleto inicial** de `nutria-mfe-afiliados`.

El siguiente objetivo después del esqueleto será configurar el Remote y,
posteriormente, conectarlo con `nutria-shell`.

---

## 14. Comandos

Los comandos de instalación, desarrollo y build se agregarán cuando se complete la
inicialización del proyecto.

---

## 15. Implementado vs. Planificado

### IMPLEMENTADO

- Repositorio inicializado y preparado.
- Documentación de propósito, alcance y arquitectura.

### PLANIFICADO (NO implementado)

- Aplicación React + TypeScript.
- Uso de pnpm.
- Estilos CSS.
- Build con Webpack.
- Configuración de Module Federation.
- Módulo expuesto por el Remote.
- Conexión con `nutria-shell`.
- Backend, APIs y microservicios.
- Autenticación.
- `nutria-design-system`.
- Lógica de negocio del dominio de Afiliados.

> No está implementado: Module Federation conectado, consumo desde `nutria-shell`,
> módulo expuesto, backend, autenticación, Design System ni lógica de negocio.
> Todo eso corresponde a etapas posteriores.
