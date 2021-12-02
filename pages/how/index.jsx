import Header from "../../src/components/header/Header";
import Hero from "../../src/components/hero/Hero";
import Description from "../../src/components/description/Description";
import Footer from "../../src/components/footer/Footer";

export default function How() {
  return (
    <div>
      <Header />
      <Hero text={"How it works"} />
      <Description
        text={`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam id quam sagittis, ut posuere metus finibus. Phasellus purus elit, placerat quis mollis a, molestie feugiat sem. Suspendisse eu malesuada risus. Ut neque erat, scelerisque semper neque ac, malesuada ultrices dui. Nunc sodales vitae ipsum ac iaculis. Quisque malesuada, lacus vel dignissim elementum, felis massa euismod sapien, fermentum pretium urna leo sed turpis. Nulla ut rutrum felis, at vestibulum tellus. Sed varius risus nec dui tempus posuere. Morbi pellentesque sollicitudin felis a interdum. Curabitur egestas euismod nunc vel vestibulum. Vivamus condimentum enim at dui efficitur, sed vestibulum ligula fringilla. Nam sagittis, eros sed rhoncus euismod, ligula lorem eleifend nulla, vitae iaculis nisl nisi dapibus lectus.`}
        image={"images/nft.jpg"}
      />
      <Footer />
    </div>
  );
}
