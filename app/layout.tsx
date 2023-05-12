import { Nunito } from 'next/font/google'
import './globals.css'

import ClientOnly from './components/ClientOnly'
import Narbar from './components/navbar/Narbar'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import ToasterProvider from './components/providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Narbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
