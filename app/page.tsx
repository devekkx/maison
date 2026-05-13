import AnimationsProvider from "@/components/AnimationsProvider";
import IntroOverlay from "@/components/IntroOverlay";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Owner from "@/components/Owner";
import Gallery from "@/components/Gallery";
import PullQuote from "@/components/PullQuote";
import EndCTA from "@/components/EndCTA";
import ContactModal from "@/components/ContactModal";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <AnimationsProvider>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <IntroOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Owner />
        <Gallery />
        <PullQuote />
        <EndCTA />
      </main>

      <ContactModal />
      <CustomCursor />
    </AnimationsProvider>
  );
}
