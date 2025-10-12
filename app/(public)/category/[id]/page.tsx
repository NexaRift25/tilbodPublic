import Banner from "@/components/ui/Banner";
import Container from "@/components/ui/Container";
import Footer from "@/components/ui/Footer";
import CategoryCardWraper from "@/componentWraper/CategoryCardWraper";

export default function SignleCategoryOffer() {
  return (
    <div>
      <Banner className="border-primary" />
      <div className="w-full pl-8 sm:pl-12 lg:pl-24 xl:pl-[100px] 2xl:pl-[137px] max-w-[130rem] mx-auto">
        <CategoryCardWraper />
      </div>
      <Container>
        <h1>Category</h1>
      </Container>
      <Footer />
    </div>
  );
}
