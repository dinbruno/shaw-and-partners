import dynamic from 'next/dynamic';
import LayoutComponent from "@/components/Layout";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const CsvDataProvider = dynamic(() => import('@/context/CsvContext'), {
  ssr: false,
});

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
