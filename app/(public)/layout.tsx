import Container from "@/components/ui/Container";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function PublicPage({ children }: { children: React.ReactNode }) {

    return (
        <div className="bg-general-background">
            <div>
                <Header />
                {children}

            </div>
        </div>
    )
}