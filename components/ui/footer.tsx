import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export default function AppFooter() {
  return (
    <Footer container className="mt-auto bg-surface text-main text-blue-500 border-t" suppressHydrationWarning>
    <FooterCopyright className="text-blue-500!"  href="#" by="Abdulrahman Habiba" year={2025}  />
    <FooterLinkGroup>
      <FooterLink href="#" className="text-blue-500 ">About</FooterLink>
      <FooterLink href="#" className=" text-blue-500">Privacy Policy</FooterLink>
      <FooterLink href="#" className=" text-blue-500">Licensing</FooterLink>
      <FooterLink href="#" className=" text-blue-500">Contact</FooterLink>
    </FooterLinkGroup>
  </Footer>
  );
}
