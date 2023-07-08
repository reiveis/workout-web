import '../styles/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'Workout Finder',
  description: 'The only one page workout app you need',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>" />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
