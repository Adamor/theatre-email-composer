import './globals.css'

export const metadata = {
  title: 'Theatre Email Composer',
  description: 'Professional email composer for theatre development with Claude AI integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}