import Head from 'next/head'
import dynamic from 'next/dynamic'

export default function Home() {
  const DynamicMap = dynamic(() => import('../components/Map/Map'), {
    ssr: false,
  })

  return (
    <>
      <Head>
        <title>Culture Trip</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DynamicMap />
      </main>
    </>
  )
}
