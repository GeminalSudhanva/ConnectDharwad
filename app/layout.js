import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/site/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' });

export const metadata = {
  title: {
    default: 'Connect Dharwad — Rediscover Life. Pathway to Success.',
    template: '%s — Connect Dharwad',
  },
  description: 'Connect Dharwad empowers students, professionals, and organizations through industry-oriented training, recruitment support, and consultancy services.',
  keywords: ['corporate training', 'recruitment', 'consultancy', 'skill development', 'Dharwad', 'placement', 'workshops'],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Connect Dharwad — Rediscover Life. Pathway to Success.',
    description: 'Industry-oriented training, recruitment, and consultancy services.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
