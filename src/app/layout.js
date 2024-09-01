import { Inter } from 'next/font/google'
import './globals.css'
import FunctionalErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <FunctionalErrorBoundary>
      {children}
    </FunctionalErrorBoundary>
      </body>
    </html>
  )
}
