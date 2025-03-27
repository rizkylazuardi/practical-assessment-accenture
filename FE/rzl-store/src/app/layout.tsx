'use client';
import { Provider } from 'react-redux';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import store, { persistor } from "@/redux/store";
import BadgeCart from '@/component/cart/badgeCart';
// import { PersistGate } from 'redux-persist/integration/react';
import dynamic from 'next/dynamic';
const PersistGate = dynamic(
  () => import('redux-persist/integration/react').then((mod) => mod.PersistGate),
  { ssr: false } // This ensures PersistGate is only used client-side
);
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    
      <html lang="en">
    
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <Provider store={store}>
      
      <PersistGate loading={null} persistor={persistor}>
        <header>
            <div className="logo">
                <h1>Toko Online RZL</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Beranda</a></li>
                    <li><a href="#">Produk</a></li>
                    <li><a href="#">Tentang Kami</a></li>
                    <li><a href="#">Kontak</a></li>
                    <li>
                      <BadgeCart />
                    </li>
                </ul>
            </nav>
          </header>
          
            {children}
          <footer>
            <p>&copy; 2025 Toko Online. Semua hak dilindungi.</p>
          </footer>
          </PersistGate>
      
      </Provider>
          </body>
          </html>
      
      
      
  );
}
