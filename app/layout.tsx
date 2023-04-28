import './globals.css'
import { Nunito } from 'next/font/google'
import Narbar from './components/navbar/Narbar'
import ClientOnly from './components/ClientOnly'
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <Narbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
