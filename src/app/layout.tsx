import "@/styles/globals.scss";

import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Auth App",
  description: "Login and Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
