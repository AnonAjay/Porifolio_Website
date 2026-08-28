import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/context/ThemeContext';
import Navbar from '../components/layout/Navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Ajay Preet Singh | Portfolio',
  description: 'Personal portfolio website of Ajay Preet Singh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${inter.className}`}>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
