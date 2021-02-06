import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

export default function Home() {
  const DynamicMap = dynamic(() => import('../components/Map/Map'), {
    ssr: false,
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DynamicMap />
      </main>
    </div>
  )
}
