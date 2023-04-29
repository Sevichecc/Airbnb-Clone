import './globals.css'
import { Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import Narbar from './components/navbar/Narbar'
import Modal from './components/modals/Modal'

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
          <Modal isOpen />
          <Narbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
