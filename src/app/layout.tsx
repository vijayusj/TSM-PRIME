import type { Metadata } from 'next';
import { Inter, Tektur } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';

const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'TSM PRIME',
  description: 'a netflix  similar ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image.png" sizes="any" />
      </head>
      <body className={`${inter.className} ${tektur.variable}`}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
