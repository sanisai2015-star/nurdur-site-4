import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Moon, Sun, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import logo from "@assets/PHOTO-2025-12-20-16-50-14_1768349230312.jpg";

export function Navbar() {
  const [location, navigate] = useLocation();
  const { language, setLanguage } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const dark = root.classList.contains("dark");
    setIsDark(dark);
  }, []);

  useEffect(() => {
    // close mobile menu when route changes
    setOpen(false);
  }, [location]);

  function toggleDark() {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
  }

  const links = useMemo(
    () => [
      { href: "/", label: language === "en" ? "Home" : "الرئيسية" },
      { href: "/about", label: language === "en" ? "About" : "حول" },
      { href: "/services", label: language === "en" ? "Services" : "الخدمات" },
      { href: "/projects", label: language === "en" ? "Projects" : "المشاريع" },
      { href: "/contact", label: language === "en" ? "Contact" : "تواصل" },
    ],
    [language]
  );

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b border-border"
      dir={dir}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={logo}
              alt="NURDAR Al Faisal Logo"
              className="h-12 w-auto object-contain rounded-md"
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-heading font-extrabold tracking-wide">
                NURDAR <span className="text-primary">AL FAISAL</span>
              </div>
              <div className="text-xs text-muted-foreground -mt-0.5">
                {language === "en" ? "General Contracting" : "مقاولات عامة"}
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={cn("hidden md:flex items-center gap-6", language === "ar" && "flex-row-reverse")}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span
                className={cn(
                  "cursor-pointer text-sm font-semibold transition-colors hover:text-primary",
                  location === l.href ? "text-primary" : "text-foreground/80"
                )}
              >
                {l.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className={cn("flex items-center gap-2", language === "ar" && "flex-row-reverse")}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="px-3"
          >
            {language === "en" ? "AR" : "EN"}
          </Button>

          <button
            onClick={toggleDark}
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
            aria-label="Open menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden border-t border-border bg-background/95 backdrop-blur", open ? "block" : "hidden")}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          <div className="grid gap-2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => navigate(l.href)}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 text-sm font-semibold border border-border hover:bg-secondary transition-colors",
                  location === l.href && "border-primary text-primary"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-border grid gap-2 text-sm text-muted-foreground">
            <a href="tel:+9647728460390" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              +964 772 846 0390
            </a>
            <a href="mailto:companyemaar@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-4 w-4 text-primary" />
              companyemaar@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
