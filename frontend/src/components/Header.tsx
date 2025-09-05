import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Sparkles, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import SignInModal from "./SignInModal";

const Header = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-2xl'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-2 h-2 text-yellow-800" />
                </div>
              </div>
              <div className="group-hover:scale-105 transition-transform duration-300">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Secure Campus Suite
                </h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Next-Gen Hostel Management
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { href: "#features", label: "Features", icon: Sparkles },
                { href: "#dashboard", label: "Dashboard", icon: Crown },
                { href: "#pricing", label: "Pricing", icon: Zap },
                { href: "#contact", label: "Contact", icon: Shield }
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {label}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </Button>
              <Link to="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  <Crown className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border/50">
              <nav className="flex flex-col gap-4 pt-4">
                {[
                  { href: "#features", label: "Features" },
                  { href: "#dashboard", label: "Dashboard" },
                  { href: "#pricing", label: "Pricing" },
                  { href: "#contact", label: "Contact" }
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start p-0 h-auto"
                  onClick={() => {
                    setSignInOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
    </>
  );
};

export default Header;
