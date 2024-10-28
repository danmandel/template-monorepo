import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/layout/header';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ApolloProvider } from '@/elements/ApolloProvider';
import { project } from '@/project';

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
    <html lang='en'>
      <body
        className={`flex h-screen ${geistSans.variable} ${geistMono.variable} g-white text-white antialiased dark:bg-black dark:text-black`}
      >
        <ApolloProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <main className='flex flex-1 flex-col'>
                <Header />
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
