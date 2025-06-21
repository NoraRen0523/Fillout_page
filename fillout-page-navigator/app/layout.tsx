import './globals.css';

export const metadata = {
  title: 'Fillout Page Navigation Component',
  description: 'An implementation of a page navigation component similar to the Fillout form builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="fillout">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}