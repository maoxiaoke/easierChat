import Head from 'next/head';
import dynamic from 'next/dynamic';
import LeftMenu from '../components/LeftMenu';
import Settings from '../components/Settings';
import Alert from '../components/Alert';
import { AssistantRoleProvider } from '../contexts/assistant';
import { OpenaiKeyProvider } from '../contexts/openaiKey';
import { ModelSettingProvider } from '../contexts/modelSetting';

const Chat = dynamic(() => import('../components/Chat'), { ssr: false });
const ContextMenu = dynamic(() => import('../components/ContextMenu'), { ssr: false });

// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Easier Chat</title>
        <meta name="description" content="一个更方便、易用的 chatBot 客户端" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Alert />
        <OpenaiKeyProvider>
          {/* Left Menu */}
          {/* <div style={{ width: '320px' }} className="max-h-screen bg-gray-800 flex flex-col justify-between">
            <LeftMenu />
            <Settings />
          </div> */}

          {/* Right Menu */}
          <div className="flex-1">
            <AssistantRoleProvider>
              <ModelSettingProvider>
                <ContextMenu >
                  <Chat />
                </ContextMenu>
              </ModelSettingProvider>
            </AssistantRoleProvider>
          </div>
        </OpenaiKeyProvider>
      </main>
    </>
  )
}
