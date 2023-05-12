import '@/styles/modal.css';
import '@/styles/avatar.css';
import '@/styles/dailog.css';
import '@/styles/context.css';
import '@/styles/markdown.css';
import '@/styles/slider.css';
import '@/styles/alert.css';

// As tailwind be the last
import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={false} attribute='class' value={{dark: 'dark-theme'}}>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}
