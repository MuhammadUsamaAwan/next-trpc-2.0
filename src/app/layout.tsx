import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';

import '@/styles/globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { TRPCProvider } from '@/trpc/provider';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <TRPCProvider>
            <main>{children}</main>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
