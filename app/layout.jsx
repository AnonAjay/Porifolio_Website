import './globals.css';
import { ThemeProvider } from '../components/context/ThemeContext';
import Navbar from '../components/layout/Navbar';

export const metadata = {
  title: 'Ajay Preet Singh | Portfolio',
  description: 'Personal portfolio website of Ajay Preet Singh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
