import Header from "@/components/ui/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
        <Header />
      {children}
    </div>
  );
}
