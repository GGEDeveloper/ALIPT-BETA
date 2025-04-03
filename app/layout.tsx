import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import MiniCart from '@/components/MiniCart';
import Header from '@/components/Header';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALITOOLS - Ferramentas e Equipamentos Profissionais',
  description: 'ALITOOLS - A sua loja online de ferramentas e equipamentos profissionais para construção, agricultura e indústria.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-[#F5F5F5]`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <MiniCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 