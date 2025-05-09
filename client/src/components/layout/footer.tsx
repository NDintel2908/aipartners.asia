import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/languageContext";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white py-16 px-4 md:px-6 lg:px-8">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 max-w-7xl mx-auto">
        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('footer.quickLinksDesc')}
          </p>
          <div className="space-y-2">
            <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/aibuilders" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              AI Builders
            </Link>
            <Link href="/ai-trainers" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              AI Trainers
            </Link>
            <Link href="/ai-workforce" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              AI Workforce
            </Link>
            <Link href="/ai-store" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              AI Agents Market
            </Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('footer.followUs')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('footer.followUsDesc')}
          </p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com/company/ai-partners-asia" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href="https://facebook.com/aipartners.asia" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <FaFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('footer.stayUpdated')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('footer.stayUpdatedDesc')}
          </p>
          <div className="flex items-center gap-2">
            <input 
              type="email" 
              placeholder={t('footer.emailPlaceholder')}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>© 2025 AIPartners. All rights reserved.</p>
      </div>
    </footer>
  );
}