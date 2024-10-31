import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@/components/apollo-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { project } from '@/project';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: project.title,
  description: project.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`flex h-screen ${geistSans.variable} ${geistMono.variable} g-white text-white antialiased dark:bg-black dark:text-black`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className='flex flex-1 flex-col'>
                <Header />
                {children}
              </main>
            </SidebarProvider>
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
