import './globals.css'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Brew Haven - Premium Coffee Powder',
  description: 'Gourmet coffee delivered to your doorstep.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#faf9f6]">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
