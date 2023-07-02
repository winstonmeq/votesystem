import '@/styles/globals.css'
// import { Inter } from 'next/font/google'
import Headers from '@/components/Headers'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'


// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VMS',
  description: 'Vote Monitoring System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>

      <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
        
          <main className='app'>
          <Nav />
          {children}
          </main>  
       </Provider>    
       
      </body>
    </html>
  )
}
