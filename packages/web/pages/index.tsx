import type { NextPage } from 'next'
import Head from 'next/head'

import FileUpload from '../components/File/Upload'
import styles from './style.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Se Thian</title>
        <meta name="description" content="Se Thian is a static-file service based on Web3 Storage." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Se Thian
        </h1>

        <p className={styles.description}>
          <a href="https://github.com/nighca/se-thian">Se Thian</a> is a static-file service based on&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://web3.storage"
          >
            Web3 Storage
          </a>.
        </p>

        <FileUpload />
      </main>
    </div>
  )
}

export default Home
