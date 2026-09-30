import AffiliatesModule from "@/components/affiliates/AffiliatesModule";
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

      {/*
        La pagina local del Remote reutiliza el mismo componente que Module
        Federation expone como "./Afiliados": no hay una segunda implementacion.
      */}
      <main className="page">
        <AffiliatesModule />
      </main>
    </>
  );
}
