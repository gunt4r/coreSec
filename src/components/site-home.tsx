import { Cases } from "@/components/cases";
import { ClosingCta } from "@/components/closing-cta";
import { ContactForm } from "@/components/contact-form";
import { Contacts } from "@/components/contacts";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Objections } from "@/components/objections";
import { Problems } from "@/components/problems";
import { Process } from "@/components/process";
import { WhyUs } from "@/components/why-us";

export function SiteHome() {
  return (
    <>
      <Nav overlay />
      <main>
        <Hero />
        <Cases />
        <Problems />
        <Process />
        <Objections />
        <WhyUs />
        <ContactForm />
        <Contacts />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
