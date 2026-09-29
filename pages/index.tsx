import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>NUTRIA | Afiliados | Remote</title>
        <meta
          name="description"
          content="Remote del dominio Afiliados de NUTRIA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="page">
        <section className="card">
          <p className="brand">NUTRIA</p>

          <h1 className="title">Afiliados</h1>

          <p className="badge">REMOTE</p>

          <p className="description">
            Remote del dominio Afiliados.
          </p>

          <p className="status">
            Estado: Remote independiente inicializado correctamente.
          </p>
        </section>
      </main>
    </>
  );
}
