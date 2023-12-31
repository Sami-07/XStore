
import AuthProvider from "../components/AuthProvider"
import SubLayout from "../components/SubLayout"
import styles from "./globals.css"
import Script from "next/script"
export const metadata = {
  title: "X Store - Sami",
  description: "E-Commerce Website for Shopping eBooks, etc."
}

export default function RootLayout({ children }) {

  return (
    <AuthProvider>
      <html lang="en">
        <body className="">
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" ></link>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <SubLayout>
            {children}
          </SubLayout>
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </body>
      </html>
    </AuthProvider>
  )
}
