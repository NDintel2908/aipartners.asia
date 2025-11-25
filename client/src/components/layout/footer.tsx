import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/languageContext";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  return (
    <footer className="bg-black text-white py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 3 cột chính */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.quickLinks")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.quickLinksDesc")}
            </p>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/aibuilders"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                AI Builders
              </Link>
              <Link
                href="/ai-trainers"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                AI Trainers
              </Link>
              <Link
                href="/ai-workforce"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                AI Workforce
              </Link>
              <Link
                href="/ai-store"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                AI Agents Market
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.followUs")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.followUsDesc")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/ai-partners-asia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/aipartners.asia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.stayUpdated")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.stayUpdatedDesc")}
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("idle");

                try {
                  const formData = new FormData();
                  formData.append("email", email);
                  formData.append("_subject", "New subscriber");

                  const res = await fetch("https://formspree.io/f/xblyeeve", {
                    method: "POST",
                    body: formData,
                    headers: {
                      Accept: "application/json",
                    },
                  });

                  if (res.ok) {
                    setEmail("");
                    setStatus("success");
                  } else {
                    console.error(
                      "Formspree response not ok",
                      res.status,
                      await res.text()
                    );
                    setStatus("error");
                  }
                } catch (err) {
                  console.error("Formspree request error", err);
                  setStatus("error");
                }
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </form>

            {status === "success" && (
              <p className="text-sm text-emerald-600">
                Đã gửi! Kiểm tra email của bạn.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">
                Gửi thất bại, vui lòng thử lại.
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 AIPartners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
