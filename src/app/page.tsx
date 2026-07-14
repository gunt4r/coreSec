import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Problems } from "@/components/problems";
import { Process } from "@/components/process";
import { WhyUs } from "@/components/why-us";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <WhyUs />
        <Process />
        <ContactForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
