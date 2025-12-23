import './globals.css'

export const metadata = {
  title: 'MicroSaaS Creations - AI SDR Platform',
  description: 'AI-powered sales development platform for contractors, trucking, and solar companies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
