import { usePathname } from "next/navigation";
import Container from "./Container";
import MenuLinkButton from "./MenuLinkButton";

export default function ViewMoreOffers() {
  const pathname = usePathname();
  const offerPaths = [
    {
      path: "/active-offers",
      title: "Active offers",
    },
    {
      path: "/weekday-specials",
      title: "Weekday deals",
    },
    {
      path: "/happy-hour-offers",
      title: "Happy hour offers",
    },
    {
      path: "/gift-certificates",
      title: "Gift certificate",
    },
  ];

  return (
    <Container className="max-w-[118.75rem] w-[85%]">
      <div className="my-4 p-8 lg:p-16 space-y-12 sm:my-6 lg:my-8 rounded-[3rem] border border-solid border-primary bg-card-background">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-smoky-white">
          View More Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-[90%] 2xl:w-[70%]">
          {offerPaths.map(
            (path, index) =>
              path.path !== pathname && (
                <MenuLinkButton
                  key={index}
                  nav={{ title: path.title, link: path.path }}
                  isActive={false}
                  onClick={() => {}}
                />
              )
          )}
        </div>
      </div>
    </Container>
  );
}
