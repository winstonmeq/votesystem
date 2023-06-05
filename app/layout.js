import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Headers from '@/components/Headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VMS',
  description: 'Vote Monitoring System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Headers />
       <main className='app'>
       {children}
       </main>      
      </body>
    </html>
  )
}
