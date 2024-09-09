// src/app/layout.tsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'NYTimes News',
  description: 'News App using NYTimes API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
