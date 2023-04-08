import '@/styles/globals.css';
import '@/styles/modal.css';
import '@/styles/avatar.css';
import '@/styles/dailog.css';
import '@/styles/context.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
