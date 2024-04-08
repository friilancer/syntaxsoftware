'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'


const { Button, Input, Select, Modal, Checkbox, Textarea, Avatar, Alert } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
    Select,
    Textarea,
    Avatar,
    Alert,
    Checkbox,
  },
})


const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
  title: "Spotta",
  description: "Spotta",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <ChakraBaseProvider theme={theme}><body className={inter.className}>{children}</body></ChakraBaseProvider>
      </html>
    
  );
}
