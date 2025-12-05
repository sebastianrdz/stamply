import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stamply - Tarjetas de Lealtad Digitales para Cafeterías",
  description:
    "Crea tarjetas de lealtad digitales que se integran con Apple Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
