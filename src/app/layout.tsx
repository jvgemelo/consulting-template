import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import SideNav from "@/components/Sidenav";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MazoProvider } from "@/context/giro-context";

const queryClient = new QueryClient()
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consulting template",
  description: "Developed by Siali Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <MazoProvider>
        <ChakraProvider>
          <div style={{ display: 'flex', minHeight: 'screen' }}>
            <SideNav />
            <main style={{ flex: 1 }}>
              {/* <QueryClientProvider client={queryClient}> */}
                {children}
              {/* </QueryClientProvider> */}
            </main>
          </div>
        </ChakraProvider>
        </MazoProvider>
      </body>
    </html>
  );
}
