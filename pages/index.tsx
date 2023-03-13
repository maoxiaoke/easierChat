import Head from 'next/head';
import Chat from '../components/Chat';
import LeftMenu from '../components/LeftMenu';
import Settings from '../components/Settings';
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Chat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        {/* Left Menu */}
        <div style={{ width: '320px' }} className="min-h-screen bg-gray-800 flex flex-col justify-between">
          <LeftMenu />
          <Settings />
        </div>

        {/* Right Menu */}
        <div className="flex-1">
          <Chat />
        </div>
      </main>
    </>
  )
}