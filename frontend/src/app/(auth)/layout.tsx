export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-secondary-background! w-screen flex justify-center">
      {/* <Navbar /> */}
      <main className="bg-background max-w-200 px-12 py-10 h-fit my-10">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
