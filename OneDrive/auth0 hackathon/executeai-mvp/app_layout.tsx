export const metadata = {
  title: "ExecuteAI - Turn Ideas Into Launches in 7 Days",
  description: "AI-powered 7-day sprint execution. Forced accountability. No pivoting. Ship or fail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
