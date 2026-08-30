import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Tent } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
interface NavigationProps {
  variant?: "default" | "dark";
}
const Navigation = ({
  variant = "default"
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = variant === "dark";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const handleBookNow = () => {
    if (isHomePage) {
      document.getElementById('booking')?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  const navItems = [{
    label: "Dashboard",
    href: "/dashboard",
    isRoute: true
  }, {
    label: "Expenses",
    href: "/expenses",
    isRoute: true
  }, {
    label: "Savings",
    href: "/savings",
    isRoute: true
  }, {
    label: "Settings",
    href: "/settings",
    isRoute: true
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6
  }} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${isMobileMenuOpen ? "bg-foreground" : isDark ? isScrolled ? "bg-foreground/95 backdrop-blur-lg shadow-soft" : "bg-foreground" : isScrolled ? "bg-card/95 backdrop-blur-lg shadow-soft" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div whileHover={{
            scale: 1.02
          }} className="flex items-center gap-2 cursor-pointer">
              <Tent className={`h-4 w-4 ${isMobileMenuOpen || isDark || !isScrolled ? "text-white" : "text-primary"}`} />
              <span className={`text-sm font-normal tracking-wide ${isMobileMenuOpen || isDark || !isScrolled ? "text-white" : "text-foreground"}`}>
                Personal Ledger
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} className={`text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`}>
                  {item.label}
                </Link> : <a key={item.label} href={item.href} className={`text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`}>
                  {item.label}
                </a>)}
          </div>

          <button className={`md:hidden ${isMobileMenuOpen || isDark || !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      <AnimatePresence>
      {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      }} animate={{
        opacity: 1,
        clipPath: "inset(0 0 0% 0)"
      }} exit={{
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      }} transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }} className={`md:hidden mt-6 pb-4 -mx-6 px-6 rounded-b-xl ${isDark || !isScrolled ? "bg-foreground" : "bg-card"}`}>
            {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} className={`block py-3 text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link> : <a key={item.label} href={item.href} className={`block py-3 text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 ${isDark || !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </a>)}
          </motion.div>}
      </AnimatePresence>
      </div>
    </motion.nav>;
};
export default Navigation;