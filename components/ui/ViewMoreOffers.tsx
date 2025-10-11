import Container from "./Container";
import MenuLinkButton from "./MenuLinkButton";

export default function ViewMoreOffers() {
  return (
    <Container className="max-w-[118.75rem] w-[85%]">
      <div className="my-4 p-16 space-y-12 sm:my-6 lg:my-8 rounded-[3rem] border border-solid border-primary bg-card-background">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-smoky-white">
          View More Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:w-[90%] 2xl:w-[70%]">
          <MenuLinkButton
            nav={{ title: "Active offers", link: "/active-offers" }}
            isActive={false}
            onClick={() => {}}
          />
          <MenuLinkButton
            nav={{ title: "Weekday deals", link: "/weekday-specials" }}
            isActive={false}
            onClick={() => {}}
          />
          <MenuLinkButton
            nav={{ title: "Happy hour offers", link: "/happy-hour-offers" }}
            isActive={false}
            onClick={() => {}}
          />
          <MenuLinkButton
            nav={{ title: "Gift certificate", link: "/gift-certificates" }}
            isActive={false}
            onClick={() => {}}
          />
        </div>
      </div>
    </Container>
  );
}
