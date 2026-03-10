import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home_link" },
  { to: "/menu", label: "Menu", ocid: "nav.menu_link" },
  { to: "/about", label: "About", ocid: "nav.about_link" },
  { to: "/blog", label: "Blog", ocid: "nav.blog_link" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname change should close mobile menu
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Nav */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "nav-glass border-b border-border shadow-xs"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap
                  className="w-4 h-4 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-foreground">
                Protein Sources
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.to
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                data-ocid="nav.order_button"
              >
                <a href="#order">Order Now</a>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border bg-background"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={link.ocid}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.to
                        ? "text-primary bg-accent"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-2 bg-primary text-primary-foreground"
                  data-ocid="nav.order_button"
                >
                  <a href="#order">Order Now</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap
                    className="w-4 h-4 text-primary-foreground"
                    fill="currentColor"
                  />
                </div>
                <span className="font-display font-bold text-lg">
                  Protein Sources
                </span>
              </div>
              <p className="text-sm opacity-60 max-w-xs leading-relaxed">
                High-quality protein meals designed for students and working
                professionals who refuse to compromise on nutrition.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 opacity-90">
                Navigate
              </h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 opacity-90">Contact</h4>
              <ul className="space-y-2 text-sm opacity-60">
                <li>hello@proteinsources.co</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs opacity-40">
              © {new Date().getFullYear()} Protein Sources. All rights reserved.
            </p>
            <p className="text-xs opacity-40">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
