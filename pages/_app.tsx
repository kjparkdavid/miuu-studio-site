import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat, Noto_Sans_KR } from 'next/font/google'

const display = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-display' })
const ko = Noto_Sans_KR({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-ko', preload: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${ko.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
