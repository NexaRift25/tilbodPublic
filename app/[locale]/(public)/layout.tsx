import Header from "@/components/ui/Header";

export default function PublicPage({ children }: { children: React.ReactNode }) {

    return (
        <div className="bg-general-background pb-10">
            <div>
                <Header />
                {children}
            </div>
        </div>
    )
}