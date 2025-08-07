import FooterLinks from "@/app/components/footer/FooterLinks";
import FooterBrand from "@/app/components/footer/FooterLogo";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterBrand />
        <FooterLinks />
      </div>
    </footer>
  );
}