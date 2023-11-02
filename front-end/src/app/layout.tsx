import LayoutComponent from "@/components/Layout";
import "./globals.css";
import CsvDataProvider from "@/context/CsvContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CsvDataProvider>
          <LayoutComponent>{children}</LayoutComponent>
        </CsvDataProvider>
      </body>
    </html>
  );
}
